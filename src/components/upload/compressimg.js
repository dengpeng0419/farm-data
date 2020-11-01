// 基于 canvas 压缩图片为 jpg 格式
// 不支持裁剪，只做压缩

/*=============================================================================================*/
// 已发现并修复的 andriod bug:

//   1.调用 canvas.toDataURL('image/jpeg') 返回 image/png，导致图片变大
//     解决：
//       使用 JPEGEncode 生成 jpg

//   2.调用 FileReader.readDataAsURL() 没有返回 mime type，导致图片载入失败
//     解决：
//       侦测文件类型，将获取的 mime type 补进 base64
/*=============================================================================================*/

/*=============================================================================================*/
// 已发现并修复的 ios bug:

// ios bug 修复参考：https://github.com/stomita/ios-imagefile-megapixel
/*=============================================================================================*/





import JPEGEncoder from './jpegencoder'
import EXIF        from './exif'
import blobutil    from './blobutil'
import imagemime   from './imagemime'


var ua = window.navigator.userAgent;
var android = /Android/.test(ua);
var ios = /(?:iPhone|iPod|iPad)/.test(ua);





/**
 * Detect subsampling in loaded image.
 * In iOS, larger images than 2M pixels may be subsampled in rendering.
 *
 * 用载入的图片检测二次抽样
 * 在 ios 中，如果图片的像素数大于 2M 的话，渲染的时候可能会被二次抽样
 */
function detectSubsampling(img) {
  var iw = img.naturalWidth || img.width;
  var ih = img.naturalHeight || img.height;
  if (iw * ih > 1024 * 1024) { // subsampling may happen over megapixel image
    var canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, -iw + 1, 0);
    // subsampled image becomes half smaller in rendering size.
    // check alpha channel value to confirm image is covering edge pixel or not.
    // if alpha value is 0 image is not covering, hence subsampled.

    // 渲染的时候，二次抽样后的图片会变成一半的大小。
    // 检查 alpha 通道的值来确定图片是否覆盖了边缘像素。
    // 如果 alpha 的值是 0 的话，说明图片没有覆盖边缘像素，于是可以确定图片已经被二次抽样了。

    return ctx.getImageData(0, 0, 1, 1).data[3] === 0;
  } else {
    return false;
  }
}

/**
 * Detecting vertical squash in loaded image.
 * Fixes a bug which squash image vertically while drawing into canvas for some images.
 *
 * 用载入的图片检测垂直压扁
 * 修复了一个这样的BUG：当绘制一些图片到画布中时，图片会被垂直压扁
 */
function detectVerticalSquash(img, iw, ih) {
  var canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = ih;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  var data = ctx.getImageData(0, 0, 1, ih).data;
  // search image edge pixel position in case it is squashed vertically.
  var sy = 0;
  var ey = ih;
  var py = ih;
  while (py > sy) {
    var alpha = data[(py - 1) * 4 + 3];
    if (alpha === 0) {
      ey = py;
    } else {
      sy = py;
    }
    py = (ey + sy) >> 1;
  }
  var ratio = (py / ih);
  return (ratio === 0) ? 1 : ratio;
}

/**
  * Transform canvas coordination according to specified frame size and orientation
  * Orientation value is from EXIF tag
*/
function transformCoordinate(canvas, ctx, width, height, orientation) {
  switch (orientation) {
    case 5:
    case 6:
    case 7:
    case 8:
      canvas.width = height;
      canvas.height = width;
      break;
    default:
      canvas.width = width;
      canvas.height = height;
  }
  switch (orientation) {
    case 2:
      // horizontal flip
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
      break;
    case 3:
      // 180 rotate left
      ctx.translate(width, height);
      ctx.rotate(Math.PI);
      break;
    case 4:
      // vertical flip
      ctx.translate(0, height);
      ctx.scale(1, -1);
      break;
    case 5:
      // vertical flip + 90 rotate right
      ctx.rotate(0.5 * Math.PI);
      ctx.scale(1, -1);
      break;
    case 6:
      // 90 rotate right
      ctx.rotate(0.5 * Math.PI);
      ctx.translate(0, -height);
      break;
    case 7:
      // horizontal flip + 90 rotate right
      ctx.rotate(0.5 * Math.PI);
      ctx.translate(width, -height);
      ctx.scale(-1, 1);
      break;
    case 8:
      // 90 rotate left
      ctx.rotate(-0.5 * Math.PI);
      ctx.translate(-width, 0);
      break;
    default:
      break;
  }
}




// 压缩图片
// file 为从 input file 控件中选择的文件对象
// options：
// {
//   quality: 80 压缩质量，数值越大质量越高，反之则越小
//   size: 640 压缩后的图片大小，按长边等比例缩放至 size 指定的大小
//   callback: function(dataURL) {
//     // 压缩后的回调函数
//     // dataURL 为jpg数据的base64字符串
//   }
// }
function androidCompress(file, options) {
  var reader = new FileReader();
  reader.onloadend = function(e) {
    // reader 对象
    var host = e.target;
    // 读取的文件内容
    var data = host.result;
    // 错误对象
    var error= host.error;
    // 错误消息
    var errorMsg;

    // 二进制字节数组
    var rawBinary;
    // 内存图片
    var memImg;
    // 图片 mime type
    var mimeType;
    var dataURL;

    if (error != null) {
      switch (error.code) {
        case error.NOT_FOUND_ERR:
          errorMsg = 'File not found!';
          break;
        case error.SECURITY_ERR:
          errorMsg = 'Security issue with file!';
          break;
        case error.NOT_READABLE_ERR:
          errorMsg = 'File could not be read!';
          break;
        case error.ENCODING_ERR:
          errorMsg = 'Encoding error!';
          break;
        default:
          errorMsg = 'Unknown issue!';
      };
      throw new Error(errorMsg);
    } else {
      // 检测文件类型必须为图片
      rawBinary = blobutil.base64ToArrayBuffer(data);
      mimeType = imagemime(rawBinary);
      if (mimeType == null) {
        throw new Error('请选择图片');
      }

      // 如果没有返回 mime type ，则自动补
      if (!/^data:image\/.+?;base64,/i.test(data)) {
        data = 'data:' + mimeType + ';base64,' + data.split(',')[1];
      }

      // 载入内存图片，根据配置压缩图片
      memImg = new Image();
      memImg.onload = function() {
        // 获取选择的图片的方向信息
        var tags = EXIF.readFromBinaryFile(rawBinary.buffer);
        var orientation = tags.Orientation || 1;

        // 配置参数
        var opts = Object.create(options || {});
        var optsQuality = opts.quality || 80;
        var optsSize = opts.size || 640;
        var optsCb = opts.callback;

        // 原始图尺寸
        var iw = this.naturalWidth || this.width;
        var ih = this.naturalHeight || this.height;
        // 原始图长边大小
        var lss = iw > ih ? iw : ih;

        // 压缩图尺寸
        var cw;
        var ch;

        // 画布
        var canvas;
        var ctx;

        if (optsSize < lss) {
          // 指定的大小比原图小，计算长边的缩放比例，从而计算出短边的大小
          if (iw > ih) {
            cw = optsSize;
            // 向左移动 0 位的作用是转换为整数
            ch = (ih * cw / iw) << 0;
          } else {
            ch = optsSize;
            // 向左移动 0 位的作用是转换为整数
            cw = (iw * ch / ih) << 0;
          }
        } else {
          // 指定的大小比原图大，则使用原图尺寸压缩
          cw = iw;
          ch = ih;
        }

        // 根据图片方向信息设置画布宽高，变换画布坐标系
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        transformCoordinate(canvas, ctx, cw, ch, orientation);
        ctx.drawImage(this, 0, 0, cw, ch);
        // 导出压缩后的图片数据
        dataURL = canvas.toDataURL('image/jpeg', optsQuality / 100);

        // 部分设备可能无法正确导出 jpeg data url
        if (!/^data:image\/jpeg;base64,.+$/i.test(dataURL)) {
          // 压缩图片为 jpg 格式
          imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          dataURL = new JPEGEncoder().encode(imageData, optsQuality);
        }
        if (optsCb) {
          optsCb(dataURL);
        }
      };
      memImg.onerror = function() {
        throw new Error('不支持' + mimeType + '格式');
      };
      memImg.src = data;
    }
  };
    if (window.wx && typeof file === 'string' && file.indexOf('data:image') === 0) {
        try {
            file = blobutil.base64ToArrayBuffer(file);
        } catch(e) {}
        file = blobutil.Blob([file], {
            type: 'image/jpeg'
        });
    }
  reader.readAsDataURL(file);
}
function iosCompress(file, options) {
  var reader = new FileReader();
  reader.onloadend = function(e) {
    // reader 对象
    var host = e.target;
    // 读取的文件内容
    var data = host.result;
    // 错误对象
    var error= host.error;
    // 错误消息
    var errorMsg;

    // 二进制字节数组
    var rawBinary;
    // 内存图片
    var memImg;
    // 图片 mime type
    var mimeType;

    if (error != null) {
      switch (error.code) {
        case error.NOT_FOUND_ERR:
          errorMsg = 'File not found!';
          break;
        case error.SECURITY_ERR:
          errorMsg = 'Security issue with file!';
          break;
        case error.NOT_READABLE_ERR:
          errorMsg = 'File could not be read!';
          break;
        case error.ENCODING_ERR:
          errorMsg = 'Encoding error!';
          break;
        default:
          errorMsg = 'Unknown issue!';
      };
      throw new Error(errorMsg);
    } else {
      // 检测文件类型必须为图片
      mimeType = file.type;
      if (!/^image\/.+/i.test(mimeType)) {
        throw new Error('请选择图片');
      }

      // 载入内存图片，根据配置压缩图片
      memImg = new Image();
      memImg.onload = function() {
        // 获取选择的图片的方向信息
        rawBinary = blobutil.base64ToArrayBuffer(data);
        var tags = EXIF.readFromBinaryFile(rawBinary.buffer);
        var orientation = tags.Orientation || 1;

        // 配置参数
        var opts = Object.create(options || {});
        var optsQuality = opts.quality || 80;
        var optsSize = opts.size || 640;
        var optsCb = opts.callback;


        // 原始图尺寸
        var iw = this.naturalWidth || this.width;
        var ih = this.naturalHeight || this.height;
        // 原始图长边大小
        var lss = iw > ih ? iw : ih;

        // 压缩图尺寸
        var cw;
        var ch;
        var cr;

        // 画布
        var canvas;
        var ctx;
        var subsampled;
        var d;
        var tmpCanvas;
        var tmpCtx;
        var vertSquashRatio;
        var dx;
        var dy;
        var dw;
        var dh;
        var sx;
        var sy;
        var sw;
        var sh;
        var dataURL;
        var imageData;
        var jpegURL;
        var doSquash = mimeType === 'image/jpeg';

        if (optsSize < lss) {
          // 指定的大小比原图小，计算长边的缩放比例，从而计算出短边的大小
          if (iw > ih) {
            cw = optsSize;
            // 向左移动 0 位的作用是转换为整数
            ch = (ih * cw / iw) << 0;
          } else {
            ch = optsSize;
            // 向左移动 0 位的作用是转换为整数
            cw = (iw * ch / ih) << 0;
          }
        } else {
          // 指定的大小比原图大，则使用原图尺寸压缩
          cw = iw;
          ch = ih;
        }


        // 根据图片方向信息设置画布宽高，变换画布坐标系
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        ctx.save();
        transformCoordinate(canvas, ctx, cw, ch, orientation);

        // 图片二次抽样处理
        subsampled = detectSubsampling(this);
        if (subsampled) {
          iw /= 2;
          ih /= 2;
        }
        // 超大图片分块处理
        // 将一幅大图分成若干个小块绘制到目标画布上
        // 每个块的大小为 1024 * 1024
       
        d = 1024;
        tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = tmpCanvas.height = d;
        tmpCtx = tmpCanvas.getContext('2d');
        vertSquashRatio = doSquash ? detectVerticalSquash(this, iw, ih) : 1;
        sy = 0;
        // 分割块循环
        while (sy < ih) {
          // 计算分割块高
          sh = sy + d > ih ? ih - sy : d;
          sx = 0;
          while (sx < iw) {
            // 计算分割块宽
            sw = sx + d > iw ? iw - sx : d;
            // 清空临时画布上的所有内容
            tmpCtx.clearRect(0, 0, d, d);
            // 将整个源图绘制到临时画布上的指定位置，通过指定负坐标将不是当前块的内容绘制到临时画布以外，从而
            // 画布以内的区域就是当前块
            tmpCtx.drawImage(this, -sx, -sy);
            // 当前块绘制到目标画布上的 x 轴的指定位置(如果有缩放进行缩放)
            dx = Math.floor(sx * cw / iw);
            // 当前块绘制到目标画布上的宽(如果有缩放进行缩放)
            dw = Math.ceil(sw * cw / iw);
            // 当前块绘制到目标画布上的 y 轴的指定位置(如果有缩放进行缩放，同时处理垂直压扁比例)
            dy = Math.floor(sy * ch / ih / vertSquashRatio);
            // 当前块绘制到目标画布上的高(如果有缩放进行缩放，同时处理垂直压扁比例)
            dh = Math.ceil(sh * ch / ih / vertSquashRatio);
            // 绘制当前块到目标画布上的指定位置
            ctx.drawImage(tmpCanvas, 0, 0, sw, sh, dx, dy, dw, dh);
            sx += d;
          }
          sy += d;
        }
        ctx.restore();
        tmpCanvas = tmpCtx = null;

        // 导出压缩后的图片数据
        dataURL = canvas.toDataURL('image/jpeg', optsQuality / 100);

        if (optsCb) {
          optsCb(dataURL);
        }
      };
      memImg.onerror = function() {
        throw new Error('不支持' + mimeType + '格式');
      };
      memImg.src = data;
    }
  };
    if (window.wx && typeof file === 'string' && file.indexOf('data:image') === 0) {
        try {
            file = blobutil.base64ToArrayBuffer(file);
        } catch(e) {}
        file = blobutil.Blob([file], {
            type: 'image/jpeg'
        });
    }
  reader.readAsDataURL(file);
}

var compress = (function() {
  if (ios) {
    return iosCompress;
  }
  return androidCompress;
})();

export default compress;
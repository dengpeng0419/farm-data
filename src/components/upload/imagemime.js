// 获取图片的 mimetype
// algorithm come from https://mimesniff.spec.whatwg.org/#matching-an-image-type-pattern

var IMAGES_PATTERNS = [
  {
    "bytePattern": [0x00, 0x00, 0x01, 0x00],
    "patternMask": [0xff, 0xff, 0xff, 0xff],
    "imageType": "image/x-icon"
  },
  {
    "bytePattern": [0x00, 0x00, 0x02, 0x00],
    "patternMask": [0xff, 0xff, 0xff, 0xff],
    "imageType": "image/x-icon"
  },
  {
    "bytePattern": [0x42, 0x4d],
    "patternMask": [0xff, 0xff],
    "imageType": "image/bmp"
  },
  {
    "bytePattern": [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
    "patternMask": [0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
    "imageType": "image/gif"
  },
  {
    "bytePattern": [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
    "patternMask": [0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
    "imageType": "image/gif"
  },
  {
    "bytePattern": [0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50, 0x56, 0x50],
    "patternMask": [0xff, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
    "imageType": "image/webp"
  },
  {
    "bytePattern": [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
    "patternMask": [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
    "imageType": "image/png"
  },
  {
    "bytePattern": [0xff, 0xd8, 0xff],
    "patternMask": [0xff, 0xff, 0xff],
    "imageType": "image/jpeg"
  }
];

function getImgMimeType(sequence) {

  // sequence 为图片字节数组
  var sequenceLen = sequence.length;
  // 返回图片类型
  var retType = null;

  // 遍历图片模式，检测文件类型
  for (var i = IMAGES_PATTERNS.length - 1; i >= 0; i--) {
    // 当前文件模式
    var cur = IMAGES_PATTERNS[i];
    // 当前文件头模式
    var bp = cur.bytePattern;
    // 当前文件头模式掩码，用于确定文件签名字节
    var pm = cur.patternMask;
    var length = bp.length;

    // 如果文件的字节数还没有模式的长度长，说明不是一个有效的该模式文件，继续检查下一个模式
    if (sequenceLen < length) {
      continue;
    }

    // 循环检查文件头的内容，确定文件类型
    for (var j = 0; j < length; j++) {
      // 只有当文件头字节序列中对应位置的掩码为 0xff 时，才确定是文件签名字节
      if (pm[j] !== 0xff) {
        continue;
      }
      // 判断当前文件头字节序列是否与指定模式相匹配
      if (bp[j] !== sequence[j]) {
        break;
      }
    }

    if (j >= length) {
      return (retType = cur.imageType);
    }
    
  }
  return retType;
}

module.exports = getImgMimeType;
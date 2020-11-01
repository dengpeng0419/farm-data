// Blob 工具类

/**
 * Create a blob builder even when vendor prefixes exist
 */
var BlobBuilder = global.BlobBuilder
  || global.WebKitBlobBuilder
  || global.MSBlobBuilder
  || global.MozBlobBuilder;

/**
 * Check if Blob constructor is supported
 */
var blobSupported = (function() {
  try {
    var a = new Blob(['hi']);
    return a.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if Blob constructor supports ArrayBufferViews
 * Fails in Safari 6, so we need to map to ArrayBuffers there.
 */
var blobSupportsArrayBufferView = blobSupported && (function() {
  try {
    var b = new Blob([new Uint8Array([1,2])]);
    return b.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if BlobBuilder is supported
 */
var blobBuilderSupported = BlobBuilder
  && BlobBuilder.prototype.append
  && BlobBuilder.prototype.getBlob;


/**
 * Helper function that maps ArrayBufferViews to ArrayBuffers
 * Used by BlobBuilder constructor and old browsers that didn't
 * support it in the Blob constructor.
 */
function mapArrayBufferViews(ary) {
  for (var i = 0; i < ary.length; i++) {
    var chunk = ary[i];
    if (chunk.buffer instanceof ArrayBuffer) {
      var buf = chunk.buffer;

      // if this is a subarray, make a copy so we only
      // include the subarray region from the underlying buffer
      if (chunk.byteLength !== buf.byteLength) {
        var copy = new Uint8Array(chunk.byteLength);
        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
        buf = copy.buffer;
      }

      ary[i] = buf;
    }
  }
}

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  mapArrayBufferViews(ary);

  for (var i = 0; i < ary.length; i++) {
    bb.append(ary[i]);
  }

  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
};

function BlobConstructor(ary, options) {
  !blobSupportsArrayBufferView && mapArrayBufferViews(ary);
  return new Blob(ary, options || {});
};

var BlobHook = (function() {
  if (blobSupported) {
    return BlobConstructor;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return null;
  }
})();






// 转换 base64 字符串到二进制字符串
function base64ToBinaryString(b64s) {
  return window.atob(b64s.split(',')[1]);
}

// 转换 base64 字符串到字节数组
function base64ToArrayBuffer(b64s) {
  var binaryString = base64ToBinaryString(b64s);
  var len = binaryString.length;
  var buf = new ArrayBuffer(len);
  var view = new Uint8Array(buf);
  for (var i = 0; i < len; i++) {
    view[i] = binaryString.charCodeAt(i);
  }
  return view;
}





module.exports = {
  Blob: BlobHook,
  // 转换 base64 字符串到二进制字符串
  base64ToBinaryString: base64ToBinaryString,
  // 转换 base64 字符串到字节数组
  base64ToArrayBuffer: base64ToArrayBuffer
};
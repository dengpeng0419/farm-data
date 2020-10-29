### 前端H5基于canvas的图片压缩

#### 用法
```
var compressimg = require('compressimg');
compressimg(file, {
  size: 640,
  quality: 80,
  cb: function(dataurl) {
	var image = new Image();
	image.src = dataurl;
  }
});
```
- file    为从 input file 控件中选择的文件对象
- size    压缩后的图片大小，按长边等比例缩放至 size 指定的大小
- quality 为图片压缩质量
- cb      为压缩图片成功后的回调函数，参数`dataurl`为压缩后的图片的`data:image/jpeg,base64,...`

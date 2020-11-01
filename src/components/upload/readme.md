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
- size    为源图压缩后长边的大小，短边按比例自动计算
- quality 为图片压缩质量
- cb      为压缩图片成功后的回调函数，参数`dataurl`为压缩后的图片的`data:image/jpeg,base64,...`
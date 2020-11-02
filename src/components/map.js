export function BMapGL(ak) {
  return new Promise(function(resolve, reject) {
    window.init = function() {
      resolve(BMapGL)
    }
    let body = document.getElementsByTagName('body')[0]
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `http://api.map.baidu.com/api?v=3.0&type=webgl&ak=${ak}&callback=init`
    script.onerror = reject
    body.appendChild(script)
  })
}
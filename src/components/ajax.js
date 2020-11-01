import axios from 'axios'

const CODE_ENV = process.env.CODE_ENV;
console.log(process.env)

const ajax = function(opts) {
  const FormData = Object.prototype.toString.call(opts.data) === '[object FormData]';
  const protocol = process.env.URL.api.indexOf('http') === -1 ? location.protocol : '';
  const apiDomain = opts.customUrl ? process.env.URL.static : process.env.URL.api;
  const defaults = {
    responseType: 'json',
    method: 'post',
    baseURL: CODE_ENV === 'development' ? '/' : protocol + apiDomain,
    url: '',
    data: {},
    timeout: 30000,
    // withCredentials: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    transformResponse: [function(data) {
      return data;
    }]
  };
  opts = Object.assign(defaults, opts);

  const callbackUrl = opts.callbackUrl || location.href;
  // console.error('callbackUrl:' + callbackUrl);

  // adTag 报送
  // let adtag = sessionStorage.getItem('tbf_adtag') || 'JDJR';
  // if (!FormData) {
  //   opts.data.adTag = adtag;
  // } else {
  //   opts.data.append('adTag', adtag);
  // }

  // container 报送
  // if (!FormData) {
  //   opts.data.container = 'WEB';
  // } else {
  //   opts.data.append('container', 'WEB')
  // }

  if (opts.type) {
    opts.method = opts.type;
    delete opts.type;
  }

  if (opts.dataType) {
    opts.responseType = opts.dataType;
    delete opts.dataType;
  }

  // if (opts.data.channelCode || opts.data.channelId) {
  //   sessionStorage.setItem('channelCode', opts.data.channelCode || opts.data.channelId);
  // }

  if (CODE_ENV === 'development') {
    console.log(JSON.stringify(opts.data));
    console.log('%c' + opts.url, 'color: #207928');
  }

  // convert处理
  // if (CODE_ENV != 'production' && opts.data.ssl) {
  //   opts.data.ssl = false
  // }

  return new Promise((resole, reject) => {
    axios(opts).then(res => {
      let json = res.data || {};

      if (CODE_ENV === 'development') {
        console.log(JSON.stringify(json, null, 2));
      }

      if (typeof json === 'string') {
        json = JSON.parse(json) || {}
      }

      if (json.code === 0) {
        // convert处理
        resole(json.data);
      }
      // 跳转实名
      else if (json.code === -4) {
        location.href = `${json.data.redirect}&directReturnUrl=${encodeURIComponent(callbackUrl)}`;
      }
      // 未登录
      else if (json.code === -5) {
        // 1是登陆状态  2 otp鉴权方式未登陆状态  3超级账户方式未登陆状态
        if (json.resultMsg && json.resultMsg.code === '3') {
          // 超级账户登录
          this.$router.replace({
            name: 'Login',
            query: {
              returnUrl: callbackUrl
            }
          })
          return;
        }
        if (opts.onLogin) {
          // 2 otp鉴权方式未登陆状态，登录拦截处理，自定义处理
          opts.onLogin();
          return;
        }
        this.$router.replace({
          name: 'Error',
          params: {
            code: '505'
          }
        })
      }
      // 普通跳转
      else if (json.code === -6) {
        if (json.data.redirect.indexOf('code=505') > -1) {
          this.$router.replace({
            name: 'Error',
            params: {
              code: '505'
            }
          })
        } else {
          window.location.replace(json.data.redirect);
        }
      }
      // 失败
      else {
        const resultMsg = json.resultMsg || {};
        // 银行维护，code=-1,code='CHANNEL_MAINTAIN'
        if (resultMsg.code === 'CHANNEL_MAINTAIN') {
          this.$router.replace({
            name: 'Error',
            params: {
              code: 'none'
            }
          })
          return;
        }
        reject({
          code: resultMsg.code || '',
          msg: resultMsg.msg || '哎哟，出错了～'
        })
      }
    }).catch(err => {
      if (CODE_ENV === 'development') {
        console.log(err.message);
      }
      const res = err.response || {};
      let msg = err.message ? err.message : (res.statusText || '');
      const code = res.status || '';

      if (err.code && err.code === 'ECONNABORTED') {
        msg = '系统在开小差，请稍后再试.';
      } else if (err.message === 'Network Error') {
        msg = '连接似乎有问题，请检查网络.';
      } else {
        msg = err.msg;
      }
      reject({
        code: code,
        msg: msg
      })
    })
  })
};

export default ajax;

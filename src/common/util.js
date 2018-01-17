function toDouble (iNum) {
  iNum = parseInt(iNum)
  return iNum > 9 ? '' + iNum : '0' + iNum
}
export default {
  formatDate (oDate, opt) {
    opt = opt || 'yyyy-MM-dd'
    if (!oDate) {
      oDate = new Date()
    } else if (typeof oDate === 'string') {
      let l = oDate.length
      oDate = new Date(oDate)
      l === 10 && oDate.setHours(0)
    }
    let year = oDate.getFullYear()
    let month = oDate.getMonth() + 1
    let date = oDate.getDate()
    let hour = oDate.getHours()
    let minute = oDate.getMinutes()
    let second = oDate.getSeconds()
    let milli = oDate.getMilliseconds()
    let format = opt
    format = format.replace(/[yy]+/ig, function (math) {
      return (year + '').substring(4 - math.length)
    })
    format = format.replace(/M+/g, function (math) {
      return math.length === 2 ? toDouble(month) : month
    })
    format = format.replace(/d+/ig, function (math) {
      return math.length === 2 ? toDouble(date) : date
    })
    format = format.replace(/h+/ig, function (math) {
      return math.length === 2 ? toDouble(hour) : hour
    })
    format = format.replace(/m+/g, function (math) {
      return math.length === 2 ? toDouble(minute) : minute
    })
    format = format.replace(/s+/ig, function (math) {
      return math.length === 2 ? toDouble(second) : second
    })
    return format
  },
  // json转list
  toList (obj) {
    let list = []
    for (let key in obj) {
      list.push({ id: key, name: obj[key] })
    }
    return list
  },
  toUrl (url) {
    let opt = null
    let nowW = window
    // 不传参数据
    if (arguments.length === 0) {
      nowW.location.href = nowW.location.href
      return
    }
    if (arguments.length === 1) {
      if ( typeof url === 'object') {
        opt = url
        url = opt.url
      }
    }
    opt = opt || {}
    let w = opt.win || nowW
    let action = opt.action
    switch (action) {
      case 'new':
        w.open(url, '_blank')
        break
      case 'replace':
        w.location.replace(url)
        break
      case 'replaceState':
        window.history.replaceState('', '', url)
        break
      default:
        w.location.href = url
        break
    }
  },
  // 格式化url
  formatUrl (oOption, url) {
    let origin = window.location.origin
    let absoluteUrl = origin + url
    oOption = oOption || {}
    let i = absoluteUrl.indexOf('#')
    let sUrl = absoluteUrl.substring(0, i === -1 ? absoluteUrl.length : i)
    let sHash = i === -1 ? '' : absoluteUrl.substring(i)
    for (let attr in oOption) {
      let re = new RegExp('([\\?|&]' + attr + '=)[^&]*', 'igm')
      if (re.test(sUrl)) {
        sUrl = sUrl.replace(re, '$1' + encodeURI(oOption[attr]))
      } else {
        sUrl = sUrl.replace(/(\?+|&+)$/, '')
        let and = sUrl.indexOf('?') === -1 ? '?' : '&'
        sUrl += and + attr + '=' + oOption[attr]
      }
    }
    return sUrl + sHash
  },
  // 导出文件
  exportFiles (url) {
    let oIfm = document.createElement('iframe')
    oIfm.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;z-index:-99;opacity:0;'
    // onload事件一般不管用，下载文件时chrome不触发
    oIfm.onload = function () {
      let I = this
      setTimeout(function () {
        I.parentNode && I.parentNode.removeChild(I)
      }, 5000)
    }
    oIfm.setAttribute('src', url)
    document.body.appendChild(oIfm)
  },
  isArray (object) {
    return object && typeof object === 'object' &&
    Array == object.constructor
  },
  findIndex (list, obj) {
    for (let i = 0; i < list.length; i++) {
      if (list[i] == obj) {
        return i
      }
    }
    return -1
  }
}

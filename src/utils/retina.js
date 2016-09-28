let doc = window.document
let docEl = doc.documentElement
let viewport = doc.querySelector('meta[name="viewport"]')

let dpr, scale, timer

let isAndroid = navigator.appVersion.match(/android/gi)
let isIOS = navigator.appVersion.match(/iphone|ipod|ipad/gi) && !isAndroid

const DESIGN_WIDTH = 750

if (isIOS) {
  if (window.devicePixelRatio >= 3) {
    dpr = 3
  } else if (window.devicePixelRatio >= 2) {
    dpr = 2
  } else {
    dpr = 1
  }
} else {
  dpr = 1
}

scale = 1 / dpr

docEl.setAttribute('data-dpr', dpr)
console.log(docEl.getAttribute('data-dpr'))

if (!viewport) {
  viewport = doc.createElement('meta')
  viewport.setAttribute('name', 'viewport')
  viewport.setAttribute('content', `initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no`)
  docEl.firstElementChild.appendChild(viewport)
}

if (doc.readyState === 'complete') {
  doc.body.style.fontSize = 12 * dpr + 'px'
} else {
  doc.addEventListener('DOMContentLoaded', function (e) {
    doc.body.style.fontSize = 12 * dpr + 'px'
  }, false)
}

refreshRem()

function refreshRem (){
  let width = docEl.getBoundingClientRect().width
  if (width / dpr > DESIGN_WIDTH) {
    width = DESIGN_WIDTH * dpr
  }
  let rem = width / 10
  docEl.style.fontSize = rem + 'px'
}

window.addEventListener('resize',() => {
  clearTimeout(timer)
  timer = setTimeout(refreshRem, 300)
}, false)
window.addEventListener('pageshow',(e) => {
  if (e.persisted) {
    clearTimeout(timer)
    timer = setTimeout(refreshRem, 300)
  }
}, false)

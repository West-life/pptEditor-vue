/**
 * create by chuchur
 * author: chuchur /chuchur@qq.com
 * date: 2017-07-18 14:21:48
 * 画板历史记录
 */

let history = {}
let h = history

h.hisIndex = -1

h.canvas = ''

h.histemp = []

h.init = (canvas) => {
  h.canvas = canvas
  h.histemp = []
  h.hisIndex = -1
}
h.update = (canvas) => {
  if (h.histemp[h.histemp.length] !== canvas) {
    h.histemp.push(canvas)
    h.hisIndex = h.histemp.length - 1
  }
  if (h.histemp.length > 10) {
    h.histemp.splice(0, h.histemp.length - 10)
  }
}

h.undo = () => {
  if (h.hisIndex === 0 || h.histemp.length === 0) return
  h.hisIndex -= 1
  h.set()
}

h.redo = () => {
  if (h.hisIndex === h.histemp.length || h.histemp.length === 0) return
  h.hisIndex += 1
  h.set()
}

h.set = () => {
  let json = h.histemp[h.hisIndex]
  json && h.canvas.loadFromJSON(json, () => {
    h.canvas.renderAll()
  })
}

h.clear = () => {
  history.histemp = []
  h.hisIndex = -1
}

export default history

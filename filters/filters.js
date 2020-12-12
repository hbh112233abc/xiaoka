// 0 -> 中文
export const parse_str = (val, dir) => {
  let name = ''
  for (let i = 0, j = dir.length; i < j; i++) {
    if ('' + dir[i].code === '' + val) {
      name = dir[i].name
      break
    }
  }
  return name
}

// 日期转 yyyy-MM-dd
export const parse_date = (val, t) => {
  if (val == null || val === '') {
    return ''
  }
  const date = new Date(val) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
  const h = ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  let result = Y + M + D
  if (t === 0) {
    result = Y + M + D + h + m + s
  }
  return result
}
/**
 * @author hujiangjun
 * @createTime 2020-06-17
 * @description 封装element-ui 公共组件
 */

/**
 * element-ui 消息确认框
 * @example https://element.eleme.cn/#/zh-CN/component/message-box#dan-du-yin-yong
 * @param {*} _ this 指向
 * @param {*} msg 提示内容
 * @param {*} titText 提示标题
 * @param {*} confirmButtonText  确认按钮文字
 * @param {*} cancelButtonText  取消按钮文字
 * @param {*} type 提示类型 success/info/warning/error
 * @param {*} cb 确认事件
 * @param {*} cancel 取消事件
 */
export const confrim = (_, {
  msg,
  titText = '提示',
  confirmButtonText = '确定',
  cancelButtonText = '取消',
  type = 'warning'
}, cb, cancel) => {
  _.$confirm(msg, titText, {
    confirmButtonText,
    cancelButtonText,
    type
  }).then(() => {
    cb && cb()
  }).catch(() => {
    cancel && cancel()
  })
}


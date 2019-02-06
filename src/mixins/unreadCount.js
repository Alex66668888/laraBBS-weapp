import wepy from 'wepy'

export default class unreadCount extends wepy.mixin {
  data = {
    // 轮询
    interval: null,
    // 未读消息数
    unreadCount: 0
  }
  // 页面显示
  onShow() {
    this.updateUnreadCount()
    this.interval = setInterval(() => {
      this.updateUnreadCount()
    }, 30000)
  }
  // 页面隐藏
  onHide() {
    // 关闭轮询
    clearInterval(this.interval)
  }
  // 设置未读消息数
  updateUnreadCount() {
    // 从全局获取未读消息数
    this.unreadCount = this.$parent.globalData.unreadCount
    this.$apply()

    if (this.unreadCount) {
      // 设置 badge (为 TabBar 某一项的右上角添加文本)
      wepy.setTabBarBadge({
        index: 1, // 参数 index TabBar 的哪一项，从左边算起
        text: this.unreadCount.toString() // 参数 text 是要设置的文本
      })
    } else {
      // 移除 badge
      wepy.removeTabBarBadge({
        index: 1
      })
    }
  }
}

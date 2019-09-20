// index 頁面附屬 js

// import module
// =================================
import { showSelected, setOddEven, getTotalAmount } from './lib.js'


// 執行序
// =================================

// 此窗口為 OAuth pop-up 導入時，關閉
if (window.name === 'OAuth') {
  // 父視窗重新導向
  window.opener.location.replace('/index')
  window.close()
}


// 刪除確認，僅監聽父層避免產生過多 listener
$('.data-plane').submit(e => {
  e.preventDefault()

  if (e.target.matches('.del-form')) {
    const msg = '這個操作無法被復原，確定要刪除嗎?'
    if (confirm(msg)) { e.target.submit() }
  }
})


// Filter
$('#filter').on('input', e => {
  const keyword = e.target.value

  // 只顯示被選中的 category
  showSelected(keyword)

  // 重設 visible record 之 classList
  setOddEven()

  // 計算總金額，顯示於頁面
  const totalAmount = getTotalAmount()
  $('#sum').html(totalAmount)
})
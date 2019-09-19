// index 頁面附屬 js

// 刪除確認
// 僅監聽父層避免產生過多 listener
$('.data-plane').submit(e => {
  e.preventDefault()

  if (e.target.matches('.del-form')) {
    const msg = '這個操作無法被復原，確定要刪除嗎?'
    if (confirm(msg)) { e.target.submit() }
  }
})
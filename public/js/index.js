// index 頁面附屬 js

// 刪除確認
// =================================

// 僅監聽父層避免產生過多 listener
$('.data-plane').submit(e => {
  e.preventDefault()

  if (e.target.matches('.del-form')) {
    const msg = '這個操作無法被復原，確定要刪除嗎?'
    if (confirm(msg)) { e.target.submit() }
  }
})


// Filter
// =================================
$('#filter').on('input', e => {
  const keyword = e.target.value

  // 只顯示被選中的 category
  $('[data-cate]').each( (index, elem) => {
    const category = elem.dataset.cate

    // elem.hidden 帶 false 將導致迭代中斷，故改用 jquery
    if (keyword === 'all') return $(elem).attr('hidden', false)
    
    if (category !== keyword) { elem.hidden = true }
    if (category === keyword) { elem.hidden = false }
  })

  // 重設 visible record 之 UI style
  let times = 1
  $('[data-cate]:visible').each( (index, elem) => {
    elem.classList.remove('odd')

    if (times % 2 === 1) { elem.classList.add('odd') }
    times++
  })

  // 計算總金額
  let sum = 0
  $('[data-cate]:visible .amount').each( (index, elem) => {
    sum += (+elem.textContent)
  })

  $('#sum').html(sum)
})
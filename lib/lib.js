// lib lib.js

// ==============================

/**
 * 依照 category 取得 font-awesome icon 名稱
 *
 * @params { Object } [mongoose doc] 
 */

const categoryMap = {
  '家居物業': 'fa-home',
  '交通出行': 'fa-shuttle-van',
  '休閒娛樂': 'fa-grin-beam',
  '餐飲食品': 'fa-utensils',
  '其他': 'fa-pen'
}

function getCategoryIcon(record) {
  for (const key in categoryMap) {
    if (record.category === key) record.category = categoryMap[key]
  }
}


// export
// ==============================

module.exports = { getCategoryIcon }
// lib lib.js

// ==============================

/**
 * category 對照 font-awesome CSS 名稱
 * @type {Object} 名稱對照表
 * @property {Category Name}
*/
const categoryMap = {
  '家居物業': 'fa-home',
  '交通出行': 'fa-shuttle-van',
  '休閒娛樂': 'fa-grin-beam',
  '餐飲食品': 'fa-utensils',
  '其他': 'fa-pen'
}

/**
 * 將 category 屬性內容，換成 font-awesome icon 名稱
 * 
 * @param {Object} [record] Mongoose Document
 */
function getCategoryIcon(record) {
  for (const key in categoryMap) {
    if (record.category === key) record.category = categoryMap[key]
  }
}


// export
// ==============================

module.exports = { getCategoryIcon, categoryMap }
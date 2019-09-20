// models categoryList.js

// record category to font-awesome icon map
// ==============================

/**
 * category 對照 font-awesome CSS 名稱
 * @type {Object} 名稱對照表
 * @property {String} 類別名稱 
*/
const categoryMap = {
  '家居物業': 'fa-home',
  '交通出行': 'fa-shuttle-van',
  '休閒娛樂': 'fa-grin-beam',
  '餐飲食品': 'fa-utensils',
  '其他': 'fa-pen'
}


// tools
// ==============================

/**
 * 依據 category 屬性值，回傳 font-awesome icon 名稱
 * @param {Object} record mongoose Document
 */
function getCategoryIcon(record) {
  for (const key in categoryMap) {
    if (record.category === key) return categoryMap[key]
  }
}

// export
// ==============================

module.exports = { categoryMap, getCategoryIcon }
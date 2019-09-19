// lib lib.js

// record category tool
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
 * 依據 category 屬性值，回傳 font-awesome icon 名稱
 * @param {Object} record mongoose Document
 */
function getCategoryIcon(record) {
  for (const key in categoryMap) {
    if (record.category === key) return categoryMap[key]
  }
}


// 檢查註冊表單
// ==============================

const User = require('../models/user.js')

/**
 * 檢查註冊表單，回傳 error message (String)
 * @param {Object} input user input
 */
async function checkSignUp(input) {
  // 確認未填
  if (!input.email || !input.password) return 'Email 或 Password 不得為空'

  // 確認密碼二次輸入
  if (input.password !== input.password2) return '密碼不一致'

  // 確認已註冊
  let msg = ''
  await User.findOne({ email: input.email }, (err, user) => {
    if (user) { msg = '此 Email 已被使用' }
  })

  return msg
}


// mongoose Query 輔助工具
// ==============================

/**
 * 生成 Query Object by owner's id
 * @param {Object} req browser request
 */
function getOwnerId(req) {
  return { _id: req.params.id, userId: req.user.id }
}

// export
// ==============================

module.exports = { getCategoryIcon, categoryMap, checkSignUp, getOwnerId }
// models/lib lib.js

const User = require('../user.js')
const { categoryMap } = require('../category.js')

// 檢查註冊表單
// ==============================

/**
 * 檢查註冊表單，回傳 error message { Array }
 * @param {Object} input user input
 */
async function checkSignUp(input) {
  // 確認未填
  if (!input.email || !input.password) return ['Email 或 Password 不得為空']

  // 確認密碼二次輸入
  if (input.password !== input.password2) return ['密碼不一致']

  // 確認已註冊
  let msg = []
  await User.findOne({ email: input.email }, (err, user) => {
    if (user) { msg.push('此 Email 已被使用') }
  })

  return msg
}

// 檢查 record new and edit 表單
// ==============================

/**
 * 檢查 record 表單，回傳 error message { Array }
 * @param {Object} input user input
 */
function checkNewEdit(input) {
  if (Object.values(input).some(val => !val)) return ['所有欄位皆為必填']

  const msg = []

  // 檢查 date { yyyy-mm-dd }
  const pattern = /^[1-9]\d{3}-\d{2}-\d{2}/
  if (!pattern.test(input.date)) msg.push('日期必須符合格式 yyyy-mm-dd')

  // 檢查 category
  const cateList = Object.keys(categoryMap)
  if (!cateList.some(cate => cate === input.category)) msg.push('此分類不存在')

  // 檢查 amount
  if (Number.isNaN(+input.amount)) msg.push('金額必須為數字')

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

module.exports = { checkSignUp, checkNewEdit,getOwnerId }
// models/lib lib.js

const User = require('../user.js')


// 檢查註冊表單
// ==============================

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

module.exports = { checkSignUp, getOwnerId }
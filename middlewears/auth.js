const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');
function auth(req, res, next) {
  //берем такен из запроса
  const token = req.cookies.token;

  try {
    //сверяем токен
    const verifyRes = jwt.verify(token, JWT_SECRET);
    //для последующих обработчиков добавляем информацию что это за пользователь, в запросе создаем объект user
    req.user = { email: verifyRes.email };
    next();
  } catch (e) {
    res.redirect('/login');
    console.log(e.message);
  }
}

module.exports = auth;

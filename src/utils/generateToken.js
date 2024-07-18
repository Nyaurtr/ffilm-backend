const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    { username: user.username, role: user.role, _id: user._id },
    'BackendHell',
    { expiresIn: "2s" }
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    { username: user.username, role: user.role, _id: user._id },
    'BackendHellRefresh'
  );
};

module.exports = { generateAccessToken, generateRefreshToken };

const jwt = require('jsonwebtoken');
require('dotenv').config();
const Token = require('../models/token')

const generateToken = (userId, userPass) => {
    const payload = {
        userId: userId,
        userPass: userPass
    };

    const options = {expiresIn: process.env.EXPIRES_IN};
    const token = jwt.sign(payload, process.env.SECRET, options);
    saveToken(token, userId);
    return token;
};

const saveToken = (token, userId) => {
   let tokenCreationTime = new Date();
   let tokenExpirationTime = new Date();
   Token.create({
      token: token,
      userId: userId,
      tokenCreationTime: tokenCreationTime,
      tokenExpirationTime: tokenExpirationTime.setMinutes(tokenExpirationTime.getMinutes() + 5)
   })
   .then(saveToken => console.log(saveToken));
};

const isExpirationToken = async (token) => {
   let isExpiration = false;
   console.log(token);
   await Token.findOne({token: token})
   .exec()
   .then(tokenInfo => {
       let time = new Date();
       console.log(tokenInfo);
       if ((!tokenInfo) || (tokenInfo.tokenExpirationTime < time)){
           isExpiration = true;
           console.log(isExpiration);
       };
   })
   .catch(err => console.log(err));
   return isExpiration;
};

const refreshToken = async (token) => {
   let tokenExpirationTime = new Date()
   await Token.findOneAndDelete({ token: token }, {tokenExpirationTime: tokenExpirationTime.setMinutes(tokenExpirationTime.getMinutes() + 5)})
   .exec()
   .then(newToken => console.log(newToken))
   .catch(err => console.log(err));
};


const removeToken = (token) => {
   Token.deleteOne({ token: token })
   .exec()
   .then(() => console.log('success'))
   .catch(err => console.log(err));
};

const removeAllToken = (token) => {
   let decoded = jwt.decode(token, process.env.SECRET);
   Token.deleteMany({ userID: decoded.userID })
   .exec()
   .then(() => console.log('success'))
   .catch(err => console.log(err));
};


module.exports = {
    generateToken,
    isExpirationToken,
    refreshToken,
    removeToken,
    removeAllToken,
}

const tokenHelper = require('../helper/tokenHelper');

module.exports = async (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        res.status(401).json({ message: 'Token not provided!' });
        return;
    } 

    const token = authHeader.replace('Bearer ', '');

    if (await(tokenHelper.isExpirationToken(token))) { 
        res.status(401).json({ message: 'invalid token or toke expiration time ' });
        return;
    }
    
    await tokenHelper.refreshToken(token);
    res.locals.token = token;
    next();
}
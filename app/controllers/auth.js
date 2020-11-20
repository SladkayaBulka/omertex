const authHelper = require('../helper/authHelper');
const tokenHelper = require('../helper/tokenHelper');

const User = require('../models/user');

const signIn = (req, res) => { 
    const { userId, password } = req.body;
    User.findOne({ userId })
    .exec()
    .then((user) => {
        if(!user) {
            res.status(401).json({ message: 'User does not exist! '});
        }
        const isValid = authHelper.comparePassword(password, user.password);
        if(isValid) {
            const token = tokenHelper.generateToken(user.userId, user.password);
            res.json({ token });
        } else { 
            res.status(401).json({ message: 'Incorrect password' })
        }
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

const signUp = (req, res) => { 
    let userType = authHelper.getTypeUserId(req.body.userId);
    if (!userType) {
        res.status(401).json({ message: 'Undefined usertype!'});
        return 
    } 
    const user = {
        userId: req.body.userId,
        password: req.body.password,
        userType: userType
    }
    User.create(user)
    .then((createUser) => {
        const token = tokenHelper.generateToken(createUser.userId, createUser.password);
           res.json({ token });
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

const logout = (req, res) => { 
    const full = req.params.full;
    if (full) {
        tokenHelper.removeAllToken(res.locals.token);
    } else {
        tokenHelper.removeToken(res.locals.token);
    }
    res.json('success');
}

module.exports = {
    signIn,
    signUp,
    logout
}
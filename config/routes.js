const auth = require('../app/controllers/auth');
const othersApi = require('../app/controllers/othersApi');
const authMiddleware = require('../app/middleware/auth');

module.exports = (app) => {
    //auth
    app.post(
        '/signIn',
        auth.signIn,
    );
    app.post(
        '/signUp',
        auth.signUp,
    );
    app.get(
        '/logout/:full',
        authMiddleware,
        auth.logout,
    );
    //others api
    app.get(
        '/info',
        authMiddleware,
        othersApi.getUsers,
    );
    app.get(
        '/latency',
        authMiddleware,
        othersApi.getResponseTime,
    );
};
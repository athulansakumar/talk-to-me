const jwt = require('jsonwebtoken');

const properties = require('../../app.properties');

var authenticateSockets = async (req,next) => {
    try {
        if (req.handshake.query && req.handshake.query.token){
            var decoded = await jwt.verify(req.handshake.query.token, properties.jwtSecret);
            req.username = decoded.username;
            next();
        } else {
            next(new Error('Authentication error'));
        }
    } catch (e) {
        next(e);
    }
};

module.exports = authenticateSockets;

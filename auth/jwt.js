const passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const db = require("../models");

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    issuer: 'readinglist-api',
    audience: 'readinglist-react-gui'
};

async function verifyCallback(jwt_payload, done) {
    let user, err;
    try {
        user = await db.User.findById(jwt_payload.sub);
    } catch (error) {
        err = error
    }

    if (err) {
        return done(err, false);
    }
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
        // or you could create a new account
    }
}

module.exports = function () {
    passport.use(new JwtStrategy(opts, verifyCallback));
}
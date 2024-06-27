const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person')
passport.use(new LocalStrategy(async(username, password, done) => {
    //authenticatio
    try {
        // console.log("Received credential: ", username, password);
        const user = await Person.findOne({ username: username })
        if (!user) {
            return done(null, false, { message: "Incorrect Username" })
        }
        const isPassword = user.comparePassword(password);
        if (isPassword) {
            return done(null, user);
        } else {
            return done(null, false, { message: "Incorrect password" })
        }
    } catch (error) {
        return done(error);
    }
}))

module.exports = passport;
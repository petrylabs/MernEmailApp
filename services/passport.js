const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    console.log("serializing user");
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log("deserializing user");
   User.findById(id)
       .then(user => {
           done(null, user);
       })
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({googleId: profile.id})
                .then((existingUser) => {
                    if(existingUser) {
                        console.log("This users already exists => ", profile.id);
                        done(null, existingUser);
                    } else {
                        new User({ googleId: profile.id })
                            .save()
                            .then( user => {
                                console.log("this is a new user!");
                                done(null, user)
                            });
                    }

                });
        }
    )
);
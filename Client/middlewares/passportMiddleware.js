const User = require("../models/userModel");
var LocalStrategy = require("passport-local").Strategy;

const isValidPassword = (password_1, password_2) => {
  return password_1 === password_2;
};

module.exports = passport => {
  passport.serializeUser((user, done) => {
    console.log("serializing user: ");
    console.log(user);
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
      console.log("deserializing user:", user);
      done(err, user);
    });
  });

  // passport/login.js
  passport.use(
    "login",
    new LocalStrategy(
      {
        passReqToCallback: true
      },
      (req, username, password, done) => {
        // check in mongo if a user with username exists or not
        User.findOne({ username: username }, function(err, user) {
          // In case of any error, return using the done method
          if (err) return done(err);
          console.log(password);

          // Username does not exist, log error & redirect back
          if (!user) {
            console.log("Cannot found " + username + "!");
            return done(
              null,
              false,
              req.flash("usernameWarning", "Account does not exist")
            );
          }

          // User exists but wrong password, log the error
          if (!isValidPassword(user.password, password)) {
            console.log("Invalid Password");
            return done(
              null,
              false,
              req.flash("passwordWarning", "Invalid Password")
            );
          }

          // User and password both match, return user from
          // done method which will be treated like success
          return done(null, user);
        });
      }
    )
  );

  passport.use(
    "signup",
    new LocalStrategy(
      {
        passReqToCallback: true
      },
      (req, username, password, done) => {
        findOrCreateUser = () => {
          // find a user in Mongo with provided username
          User.findOne({ username: username }, (err, user) => {
            if (err) {
              console.log("Error in SignUp: " + err);
              return done(err);
            }
            // already exists
            if (user) {
              console.log("User already exists");
              return done(
                null,
                false,
                req.flash("usernameWarning", "User Already Exists")
              );
            } else if (password.length <= 6) {
              console.log(
                "Length of password must be greater than 6 charactres !"
              );
              return done(
                null,
                false,
                req.flash(
                  "passwordWarning",
                  "Length of password must be greater than 6 charactres !"
                )
              );
            } else {
              // if there is no user with that email create the user
              var newUser = new User();
              newUser.username = username;
              newUser.password = password;
              newUser.email = req.param("email");
              newUser.firstName = req.param("firstName");
              newUser.lastName = req.param("lastName");
              newUser.image =
                "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png";

              // save the user
              newUser.save(err => {
                if (err) {
                  console.log("Error in Saving user: " + err);
                  throw err;
                }

                console.log("User Registration succesful");
                return done(null, newUser);
              });
            }
          });
        };

        // Delay the execution of findOrCreateUser and execute
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
      }
    )
  );
};

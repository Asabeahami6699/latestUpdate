
const AuthStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { LogInCollection } = require('./mongodb');

function initialize(passport) {
  const authenticateAllUsers = async (name, Password, done) => { 
    const user = await LogInCollection.findOne({ name });
    
    if (!user) {
      return done(null, false, { message: 'You are not authorized to access this website' });
    }
  
    try {
      const passwordMatch = await bcrypt.compare(Password, user.Password);
  
      if (!passwordMatch) {
        return done(null, false, { message: 'Wrong details,please check and try again' });
      }
  
      if (user.usertype === 'Superuser' || user.usertype === 'Teller' || user.usertype === 'Administrator'
        || user.usertype === 'Invites'|| user.usertype === 'Costumer Service'|| user.usertype === 'Accountant'
        || user.usertype === 'Operational') {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Error occured during this proccess, retry again' });
      }
    } catch (e) {
      return done(e);
    }
  };
  
  passport.use(new AuthStrategy({ usernameField: 'name' ,passwordField:'Password'}, authenticateAllUsers));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await LogInCollection.findById(id);
    return done(null, user);
  });  
}

module.exports = initialize;

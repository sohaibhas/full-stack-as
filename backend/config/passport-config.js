const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const pool = require('../config/db');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          // Find the user by email
          const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
          const user = result.rows[0];

          if (!user) {
            return done(null, false, { message: 'No user with that email' });
          }

          // Compare passwords
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Serialize user into session
  passport.serializeUser((user, done) => done(null, user.id));

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      const user = result.rows[0];
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};

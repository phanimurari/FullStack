const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User-stateful');

// Google OAuth Strategy

console.log(process.env.GOOGLE_CLIENT_ID, "process.env.GOOGLE_CLIENT_ID")

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    
    if (user) {
      await user.updateLastLogin();
      return done(null, user);
    }
    
    user = await User.findOne({ email: profile.emails[0].value });
    
    if (user) {
      user.googleId = profile.id;
      user.avatar = profile.photos[0].value;
      await user.updateLastLogin();
      return done(null, user);
    }
    
    user = new User({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value,
      provider: 'google'
    });
    
    await user.save();
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/api/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ githubId: profile.id });
    
    if (user) {
      await user.updateLastLogin();
      return done(null, user);
    }
    
    const email = profile.emails?.[0]?.value || `${profile.username}@github.local`;
    user = await User.findOne({ email });
    
    if (user) {
      user.githubId = profile.id;
      user.avatar = profile.photos[0].value;
      await user.updateLastLogin();
      return done(null, user);
    }
    
    user = new User({
      githubId: profile.id,
      name: profile.displayName || profile.username,
      email,
      avatar: profile.photos[0].value,
      provider: 'github'
    });
    
    await user.save();
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

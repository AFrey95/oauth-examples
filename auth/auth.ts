import { Express } from "express";
import { expressjwt } from "express-jwt";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { Strategy as GithubStrategy } from "passport-github2";

import {
  defaultGoogleCallbackURL,
  defaultCallback,
  defaultGoogleAuthURL,
  defaultFacebookCallbackURL,
  defaultFacebookAuthURL,
  defaultTwitterCallbackURL,
  defaultTwitterAuthURL,
  defaultGithubAuthURL,
  defaultGithubCallbackURL,
  defaultScope,
} from "./defaults";
import { AuthOptions } from "./types";

export function auth(app: Express, options: AuthOptions) {
  const { google, facebook, twitter, github } = options;

  app.use(passport.initialize());
  app.use(passport.session());

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("EasyOAuth cannot find JWT_SECRET");
  }

  app.use(
    expressjwt({
      secret: jwtSecret,
      algorithms: ["HS256"],
    })
  );

  !!google && authGoogle(app, options);
  !!facebook && authFacebook(app, options);
  !!twitter && authTwitter(app, options);
  !!github && authGithub(app, options);
}

function noCredentials(provider: String) {
  throw new Error(`EasyOAuth could not find credentials for ${provider}`);
}

function authGoogle(app: Express, options: AuthOptions) {
  const { googleCallback, googleScope } = options;

  const clientID = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (clientID === undefined || clientSecret === undefined) {
    noCredentials("Google");
    return;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL: defaultGoogleCallbackURL,
        proxy: true,
      },
      googleCallback ?? defaultCallback("Google")
    )
  );

  app.get(
    defaultGoogleAuthURL,
    passport.authenticate("google", {
      scope: googleScope ?? defaultScope,
    })
  );

  app.get(
    defaultGoogleCallbackURL,
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );
}

function authFacebook(app: Express, options: AuthOptions) {
  const { facebookCallback, facebookScope } = options;

  const clientID = process.env.FACEBOOK_CLIENT_ID;
  const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;

  if (!clientID || !clientSecret) {
    noCredentials("Facebook");
    return;
  }

  passport.use(
    new FacebookStrategy(
      {
        clientID,
        clientSecret,
        callbackURL: defaultFacebookCallbackURL,
      },
      facebookCallback ?? defaultCallback("Facebook")
    )
  );

  app.get(
    defaultFacebookAuthURL,
    passport.authenticate("facebook", {
      scope: facebookScope ?? defaultScope,
    })
  );

  app.get(
    defaultFacebookCallbackURL,
    passport.authenticate("facebook"),
    (req, res) => {
      res.redirect("/");
    }
  );
}

function authTwitter(app: Express, options: AuthOptions) {
  const { twitterCallback, twitterScope } = options;

  const consumerKey = process.env.TWITTER_CONSUMER_KEY;
  const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    noCredentials("Twitter");
    return;
  }

  passport.use(
    new TwitterStrategy(
      {
        consumerKey,
        consumerSecret,
        callbackURL: defaultTwitterCallbackURL,
      },
      twitterCallback ?? defaultCallback("Twitter")
    )
  );

  app.get(
    defaultTwitterAuthURL,
    passport.authenticate("twitter", {
      scope: twitterScope ?? defaultScope,
    })
  );

  app.get(
    defaultTwitterCallbackURL,
    passport.authenticate("twitter"),
    (req, res) => {
      res.redirect("/");
    }
  );
}

function authGithub(app: Express, options: AuthOptions) {
  const { githubCallback, githubScope } = options;

  const clientID = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientID || !clientSecret) {
    noCredentials("GitHub");
    return;
  }

  passport.use(
    new GithubStrategy(
      {
        clientID,
        clientSecret,
        callbackURL: defaultGithubAuthURL,
        proxy: true,
      },
      githubCallback ?? defaultCallback("GitHub")
    )
  );

  app.get(
    defaultGithubAuthURL,
    passport.authenticate("github", {
      scope: githubScope ?? defaultScope,
    })
  );

  app.get(
    defaultGithubCallbackURL,
    passport.authenticate("github"),
    (req, res) => {
      res.redirect("/");
    }
  );
}

// TODO: Add redirect override option

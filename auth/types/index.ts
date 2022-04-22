export type CallbackFn = (
  accessToken: any,
  refreshToken: any,
  profile: any,
  done: any
) => void;

export type TwitterCallbackFn = (
  token: any,
  tokenSecret: any,
  profile: any,
  done: any
) => void;

// TODO: consider adding URL overrides
export type AuthOptions = {
  google?: boolean;
  googleCallback?: CallbackFn;
  googleScope?: Array<string>;
  facebook?: boolean;
  facebookCallback?: CallbackFn;
  facebookScope?: Array<string>;
  twitter?: boolean;
  twitterCallback?: TwitterCallbackFn;
  twitterScope?: Array<string>;
  github?: boolean;
  githubCallback?: CallbackFn;
  githubScope?: Array<string>;
};

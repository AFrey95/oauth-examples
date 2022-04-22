const baseAuthURL = "/authenticate";

export const defaultGoogleAuthURL = `${baseAuthURL}/google`;
export const defaultFacebookAuthURL = `${baseAuthURL}/facebook`;
export const defaultTwitterAuthURL = `${baseAuthURL}/twitter`;
export const defaultGithubAuthURL = `${baseAuthURL}/github`;

export const defaultGoogleCallbackURL = `${defaultGoogleAuthURL}/done`;
export const defaultFacebookCallbackURL = `${defaultFacebookAuthURL}/done`;
export const defaultTwitterCallbackURL = `${defaultTwitterAuthURL}/done`;
export const defaultGithubCallbackURL = `${defaultGoogleAuthURL}/done`;

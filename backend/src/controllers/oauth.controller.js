import { oauthService } from "../services/oauth.service.js";

export const googleLogin = async (req, res) => {
  try {
    const data = await oauthService.googleLogin();
    res.redirect(data.url);
  } catch (error) {
    res.redirect(`${process.env.CORS_ORIGIN}/auth?error=google_auth_failed`);
  }
};

export const microsoftLogin = async (req, res) => {
  try {
    const data = await oauthService.microsoftLogin();
    res.redirect(data.url);
  } catch (error) {
    res.redirect(`${process.env.CORS_ORIGIN}/auth?error=microsoft_auth_failed`);
  }
};

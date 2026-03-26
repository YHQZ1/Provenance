import { supabase } from "../config/database.js";

export const oauthService = {
  async googleLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.CORS_ORIGIN}/dashboard`,
      },
    });

    if (error) throw error;
    return data;
  },

  async microsoftLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        redirectTo: `${process.env.CORS_ORIGIN}/dashboard`,
        queryParams: {
          tenant: process.env.MICROSOFT_TENANT_ID || "common",
        },
      },
    });

    if (error) throw error;
    return data;
  },
};

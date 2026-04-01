import { supabaseAdmin } from "../config/database.js";

export const authService = {
  async verifyToken(token) {
    return await supabaseAdmin.auth.getUser(token);
  },

  async getOrCreateCompany(user) {
    const { data: existing } = await supabaseAdmin
      .from("companies")
      .select("*")
      .eq("id", user.id)
      .single();

    if (existing) return existing;

    const { data: newCompany, error } = await supabaseAdmin
      .from("companies")
      .insert({
        id: user.id,
        email_id: user.email,
        company_name:
          user.user_metadata?.company_name || user.email?.split("@")[0],
        gst_number: user.user_metadata?.gst_number || null,
        onboarding_completed: false,
      })
      .select()
      .single();

    if (error) throw new Error("Failed to create company profile");
    return newCompany;
  },

  async forgotPassword(email) {
    const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/reset-password`,
    });
    if (error) throw new Error("Failed to send reset email");
    return true;
  },

  async resetPassword(token, newPassword) {
    const {
      data: { user },
      error: verifyError,
    } = await supabaseAdmin.auth.getUser(token);
    if (verifyError || !user) throw new Error("Invalid or expired reset token");

    const { error: updateError } =
      await supabaseAdmin.auth.admin.updateUserById(user.id, {
        password: newPassword,
      });
    if (updateError) throw new Error("Failed to update password");
    return true;
  },
};

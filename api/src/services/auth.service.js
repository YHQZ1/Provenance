import { supabaseAdmin } from "../config/database.js";

export const authService = {
  async getCurrentUser(user) {
    const { data: company } = await supabaseAdmin
      .from("companies")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!company) {
      const { data: newCompany, error } = await supabaseAdmin
        .from("companies")
        .insert({
          id: user.id,
          email_id: user.email,
          company_name: user.user_metadata?.company_name || null,
          gst_number: user.user_metadata?.gst_number || null,
          onboarding_completed: false,
        })
        .select()
        .single();

      if (error) throw error;

      return {
        user,
        company: newCompany,
      };
    }

    return {
      user,
      company,
    };
  },
};
import { supabase, supabaseAdmin } from "../config/database.js";

export const authService = {
  async signup(email, password, companyName, gstNumber) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    if (supabaseAdmin && authData.user) {
      const { error: profileError } = await supabaseAdmin
        .from("companies")
        .insert({
          id: authData.user.id,
          email_id: email,
          company_name: companyName,
          gst_number: gstNumber,
          onboarding_completed: false,
        });

      if (profileError) throw profileError;
    }

    return authData;
  },

  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    const { data: companyData, error: companyError } = await supabase
      .from("companies")
      .select("*")
      .eq("id", data.user.id)
      .single();

    return {
      user: data.user,
      session: data.session,
      company: companyError ? null : companyData,
    };
  },

  async getCurrentUser(userId) {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) throw userError;

    const { data: companyData } = await supabase
      .from("companies")
      .select("*")
      .eq("id", userId)
      .single();

    return {
      user: userData.user,
      company: companyData,
    };
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { message: "Logged out successfully" };
  },
};

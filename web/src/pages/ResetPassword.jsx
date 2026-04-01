import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Handle the hash fragment from Supabase
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get("access_token");
    
    if (accessToken) {
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: hashParams.get("refresh_token")
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      alert("Password updated! Please login with your new password.");
      window.location.href = "/auth";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="max-w-md w-full p-8">
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
        {error && <div className="bg-red-50 p-3 mb-4 text-red-600">{error}</div>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          className="w-full p-3 border rounded mb-4"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
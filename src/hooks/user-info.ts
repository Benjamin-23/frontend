import { API_URL } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useUserProfile = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      const response = await fetch(API_URL + "/user/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    },
  });

  return { data, isLoading, error };
};

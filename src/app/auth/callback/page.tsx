"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { verifyUserAccount } from "@/lib/helpers";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get("access_token");
    const refreshToken = hashParams.get("refresh_token");

    if (accessToken && refreshToken) {
      // check if the user account was created a few seconds ago
      supabase.auth.getUser(accessToken).then(({ data }) => {
        if (data && data.user) {
          verifyUserAccount(accessToken, data.user.user_metadata.name).then(
            (res) => {
              if (res) {
                supabase.auth
                  .setSession({
                    access_token: accessToken,
                    refresh_token: refreshToken,
                  })
                  .then(({ error }) => {
                    if (!error) {
                      router.push("/");
                    }
                  });
              }
            },
          );
        }
      });
    }
  }, [router]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>Alright, kiasi tu...</div>
    </Suspense>
  );
}

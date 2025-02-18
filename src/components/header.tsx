"use client";
import { UserNav } from "@/app/auth/_components/user-nav";
import AccountTopUp from "@/components/account-top-up";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Logo from "./logo";
const Header = () => {
  const { session, isAuthenticating } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session && !isAuthenticating) {
      router.push("/auth");
    }
    if (!isAuthenticating && session) {
      if (!session.user) router.push("/auth");
    }
  }, [session, isAuthenticating, router]);

  return (
    <nav className="py-2 z-10 bg-accent border-b border-accent sticky top-0">
      <div className="container px-2 md:px-0 mx-auto flex justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>
        <div className="account-actions flex gap-3 items-center">
          <AccountTopUp user={session?.user} />
          <UserNav user={session?.user} />
        </div>
      </div>
    </nav>
  );
};

export default Header;

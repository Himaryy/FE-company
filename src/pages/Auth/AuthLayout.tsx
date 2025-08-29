import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

import { Link, Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const { pathname } = useLocation();
  const isSignIn = pathname.includes("sign-in");

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {isSignIn ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {isSignIn
                ? "Enter your email below to login to your account"
                : "Enter your details below to create an account"}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-3">
              {<Outlet />}

              <p className="text-xs text-center">
                {isSignIn ? (
                  <>
                    Don't have an account ? {""}
                    <Link to="/sign-up" className="hover:underline">
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    Already have an account ? {""}
                    <Link to="/sign-in" className="hover:underline">
                      Sign In
                    </Link>
                  </>
                )}
              </p>

              <div className="text-balance text-center text-xs text-muted-foreground">
                By looking continue, you agree to our{" "}
                <span className="hover:text-primary hover:underline hover:cursor-default">
                  Terms of service
                </span>{" "}
                and{" "}
                <span className="hover:text-primary hover:underline hover:cursor-default">
                  Privacy Policy
                </span>
                .
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;

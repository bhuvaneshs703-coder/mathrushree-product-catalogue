import { useIsCallerAdmin } from "@/hooks/useCatalogue";
import { useSeo } from "@/lib/seo";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import { Lock, ShieldCheck } from "lucide-react";
import { useEffect } from "react";

/**
 * Owner sign-in. Internet Identity only — no password field, no hardcoded
 * credential and no public registration control. A signed-in visitor who is
 * not the approved owner sees an access-not-granted notice and no dashboard.
 */
export default function OwnerSignIn() {
  useSeo(
    "Owner Sign In",
    "Secure sign-in for the business owner to manage the catalogue.",
  );

  const navigate = useNavigate();
  const { isAuthenticated, isInitializing, isLoggingIn, isLoginError, login } =
    useInternetIdentity();
  const adminQuery = useIsCallerAdmin();

  const isAdmin = adminQuery.data === true;
  const checkingAccess = isAuthenticated && adminQuery.isLoading;

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      void navigate({ to: "/owner/products" });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <section
      data-ocid="owner.signin.page"
      className="paper-texture relative flex min-h-[calc(100dvh-8rem)] items-center justify-center px-4 py-16 md:px-8"
    >
      <div className="w-full max-w-xl">
        <div className="border border-accent/40 bg-card shadow-subtle">
          <div className="border-b border-accent/30 bg-primary px-6 py-5 text-primary-foreground md:px-10 md:py-6">
            <p className="label-caps text-accent">Private Ledger</p>
            <h1 className="mt-2 font-display text-3xl tracking-tight md:text-4xl">
              Owner Sign In
            </h1>
          </div>

          <div className="px-6 py-8 md:px-10 md:py-10">
            <p className="text-sm leading-relaxed text-muted-foreground">
              This dashboard is reserved for the business owner. Sign in with
              Internet Identity to manage the catalogue. There is no password to
              remember and no public registration — access is granted only to
              the approved owner.
            </p>

            <div className="mt-8">
              {isInitializing ? (
                <output
                  data-ocid="owner.signin.loading_state"
                  className="block text-sm text-muted-foreground"
                >
                  Loading your session…
                </output>
              ) : !isAuthenticated ? (
                <div className="flex flex-col gap-4">
                  <button
                    type="button"
                    data-ocid="owner.signin.submit_button"
                    disabled={isLoggingIn}
                    onClick={() => login()}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-smooth hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Lock className="h-4 w-4" aria-hidden="true" />
                    {isLoggingIn
                      ? "Signing in…"
                      : "Sign in with Internet Identity"}
                  </button>
                  {isLoginError && (
                    <p
                      role="alert"
                      data-ocid="owner.signin.error_state"
                      className="text-sm text-destructive"
                    >
                      Sign-in did not complete. Please try again.
                    </p>
                  )}
                </div>
              ) : checkingAccess ? (
                <output
                  data-ocid="owner.signin.checking_state"
                  className="block text-sm text-muted-foreground"
                >
                  Verifying owner access…
                </output>
              ) : isAdmin ? (
                <output
                  data-ocid="owner.signin.success_state"
                  className="flex items-center gap-2 text-sm text-success"
                >
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  Access granted. Taking you to the product list…
                </output>
              ) : (
                <div
                  data-ocid="owner.signin.denied_state"
                  role="alert"
                  className="border border-destructive/40 bg-destructive/5 px-5 py-5"
                >
                  <h2 className="font-display text-lg text-foreground">
                    Access not granted
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    You are signed in, but this account is not the approved
                    owner of this catalogue. No dashboard content is available
                    for this identity.
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    If you believe this is a mistake, please contact the
                    business owner directly.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 border-t border-accent/25 pt-6">
              <Link
                to="/"
                data-ocid="owner.signin.back_link"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-smooth hover:text-accent"
              >
                ← Return to the catalogue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

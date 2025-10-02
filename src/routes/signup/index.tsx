import { createFileRoute } from "@tanstack/react-router";
import CustomGoogleButton from "@/components/ui/button/custom-google-button";

export const Route = createFileRoute("/signup/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen w-full bg-gray-50 relative flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md relative">
        <h1 className="text-3xl font-bold text-primary text-center">
          LingualLift
        </h1>
        <div>
          <div className="p-6 md:p-8">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-gray-900">
                Create your Account
              </h2>
            </div>

            <div className="mt-6">
              <label
                htmlFor="fullname"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    className="text-gray-400"
                  >
                    <path
                      fill="currentColor"
                      d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5m0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 py-2.5 outline-none transition
                             focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Please enter your Full Name!
              </p>
            </div>

            <div className="mt-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    className="text-gray-400"
                  >
                    <path
                      fill="currentColor"
                      d="M20 4H4a2 2 0 0 0-2 2v.4l10 5.6l10-5.6V6a2 2 0 0 0-2-2m0 4.75l-8 4.47l-8-4.47V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2z"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 py-2.5 outline-none transition
                             focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Please enter your Email!
              </p>
            </div>

            <div className="mt-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    className="text-gray-400"
                  >
                    <path
                      fill="currentColor"
                      d="M12 1a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5m3 8V6a3 3 0 0 0-6 0v3z"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-300 bg-white pl-10 pr-11 py-2.5 outline-none transition
                             focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  Please enter your Password!
                </span>
                <a
                  href="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              className="mt-6 w-full rounded-xl bg-primary py-3 font-semibold text-white
                         transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              Create account
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <hr className="flex-grow border-gray-200" />
              <span className="px-3 text-xs tracking-wide uppercase text-gray-400">
                - Or sign up with -
              </span>
              <hr className="flex-grow border-gray-200" />
            </div>

            {/* Social Sign Up */}
            <div className="flex justify-center gap-4">
              {/* Google (custom component) */}
              <CustomGoogleButton
                aria-label="Sign up with Google"
                className="group flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm
                           ring-1 ring-black/5 hover:bg-gray-50 hover:shadow transition"
              />
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          By signing up, you agree to our{" "}
          <a className="underline hover:text-gray-700" href="/terms">
            Terms
          </a>{" "}
          &{" "}
          <a className="underline hover:text-gray-700" href="/privacy">
            Privacy
          </a>
          .
        </p>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/signin"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

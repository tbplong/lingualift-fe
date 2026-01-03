// src/routes/login/index.tsx
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import CustomGoogleButton from "@/components/ui/button/custom-google-button";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { useAuthStore } from "@/stores";
import AuthService from "@/services/auth/auth.service";
import storage from "@/utils/storage";
import handleAxiosError from "@/helpers/handle-axios-error";
import z from "zod";
import Loading from "@/components/ui/loading";

export const Route = createFileRoute("/login/")({
  beforeLoad: async ({ context }) => {
    if (context.authContext.isAuthenticated) {
      throw redirect({ to: "/dashboard" });
    }
  },
  validateSearch: z.object({
    next: z.string().optional(),
  }),
  component: RouteComponent,
});

type FormValues = {
  email: string;
  password: string;
};

type Errors = Partial<Record<keyof FormValues, string>>;

function RouteComponent() {
  const navigate = useNavigate();
  const { setToken, isAuthenticated, setIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormValues, boolean>>
  >({});

  const loginWithGoogle = async (credentialResponse: string) => {
    try {
      setLoading(true);
      const { accessToken } = (
        await AuthService.loginWithGoogle(credentialResponse)
      ).data;
      storage.setItem("token", accessToken);
      setToken(accessToken);
      setIsAuthenticated(true);
    } catch (error: unknown) {
      handleAxiosError(error, (message: string) => {
        toast.error(message);
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [isAuthenticated, navigate]);

  function validateField(
    field: keyof FormValues,
    vals: FormValues,
  ): string | undefined {
    if (field === "email") {
      const v = vals.email.trim();
      if (!v) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
        return "Please enter a valid email address.";
    }
    if (field === "password") {
      const v = vals.password.trim();
      if (!v) return "Password is required.";
      if (v.length < 6) return "Password must be at least 6 characters.";
    }
    return undefined;
  }

  function validateAll(vals: FormValues): Errors {
    return {
      email: validateField("email", vals),
      password: validateField("password", vals),
    };
  }

  function handleInputChange(
    field: keyof FormValues,
    e: ChangeEvent<HTMLInputElement>,
  ) {
    const value = e.target.value;

    setValues((prev) => {
      const next = { ...prev, [field]: value };
      setErrors((prevErr) => ({
        ...prevErr,
        [field]: validateField(field, next),
      }));
      return next;
    });

    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validateAll(values);
    setErrors(next);

    if (!next.email && !next.password) {
      try {
        setLoading(true);

        const { data } = await AuthService.login(
          values.email.trim(),
          values.password,
        );

        storage.setItem("token", data.accessToken);
        setToken(data.accessToken);
        setIsAuthenticated(true);

        toast.success("Signed in successfully! Redirecting…");

        navigate({ to: "/dashboard", replace: true });
      } catch (err: unknown) {
        handleAxiosError(err, (message: string) => toast.error(message));
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="min-h-dvh w-full bg-gray-50 relative grid place-items-center px-4 pt-10 pb-10">
      {loading ? (
        <div className="mt-6 flex h-80 w-full flex-row items-center justify-center">
          <Loading className="size-40" loop />
        </div>
      ) : (
        <div className="w-full max-w-md relative">
          <h1 className="text-4xl font-bold text-primary text-center md:3xl: xl:text-5xl">
            LingualLift
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="p-6 md:p-8">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-gray-900 text-center xl:text-2xl">
                  Sign in to your Account
                </h2>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm xl:text-lg font-medium text-gray-700"
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
                    value={values.email}
                    onChange={(e) => handleInputChange("email", e)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    placeholder="name@example.com"
                    className={`w-full rounded-xl border bg-white pl-10 pr-11 py-2.5 outline-none transition
                    ${
                      errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : touched.email && !errors.email
                          ? "border-green-500 focus:border-green-500 focus:ring-green-200"
                          : "border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                    }`}
                  />
                </div>
                <p
                  id="email-error"
                  className={`mt-2 text-sm ${
                    errors.email ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {errors.email ?? "Please enter your Email!"}
                </p>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm xl:text-lg font-medium text-gray-700"
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
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={(e) => handleInputChange("password", e)}
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    placeholder="••••••••"
                    className={`w-full rounded-xl border bg-white pl-10 pr-11 py-2.5 outline-none transition
                    ${
                      errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : touched.password && !errors.password
                          ? "border-green-500 focus:border-green-500 focus:ring-green-200"
                          : "border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span
                    id="password-error"
                    className={`text-sm ${
                      errors.password ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    {errors.password
                      ? errors.password
                      : values.password
                        ? "Password looks good!"
                        : "Please enter your Password!"}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-primary py-3 font-semibold text-white
                         transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                Sign in
              </button>

              <div className="my-6 flex items-center">
                <hr className="flex-grow border-gray-200" />
                <span className="px-3 text-xs tracking-wide uppercase text-gray-400">
                  - Or sign in with -
                </span>
                <hr className="flex-grow border-gray-200" />
              </div>

              <CustomGoogleButton
                onSuccess={async (credentialResponse) => {
                  if (!credentialResponse.credential) {
                    toast.error(
                      "Có lỗi xảy ra khi đăng nhập bằng tài khoản Google. Vui lòng thử lại!",
                    );
                    return;
                  }
                  await loginWithGoogle(credentialResponse.credential);
                }}
                onError={() => {
                  toast.error(
                    "Có lỗi xảy ra khi đăng nhập bằng tài khoản Google. Vui lòng thử lại!",
                  );
                }}
              />
            </div>
          </form>

          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-primary hover:underline"
            >
              Create one
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

import { useState, type ChangeEvent, type FormEvent } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import CustomGoogleButton from "@/components/ui/button/custom-google-button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import AuthService from "@/services/auth/auth.service";
import storage from "@/utils/storage";

export const Route = createFileRoute("/signup/")({
  component: RouteComponent,
});

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  dateOfBirth: string; // YYYY-MM-DD
  phone: string;
};

type Errors = Partial<Record<keyof FormValues, string>>;

function RouteComponent() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState<FormValues>({
    fullName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormValues, boolean>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function isAtLeastYearsOld(isoDate: string, years = 13) {
    const dob = new Date(isoDate);
    if (Number.isNaN(dob.getTime())) return false;
    const today = new Date();
    const cutoff = new Date(
      today.getFullYear() - years,
      today.getMonth(),
      today.getDate(),
    );
    return dob <= cutoff;
  }

  function validateField(
    field: keyof FormValues,
    vals: FormValues,
  ): string | undefined {
    if (field === "fullName") {
      const v = vals.fullName.trim();
      if (!v) return "Full name is required.";
      if (v.length < 6) return "Full name must be at least 6 characters.";
    }
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
    if (field === "dateOfBirth") {
      const v = vals.dateOfBirth;
      if (!v) return "Date of birth is required.";
      if (!isAtLeastYearsOld(v, 13))
        return "You must be at least 13 years old.";
    }
    if (field === "phone") {
      const v = vals.phone.trim();
      if (!v) return "Phone is required.";
      const digits = v.replace(/[^0-9]/g, "");
      if (digits.length < 9 || digits.length > 15)
        return "Phone must be 9–15 digits.";
    }
    return undefined;
  }

  function validateAll(vals: FormValues): Errors {
    return {
      fullName: validateField("fullName", vals),
      email: validateField("email", vals),
      password: validateField("password", vals),
      dateOfBirth: validateField("dateOfBirth", vals),
      phone: validateField("phone", vals),
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validateAll(values);
    setErrors(next);

    if (
      !next.fullName &&
      !next.email &&
      !next.password &&
      !next.dateOfBirth &&
      !next.phone
    ) {
      try {
        setIsSubmitting(true);
        const { data } = await AuthService.signup(
          values.email,
          values.password,
          values.fullName,
          values.fullName,
          values.dateOfBirth,
          values.phone,
        );
        storage.setItem("token", data.accessToken);
        toast.success("Signup successful! Redirecting to Sign in...");
        navigate({ to: "/login" });
      } catch (err) {
        toast.error(`${err}. Please try again.`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 relative flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md relative">
        <h1 className="text-4xl font-bold text-primary text-center xl:text-5xl">
          LinguaLift
        </h1>

        <form noValidate onSubmit={handleSubmit}>
          <div className="p-6 md:p-8">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-gray-900 text-center xl:text-2xl">
                Create your Account
              </h2>
            </div>

            <div className="mt-6">
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm xl:text-lg font-medium text-gray-700"
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
                  id="fullName"
                  name="fullName"
                  value={values.fullName}
                  onChange={(e) => handleInputChange("fullName", e)}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={
                    errors.fullName ? "fullName-error" : undefined
                  }
                  placeholder="Xuan Sang"
                  className={`w-full rounded-xl border bg-white pl-10 pr-11 py-2.5 outline-none transition
                    ${
                      errors.fullName
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : touched.fullName && !errors.fullName
                          ? "border-green-500 focus:border-green-500 focus:ring-green-200"
                          : "border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                    }`}
                />
              </div>
              <p
                id="fullName-error"
                className={`mt-2 text-sm ${
                  errors.fullName ? "text-red-500" : "text-gray-400"
                }`}
              >
                {errors.fullName ?? "Please enter your Full Name!"}
              </p>
            </div>

            <div className="mt-4">
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
                <a
                  href="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            {/* Date of Birth */}
            <div className="mt-4">
              <label
                htmlFor="dateOfBirth"
                className="block mb-2 text-sm xl:text-lg font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                autoComplete="bday"
                value={values.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e)}
                aria-invalid={!!errors.dateOfBirth}
                aria-describedby={
                  errors.dateOfBirth ? "dateOfBirth-error" : undefined
                }
                className={`w-full rounded-xl border bg-white px-4 py-2.5 outline-none transition
                    ${
                      errors.dateOfBirth
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : touched.dateOfBirth && !errors.dateOfBirth
                          ? "border-green-500 focus:border-green-500 focus:ring-green-200"
                          : "border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                    }`}
              />
              <p
                id="dateOfBirth-error"
                className={`mt-2 text-sm ${errors.dateOfBirth ? "text-red-500" : "text-gray-400"}`}
              >
                {errors.dateOfBirth ?? "Select your birth date (13+)."}
              </p>
            </div>

            {/* Phone */}
            <div className="mt-4">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm xl:text-lg font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                value={values.phone}
                onChange={(e) => handleInputChange("phone", e)}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                placeholder="0912345678"
                className={`w-full rounded-xl border bg-white px-4 py-2.5 outline-none transition
                    ${
                      errors.phone
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : touched.phone && !errors.phone
                          ? "border-green-500 focus:border-green-500 focus:ring-green-200"
                          : "border-gray-300 focus:border-orange-500 focus:ring-orange-200"
                    }`}
              />
              <p
                id="phone-error"
                className={`mt-2 text-sm ${errors.phone ? "text-red-500" : "text-gray-400"}`}
              >
                {errors.phone ?? "Enter a phone number (9–15 digits)."}
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="mt-6 w-full rounded-xl bg-primary py-3 font-semibold text-white
                         transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating account…" : "Create account"}
            </button>

            <div className="my-6 flex items-center">
              <hr className="flex-grow border-gray-200" />
              <span className="px-3 text-xs tracking-wide uppercase text-gray-400">
                - Or sign up with -
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
                // handle Google signup success here
              }}
              onError={() => {
                toast.error(
                  "Có lỗi xảy ra khi đăng nhập bằng tài khoản Google. Vui lòng thử lại!",
                );
              }}
            />
          </div>
        </form>

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
          <a href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

import {
  LogoColored,
  LogoColoredText,
  Visibility,
  VisibilityOff,
} from "@/components/icons";
import CustomGoogleButton from "@/components/ui/button/custom-google-button";
import Loading from "@/components/ui/loading";
import { PRODUCTION } from "@/config/env";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/constants";
import handleAxiosError from "@/helpers/handle-axios-error";
import { useAuthStore, useAuthModalStore } from "@/stores";
import {
  createFileRoute,
  // redirect,
  // Link,
  useNavigate,
  // useSearch,
} from "@tanstack/react-router";
import { useFormik } from "formik";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { z } from "zod";
import Waves from "../../components/icons/waves";

import EducationAnimation from "../../assets/animations/education.json";

export const Route = createFileRoute("/~login/~index")({
  // beforeLoad: async ({ context }) => {
  //   if (context.authContext.isAuthenticated) {
  //     throw redirect({ to: "/" });
  //   }
  // },
  validateSearch: z.object({
    next: z.string().optional(),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  // const { setToken, isAuthenticated, setIsAuthenticated, setActiveTokenCount } =
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const { authModal } = useAuthModalStore();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const selected = useSearch({
  //   from: "/login/",
  //   select: (search) => search.next,
  // });

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log({
        email: email,
        password: password,
      });
      // const { accessToken, activeTokenCount } = (
      //   await AuthService.login(email, password)
      // ).data;
      // storage.setItem("token", accessToken);
      // setToken(accessToken);
      setIsAuthenticated(true);
      // setActiveTokenCount(activeTokenCount);
      authModal.open();
    } catch (error: unknown) {
      handleAxiosError(error, (message: string) => {
        toast.error(message);
      });
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (credentialResponse: string) => {
    try {
      console.log("credentialResponse", credentialResponse);
      setLoading(true);
      // const { accessToken, activeTokenCount } = (
      //   await AuthService.loginWithGoogle(credentialResponse)
      // ).data;
      // storage.setItem("token", accessToken);
      // setToken(accessToken);
      setIsAuthenticated(true);
      // setActiveTokenCount(activeTokenCount);
      authModal.open();
    } catch (error: unknown) {
      handleAxiosError(error, (message: string) => {
        toast.error(message);
      });
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(EMAIL_REGEX, "Thông tin chưa đúng định dạng email!")
        .required("Vui lòng nhập email!"),
      password: Yup.string()
        .matches(PASSWORD_REGEX, "Mật khẩu phải có từ 8 đến 255 kí tự!")
        .required("Vui lòng nhập mật khẩu!"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await login(values.email, values.password);
      resetForm();
    },
  });

  const toggleVisibility = () => {
    const passwordInputElement = document.getElementById("password") as
      | HTMLInputElement
      | undefined;
    if (!passwordInputElement) {
      toast.error("There is no password element inside the page!");
      return;
    }

    if (passwordInputElement.type === "password") {
      passwordInputElement.type = "text";
      setPasswordVisible(true);
    } else {
      passwordInputElement.type = "password";
      setPasswordVisible(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate({
        // to: selected || "/home",
        to: "/",
        replace: true,
      });
    }
    // }, [isAuthenticated, navigate, selected]);
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-white px-5 py-10 xs:px-[32px] sm:px-10 lg:px-[48px] xl:px-[80px] 2xl:px-[96px] 3xl:px-[calc(160px-(1920px-100vw)/3)] 3xl:text-[24px]">
      <div className="relative flex w-full items-center justify-between">
        <LogoColored
          onClick={() => {
            navigate({ to: "/" });
          }}
          className="flex h-6 w-12 cursor-pointer xs:hidden"
        />
        <LogoColoredText
          onClick={() => {
            navigate({ to: "/" });
          }}
          className="hidden h-8 w-44 cursor-pointer xs:flex md:h-10 md:w-60"
        />
        {/* <div className="relative flex flex-row gap-4">
          <CrossIcon className="aspect-square size-6 fill-secondary xs:size-8 md:size-10" />
          <CircleIcon className="aspect-square size-6 fill-primary xs:size-8 md:size-10" />
          <CrossIcon className="aspect-square size-6 fill-secondary xs:size-8 md:size-10" />
          <CircleIcon className="aspect-square size-6 fill-primary xs:size-8 md:size-10" />
        </div> */}
      </div>
      <div className="relative mt-12 flex w-full flex-row justify-center lg:justify-between 3xl:mt-20">
        <div className="relative ml-10 hidden size-[30rem] lg:flex 3xl:mt-10 3xl:size-[35rem]">
          <Lottie animationData={EducationAnimation} loop={true} />
        </div>
        {loading ? (
          <div className="relative flex h-[40rem] w-80 flex-col items-center justify-center xs:w-[22.5rem] sm:w-[30rem] xl:h-full 2xl:w-[37.5rem] 3xl:w-[40rem]">
            <Loading className="relative w-60" loop={true} />
          </div>
        ) : (
          <form
            onSubmit={formik.handleSubmit}
            className="relative flex w-80 flex-col items-center xs:w-[22.5rem] sm:w-[25rem] xl:mr-10 2xl:mr-16 3xl:mr-20"
          >
            <div className="text-[32px] font-extrabold text-primary 3xl:text-[40px]">
              Đăng nhập
            </div>
            <div className="mt-5 flex w-full items-center justify-center text-center 3xl:mt-6">
              Chào mừng đến với nền tảng dạy học tiếng Anh trực tuyến thầy
              Nguyễn Thành Luân
            </div>
            {PRODUCTION ? (
              <div></div>
            ) : (
              <>
                <div className="mt-6 flex w-full flex-col gap-2 3xl:mt-12">
                  <label htmlFor="email" className="font-bold">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={`${formik.touched.email && formik.errors.email ? "border-red" : "border-tertiary"} w-full rounded-lg border border-solid px-3 py-2 focus:!border-primary`}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="flex text-red">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="mt-4 flex w-full flex-col gap-2">
                  <label htmlFor="password" className="font-bold">
                    Mật khẩu
                  </label>
                  <div className="relative w-full">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className={`${formik.touched.password && formik.errors.password ? "border-red" : "border-tertiary"} w-full rounded-lg border border-solid px-3 py-2 focus:!border-primary 3xl:px-4`}
                    />
                    {!passwordVisible ? (
                      <Visibility
                        onClick={() => toggleVisibility()}
                        className={`${formik.touched.password && formik.errors.password ? "fill-red" : "fill-tertiary"} absolute right-4 top-2 size-6 cursor-pointer 3xl:top-[14px]`}
                      />
                    ) : (
                      <VisibilityOff
                        onClick={() => toggleVisibility()}
                        className={`${formik.touched.password && formik.errors.password ? "fill-red" : "fill-tertiary"} absolute right-4 top-2 size-6 cursor-pointer`}
                      />
                    )}
                  </div>
                  <div
                    className={`${formik.touched.password && formik.errors.password ? "justify-between" : "justify-end"} relative flex w-full flex-row`}
                  >
                    {formik.touched.password && formik.errors.password ? (
                      <div className="flex text-red">
                        {formik.errors.password}
                      </div>
                    ) : null}
                    <div className="cursor-pointer text-primary duration-200 ease-in-out hover:text-primary-700 hover:underline">
                      Quên mật khẩu?
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center rounded-lg bg-primary py-3 font-bold text-white duration-200 ease-in-out hover:bg-primary-700 3xl:mt-12"
                >
                  Đăng nhập
                </button>
                <div className="mt-2 flex w-full items-center justify-center 3xl:mt-4">
                  <div className="z-10 bg-white px-2 text-tertiary-300">
                    hoặc
                  </div>
                  <div className="absolute h-[0.5px] w-full bg-tertiary-300"></div>
                </div>
              </>
            )}
            {/* <div className="mt-2 flex w-full cursor-pointer select-none items-center justify-center rounded-lg border border-solid border-tertiary bg-white py-3 duration-200 ease-in-out 3xl:mt-4">
              GOOGLE BUTTON PLACEHOLDER
            </div> */}
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
            {/* <div className="mt-6 w-full text-center 3xl:mt-12">
              Chưa có tài khoản? Đăng ký bằng tài khoản Google{' '}
              <Link
                to="/signup"
                className="cursor-pointer text-primary duration-200 ease-in-out hover:text-primary-700 hover:underline"
              >
                ngay
              </Link>
            </div> */}
          </form>
        )}
      </div>
      <Waves />
    </div>
  );
}

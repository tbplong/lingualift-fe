import { createFileRoute, redirect } from "@tanstack/react-router";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { Profile } from "@/components/icons";
// import BackButton from "@/components/ui/back-button";
// import Footer from "@/components/ui/footer";
// import Heading from "@/components/ui/heading";
// import StudyLayout from "@/components/ui/study-layout";
// import { PHONE_REGEX } from "@/constants";
// import { UserService } from "@/services";
import { useUserStore } from "@/stores/user.store";
import { PHONE_REGEX } from "@/constants";
import { Footer } from "@/components/Footer";
import Heading from "@/components/Heading";
import BackButton from "@/components/button/back-button";
import StudyLayout from "@/components/study-layout";
import UserService from "@/services/user/user.service";
import { UserUpdateREQ } from "@/services/user/request/user.request";
// import { useUserStore } from "@/stores";

export const Route = createFileRoute("/profile/")({
  beforeLoad: async ({ context, location }) => {
    if (!context.authContext.isAuthenticated) {
      throw redirect({ to: "/login", search: { next: location.href } });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useUserStore();

  const [loading, setLoading] = useState(false);

  const accountInfoFormik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Vui lòng nhập tên của bạn!"),
      lastName: Yup.string().required("Vui lòng nhập họ và tên đệm của bạn!"),
    }),
    onSubmit: async (values) => {
      if (
        values.firstName === user?.firstName &&
        values.lastName === user?.lastName
      ) {
        return;
      }

      try {
        setLoading(true);
        const userFormData: UserUpdateREQ = {
          firstName: values.firstName,
          lastName: values.lastName,
        };
        await UserService.editProfile(userFormData);
        toast.success("Cập nhật thông tin tài khoản thành công!");
      } catch (error) {
        toast.error("Cập nhật thông tin tài khoản thất bại!");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const personalInfoFormik = useFormik({
    initialValues: {
      // birthday: new Date('2006-01-01'),
      address: user?.address || "",
      school: user?.highSchool || "",
    },
    validationSchema: Yup.object({
      // birthday: Yup.date().required('Vui lòng nhập ngày sinh của bạn!'),
      address: Yup.string().required("Vui lòng nhập địa chỉ của bạn!"),
      school: Yup.string().required("Vui lòng nhập tên trường THPT của bạn!"),
    }),
    onSubmit: async (values) => {
      if (
        values.address === user?.address &&
        values.school === user?.highSchool
      ) {
        return;
      }

      try {
        setLoading(true);
        const userFormData: UserUpdateREQ = {
          address: values.address,
          highSchool: values.school,
        };
        await UserService.editProfile(userFormData);
        toast.success("Cập nhật thông tin tài khoản thành công!");
      } catch (error) {
        toast.error("Cập nhật thông tin tài khoản thất bại!");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const contactInfoFormik = useFormik({
    initialValues: {
      phone: user?.phone || "",
      facebookName: user?.socialMedia?.facebookName || "",
      facebookUrl: user?.socialMedia?.facebookUrl || "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(PHONE_REGEX, "Số điện thoại chưa đúng định dạng (10 số)")
        .required("Vui lòng nhập số điện thoại của bạn!"),
      facebookName: Yup.string().required(
        "Vui lòng nhập tên tài khoản Facebook của bạn!",
      ),
      facebookUrl: Yup.string().required(
        "Vui lòng nhập đường dẫn đến tài khoản Facebook của bạn!",
      ),
    }),
    onSubmit: async (values) => {
      if (
        values.phone === user?.phone &&
        values.facebookName === user?.socialMedia?.facebookName &&
        values.facebookUrl === user?.socialMedia?.facebookUrl
      ) {
        return;
      }

      try {
        setLoading(true);
        const userFormData: UserUpdateREQ = {
          phone: values.phone,
          socialMedia: {
            facebookUrl: values.facebookUrl,
            facebookName: values.facebookName,
          },
        };
        await UserService.editProfile(userFormData);
        console.log("called api");
        toast.success("Cập nhật thông tin tài khoản thành công!");
      } catch (error) {
        toast.error("Cập nhật thông tin tài khoản thất bại!");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <StudyLayout>
        <div className="flex flex-1 flex-col items-start">
          <BackButton />
          <Heading text={"Hồ sơ cá nhân"} className="mt-5 xl:mt-6" />
        </div>
        <div className="relative">
          <div className="mt-6 flex w-full flex-col items-start gap-y-4 md:mt-7 lg:mt-8 xl:mt-10">
            <div className="flex w-full flex-col items-start justify-center gap-y-4 2xl:flex-row 2xl:gap-x-4 2xl:gap-y-0">
              <form
                onSubmit={accountInfoFormik.handleSubmit}
                className="flex min-h-80 w-full flex-col rounded-lg border border-tertiary-300 p-5 2xl:min-h-[24.5rem]"
              >
                <span className="inline text-2xl font-bold">
                  Thông tin tài khoản
                </span>
                <div className="relative flex w-full flex-col items-center gap-4 md:flex-row md:items-start md:gap-10">
                  <div className="mt-8 flex flex-row md:mt-5 xl:mt-6">
                    <div
                      style={{ backgroundImage: `url(${user?.picture})` }}
                      className={`${user?.picture ? "" : "flex items-center justify-center bg-tertiary"} relative size-24 rounded-full bg-cover outline outline-tertiary-300 xl:size-28`}
                    >
                      {user?.picture ? (
                        <></>
                      ) : (
                        <Profile className="size-5 fill-white" />
                      )}
                    </div>
                  </div>
                  <div className="relative flex w-full flex-col">
                    <div className="mt-4 flex w-full flex-col gap-2 md:mt-5 xl:mt-6">
                      <div className="flex w-full flex-col gap-2 md:flex-row">
                        <label
                          htmlFor="firstName"
                          className="text-xs font-bold xs:text-xs md:flex md:min-w-32 md:items-center md:text-sm 2xl:min-w-[9.5rem] 2xl:text-base"
                        >
                          Tên
                          <span className="ml-1 text-primary">(*)</span>:
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          disabled={loading}
                          onChange={accountInfoFormik.handleChange}
                          onBlur={accountInfoFormik.handleBlur}
                          value={accountInfoFormik.values.firstName}
                          placeholder="Đây là tên mà giáo viên sẽ thấy"
                          className={`${accountInfoFormik.touched.firstName && accountInfoFormik.errors.firstName ? "border-red" : "border-tertiary"} w-full rounded-lg border border-solid px-3 py-2 text-xs focus:!border-primary disabled:opacity-50 xs:text-xs md:text-sm 2xl:text-base`}
                        />
                      </div>
                      <div
                        className={`md:ml-32 md:pl-2 2xl:ml-[9.5rem] ${accountInfoFormik.touched.firstName && accountInfoFormik.errors.firstName ? "block" : "hidden"}`}
                      >
                        <div className="flex text-xs text-red disabled:opacity-50 md:text-sm 2xl:text-base">
                          {accountInfoFormik.errors.firstName}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex w-full flex-col gap-2 md:mt-5 xl:mt-6">
                      <div className="flex w-full flex-col gap-2 md:flex-row">
                        <label
                          htmlFor="lastName"
                          className="text-xs font-bold xs:text-xs md:flex md:min-w-32 md:items-center md:text-sm 2xl:min-w-[9.5rem] 2xl:text-base"
                        >
                          Họ và tên đệm
                          <span className="ml-1 text-primary">(*)</span>:
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          disabled={loading}
                          onChange={accountInfoFormik.handleChange}
                          onBlur={accountInfoFormik.handleBlur}
                          value={accountInfoFormik.values.lastName}
                          placeholder="Đây là tên mà giáo viên sẽ thấy"
                          className={`${accountInfoFormik.touched.lastName && accountInfoFormik.errors.lastName ? "border-red" : "border-tertiary"} w-full rounded-lg border border-solid px-3 py-2 text-xs focus:!border-primary disabled:opacity-50 xs:text-xs md:text-sm 2xl:text-base`}
                        />
                      </div>
                      <div
                        className={`md:ml-32 md:pl-2 2xl:ml-[9.5rem] ${accountInfoFormik.touched.lastName && accountInfoFormik.errors.lastName ? "block" : "hidden"}`}
                      >
                        <div className="flex text-xs text-red disabled:opacity-50 md:text-sm 2xl:text-base">
                          {accountInfoFormik.errors.lastName}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto flex flex-row gap-x-4 self-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 flex w-32 items-center justify-center rounded-lg bg-primary py-2 font-bold text-white duration-200 ease-in-out hover:bg-primary-700 disabled:bg-tertiary-300 lg:mt-8"
                  >
                    Cập nhật
                  </button>
                </div>
              </form>
              <form
                onSubmit={personalInfoFormik.handleSubmit}
                className="flex min-h-80 w-full flex-col rounded-lg border border-tertiary-300 p-5 2xl:min-h-[24.5rem]"
              >
                <span className="inline text-2xl font-bold">
                  Thông tin khác
                </span>
                <div className="relative flex w-full flex-col gap-5 md:flex-row">
                  <div className="relative flex w-full flex-col">
                    <div className="mt-4 flex w-full flex-col gap-2 md:mt-5 xl:mt-6">
                      <div className="flex w-full flex-col gap-2 md:flex-row">
                        <label
                          htmlFor="address"
                          className="text-xs font-bold xs:text-xs md:flex md:min-w-[10.5rem] md:items-center md:text-sm 2xl:min-w-[12.5rem] 2xl:text-base"
                        >
                          Địa chỉ
                          <span className="ml-1 text-primary">(*)</span>:
                        </label>
                        <input
                          id="address"
                          name="address"
                          type="text"
                          disabled={loading}
                          onChange={personalInfoFormik.handleChange}
                          onBlur={personalInfoFormik.handleBlur}
                          value={personalInfoFormik.values.address}
                          placeholder="Nhập địa chỉ nơi bạn cư trú"
                          className={`${personalInfoFormik.touched.address && personalInfoFormik.errors.address ? "border-red" : "border-tertiary"} w-full rounded-lg border border-solid px-3 py-2 text-xs focus:!border-primary disabled:opacity-50 xs:text-xs md:text-sm 2xl:text-base`}
                        />
                      </div>
                      <div
                        className={`md:ml-[10.5rem] md:pl-2 2xl:ml-[12.5rem] ${personalInfoFormik.touched.address && personalInfoFormik.errors.address ? "block" : "hidden"}`}
                      >
                        <div
                          className={`flex text-xs text-red disabled:opacity-50 md:text-sm 2xl:text-base`}
                        >
                          {personalInfoFormik.errors.address}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex w-full flex-col gap-2 md:mt-5 xl:mt-6">
                      <div className="flex w-full flex-col gap-2 md:flex-row">
                        <label
                          htmlFor="school"
                          className="text-xs font-bold xs:text-xs md:flex md:min-w-[10.5rem] md:items-center md:text-sm 2xl:min-w-[12.5rem] 2xl:text-base"
                        >
                          Trường THPT{" "}
                          <span className="ml-1 text-primary">(*)</span>:
                        </label>
                        <input
                          id="school"
                          name="school"
                          type="text"
                          disabled={loading}
                          onChange={personalInfoFormik.handleChange}
                          onBlur={personalInfoFormik.handleBlur}
                          value={personalInfoFormik.values.school}
                          placeholder="Nhập tên trường THPT bạn đang theo học"
                          className={`${personalInfoFormik.touched.school && personalInfoFormik.errors.school ? "border-red" : "border-tertiary"} w-full rounded-lg border border-solid px-3 py-2 text-xs focus:!border-primary disabled:opacity-50 xs:text-xs md:text-sm 2xl:text-base`}
                        />
                      </div>
                      <div
                        className={`md:ml-[10.5rem] md:pl-2 2xl:ml-[12.5rem] ${personalInfoFormik.touched.school && personalInfoFormik.errors.school ? "block" : "hidden"}`}
                      >
                        <div
                          className={`flex text-xs text-red disabled:opacity-50 md:text-sm 2xl:text-base`}
                        >
                          {personalInfoFormik.errors.school}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-auto flex w-32 items-center justify-center self-end rounded-lg bg-primary py-2 font-bold text-white duration-200 ease-in-out hover:bg-primary-700 disabled:bg-tertiary-300"
                >
                  Cập nhật
                </button>
              </form>
            </div>
            <form
              onSubmit={contactInfoFormik.handleSubmit}
              className="flex w-full flex-col rounded-lg border border-tertiary-300 p-5"
            >
              <span className="inline text-2xl font-bold">
                Thông tin liên lạc
              </span>
              <div className="relative flex w-full flex-col gap-5 md:flex-row">
                <div className="relative flex w-full flex-col">
                  <div className="mt-4 flex w-full flex-col gap-2 md:mt-5 md:flex-row xl:mt-6">
                    <label
                      htmlFor="lastName"
                      className="text-xs font-bold xs:text-xs md:flex md:min-w-[11.5rem] md:items-center md:text-sm 2xl:min-w-[13.5rem] 2xl:text-base"
                    >
                      Email:
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      disabled
                      value={user?.email}
                      className="w-full rounded-lg border border-solid border-tertiary px-3 py-2 text-xs focus:!border-primary disabled:opacity-50 xs:text-xs md:text-sm 2xl:text-base"
                    />
                  </div>
                  <div className="mt-4 flex w-full flex-col gap-2 md:mt-5 xl:mt-6">
                    <div className="flex w-full flex-col gap-2 md:flex-row">
                      <label
                        htmlFor="phone"
                        className="text-xs font-bold xs:text-xs md:flex md:min-w-[11.5rem] md:items-center md:text-sm 2xl:min-w-[13.5rem] 2xl:text-base"
                      >
                        Số điện thoại{" "}
                        <span className="ml-1 text-primary">(*)</span>:
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        disabled={loading}
                        onChange={contactInfoFormik.handleChange}
                        onBlur={contactInfoFormik.handleBlur}
                        value={contactInfoFormik.values.phone}
                        placeholder="Nhập số điện thoại liên lạc của bạn"
                        className={`${contactInfoFormik.touched.phone && contactInfoFormik.errors.phone ? "border-red" : "border-tertiary"} w-full rounded-lg border border-solid px-3 py-2 text-xs focus:!border-primary disabled:opacity-50 xs:text-xs md:text-sm 2xl:text-base`}
                      />
                    </div>
                    <div
                      className={`md:ml-[11.5rem] md:pl-2 2xl:ml-[13.5rem] ${contactInfoFormik.touched.phone && contactInfoFormik.errors.phone ? "block" : "hidden"}`}
                    >
                      <div
                        className={`flex text-xs text-red disabled:opacity-50 md:text-sm 2xl:text-base`}
                      >
                        {contactInfoFormik.errors.phone}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex w-full flex-col gap-2 md:mt-5 xl:mt-6">
                    <div className="flex w-full flex-col gap-2 md:flex-row">
                      <label
                        htmlFor="facebookName"
                        className="text-xs font-bold xs:text-xs md:flex md:min-w-[11.5rem] md:items-center md:text-sm 2xl:min-w-[13.5rem] 2xl:text-base"
                      >
                        Tên tài khoản Facebook{" "}
                        <span className="ml-1 text-primary">(*)</span>:
                      </label>
                      <input
                        id="facebookName"
                        name="facebookName"
                        type="text"
                        disabled={loading}
                        onChange={contactInfoFormik.handleChange}
                        onBlur={contactInfoFormik.handleBlur}
                        value={contactInfoFormik.values.facebookName}
                        placeholder="Nhập tên tài khoản Facebook bạn dùng để tham gia nhóm Facebook"
                        className={`${contactInfoFormik.touched.facebookName && contactInfoFormik.errors.facebookName ? "border-red" : "border-tertiary"} w-full rounded-lg border border-solid px-3 py-2 text-xs focus:!border-primary disabled:opacity-50 xs:text-xs md:text-sm 2xl:text-base`}
                      />
                    </div>
                    <div
                      className={`md:ml-[11.5rem] md:pl-2 2xl:ml-[13.5rem] ${contactInfoFormik.touched.facebookName && contactInfoFormik.errors.facebookName ? "block" : "hidden"}`}
                    >
                      <div
                        className={`flex text-xs text-red disabled:opacity-50 md:text-sm 2xl:text-base`}
                      >
                        {contactInfoFormik.errors.facebookName}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex w-full flex-col gap-2 md:mt-5 xl:mt-6">
                    <div className="flex w-full flex-col gap-2 md:flex-row">
                      <label
                        htmlFor="facebookUrl"
                        className="text-xs font-bold xs:text-xs md:flex md:min-w-[11.5rem] md:items-center md:text-sm 2xl:min-w-[13.5rem] 2xl:text-base"
                      >
                        Đường dẫn Facebook{" "}
                        <span className="ml-1 text-primary">(*)</span>:
                      </label>
                      <input
                        id="facebookUrl"
                        name="facebookUrl"
                        type="text"
                        disabled={loading}
                        onChange={contactInfoFormik.handleChange}
                        onBlur={contactInfoFormik.handleBlur}
                        value={contactInfoFormik.values.facebookUrl}
                        placeholder="Nhập đường dẫn đến trang cá nhân Facebook của bạn"
                        className={`${contactInfoFormik.touched.facebookUrl && contactInfoFormik.errors.facebookUrl ? "border-red" : "border-tertiary"} w-full rounded-lg border border-solid px-3 py-2 text-xs focus:!border-primary disabled:opacity-50 xs:text-xs md:text-sm 2xl:text-base`}
                      />
                    </div>
                    <div
                      className={`md:ml-[11.5rem] md:pl-2 2xl:ml-[13.5rem] ${contactInfoFormik.touched.facebookUrl && contactInfoFormik.errors.facebookUrl ? "block" : "hidden"}`}
                    >
                      <div
                        className={`flex text-xs text-red disabled:opacity-50 md:text-sm 2xl:text-base`}
                      >
                        {contactInfoFormik.errors.facebookUrl}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex w-32 items-center justify-center self-end rounded-lg bg-primary py-2 font-bold text-white duration-200 ease-in-out hover:bg-primary-700 disabled:bg-tertiary-300 lg:mt-8"
              >
                Cập nhật
              </button>
            </form>
          </div>
        </div>
      </StudyLayout>
      <Footer />
    </>
  );
}

import React from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import * as Yup from "yup";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";

import { capitalize } from "../../lib/utilities";

type LoginProps = any;

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
});

export default function Login(props: LoginProps) {
  return (
    <div className="bg-slate-100 w-full h-screen bg-cover flex justify-center items-center">
      <Head>
        <title>Administration</title>
      </Head>
      <div className="bg-[url('/wave.svg')] w-full md:w-5/6 h-5/6 overflow-hidden rounded-md bg-no-repeat bg-white bg-bottom flex items-end">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(e) => {}}
        >
          <Form
            method="post"
            className="flex flex-col justify-evenly h-full items-center w-full lg:w-1/2"
          >
            <div className="flex justify-between px-10 py-6 h-1/5 w-full">
              <div id="logo" className="h-20 w-20">
                <Image src="/logo120.png" width={120} height={120} alt="logo" />
              </div>
              <Link href="/">
                <a className="text-lg text-cyan-600 font-semibold hover:underline active:text-cyan-900">
                  Go back to home
                </a>
              </Link>
            </div>
            <div className="h-1/5 w-full px-10">
              <h1 className="text-3xl font-bold text-slate-700 mt-5">
                Administration
              </h1>
              <p className="text-slate-500 font-semibold text-left">
                Please sign-in with a staff account to access the Admin Panel
              </p>
            </div>
            <div className="flex justify-center items-start px-10 flex-col h-1/5 w-full relative">
              <HiOutlineMail className="absolute right-12" size={20} />
              <label
                htmlFor="email"
                className="text-shadow-light text-slate-600 font-semibold text-lg"
              >
                Email
              </label>
              <Field
                required
                type="email"
                name="email"
                id="email"
                placeholder="John@Email.com"
                className="bg-transparent w-full px-2 border-b border-slate-400 text-lg outline-none text-slate-700 focus:border-cyan-500 focus:border-b-2"
              />
              <p className="text-shadow-light text-center text-red-600 shadow-cyan-400 font-normal">
                <ErrorMessage name="email" render={(msg) => capitalize(msg)} />
              </p>
            </div>
            <div className="flex justify-center items-start px-10 flex-col h-1/5 w-full relative">
              <RiLockPasswordLine className="absolute right-12" size={20} />
              <label
                htmlFor="password"
                className="text-shadow-light text-slate-600 font-semibold text-lg"
              >
                Password
              </label>
              <Field
                required
                type="password"
                name="password"
                id="password"
                placeholder="Your password"
                className="bg-transparent w-full px-2 border-b border-slate-400 text-lg outline-none text-slate-700 focus:border-cyan-500 focus:border-b-2"
              />
              <p className="text-shadow-light text-center text-red-600 shadow-cyan-400 font-normal ">
                <ErrorMessage
                  name="password"
                  render={(msg) => capitalize(msg)}
                />
              </p>
            </div>
            <div className="h-1/5 w-full py-2 px-10">
              <button
                type="submit"
                className="w-full py-2 bg-cyan-500 rounded-xl text-white shadow-md shadow-slate-300 active:shadow-slate-300 active:shadow-inner"
              >
                Sign In
              </button>
            </div>
          </Form>
        </Formik>
        <div className="w-1/2 hidden lg:block bg-transparent">
          <Image src="/admin.png" alt="background" width={950} height={781} />
        </div>
      </div>
    </div>
  );
}

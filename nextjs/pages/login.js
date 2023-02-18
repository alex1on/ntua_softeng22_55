import React, { useEffect, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import styles from "../styles/Home.module.css";

export default function LoginPage() {
  
  return (
    <>
      <Head>
        <title> Login or Sign Up Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-row flex-wrap justify-center px-20 mt-20 text-center">
        <div className="w-2/5 p-4 py-5 bg-white shadow-2xl rounded-2xl">
          <h1 className="relative font-bold text-left text-gray-500 text-l">
            IntelliQ
          </h1>
          <form className="flex flex-col items-center text-gray-500">
            <h2 className="mt-6 mb-2 text-3xl font-bold ">
              Sign in to Account
            </h2>
            <div className="inline-block w-10 mb-4 border-2 border-gray-500"></div>
            <label className="text-left">Email</label>
            <input 
              type="text"
              id = "username"
              required
              className="p-2 mb-2 bg-gray-100 rounded-md text-slate-600"
            />
            <label className="text-left">Password</label>
            <input
              id = "password"
              required
              type="password"
              className="p-2 bg-gray-100 rounded-md text-slate-600"
            />
          </form>
        </div>
        {/* Sign in section*/}
        {/*Below starts the sign up section*/}
        <div className="max-w-sm h-[30em] p-10 text-white bg-gradient-to-b from-slate-600 to-gray-700 rounded-tr-2xl rounded-br-2xl">
          <div className="mt-16 text-center">
            <h2 className="mb-2 text-3xl font-bold">Hello, Friend!</h2>
            <div className="inline-block w-10 mb-2 border-2 border-white"></div>
            <p>
              Fill up some personal information and start your journey in the
              survey space
            </p>
          </div>
          <a
            href="#"
            className="inline-block px-12 py-2 mt-10 mb-10 font-semibold border-2 border-white rounded-full hover:bg-white hover:text-gray-500"
          >
            Sign Up
          </a>
        </div>
      </div>
    </>
  );
}

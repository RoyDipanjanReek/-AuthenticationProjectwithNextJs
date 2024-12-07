"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export default function forgotPasswordPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
  });

  const onForgotPassword = async () => {
    const res = await axios.post("/api/user/forgotPassword", user);
    console.log(res);
    
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 w-full bg-black">
      <div className="bg-white rounded-md">
      <h1 className="text-4xl text-center py-6">Enter Your Email</h1>
      <hr className="mb-4"/>

      <label className="pl-8" htmlFor="email">
        Email
      </label>
      <Input
        className="w-96 mx-5 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <button
        type="submit"
        onClick={onForgotPassword}
         className="ml-5 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Submit
      </button>
      </div>
    </div>
  );
}

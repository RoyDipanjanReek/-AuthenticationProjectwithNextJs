"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";

export default function loginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onlogin = async () => {
    try {
      const response = await axios.post("/api/user/login", user);
      console.log(response);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login error", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 w-full bg-black">
      <div className="bg-white rounded-md">
        <h1 className="text-4xl text-center py-6">Login Form</h1>
        <hr className="mb-4" />

        <label className="pl-8" htmlFor="email">
          Email
        </label>
        <Input
          className="w-96 mx-5 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black my-auto"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <label className="pl-8" htmlFor="password">
          Password
        </label>
        <Input
          className="w-96 mx-5 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button
          onClick={onlogin}
          className="ml-5 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          {buttonDisabled ? "No login" : "Login"}
        </button>

        <p className=" text-center py-4">
          <Link href="/signup">Visit signup page</Link>
        </p>
        <p className="text-center py-2">
          <Link href="/forgotPassword">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
}

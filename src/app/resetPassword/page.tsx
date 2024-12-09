"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function confirmPassword() {
  const [user, setUser] = React.useState({
    password: "",
    token: "",
  });
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const resetPassword = async () => {
    try {
      axios.post("/api/user/resetPassword", user);
      setVerified(true);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    const token = window.location.search.split("=")[1];
    if (token) {
      setUser((prevUser) => ({
        ...prevUser,
        token,
      }));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 w-full bg-black">
      <div className="bg-white rounded-md">
        <h1 className="text-4xl text-center py-6">Reset Your Password</h1>
        <hr className="mb-4" />

        <label className="pl-8" htmlFor="password">
          New Password
        </label>
        <Input
          className="w-96 mx-5 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="New PassWord"
        />

        <button
          type="submit"
          onClick={resetPassword}
          className="ml-5 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Submit
        </button>

        {verified && (
          <div>
            <h1 className="text-2xl">Your Password Changed Successfully</h1>
            <Link className="text-4xl" href={"/login"}>
              Login Now
            </Link>
          </div>
        )}
        {error && (
          <div>
            <h1 className="text-2xl bg-red-600">Error</h1>
          </div>
        )}
      </div>
    </div>
  );
}

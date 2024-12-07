'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function profilePage() {
  const router = useRouter()
  const [data, setData] = useState("nothing")

  const onLogout = async () =>{
    try {
      await axios.get('/api/user/logout')
      console.log("logout successfully");
      router.push('/login')
      
    } catch (error : any) {
      console.log(error.message);
      console.log("Logout failed");
    }
  } 

  const getUserDetails =async() => {
    const res = await axios.get('/api/user/me')
    console.log(res.data);
    setData(res.data.data.username)
    
  } 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>

      <h2 className="text-2xl text-red-500 p-5">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>

      <button 
      onClick={onLogout}
      className="text-2xl bg-white text-black p-3 rounded-lg">Logout</button>
      <button 
      onClick={getUserDetails}
      className="mt-5 text-2xl bg-white text-black p-3 rounded-lg">Get User Details</button>
    </div>
  );
}

"use client"

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/"
    }, {
      onRequest: () => {
        //show loading
      },
      onSuccess: () => {
        alert("Sign up successful! Please check your email to verify your account.");
      },
      onError: () => {
        alert("SOmething went wrong");
      },
    });
  };


  return <div className="flex flex-col min-h-screen p-8 space-y-6">
    <h1 className="text-2xl font-bold">Sign Up</h1>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded"
      />
      <Button type="submit">Sign Up</Button>
    </form>
  </div>
}

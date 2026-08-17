"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { TextField,Button,Box,InputAdornment } from "@mui/material";
import { UserCircleIcon,KeyIcon } from "@heroicons/react/24/solid";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    debugger
    await signIn("credentials", {
      username,
      password,
      callbackUrl: "/",
    });
  };

  return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
    <Box className={'col-span-12 md:col-span-6 md:col-start-4 flex flex-col text-center text-base  mx-2 my-auto space-y-4 p-4  shadow-lg'}>
       <h2>Login</h2>    
      <TextField value={username} onChange={e => setUsername(e.target.value)} InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <UserCircleIcon className="h-5 w-5 text-gray-500" />
          </InputAdornment>
        ),
      }}/>
      <TextField type="password" value={password} onChange={e => setPassword(e.target.value)} InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <KeyIcon className="h-5 w-5 text-gray-500" />
          </InputAdornment>
        ),
      }}/>
      <Button onClick={handleLogin}>Entrar</Button>
    </Box>
    </div>
  );
}


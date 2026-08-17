"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { TextField, Button, Box, InputAdornment, Typography } from "@mui/material";
import { UserCircleIcon, KeyIcon } from "@heroicons/react/24/solid";

export default function Login() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await signIn("credentials", {
      username,
      password,
      callbackUrl: "/",
    });
  };

  // Opcional: Mostrar un estado de carga mientras verifica la sesión
  if (status === "loading") {
    return null; 
  }

  // Si ya está logueado, mostramos los datos de la sesión y el botón de Cerrar Sesión
  if (session) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <Box className="col-span-12 md:col-span-6 md:col-start-4 flex flex-col text-center text-base mx-2 my-auto space-y-4 p-4 ">
          <Typography variant="h6">Ya has iniciado sesión</Typography>
          <Typography variant="body2" color="textSecondary">
            Bienvenido de nuevo, {session.user?.name || session.user?.email || "Usuario"}.
          </Typography>

          {/* Contenedor para ver los datos de la sesión estructurados */}
          <Box className="text-left bg-gray-100 p-3 rounded-md overflow-x-auto text-xs">
            <Typography variant="subtitle2" className="font-bold mb-1">
              Datos guardados en la sesión:
            </Typography>
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </Box>

          {/* Botón de Cerrar Sesión */}
          <Button 
            variant="outlined" 
            color="error" 
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Cerrar sesión
          </Button>
        </Box>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <Box className={'col-span-12 md:col-span-6 md:col-start-4 flex flex-col text-center text-base  mx-2 my-auto space-y-4 p-4  shadow-lg'}>
        <h2>Login</h2>    
        <TextField 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <UserCircleIcon className="h-5 w-5 text-gray-500" />
              </InputAdornment>
            ),
          }}
        />
        <TextField 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon className="h-5 w-5 text-gray-500" />
              </InputAdornment>
            ),
          }}
        />
        <Button onClick={handleLogin}>Entrar</Button>
      </Box>
    </div>
  );
}
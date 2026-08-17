"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages = {
    CredentialsSignin: "Usuario o contraseña incorrectos.",
    AccessDenied: "Acceso denegado.",
    Configuration: "Error de configuración.",
    default: "Ha ocurrido un error inesperado.",
  };

  const message = errorMessages[error] || errorMessages.default;

  return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-bold mb-4">Error de autenticación</h2>
      <p className="mb-6">{message}</p>
      <Link href="/login" className="text-blue-600 hover:underline">
        Volver al login
      </Link>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Cargando error...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
}

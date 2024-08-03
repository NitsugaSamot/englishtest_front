
'use client';  
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1>Bienvenido al Test de Inglés</h1>
      <Link href="/login">
        Iniciar Sesión
      </Link>
    </div>
  );
};

export default Home;

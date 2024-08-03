
'use client';

import LoginForm from "../../components/login/Login";
import Image from "next/image";
import bgLogin from "../../public/images/bg_login.jpg"; 
const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-image">
        <Image src={bgLogin} alt="Login Background" layout="fill" objectFit="cover" />
      </div>
      <div className="login-form">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

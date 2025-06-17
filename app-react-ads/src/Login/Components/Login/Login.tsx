import React from 'react';
import type { FormEvent } from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className='login-container'>
      <div className='wrapper'>
        <form onSubmit={handleLogin}>
          <h1>Inicia Sesión</h1>
          <div className='input-box'>
            <input type="text" placeholder='Correo' required />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input type="password" placeholder='Contraseña' required />
            <FaLock className='icon' />
          </div>
          <div className='remember-forgot'>
            <label><input type="checkbox" /> Recuerdame </label>
            <a href="#">Olvidaste tu contraseña</a>
          </div>

          <button type='submit'>Ingresar</button>

          <div className='register-link'>
            <p>¿No tienes una cuenta? <a href="#">Registrate aquí</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

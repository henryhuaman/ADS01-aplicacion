import React from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); // Hook para navegar

  const handleLogin = (e) => {
    e.preventDefault(); // Evitar recarga de la página
    navigate('/dashboard'); // Redirigir al dashboard
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
            <p>D¿No tienes una cuenta? <a href="#">Registrate aquí</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

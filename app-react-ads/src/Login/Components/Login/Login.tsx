import React, { useState } from 'react';
import type { FormEvent } from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)?.value;

    try {
      // 1. Lógica para operador (puedes mantenerla si es necesaria)
      if (email === 'operador@usil.pe' && password === '12345') {
        navigate('/dashboard');
        return;
      }

      // 2. Lógica para interesado (conexión a tu API)
      const response = await axios.post('http://localhost:3000/interesados/login', {
        correo: email,
        contraseña: password
      });

      // 3. Guarda los datos del interesado y redirige
      localStorage.setItem('interesado', JSON.stringify(response.data));
      navigate('/interesado-dashboard'); // Cambia esta ruta según tu estructura
      
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Credenciales incorrectas');
      } else {
        setError('Error al conectar con el servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-container'>
      <div className='wrapper'>
        <form onSubmit={handleLogin}>
          <h1>Inicia Sesión</h1>
          {error && <div className="error-message">{error}</div>}
          <div className='input-box'>
            <input 
              type="text" 
              name="email"
              placeholder='Correo' 
              required 
            />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input 
              type="password" 
              name="password" 
              placeholder='Contraseña' 
              required 
            />
            <FaLock className='icon' />
          </div>
          <button type='submit' disabled={loading}>
            {loading ? 'Cargando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
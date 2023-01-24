import Field from '../components/Home/Field';
import React, { FormEvent, useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import FormData from 'form-data';
import { setLoginData } from '../redux/userSlice';
import Link from 'next/link';
import apiClient from '../utils/client';
import { useRouter } from 'next/router';
import { NotificationFailure } from '../components/Notifications';
import { LoginData } from '../types/login';
import { LoadRemove, LoadStart } from '../components/Loading';



function LoginForm() {
  const initialValues: LoginData = {
    email: '',
    password: ''
  };

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState<LoginData>(initialValues);
  const data = new FormData();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    resetForm();
    data.append('email', formData.email);
    data.append('password', formData.password);
    /* 
      TODO: 
      1. Check login
      2. Handle errors (if there is at least one) 
    */
    if (formData.password.length === 0 || formData.email.length === 0) {
      return NotificationFailure('Campos invalidos');
    }

    LoadStart();

    try {
      const response = await apiClient.post('/login', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      
      dispatch(setLoginData({ userId: response.data.userId, authToken: response.data.token }));

      LoadRemove();
      router.push('/chat');
    } catch (error) {
      NotificationFailure('El email o la contraseña son incorrectos');
      LoadRemove();
    }
  };

  const resetForm = () => {
    // data.delete('email');
    // data.delete('password');
  };


  return (
    <form
      id="login"
      className="right-side d-flex flex-column justify-content-center w-50 bg-chatter-green h-100 py-5 fs-1 fw-bold"
    >
      <Field
        title="E-MAIL"
        type="email"
        name="email"
        placeholder="Ingresa tu correo electrónico"
        onChange={handleInputChange}
      />

      <Field
        title="CONTRASEÑA"
        type="password"
        name="password"
        placeholder="Ingresa tu contraseña"
        onChange={handleInputChange}
      />

      <div className="content d-flex flex-column mb-5 d-flex align-items-start" data-aos="fade">
        <button type="submit" className="btn btn-primary" onClick={handleLogin}>
          Ingresar
        </button>
      </div>

      <div className="content text d-flex flex-row gap-2 mb-5 fs-6 fst-italic" data-aos="fade">
        <span>No tienes una cuenta?</span>
        <Link href="/register" className="text-chatter-blue">
          Registrate aquí
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;

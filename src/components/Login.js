import React from 'react';
import { Formik, Form, Field } from 'formik';
import { login } from '../services/api';
import {jwtDecode} from 'jwt-decode'; // jwtDecode import edildi

const Login = () => {
    return (
        <div>
            <h2>Login</h2>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                    login(values)
                        .then(response => {
                            const token = response.data;
                            if (token) {
                                localStorage.setItem('token', token);
                                const decoded = jwtDecode(token);
                                console.log(decoded);
                                window.location.href = "/home"; // Başarılı giriş sonrası yönlendirme
                            } else {
                                setErrors({ server: 'Token not received from server' });
                            }
                            setSubmitting(false);
                        })
                        .catch(error => {
                            console.error('Login error:', error);
                            setErrors({ server: 'Invalid username or password' });
                            setSubmitting(false);
                        });
                }}
            >
                {({ isSubmitting, errors }) => (
                    <Form>
                        <Field type="text" name="username" placeholder="Username" />
                        <Field type="password" name="password" placeholder="Password" />
                        <button type="submit" disabled={isSubmitting}>
                            Login
                        </button>
                        {errors.server && <div>{errors.server}</div>}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Modal from './common/Modal';
import styled from 'styled-components';

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });

    const RegisterSchemaWithConfirm = Yup.object().shape({
        username: Yup.string().required('Kullanıcı adı zorunludur'),
        password: Yup.string().required('Şifre zorunludur'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Şifreler eşleşmiyor').required('Şifre doğrulama zorunludur'),
        email: Yup.string().email('Geçersiz e-posta').required('E-posta zorunludur'),
    });

    const RegisterSchemaWithoutConfirm = Yup.object().shape({
        username: Yup.string().required('Kullanıcı adı zorunludur'),
        password: Yup.string().required('Şifre zorunludur'),
        email: Yup.string().email('Geçersiz e-posta').required('E-posta zorunludur'),
    });

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            const response = await register(values);
            if (response.status === 200) {
                navigate('/login');
            } else {
                throw new Error('Kayıt başarısız');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setFieldError('general', 'Kullanıcı adı veya e-posta zaten mevcut');
                setModalContent({ title: 'Kayıt Hatası', message: 'Kullanıcı adı veya e-posta zaten mevcut' });
            } else {
                setFieldError('general', 'Bir hata oluştu. Lütfen tekrar deneyin.');
                setModalContent({ title: 'Hata', message: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
            }
            setModalOpen(true);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Kayıt Ol</h2>
            <Formik
                initialValues={{ username: '', password: '', confirmPassword: '', email: '', showPassword: false }}
                validationSchema={showPassword ? RegisterSchemaWithoutConfirm : RegisterSchemaWithConfirm}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched, values, setFieldValue }) => (
                    <StyledForm>
                        <StyledField>
                            <Field type="text" name="username" placeholder="Kullanıcı Adı" />
                            {errors.username && touched.username ? <ErrorText>{errors.username}</ErrorText> : null}
                        </StyledField>
                        <StyledField>
                            <Field type={showPassword ? "text" : "password"} name="password" placeholder="Şifre" />
                            {errors.password && touched.password ? <ErrorText>{errors.password}</ErrorText> : null}
                        </StyledField>
                        {!showPassword && (
                            <StyledField>
                                <Field type="password" name="confirmPassword" placeholder="Şifreyi Doğrula" />
                                {errors.confirmPassword && touched.confirmPassword ? <ErrorText>{errors.confirmPassword}</ErrorText> : null}
                            </StyledField>
                        )}
                        <StyledField>
                            <Field type="email" name="email" placeholder="E-posta" />
                            {errors.email && touched.email ? <ErrorText>{errors.email}</ErrorText> : null}
                        </StyledField>
                        <StyledField>
                            <label>
                                <input
                                    type="checkbox"
                                    name="showPassword"
                                    checked={showPassword}
                                    onChange={() => {
                                        const newValue = !showPassword;
                                        setShowPassword(newValue);
                                        if (!newValue) {
                                            setFieldValue('confirmPassword', '');
                                        }
                                    }}
                                />
                                Şifreyi Göster
                            </label>
                        </StyledField>
                        <button type="submit" disabled={isSubmitting}>
                            Kayıt Ol
                        </button>
                        {errors.general && <ErrorText>{errors.general}</ErrorText>}
                    </StyledForm>
                )}
            </Formik>
            {modalOpen && (
                <Modal
                    title={modalContent.title}
                    message={modalContent.message}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
};

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const StyledField = styled.div`
    display: flex;
    flex-direction: column;
`;

const ErrorText = styled.div`
    color: red;
    font-size: 12px;
`;

export default Register;

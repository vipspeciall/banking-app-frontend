import React from 'react';
import { Formik, Form, Field } from 'formik';
import { createAccount } from '../services/api';

const CreateAccount = () => {
    return (
        <div>
            <h2>Create Account</h2>
            <Formik
                initialValues={{ name: '', number: '', balance: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    createAccount(values).then(response => {
                        console.log(response);
                        setSubmitting(false);
                    });
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="name" placeholder="Name" />
                        <Field type="text" name="number" placeholder="Account Number" />
                        <Field type="number" name="balance" placeholder="Balance" />
                        <button type="submit" disabled={isSubmitting}>
                            Create Account
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateAccount;

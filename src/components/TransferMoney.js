import React from 'react';
import { Formik, Form, Field } from 'formik';
import { transferMoney } from '../services/api';

const TransferMoney = () => {
    return (
        <div>
            <h2>Transfer Money</h2>
            <Formik
                initialValues={{ fromAccountId: '', toAccountId: '', amount: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    transferMoney(values).then(response => {
                        console.log(response);
                        setSubmitting(false);
                    });
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="fromAccountId" placeholder="From Account ID" />
                        <Field type="text" name="toAccountId" placeholder="To Account ID" />
                        <Field type="number" name="amount" placeholder="Amount" />
                        <button type="submit" disabled={isSubmitting}>
                            Transfer
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default TransferMoney;

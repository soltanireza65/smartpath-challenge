'use client'

import AppCard from '@/components/AppCard'
import { Box } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import * as yup from 'yup'

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

type Props = {

}

const SignInPage = (props: Props) => {
    return (
        <Box flex={1}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <AppCard>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));
                            alert(JSON.stringify(values, null, 2));
                        }}
                    >
                        <Form>
                            <label htmlFor="firstName">First Name</label>
                            <Field id="firstName" name="firstName" placeholder="Jane" />

                            <label htmlFor="lastName">Last Name</label>
                            <Field id="lastName" name="lastName" placeholder="Doe" />

                            <label htmlFor="email">Email</label>
                            <Field
                                id="email"
                                name="email"
                                placeholder="jane@acme.com"
                                type="email"
                            />
                            <button type="submit">Submit</button>
                        </Form>
                    </Formik>
                </AppCard>
                {/* <Link href="/">Home</Link> */}
            </Box>
        </Box>
    )
}

export default SignInPage
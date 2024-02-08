"use client";

import AppCard from "@/components/AppCard";
import AppFormInput from "@/components/AppFormInput";
import {
    Box,
    Button,
    Typography
} from "@mui/material";
import { Form, Formik } from "formik";
import Link from "next/link";
import * as yup from "yup";

const validationSchema = yup.object({
    name: yup.string().required("name is required"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
});

type Props = {};

const SignUpPage = (props: Props) => {
    return (
        <Box flex={1}>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <>ICON</>
                <Typography variant="h4">Create an account</Typography>
                <Typography
                    color="text.secondary"
                    mb={4}
                >
                    Start your 30-day free trial
                </Typography>
                <AppCard>
                    <Formik
                        initialValues={{
                            name: undefined,
                            email: undefined,
                            password: undefined,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));
                            alert(JSON.stringify(values, null, 2));
                        }}
                    >
                        {({ values, errors, handleChange, touched }) => (
                            <Form>
                                <Box display="flex" flexDirection="column" gap={2} width={300}>
                                    <AppFormInput label="Name" name="name" required value={values.name} onChange={handleChange} {...(touched.name ? { error: errors.name } : {})} />
                                    <AppFormInput label="Email" name="email" required value={values.email} onChange={handleChange} {...(touched.email ? { error: errors.email } : {})} />
                                    <AppFormInput label="Password" caption="Must be at least 8 characters." name="password" required value={values.password} onChange={handleChange} {...(touched.password ? { error: errors.password } : {})} />

                                    <Button variant="contained" fullWidth type="submit">Submit</Button>
                                    <Button variant="contained" fullWidth>GOOLE</Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </AppCard>
                <Box mt={4}>

                    <Typography
                        color="text.secondary"
                        fontSize={12}
                        mb={4}
                    >
                        Already have an account? <Link href="/auth/signin">signin</Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default SignUpPage;

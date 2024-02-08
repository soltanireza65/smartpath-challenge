"use client";

import AppCard from "@/components/AppCard";
import {
    Box,
    Button,
    FormGroup,
    FormLabel,
    TextField,
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
                            confirmPassword: undefined,
                        }}
                        // validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));
                            alert(JSON.stringify(values, null, 2));
                        }}
                    >
                        {(formik) => (
                            <Form>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    gap={2}
                                    width={300}
                                >
                                    <FormGroup>
                                        <FormLabel>Name*</FormLabel>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="name"
                                            type="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Email*</FormLabel>

                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="email"
                                            type="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.email && Boolean(formik.errors.email)
                                            }
                                            helperText={formik.touched.email && formik.errors.email}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Password*</FormLabel>

                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="password"
                                            type="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.password &&
                                                Boolean(formik.errors.password)
                                            }
                                            helperText={
                                                formik.touched.password && formik.errors.password
                                            }
                                        />
                                        <Typography fontSize={12} color={"text.secondary"}>Must be at least 8 characters.</Typography>
                                    </FormGroup>

                                    <Button
                                        variant="contained"
                                        fullWidth
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
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

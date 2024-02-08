import { Box, Button, Card, CardBody, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import AppFormInput from '../components/AppFormInput';
import GoogleIcon from '../components/icons/GoogleIcon';
import { useAuth } from '../hooks/useAuth';
import { apiClient } from '../utils/apiClient';

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

const SignUpPage = () => {
  const navigate = useNavigate();

  const { setAccessToken } = useAuth()

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
        <Text fontSize={24} fontWeight="700">Create an account</Text>
        <Text fontSize={12} color="text.secondary" mb={4}>
          Start your 30-day free trial
        </Text>
        <Card>
          <CardBody>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                try {
                  const { data } = await apiClient.post("/auth/signup", values)
                  const { accessToken } = data
                  if (accessToken) {
                    setAccessToken(accessToken)
                    navigate("/");
                  }
                } catch (error) {
                  console.error("🚀 ~ onSubmit= ~ error:", error)
                }
              }}
            >
              {({ values, errors, handleChange, touched }) => (
                <Form>
                  <Box display="flex" flexDirection="column" gap={2} width={300}>
                    <AppFormInput label="Name" name="name" required value={values.name} onChange={handleChange} {...(touched.name ? { error: errors.name } : {})} />
                    <AppFormInput label="Email" name="email" required value={values.email} onChange={handleChange} {...(touched.email ? { error: errors.email } : {})} />
                    <AppFormInput label="Password" name="password" required value={values.password} onChange={handleChange} {...(touched.password ? { error: errors.password } : {})} />

                    <Button width="100%" colorScheme='teal' type="submit">Submit</Button>
                    <Button display="flex" gap={2}>
                      <GoogleIcon />
                      <Text>Sign up with google</Text>
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>

          </CardBody>
        </Card>
        <Box mt={4}>
          <Box display="flex" gap={2} alignItems="center">
            <Text fontSize={12} color="text.secondary">Already have an account?</Text>
            <Text fontSize={12} cursor="pointer" color="green" onClick={() => navigate("/auth/signin")}>signin</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default SignUpPage
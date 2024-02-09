import { Box, Button, Card, CardBody, Checkbox, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import AppFormInput from '../components/AppFormInput';
import GoogleIcon from '../components/icons/GoogleIcon';
import { useAuth } from '../hooks/useAuth';
import { apiClient } from '../utils/apiClient';
import { getGoogleOAuthUrl } from '../utils/google';

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const SignInPage = () => {
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
        <Text fontSize={24} fontWeight="700">Log in to your account</Text>
        <Text fontSize={12} color="text.secondary" mb={4}>
          Wellcome back! Please enter your details.
        </Text>
        <Card>
          <CardBody>
            <Formik
              initialValues={{
                email: "",
                password: "",
                remember: true
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                try {
                  const { data } = await apiClient.post("/auth/signin", values)
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
              {({ values, errors, handleChange, touched , setFieldValue}) => (
                <Form>
                  <Box display="flex" flexDirection="column" gap={2} width={300}>
                    <AppFormInput label="Email" name="email" required value={values.email} onChange={handleChange} {...(touched.email ? { error: errors.email } : {})} />
                    <AppFormInput label="Password" name="password" required value={values.password} onChange={handleChange} {...(touched.password ? { error: errors.password } : {})} />
                    <Box display="flex" justifyContent="space-between">
                      <Checkbox defaultChecked={values.remember} onChange={(e) => setFieldValue('remember', !values.remember)} size="md"><Text fontSize={12}>Remember for 30 days</Text></Checkbox>
                      <Link to='/auth/reset-password'><Text color="green" fontSize={12}>Forgot password</Text></Link>
                    </Box>
                    <Button width="100%" colorScheme='teal' type="submit">Submit</Button>
                    <a href={getGoogleOAuthUrl()}>
                      <Button w="100%" display="flex" gap={2}>
                        <GoogleIcon />
                        <Text>Sign in with google</Text>
                      </Button>
                    </a>
                  </Box>
                </Form>
              )}
            </Formik>

          </CardBody>
        </Card>
        <Box mt={4}>
          <Box display="flex" gap={2} alignItems="center">
            <Text fontSize={12} color="text.secondary">Don't have an account?</Text>
            <Text fontSize={12} cursor="pointer" color="green" onClick={() => navigate("/auth/signup")}>signup</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default SignInPage
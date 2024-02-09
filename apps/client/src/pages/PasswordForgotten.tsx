import { Box, Button, Card, CardBody, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import AppFormInput from '../components/AppFormInput';
import { useAuth } from '../hooks/useAuth';
import { apiClient } from '../utils/apiClient';

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const PasswordForgotten = () => {
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
        <Text fontSize={24} fontWeight="700">Forgot password</Text>
        <Text fontSize={12} color="text.secondary" mb={4}>
          No worries, we'll send you reset instructions.
        </Text>
        <Card>
          <CardBody>
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                try {
                  const { data } = await apiClient.post("/auth/password-forgot", values)
                  const { resetCode } = data
                  if (resetCode) {
                    // setAccessToken(accessToken)
                    navigate(`/auth/password-reset-verify?code=${resetCode}&email=${values.email}`, { state: { resetCode } });
                  }
                } catch (error) {
                  console.error("🚀 ~ onSubmit= ~ error:", error)
                }
              }}
            >
              {({ values, errors, handleChange, touched }) => (
                <Form>
                  <Box display="flex" flexDirection="column" gap={2} width={300}>
                    <AppFormInput label="Email" name="email" required value={values.email} onChange={handleChange} {...(touched.email ? { error: errors.email } : {})} />
                    <Button width="100%" colorScheme='teal' type="submit">Reset password</Button>
                  </Box>
                </Form>
              )}
            </Formik>

          </CardBody>
        </Card>
        <Box mt={4}>
          <Box display="flex" gap={2} alignItems="center">
            <Text fontSize={12} cursor="pointer" color="green" onClick={() => navigate("/auth/signin")}>back to log in</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PasswordForgotten
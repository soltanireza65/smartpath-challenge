import { Box, Button, Card, CardBody, Flex, HStack, PinInput, PinInputField, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import AppFormInput from '../components/AppFormInput';
import { useAuth } from '../hooks/useAuth';
import { apiClient } from '../utils/apiClient';
import AppPinInput from '../components/AppPinInput';

const validationSchema = yup.object({
  code: yup
    .number()
    .required("Verification Code is required"),
});

const PasswordReset = () => {
  const navigate = useNavigate();
  const params = useParams()
  const searchParams = new URLSearchParams(document.location.search)
  console.log("🚀 ~ PasswordReset ~ searchParams:", searchParams.get('code'))

  console.log("🚀 ~ PasswordReset ~ params:", params)

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
                code: searchParams.get('code') ?? "",
                email: searchParams.get('email') ?? "",
                password: "",
                passwordConfirmation: "",
              }}
              // validationSchema={validationSchema}
              onSubmit={async (values) => {
                const { passwordConfirmation, ...rest } = values
                try {
                  const { data } = await apiClient.post("/auth/password-reset", rest)
                  const { success } = data
                  if (success) {
                    navigate(`/`);
                  }
                } catch (error) {
                  // console.error("🚀 ~ onSubmit= ~ error:", error)
                }
              }}
            >
              {({ values, errors, handleChange, touched, setFieldValue }) => (
                <Form>
                  <Box display="flex" flexDirection="column" gap={4} width={300}>
                    {/* {values.code}
                    {values.email} */}
                    <AppFormInput label="Password" name="password" required value={values.password} onChange={handleChange} {...(touched.password ? { error: errors.password } : {})} />
                    <AppFormInput label="PasswordConfirmation" name="passwordConfirmation" required value={values.passwordConfirmation} onChange={handleChange} {...(touched.passwordConfirmation ? { error: errors.passwordConfirmation } : {})} />
                    <Button width="100%" colorScheme='teal' type="submit">Verify email</Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
        <Box mt={4}>
          <Flex gap={2}>
            <Text fontSize={12} color="text.secondary" mb={4}>
              Didn't receive the code?
            </Text>
            <Text fontSize={12} color="teal" mb={4}>
              Click to resent
            </Text>
          </Flex>
          <Flex justifyContent="center" gap={2} alignItems="center">
            <Text fontSize={12} cursor="pointer" color="teal" onClick={() => navigate("/auth/signin")}>back to log in</Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default PasswordReset
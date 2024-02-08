import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup
} from "@chakra-ui/react";
import { useField } from "formik";
import { FC, InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: any;
  label?: string;
  isRequired?: boolean;
  height?: string;
  name: string;
  flex?: number;
  placeHolder?: string;
  variant?: "outline" | "filled" | "flushed" | "unstyled";
  value?: string | number;
  type?: "text" | "number" | "password";
  size?: "lg" | "md" | "sm" | "xs";
};
const AppFormInput: FC<InputFieldProps> = ({
  ref,
  label,
  required,
  height,
  variant = "outline",
  size,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);

  return (
    <FormControl isInvalid={!!error} bg="white">
      {label && (
        <FormLabel flex={1} htmlFor={field.name}>
          {label}{required && <Box display="inline">*</Box>}
        </FormLabel>
      )}
      <InputGroup>
        <Input
          ref={ref}
          _active={{}}
          _focus={{}}
          id={field.name}
          variant={variant}
          height={height}
          size={size}
          // autoComplete="off"
          {...field}
          {...props}
        />
      </InputGroup>
      {error && touched ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default AppFormInput;

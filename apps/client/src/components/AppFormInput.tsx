import { FormGroup, FormLabel, TextField, Typography } from "@mui/material";
import React, { FC, InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  caption?: string;
  name: string;
  type?: "text" | "email" | "password";
  required?: boolean;
  error?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};
const AppFormInput: FC<InputFieldProps> = ({
  label,
  caption,
  name,
  value,
  type = "text",
  error,
  required,
  onBlur,
  onChange,
}) => {

  return (
    <FormGroup>
      <FormLabel>{label}{required && "*"}</FormLabel>
      <TextField
        fullWidth
        size="small"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        helperText={error}
      />
      {caption && <Typography fontSize={12} color={"text.secondary"}>{caption}</Typography>}
    </FormGroup>
  );
};

export default AppFormInput;

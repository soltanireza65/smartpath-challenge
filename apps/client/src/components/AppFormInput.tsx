import { Box, FormControl, FormLabel, Input, TextField } from "@mui/material";
import { useField } from "formik";
import React, { FC, InputHTMLAttributes, useState } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: any;
  textAlign?: "right" | "left"
  needEditable?: boolean;
  label?: string;
  isRequired?: boolean;
  height?: string;
  name: string;
  textarea?: boolean;
  maxLength?: number | undefined;
  minLength?: number | undefined;
  flex?: number;
  isReadOnly?: boolean;
  placeHolder?: string;
  width?: string;
  variant?: "outline" | "filled" | "flushed" | "unstyled";
  value?: string | number;
  type?: "text" | "number" | "password";
  size?: "lg" | "md" | "sm" | "xs";
  inputSize?: "lg" | "md" | "sm" | "xs";
  autoFocus?: boolean;
  LeftAddon?: FC;
  leftAddonOnClick?: () => void;
  RightAddon?: FC;
  rightAddonOnClick?: () => void;
  LeftElement?: FC;
  leftElementOnClick?: () => void;
  RightElement?: FC;
  rightElementOnClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};
const AppFormInput: FC<InputFieldProps> = ({
  maxLength = undefined,
  minLength = undefined,
  ref,
  textAlign = "right",
  needEditable,
  label,
  isRequired,
  height,
  textarea,
  variant = "outline",
  size = "md",
  inputSize,
  LeftAddon,
  leftAddonOnClick,
  RightAddon,
  rightAddonOnClick,
  LeftElement,
  leftElementOnClick,
  RightElement,
  rightElementOnClick,

  ...props
}) => {
  const [field, { error, touched }] = useField(props);

  return (
    <FormControl>
      {label && (
        <FormLabel htmlFor={field.name}>
          {label}
          {isRequired && <i className="avg red">*</i>}
        </FormLabel>
      )}
      <Box>
       
        <TextField
          // ref={ref}
          // maxLength={maxLength}
          // minLength={minLength}
          // disabled={isReadonly}
          // textAlign={textAlign}
          // _placeholder={{
          //   direction: "rtl",
          //   textAlign: "right"
          // }}
          // _active={{}}
          // _focus={{}}
          {...field}
          // {...(needEditable && { paddingLeft: "12" })}
          id={field.name}
          // // variant={variant}
          // // height={height}
          // {...props}
          // // size={inputSize}
          // autoComplete="off"
        />
        
        
      </Box>
      {error && touched ? <Box>{error}</Box> : null}
    </FormControl>
  );
};

export default AppFormInput;

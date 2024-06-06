import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  disabled?: boolean;
};

const CSInput = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth,
  sx,
  required,
  multiline = false,
  disabled = false,
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={{ ...sx }}
          label={label}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          placeholder={label}
          required={required}
          multiline={multiline}
          rows={multiline ? 4 : 1}
          disabled={disabled}
          error={!!error?.message}
          helperText={error ? error.message : ""}
        />
      )}
    />
  );
};

export default CSInput;

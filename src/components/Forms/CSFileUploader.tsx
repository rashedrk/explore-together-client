import { SxProps, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useFormContext } from "react-hook-form";

type TProps = {
  name: string;
  label?: string;
  sx?: SxProps;
};

export default function CSFileUploader({ name, label, sx }: TProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ ...sx }}
          >
            {label || "Upload file"}
            <input
              {...field}
              multiple={true}
              type="file"
              value={value?.fileName}
              onChange={(e) =>
                onChange((e?.target as HTMLInputElement).files)
              }
              style={{ display: "none" }}
            />
          </Button>
        );
      }}
    />
  );
}
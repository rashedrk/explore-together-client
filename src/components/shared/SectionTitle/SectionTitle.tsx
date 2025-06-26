import { Typography } from "@mui/material";

const SectionTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <>
      <Typography
        sx={{
          fontWeight: 700,
          color: "#113D48",
          fontSize: 30,
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" marginBottom={3} textAlign="center">
        {description}
      </Typography>
    </>
  );
};

export default SectionTitle;

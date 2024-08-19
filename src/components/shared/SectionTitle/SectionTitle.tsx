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
      <Typography  sx={{
        fontWeight: 700,
        color: '#011d30',
        fontSize: 25, 
        textTransform: 'uppercase'
      }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary" marginBottom={3}>{description}</Typography>
    </>
  );
};

export default SectionTitle;

import { Box, Container, Paper } from "@mui/material";
import bg from "../../../../assets/bg.jpg"
import Image from "next/image";

const HeroSection = () => {
    return (
        <Container >
            <Paper sx={{
                background: `url("${bg}")`,
                backgroundSize: 'cover',
                mb: 10
            }} >
                
                <Image height={700} src={bg} alt="bg"/>
            </Paper>
        </Container>
    );
};

export default HeroSection;
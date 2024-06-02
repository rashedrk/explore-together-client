import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#00AEEF",
        },
        secondary: {
            main: "#FF7F50"
        }
    },

    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
            },
            styleOverrides: {
                root: {
                    color: "#FFFFFF"
                }

            }
        }
    }
})
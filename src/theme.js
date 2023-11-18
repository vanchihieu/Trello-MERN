import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const theme = extendTheme({
    trello: {
        appBarHeight: '58px',
        boardBarHeight: '60px',
    },
    colorSchemes: {
        light: {
           
        },
        dark: {
            palette: {
                gradient:
                    "linear-gradient(to left, var(--mui-palette-primary-light), var(--mui-palette-primary-main))",
                border: {
                    subtle: "var(--mui-palette-neutral-600)",
                },
            },
        },
    },
});

export default theme;

import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const theme = extendTheme({
    trello: {
        appBarHeight: "58px",
        boardBarHeight: "60px",
    },
    colorSchemes: {
        light: {},
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
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root:({theme})=>({
                    color: theme.palette.primary.main,
                    fontSize: "1rem",
                })
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.primary.main,
                    fontSize: "1rem",
                    ".MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.primary.light,
                    },
                    "&:hover": {
                        ".MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.primary.main,
                        },
                    },
                    "& fieldset": {
                        borderWidth: "1px !important",
                    },
                }),
            },
        },
    },
});

export default theme;

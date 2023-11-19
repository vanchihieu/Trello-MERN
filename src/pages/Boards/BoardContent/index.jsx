import React from "react";
import Box from "@mui/material/Box";

const BoardContent = () => {
    return (
        <Box
            sx={{
                bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
                borderBottom: "1px solid #white",
                width: "100%",
                height: (theme) =>
                    `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
                display: "flex",
                alignItems: "center",
            }}
        >
            Board content
        </Box>
    );
};

export default BoardContent;

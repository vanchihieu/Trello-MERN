import React from "react";

import Box from "@mui/material/Box";
import Card from "./Card/Card";
const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "56px";
const ListCards = () => {
    return (
        <Box
            sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                overflowX: "hidden",
                overflowY: "auto",
                maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} -
                  ${theme.spacing(5)} -
                  ${COLUMN_HEADER_HEIGHT} -
                  ${COLUMN_FOOTER_HEIGHT}
                  )`,
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#ced0da",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#bfc2cf",
                },
            }}
        >
            <Card />
            <Card temporaryHideMedia/>
        </Box>
    );
};

export default ListCards;

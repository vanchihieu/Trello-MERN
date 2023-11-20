import React from "react";
import ListColumns from "./ListColumns/ListColumns";
import Box from "@mui/material/Box";
import { mapOrder } from "~/utils/sorts";

const BoardContent = ({ board }) => {
    const orderedColumns = mapOrder(
        board?.columns,
        board?.columnOrderIds,
        "_id"
    );
    return (
        <Box
            sx={{
                bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
                borderBottom: "1px solid #white",
                width: "100%",
                height: (theme) => theme.trello.boardContentHeight,
                p: "10px 0",
            }}
        >
            <ListColumns columns={orderedColumns} />
        </Box>
    );
};

export default BoardContent;

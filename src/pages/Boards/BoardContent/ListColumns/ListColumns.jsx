import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Column from "./Column/Column";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import {
    SortableContext,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

/**
 * SortableContext yêu cầu items là 1 array các id của các columns
 * nếu không đúng thì vẫn kéo thả được nhưng không có animation
 *
 */
const ListColumns = ({ columns }) => {
    return (
        <SortableContext
            items={columns?.map((c) => c._id)}
            strategy={horizontalListSortingStrategy}
        >
            <Box
                sx={{
                    bgcolor: "inherit",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    overflowX: "auto",
                    overflowY: "hidden",
                    "&::-webkit-scrollbar-track": {
                        m: 0,
                    },
                }}
            >
                {columns?.map((column) => (
                    <Column key={column._id} column={column} />
                ))}

                {/* Box add new column */}
                <Box
                    sx={{
                        minWidth: "200px",
                        maxWidth: "200px",
                        mx: 2,
                        borderRadius: "6px",
                        height: "fit-content",
                        bgcolor: "#ffffff3d",
                    }}
                >
                    <Button
                        startIcon={<NoteAddIcon />}
                        sx={{
                            color: "white",
                            width: "100%",
                            justifyContent: "flex-start",
                            pl: 2.5,
                            py: 1,
                        }}
                    >
                        Add new column
                    </Button>
                </Box>
            </Box>
        </SortableContext>
    );
};

export default ListColumns;

import React, { useEffect, useState } from "react";
import ListColumns from "./ListColumns/ListColumns";
import Box from "@mui/material/Box";
import { mapOrder } from "~/utils/sorts";

import {
    DndContext,
    // PointerSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const BoardContent = ({ board }) => {
    const [orderedColumns, setOrderedColumns] = useState([]);

    // yêu cầu chuột di chuyển 10px thì mới kích hoạt event, fix trường hợp click bị gọi event
    // nếu dùng pointerSensor mặc định thì phải kết hợp thuộc tính CSS touchAction: "none" ở những phần tử kéo thả - nhưng mà còn bug
    // const pointerSensor = useSensor(PointerSensor, {
    //     activationConstraint: {
    //         distance: 10,
    //     },
    // });

    // yêu cầu chuột di chuyển 10px thì mới kích hoạt event, fix trường hợp click bị gọi event
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    });

    // Nhấn giữ 250ms và dung sai của cảm ứng 500px thì mới kích hoạt event
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 500,
        },
    });

    // const sensors = useSensors(pointerSensor);
    // Ưu tiên sử dụng kết hợp 2 loại sensors là MouseSensor và TouchSensor để có trải nghiệm trên mobile tốt nhất, không bị bug
    const sensors = useSensors(mouseSensor, touchSensor);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        // nếu vị trí sau khi kéo thả khác với vị trí ban đầu
        if (active.id !== over.id) {
            const oldIndex = orderedColumns.findIndex(
                (c) => c._id === active.id
            );
            const newIndex = orderedColumns.findIndex((c) => c._id === over.id);

            // Dùng arrayMove của dnd-kit để sắp xếp lại mảng Columns ban đầu
            const dndOrderedColumns = arrayMove(
                orderedColumns,
                oldIndex,
                newIndex
            );
            // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
            // console.log(dndOrderedColumnsIds);

            // cập nhật lại state columns sau khi đã kéo thả
            setOrderedColumns(dndOrderedColumns);
        }
    };

    useEffect(() => {
        setOrderedColumns(
            mapOrder(board?.columns, board?.columnOrderIds, "_id")
        );
    }, [board]);

    return (
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
        </DndContext>
    );
};

export default BoardContent;

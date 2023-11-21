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
    DragOverlay,
    defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import { cloneDeep } from "lodash";
const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
    CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

const BoardContent = ({ board }) => {
    const [orderedColumns, setOrderedColumns] = useState([]);

    // cùng một thời điểm chỉ có một phần tử đang được kéo (column hoặc card)
    const [activeDragItemId, setActiveDragItemId] = useState(null);
    const [activeDragItemType, setActiveDragItemType] = useState(null);
    const [activeDragItemData, setActiveDragItemData] = useState(null);

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

    const findColumnByCardId = (cardId) => {
        return orderedColumns.find((column) =>
            column?.cards?.map((card) => card._id)?.includes(cardId)
        );
    };

    const handleDragStart = (event) => {
        console.log(event);
        setActiveDragItemId(event?.active?.id);
        setActiveDragItemType(
            event?.active?.data?.current?.columnId
                ? ACTIVE_DRAG_ITEM_TYPE.CARD
                : ACTIVE_DRAG_ITEM_TYPE.COLUMN
        );
        setActiveDragItemData(event?.active?.data?.current);
    };

    // trigger trong quá trình kéo (drag) một phần tử
    const handleDragOver = (event) => {
        // không làm gì thêm neues đang kéo column
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

        const { active, over } = event;

        if (!active || !over) return;

        //activeDraggingCard là cái card đang được kéo
        const {
            id: activeDraggingCardId,
            data: { current: activeDraggingCardData },
        } = active;

        // overCard là cái card đang tương tác trên hoặc dưới so với các card được kéo ở trên
        const { id: overCardId } = over;

        // tìm 2 cái columns theo cardId
        const activeColumn = findColumnByCardId(activeDraggingCardId);
        const overColumn = findColumnByCardId(overCardId);

        if (!activeColumn || !overColumn) return;

        if (activeColumn._id !== overColumn._id) {
            setOrderedColumns((prevColumns) => {
                // Tìm vị trí của overCard trong column đích (nơi mà activeCard sắp được thả)
                const overCardIndex = overColumn?.cards?.findIndex(
                    (card) => card?._id === overCardId
                );

                // Logic tính toán 'cảdIndex mới' (trên hoặc dưới của overCard) lấy chuẩn ra từ code của thư viện
                let newCardIndex;
                const isBelowOverItem =
                    active.rect.current.translated &&
                    active.rect.current.translated.top >
                        over.rect.top + over.rect.height;
                const modifier = isBelowOverItem ? 1 : 0;
                newCardIndex =
                    overCardIndex >= 0
                        ? overCardIndex + modifier
                        : overColumn?.cards?.length + 1;

                // clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return
                const nextColumns = cloneDeep(prevColumns);
                const nextActiveColumn = nextColumns.find(
                    (column) => column._id === activeColumn._id
                );
                const nextOverColumn = nextColumns.find(
                    (column) => column._id === overColumn._id
                );
                
                // column cũ
                if (nextActiveColumn) {
                    // xóa card ở cái column active (cũng có thể hiểu là column cũ, cái lúc mà kéo card ra khỏi nó để sang column khác)
                    nextActiveColumn.cards = nextActiveColumn.cards.filter(
                        (card) => card._id !== activeDraggingCardId
                    );

                    // cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
                    nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
                        (card) => card._id
                    );
                }

                // column mới
                if (nextOverColumn) {
                    // kiểm tra xem card đang kéo nó có tồn tại ở overColumn hay chưa, nếu có thì cần xóa nó trước
                    nextOverColumn.cards = nextOverColumn.cards.filter(
                        (card) => card._id !== activeDraggingCardId
                    );

                    // tiếp theo là thêm cái card đang kéo vào overColumn theo vị trí index mới
                    nextOverColumn.cards = nextOverColumn.cards.toSpliced(
                        newCardIndex,
                        0,
                        activeDraggingCardData
                    );

                    // cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
                    nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
                        (card) => card._id
                    );
                }

                return nextColumns;
            });
        }
    };

    const handleDragEnd = (event) => {
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            // console.log('khong lam gi ca');
        }
        const { active, over } = event;

        if (!active || !over) return;

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

        setActiveDragItemId(null);
        setActiveDragItemType(null);
        setActiveDragItemData(null);
    };

    const customDropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: { active: { opacity: "0.5" } },
        }),
    };

    useEffect(() => {
        setOrderedColumns(
            mapOrder(board?.columns, board?.columnOrderIds, "_id")
        );
    }, [board]);

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
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

                <DragOverlay dropAnimation={customDropAnimation}>
                    {!activeDragItemType && null}
                    {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
                        <Column column={activeDragItemData} />
                    )}
                    {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
                        <Card card={activeDragItemData} />
                    )}
                </DragOverlay>
            </Box>
        </DndContext>
    );
};

export default BoardContent;

import React from "react";
import { useState } from 'react';
import KanbanColumn from './KanbanColumn';

export const COLUMN_KEY_TODO = 'todo';
export const COLUMN_KEY_ONGOING = 'ongoing';
export const COLUMN_KEY_DONE = 'done';
export default function KanbanBoard({ loading = true, todoList, ongoingList, doneList, onAdd, onRemove }) {
    const [draggedItem, setDraggedItem] = useState(null);
    const [dragSource, setDragSource] = useState(null);
    const [dragTarget, setDragTarget] = useState(null);
    const handleDrop = (evt) => {
        if (!draggedItem || !dragSource || !dragTarget || dragSource === dragTarget) { return; }
        dragSource && onRemove(dragSource, draggedItem)
        dragTarget && onAdd(dragTarget, draggedItem)
    };
    return (
        <main className="kanban-board">  {loading ? (
            <KanbanColumn title="读取中..." className="column-loading"></KanbanColumn>
        ) : (
            <>
                <KanbanColumn className="column-todo" title="待处理"
                    setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_TODO : null)}
                    setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_TODO : null)}
                    onDrop={handleDrop}
                    cardList={todoList}
                    setDraggedItem={setDraggedItem}
                    canAddNew={true}
                    onAdd={onAdd.bind(null, COLUMN_KEY_TODO)}>
                </KanbanColumn>
                <KanbanColumn className="column-ongoing" title="进行中"
                    setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_ONGOING : null)}
                    setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_ONGOING : null)}
                    onDrop={handleDrop}
                    cardList={ongoingList}
                    setDraggedItem={setDraggedItem}>
                </KanbanColumn>
                <KanbanColumn className="column-done" title="已完成"
                    setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_DONE : null)}
                    setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_DONE : null)}
                    onDrop={handleDrop}
                    cardList={doneList}
                    setDraggedItem={setDraggedItem}
                    onRemove={onRemove.bind(null, COLUMN_KEY_DONE)}>
                </KanbanColumn>
            </>
        )}</main>
    );
}
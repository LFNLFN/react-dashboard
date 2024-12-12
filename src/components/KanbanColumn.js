import React from "react";
import { useState } from "react";
import KanbanCard from "./KanbanCard";
import KanbanNewCard from "./KanbanNewCard";

const KanbanColumn = ({ className, title, setIsDragSource, setIsDragTarget, onDrop, cardList = [], setDraggedItem, canAddNew = false, onAdd, onRemove }) => {
    const combinedClassName = `kanban-column ${className}`;
    const [visible, setVisible] = useState(false)

    const handleSubmit = (newCard) => {
        onAdd && onAdd(newCard)
        setVisible(false)
    }

    return (
        <section className={combinedClassName}
            onDragStart={() => setIsDragSource(true)}
            onDragOver={(evt) => { evt.preventDefault(); evt.dataTransfer.dropEffect = 'move'; setIsDragTarget(true) }}
            onDragLeave={(evt) => { evt.preventDefault(); evt.dataTransfer.dropEffect = 'none'; setIsDragTarget(false) }}
            onDrop={(evt) => { evt.preventDefault(); onDrop(evt) }}
            onDragEnd={(evt) => { evt.preventDefault(); setIsDragTarget(false); setIsDragSource(false) }}
        >
            <h2>
                {title}
                {canAddNew && (<button onClick={() => setVisible(true)} disabled={visible}>&#8853; 添加新卡片</button>)}
            </h2>
            <ul>
                {canAddNew && visible && <KanbanNewCard onSubmit={handleSubmit} />}
                {cardList.map((props) => (
                    <KanbanCard key={props.title} {...props} onDragStart={() => setDraggedItem(props)} onRemove={onRemove} />
                ))}
            </ul>
        </section>
    );
};

export default KanbanColumn
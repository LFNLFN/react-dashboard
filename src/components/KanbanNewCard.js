import React from "react";
import { useState, useEffect, useRef } from 'react';

const KanbanNewCard = ({ onSubmit }) => {

    const [title, setTitle] = useState('')
    const inputRef = useRef(null)

    const handleKeyDown = (evt) => {
        if (evt.key === 'Enter') {
            onSubmit({ title, status: new Date().getTime() })
        }
    }

    const handleChange = (evt) => {
        setTitle(evt.target.value)
    }

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <li className="kanban-card">
            <h3>添加新卡片</h3>
            <div className="card-title">
                <input type="text" ref={inputRef} value={title} onChange={handleChange} onKeyDown={handleKeyDown} />
            </div>
        </li>
    );
};

export default KanbanNewCard
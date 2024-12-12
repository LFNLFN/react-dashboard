import React from "react";
import { useState, useEffect, useContext } from 'react';
import AdminContext from '../context/AdminContext';

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const UPDATE_INTERVAL = MINUTE;
const KanbanCard = ({ title, status, onDragStart, onRemove }) => {
    const [displayTime, setDisplayTime] = useState(status);
    const isAdmin = useContext(AdminContext);

    const updateDisplayTime = () => {
        const timePassed = new Date() - new Date(status);
        let relativeTime = '刚刚';
        if (MINUTE <= timePassed && timePassed < HOUR) { relativeTime = `${Math.ceil(timePassed / MINUTE)} 分钟前`; }
        else if (HOUR <= timePassed && timePassed < DAY) { relativeTime = `${Math.ceil(timePassed / HOUR)} 小时前`; }
        else if (DAY <= timePassed) { relativeTime = `${Math.ceil(timePassed / DAY)} 天前`; } setDisplayTime(relativeTime);
    };
    useEffect(() => {
        const intervalId = setInterval(updateDisplayTime, UPDATE_INTERVAL);
        updateDisplayTime();
        return function cleanUp() {
            clearInterval(intervalId)
        }
    }, [status])

    const handleDragStart = (evt) => {
        evt.dataTransfer.effectAllow = 'move'
        evt.dataTransfer.setData('text/plain', title)
        onDragStart(evt)
    }

    return (
        <li className="kanban-card" draggable onDragStart={handleDragStart}>
            <div className="card-title">{title}</div>
            <div className="card-status">{displayTime} {isAdmin && onRemove && (<button onClick={() => onRemove({ title })}>X</button>)}</div>
        </li>
    );
};
export default KanbanCard
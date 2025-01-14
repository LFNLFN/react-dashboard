import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import KanbanBoard, { COLUMN_KEY_DONE, COLUMN_KEY_ONGOING, COLUMN_KEY_TODO, } from './components/KanbanBoard';
import AdminContext from './context/AdminContext';


const DATA_STORE_KEY = 'kanban-data-store';

function App() {

  const [loading, setLoading] = useState(true)
  const [todoList, setTodoList] = useState([
    { title: '开发任务-1', status: '2022-05-22 18:15' },
    { title: '开发任务-3', status: '2022-05-22 18:15' },
    { title: '开发任务-5', status: '2022-05-22 18:15' },
    { title: '测试任务-3', status: '2022-05-22 18:15' }
  ])
  const [ongoingList, setOngoingList] = useState([
    { title: '开发任务-1', status: '2022-05-22 18:15' },
    { title: '开发任务-3', status: '2022-05-22 18:15' },
    { title: '开发任务-5', status: '2022-05-22 18:15' },
    { title: '测试任务-3', status: '2022-05-22 18:15' }
  ])
  const [doneList, setDoneList] = useState([
    { title: '开发任务-1', status: '2022-05-22 18:15' },
    { title: '开发任务-3', status: '2022-05-22 18:15' },
    { title: '开发任务-5', status: '2022-05-22 18:15' },
    { title: '测试任务-3', status: '2022-05-22 18:15' }
  ])
  const updaters = { [COLUMN_KEY_TODO]: setTodoList, [COLUMN_KEY_ONGOING]: setOngoingList, [COLUMN_KEY_DONE]: setDoneList }
  const handleSaveAll = () => {
    const data = JSON.stringify({ todoList, ongoingList, doneList });
    window.localStorage.setItem(DATA_STORE_KEY, data);
  };
  useEffect(() => {
    const data = window.localStorage.getItem(DATA_STORE_KEY);
    setTimeout(() => {
      if (data) {
        const kanbanColumnData = JSON.parse(data);
        setTodoList(kanbanColumnData.todoList);
        setOngoingList(kanbanColumnData.ongoingList);
        setDoneList(kanbanColumnData.doneList);
      }
      setLoading(false)
    }, 1000);
  }, []);


  const handleAdd = (column, newCard) => { updaters[column]((currentStat) => [newCard, ...currentStat]); };
  // const handleRemove = (column, cardToRemove) => { updaters[column]((currentStat) => currentStat.filter((item) => !Object.is(item, cardToRemove))); };

  const handleRemove = (column, cardToRemove) => { updaters[column]((currentStat) => currentStat.filter((item) => item.title !== cardToRemove.title)); };
  const [isAdmin, setIsAdmin] = useState(false);
  const handleToggleAdmin = (evt) => { setIsAdmin(!isAdmin); };

  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板
          <button onClick={handleSaveAll}>保存所有卡片</button>
          <label><input type="checkbox" value={isAdmin} onChange={handleToggleAdmin} />管理员模式</label>
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <AdminContext.Provider value={isAdmin}>
        <KanbanBoard loading={loading} todoList={todoList} ongoingList={ongoingList} doneList={doneList} onAdd={handleAdd} onRemove={handleRemove}>
        </KanbanBoard>
      </AdminContext.Provider>
    </div>
  );
}

export default App;
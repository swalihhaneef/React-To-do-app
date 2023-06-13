import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [toDos, setTodos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [currentDate,setCurrentDate] =useState('')

  const handleDelete = (id) => {
    const updatedTodos = toDos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const clearAllTodos = ()=>{
    const clear = []
    setTodos(clear)
  }

  useEffect(()=>{
    const getCurrentdate =()=>{
      const date = new Date()
      const options = {weekday :'long',year:'numeric',month:'long', day:'numeric'}
      const formattedDate = date.toLocaleDateString(undefined,options)
      setCurrentDate(formattedDate)
    }
    getCurrentdate()
  },[])

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>{currentDate}</h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"

          placeholder="🖊️ Add item..."
        />
        <i
          onClick={() =>
            setTodos([
              ...toDos,
              { id: Date.now(), text: toDo, status: false }
            ])
          }
          className="fas fa-plus"
        ></i>
      </div>
      <div className='clearing'>
       {toDos.length > 0 ?  <button onClick={()=>{clearAllTodos()}}>Clear All</button> : ''}
      </div>
      <div className="todos">
        {toDos.map((obj) => (
          <div className="todo" key={obj.id}>
            <div className="left">
              <input
                onChange={(e) => {
                  const updatedTodos = toDos.map((todo) => {
                    if (todo.id === obj.id) {
                      
                      return { ...todo, status: e.target.checked };
                    }
                    
                    return todo;
                  });
                  setTodos(updatedTodos);
                }}
                value={obj.status}
                type="checkbox"
              />
               <p>{obj.text}</p>
            </div>
            <div className="right">
              <i
                className="fas fa-times"
                onClick={() => handleDelete(obj.id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

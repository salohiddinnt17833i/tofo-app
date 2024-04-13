import { useEffect, useRef, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux'
import { FaRegTrashCan } from "react-icons/fa6";

function App() {
  const todoRef = useRef(null)
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [todo, setTodo] = useState([])
  const [checkedIds, setCheckedIds] = useState([]);

  function handleAdd(e) {
    e.preventDefault()
    const taskName = todoRef.current.value.trim();
    if (taskName === "") {
      setError("Task name cannot be empty");
      return;
    }
    const data = {
      name: taskName,
      id: Date.now()
    }
    setTodo(prevTodo => [...prevTodo, data]);
    dispatch({ type: 'add', payload: data });
    setError(null);
    todoRef.current.value = "";
  }

  function handleCheck(id) {
    if (checkedIds.includes(id)) {
      setCheckedIds(prevIds => prevIds.filter(prevId => prevId !== id));
    } else {
      setCheckedIds(prevIds => [...prevIds, id]);
    }
  }

  function handleDelete(id) {
    let copied = JSON.parse(JSON.stringify(todo))
    copied = copied.filter(ele => ele.id !== id)
    setTodo(copied)
  }

  return (
    <>
      <div className='w-full h-screen bg-black text-white p-10'>
        <div className='w-[583px] m-auto bg-[#1D1825] p-8 rounded-2xl'>

          <form onSubmit={handleAdd} className='flex gap-2'>
            <input ref={todoRef} className='w-11/12 bg-transparent outline-none border border-fuchsia-400 px-2 rounded-lg' type="text" placeholder='Add a new task' />
            <button className='text-4xl bg-fuchsia-300 rounded-lg p-1'><GrAdd className="text-white text-2xl"></GrAdd></button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <h4>Task to do ({todo.length}) </h4>
            {
              todo && todo.map((ele, ind) => {
                const isChecked = checkedIds.includes(ele.id);
                return (
                  <div key={ind} className="flex items-center justify-between border p-2 border-fuchsia-500 rounded-md mt-2 gap-3">
                    <p className={isChecked ? "line-through" : "no-underline"}>{ele.name}</p>
                    <div className="flex gap-2 mt-1">
                      {
                        isChecked ?
                          <MdOutlineCheckBox className="cursor-pointer" onClick={() => handleCheck(ele.id)} /> :
                          <MdOutlineCheckBoxOutlineBlank className="cursor-pointer" onClick={() => handleCheck(ele.id)} />
                      }
                      <FaRegTrashCan onClick={() => handleDelete(ele.id)} className="cursor-pointer" />
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App;

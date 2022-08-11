import './App.css';
import TodoList from './components/List'
import ToolBar from './components/ToolBar'
import {useRef} from "react";

function App() {
  const toolBarRef = useRef()
  const todoListRef = useRef()


  const addItem = () => {
    todoListRef.current && todoListRef.current.addItem()
  }


  return (
      <div className="App">
        <ToolBar wrappedComponentRef={toolBarRef} addItem={addItem}/>
        <TodoList ref={todoListRef}/>
      </div>
  );
}

export default App;

import {forwardRef, useImperativeHandle, useState} from "react";

const TodoList = forwardRef((props, ref) => {

  const [list, setList] = useState([])

  const addItem = () => {
    setList([...list, {title: list.length}])
  }

  useImperativeHandle(ref, () => ({
    addItem
  }))

  return (
      list.map(item => <div>{item.title}</div>)
  )
})

export default TodoList

// export default forwardRef((props, ref)=><TodoList {...props} refInstance={ref}/>)

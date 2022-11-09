import React, {Component} from 'react';
import ToolBar from "./components/ToolBar";
import List from "./components/List";
import Footer from "./components/Footer";


class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        name: '吃饭',
        done: false
      },
      {
        id: 2,
        name: '睡觉',
        done: false
      },
      {
        id: 3,
        name: '打豆豆',
        done: false
      }

    ]
  }

  addTodo = (name) => {
    const {todos} = this.state

    const newTodos = [{
      id: Date.parse(new Date()),
      name
    },
      ...todos
    ]

    this.setState({
      todos: newTodos
    })
  }

  setDoneOrNot = name => {
    const {todos} = this.state

    const newTodos = todos.map(todo => {
      if (todo.name === name) {
        todo.done = !todo.done
      }
      return todo
    })

    this.setState({
      todos: newTodos
    })
  }

  removeTodo = name => {
    const {todos} = this.state

    const newTodos = todos.filter(todo => todo.name !== name)

    this.setState({
      todos: newTodos
    })
  }

  checkAll = (done) => {
    const {todos} = this.state

    const newTodos = todos.map(todo => {
      todo.done = done
      return todo
    })

    this.setState({
      todos: newTodos
    })
  }


  render() {
    return (
        <div>
          <ToolBar addTodo={this.addTodo}/>
          <List {...this.state} setDoneOrNot={this.setDoneOrNot} removeTodo={this.removeTodo}/>
          <Footer {...this.state} checkAll={this.checkAll}/>
        </div>
    );
  }
}

export default App;

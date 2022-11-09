import React, {Component} from 'react';
import Item from "./Item";

class List extends Component {
  render() {

    const {todos} = this.props
    return (
        <div>
          {
            todos.map(todo => <Item key={todo.id} {...todo} {...this.props} />)
          }
        </div>
    );
  }
}

export default List;

import React, {Component} from 'react';

class ToolBar extends Component {

  handleClick = () => {
    const {value} = this.c

    if (!value) {
      alert('please enter todo')
      return
    }

    this.props.addTodo(value)

    this.c.value = ''
  }

  render() {
    return (
        <div>
          <input ref={c => this.c = c} placeholder="please enter what to do"/>
          <button onClick={this.handleClick}>add</button>
        </div>
    );
  }
}

export default ToolBar;

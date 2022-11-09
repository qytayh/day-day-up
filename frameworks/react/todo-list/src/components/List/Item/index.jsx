import React, {Component} from 'react';

class Item extends Component {
  state = {
    hover: false
  }

  render() {
    const {name, done, setDoneOrNot, removeTodo} = this.props
    const {hover} = this.state

    return (
        <div onMouseEnter={() => this.setState({hover: true})} onMouseLeave={() => this.setState({hover: false})}>
          <input type="checkbox" checked={done} onChange={() => setDoneOrNot(name)}/>
          {name}
          <button
              onClick={() => removeTodo(name)}
              style={{
                display: hover ? 'inline' : 'none'
              }}>删除
          </button>
        </div>
    );
  }
}

export default Item;

import React, {Component} from 'react';

class Footer extends Component {
  handleCheckAll = (e) => {
    this.props.checkAll(e.target.checked)
  }

  render() {
    const {todos} = this.props
    const allCount = todos.length

    const done = todos.reduce((pre, c) => {

      if (c.done) {
        return pre + 1
      }
      return pre
    }, 0)


    return (
        <div>
          <input type='checkbox' checked={
            !allCount ? false :
                done === allCount ? true : false
          } onChange={this.handleCheckAll}/>全选 已选择 {done} / {allCount}
        </div>
    );
  }
}

export default Footer;

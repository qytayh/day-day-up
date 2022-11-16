const createDOMFromString = (domString) => {
  const div = document.createElement('div')
  div.innerHTML = domString
  return div
}

class React {
  static renderDom(component, dom) {
    dom.appendChild(component._renderDom())
    component.onStateChange = (newEl, oldEl) => {
      dom.insertBefore(newEl, oldEl)
      dom.removeChild(oldEl)
    }
  }
}


class Component extends React {
  setState(data) {
    const oldEl = this.el

    this.state = {
      ...data
    }

    this._renderDom()


    if (this.onStateChange) this.onStateChange(this.el, oldEl)
  }

  _renderDom() {
    this.el = createDOMFromString(this.render())
    if (this.onClick) {
      this.el.addEventListener('click', this.onClick.bind(this), false)
    }
    return this.el
  }
}



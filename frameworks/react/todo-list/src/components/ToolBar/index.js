export default function ToolBar(props) {
  const addItem = () => {
    props.addItem()
  }

  return (
      <div>
        <button onClick={addItem}>新增</button>
      </div>
  )
}

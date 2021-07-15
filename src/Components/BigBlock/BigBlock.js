import "./BigBlock.css"
export default function BigBlock(props) {
  function copyLargeBlock(e){
    const tempEle = document.createElement("textarea")
    tempEle.textContent = props.block
    document.body.appendChild(tempEle)
    tempEle.select()
    document.execCommand("copy")
    tempEle.remove()
  }
  return (
    <>
      {props.block && (
        <div className="code_block_container">
          <div className="code_line_container large_block">
                <pre className="large_block_line">{props.block}</pre>
            <button className="copy_button_large_block" onClick={copyLargeBlock}>
              Copy
            </button>
          </div>
        </div>
      )}
    </>
  );
}

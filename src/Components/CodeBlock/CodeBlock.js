import "./CodeBlock.css";

export default function CodeBlock(props) {
  function copyToClipBoard(e) {
    const lineToCopy = e.target.previousSibling.textContent;
    const tempEle = document.createElement("textarea");
    tempEle.innerText = lineToCopy;
    document.body.appendChild(tempEle);
    tempEle.select();
    document.execCommand("copy");
    tempEle.remove();
  }
  return (
    
    <div className="code_block_container">
      {props.lines.map((line) => {
        return (
          <div key={line} className="code_line_container">
            <div>
              <span>{line}</span>
            </div>
            <button className="copy_button" onClick={copyToClipBoard}>
              Copy
            </button>
          </div>
        );
      })}
    </div>
  );
}

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
        <>
            {props.lines && (
                <div className="code_block_container">
                    {props.lines.map((line) => {
                        return (
                            <div key={line} className="code_line_container">
                                <div>
                                    {props.linuxc && <div className="linuxc_sign" style={{float:"left"}}>$</div>}

                                    <div style={{float:"left"}}>
                                        <span>{line}</span>
                                    </div>
                                </div>
                                <button className="copy_button" onClick={copyToClipBoard}>
                                    Copy
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}

import CodeBlock from "../CodeBlock/CodeBlock";
export default function SectionComp(props) {
  return (
    <div className="guide_part_block">
      <h1 className="guide_part_block_header">{props.title}</h1>
      {props.lines && (
        <CodeBlock
          lines={props.lines}
        ></CodeBlock>
      )}
      {props.desc}
    </div>
  );
}

import "./OneLineSpan.css";

export default function OneLineSpan(props) {
  return (
    <>
      <span className="guide_span">{props.line}{props.desc}</span>
      
    </>
  );
}

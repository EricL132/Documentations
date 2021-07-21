import "./Guides.css";
import { Link } from "react-router-dom";

export default function Guides(props) {
  return (
    <Link to={props.info.link} >
      <div className="guide_container">
        <span className="guide_title">{props.info.title}</span>
        <img src={props.info.image} className="guide_image"></img>
      </div>
    </Link>
  );
}

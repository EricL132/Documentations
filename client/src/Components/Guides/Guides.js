import "./Guides.css";
import { Link } from "react-router-dom";

export default function Guides(props) {
    return (
        <div className="guide_container">
            <Link to={props.info.link} className="no-decoration">
                <span className="guide_title">{props.info.title}</span>
                <img src={props.info.image} className="guide_image" alt="doc"></img>
            </Link>
        </div>
    );
}

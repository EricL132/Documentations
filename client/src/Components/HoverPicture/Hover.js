import "./Hover.css";

export default function HoverPicture(props) {
  return (
    
    <div className={`hover_image_containers ${props.sameline}`}>
      {props.title}
      <div className="hover_image_component">
        <img className="hover_image_component_image" src={props.picture} alt="info"></img>
      </div>
    </div>
  );
}

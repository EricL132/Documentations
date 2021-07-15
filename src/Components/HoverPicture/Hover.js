import './Hover.css'

export default function HoverPicture(props){
    return (<div className="hover_image_component">
        <img src={props.picture}></img>
    </div>)
}
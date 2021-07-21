import "./Home.css";
import Guides from "../Guides/Guides";

export default function Home() {

  return (
    <>
      <h1 className="page_title" style={{width:"1030px",marginBottom:"0px"}}>Documentations</h1>
      <div className="mid_container transparent_back" style={{width:"1120px"}}>
        <Guides info={{
            image:"https://i.gyazo.com/54f8113e1fc0758bb33713458d87ffdd.png",
            title:"Setup Django Nginx With uWSGI on Linux Server",
            link:"/uwsgi"
        }}></Guides>

      </div>
    </>
  );
}

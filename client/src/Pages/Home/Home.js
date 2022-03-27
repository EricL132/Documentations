import "./Home.css";
import Guides from "../../Components/Guides/Guides";

export default function Home() {
    return (
        <div className="main">
            <div>
                <h1 className="page_title">Documentations</h1>
                <div className="transparent_back guides_container">
                    <Guides
                        info={{
                            image: "https://i.gyazo.com/54f8113e1fc0758bb33713458d87ffdd.png",
                            title: "Setup Django Nginx With uWSGI on Linux Server",
                            link: "/uwsgi",
                        }}
                    ></Guides>
                    <Guides
                        info={{
                            image: "https://i.gyazo.com/b115523f25f2546c2cdd2b2abcbe0e2b.png",
                            title: "Setup Django Nginx Postgres Gunicorn",
                            link: "/gunicorn",
                        }}
                    ></Guides>
                </div>
            </div>
        </div>
    );
}

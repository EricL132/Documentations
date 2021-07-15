import "./Home.css";
import HoverPicture from "../HoverPicture/Hover";
import CodeBlock from "../CodeBlock/CodeBlock";

export default function Home() {
  return (
    <>
      <h1 className="guide_title">
        Setup Django Nginx with uwgsi on ubuntu server
      </h1>

      <div className="mid_container">
        <div className="hover_image_containers">
          Google Cloud Server Setup
          <HoverPicture picture="https://i.gyazo.com/1add9539b57bc499244988bf1c6e7132.png"></HoverPicture>
        </div>
        <div className="guide_part_block">
          <h1 className="guide_part_block_header">1. Update Server</h1>
          <CodeBlock
            lines={["sudo apt-get update", "sudo apt-get upgrade"]}
          ></CodeBlock>
        </div>
        <div className="guide_part_block">
          <h1 className="guide_part_block_header">
            2. Setup Virutal Environment for Python
          </h1>
          <CodeBlock
            lines={[
              "apt-get install python3-venv",
              "mkdir /home/eric/env/",
              "python3 -m venv /home/eric/env/myEnv",
            ]}
          ></CodeBlock>
          <div className="guide_bottom_discription">
            <span className="guide_span">
              Replace Eric with ubuntu username (pwd in ssh to check your username)
            </span>
            <span>Replace myEnv with any name (Environment name)</span>
          </div>
        </div>
      </div>
    </>
  );
}

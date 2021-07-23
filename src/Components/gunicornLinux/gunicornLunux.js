import SectionComp from "../SectionComp/SectionComp";
import CodeBlock from "../CodeBlock/CodeBlock";
import OneLineSpan from "../OneLineSpan/OneLineSpan";
import HoverPicture from "../HoverPicture/Hover";
export default function Gunicorn() {
  return (
    <>
      <h1 className="page_title">
        Set Up Django with Postgres, Nginx, and Gunicorn on Linux Server
      </h1>
      <div className="mid_container">
        <SectionComp
          title="1. Update Server"
          lines={["sudo apt update", "sudo apt upgrade"]}
        ></SectionComp>
        <SectionComp
          title="2. Install Required Packages"
          lines={[
            "sudo apt update",
            "sudo apt install python3-pip python3-dev libpq-dev postgresql postgresql-contrib nginx curl",
          ]}
        ></SectionComp>
        <SectionComp
          title="3. Update Python to at Least Python3.6"
          lines={[
            "sudo add-apt-repository ppa:deadsnakes/ppa",
            "sudo apt update",
            "sudo apt install python3.6",
          ]}
        ></SectionComp>

        <SectionComp
          title="4. Setting Up Postgres"
          desc={
            <>
              <CodeBlock
                lines={[
                  "sudo -u postgres psql",
                  "CREATE DATABASE databasename",
                  "CREATE USER databaseuser WITH PASSWORD 'password'",
                  "GRANT ALL PRIVILEGES ON DATABASE databasename TO databaseuser",
                  "\\q",
                ]}
              ></CodeBlock>
              <OneLineSpan line="Goes into psql terminal"></OneLineSpan>
              <OneLineSpan line="Create database, Create user with password, and gives new user access to database"></OneLineSpan>

            </>
          }
        ></SectionComp>


        <SectionComp
          title="5. Setup Project And Virutal Environment"
          lines={[
            "mkdir myProjectName",
            "cd projectName",
            "sudo apt install python3.6-venv",
            "python3.6 -m venv env",
            "source env/bin/activate",
          ]}
          desc={
            <div className="guide_bottom_discription">
              <OneLineSpan
                line="Replace eric with linux username"
                desc={
                  <HoverPicture
                    picture="https://i.gyazo.com/3a3a70e658b1e9b6152f06c46d92cfd0.png"
                    title="How to check username"
                    sameline="sameline_image"
                  ></HoverPicture>
                }
              ></OneLineSpan>
            </div>
          }
        ></SectionComp>

        <SectionComp
          title="6. Create Django Project"
          lines={[
            "pip install Django",
            "django-admin startproject myProjectName",
            "mv /home/eric/myProjectName/myProjectName /home/eric/myProjectName"
          ]}
          desc={
            <OneLineSpan line="Install django, create project, move whole project one directory out"></OneLineSpan>
          }
        ></SectionComp>
      </div>
    </>
  );
}

import SectionComp from "../SectionComp/SectionComp";
import CodeBlock from "../CodeBlock/CodeBlock";
import OneLineSpan from "../OneLineSpan/OneLineSpan";
import HoverPicture from "../HoverPicture/Hover";
import BigBlock from "../BigBlock/BigBlock";
export default function Gunicorn() {
  return (
    <>
      <h1 className="page_title">
        Set Up Django with Postgres, Nginx, and Gunicorn on Linux Server
      </h1>
      <div className="mid_container">
        <SectionComp
          title="Update Server"
          lines={["sudo apt update", "sudo apt upgrade"]}
        ></SectionComp>
        <SectionComp
          title="Install Required Packages"
          lines={[
            "sudo apt install python3-pip python3-dev libpq-dev postgresql postgresql-contrib nginx curl",
          ]}
        ></SectionComp>
        <SectionComp
          title="Update Python to at Least Python3.6"
          lines={[
            "sudo add-apt-repository ppa:deadsnakes/ppa",
            "sudo apt update",
            "sudo apt install python3.6",
          ]}
        ></SectionComp>

        <SectionComp
          title="Setting Up Postgres"
          desc={
            <>
              <CodeBlock
                lines={[
                  "sudo -u postgres psql",
                  "CREATE DATABASE databasename;",
                  "CREATE USER databaseuser WITH PASSWORD 'password';",
                  "GRANT ALL PRIVILEGES ON DATABASE databasename TO databaseuser;",
                  "\\q",
                ]}
              ></CodeBlock>
              <OneLineSpan line="Goes into psql terminal"></OneLineSpan>
              <OneLineSpan line="Create database, Create user with password, and gives new user access to database"></OneLineSpan>

            </>
          }
        ></SectionComp>


        <SectionComp
          title="Setup Project And Virutal Environment"
          lines={[
            "mkdir myProjectName",
            "cd myProjectName",
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
          title="Create Django Project"
          lines={[
            "pip install django",
            "django-admin startproject myProjectName .",
          ]}
          desc={
            <OneLineSpan line="Install django, create project"></OneLineSpan>
          }
        ></SectionComp>


        <SectionComp title="Setup Django Project" lines={["nano myProjectName/settings.py"]} desc={
          <>
            <OneLineSpan line="Inside settings.py file inside django project edit below lines"></OneLineSpan>
            <CodeBlock lines={["ALLOWED_HOSTS = ['serverip', 'domain.com','.domain.com', 'localhost']"]}></CodeBlock>
            <OneLineSpan line=".domain includes all subdomains" desc={
              <HoverPicture title="Image" picture="https://i.gyazo.com/9f1405553bef270e35feb9628379bbd1.png" sameline="sameline_image"></HoverPicture>
            }></OneLineSpan>
            <BigBlock block={
`
DATABASES = {
  'default': {
      'ENGINE': 'django.db.backends.postgresql_psycopg2',
      'NAME': 'databasename',
      'USER': 'databaseuser ',
      'PASSWORD': 'password',
      'HOST': 'localhost',
      'PORT': '',
  }
}
`}></BigBlock>
<HoverPicture title="Image" picture="https://i.gyazo.com/70927a342714624ed9f1f46be5715d30.png"></HoverPicture>
<CodeBlock lines={["import os","STATIC_ROOT = os.path.join(BASE_DIR, 'static/')"]}></CodeBlock>
<HoverPicture title="Image" picture="https://i.gyazo.com/bc403d508c2b89b38d67a987a01f54aa.png"></HoverPicture>
          </>
        }></SectionComp>
      </div>
    </>
  );
}

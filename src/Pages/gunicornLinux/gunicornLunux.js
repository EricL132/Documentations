import SectionComp from "../../Components/SectionComp/SectionComp";
import CodeBlock from "../../Components/CodeBlock/CodeBlock";
import OneLineSpan from "../../Components/OneLineSpan/OneLineSpan";
import HoverPicture from "../../Components/HoverPicture/Hover";
import BigBlock from "../../Components/BigBlock/BigBlock";
export default function Gunicorn() {
  return (
    <>
      <h1 className="page_title">
        Set Up Django with Postgres, Nginx, and Gunicorn on Linux Server
      </h1>
      <div className="mid_container">
        <SectionComp
          title="Update Server"
          linuxc={true}
          lines={["sudo apt update", "sudo apt upgrade"]}
        ></SectionComp>
        <SectionComp
          title="Install Required Packages"
          linuxc={true}
          lines={[
            "sudo apt install python3-pip python3-dev libpq-dev postgresql postgresql-contrib nginx curl",
          ]}
        ></SectionComp>
        <SectionComp
          title="Update Python to at Least Python3.6"
          linuxc={true}
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
                linuxc={true}
                lines={["sudo -u postgres psql"]}
              ></CodeBlock>
              <CodeBlock
                lines={[
                  "CREATE DATABASE databasename;",
                  "CREATE USER databaseuser WITH PASSWORD 'password';",
                  "GRANT ALL PRIVILEGES ON DATABASE databasename TO databaseuser;",
                  "\\q",
                ]}
              ></CodeBlock>
              <OneLineSpan line="Opens psql terminal"></OneLineSpan>
              <OneLineSpan line="Create database, Create user with password, and gives new user access to database"></OneLineSpan>
            </>
          }
        ></SectionComp>

        <SectionComp
          title="Setup Project And Virutal Environment"
          linuxc={true}
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
          linuxc={true}
          lines={[
            "pip install django",
            "pip install gunicorn",
            "django-admin startproject myProjectName .",
          ]}
          desc={
            <OneLineSpan line="Install django, create project"></OneLineSpan>
          }
        ></SectionComp>

        <SectionComp
          title="Setup Django Project"
          linuxc={true}
          lines={["nano myProjectName/settings.py"]}
          desc={
            <>
              <OneLineSpan line="Inside settings.py file inside django project edit below lines"></OneLineSpan>
              <CodeBlock
                lines={[
                  "ALLOWED_HOSTS = ['serverip', 'domain.com','.domain.com', 'localhost']",
                ]}
              ></CodeBlock>
              <OneLineSpan
                line=".domain includes all subdomains"
                desc={
                  <HoverPicture
                    title="Settings.py File"
                    picture="https://i.gyazo.com/9f1405553bef270e35feb9628379bbd1.png"
                    sameline="sameline_image"
                  ></HoverPicture>
                }
              ></OneLineSpan>
              <BigBlock
                block={`
DATABASES = {
  'default': {
      'ENGINE': 'django.db.backends.postgresql_psycopg2',
      'NAME': 'databasename',
      'USER': 'databaseuser',
      'PASSWORD': 'password',
      'HOST': 'localhost',
      'PORT': '',
  }
}
`}
              ></BigBlock>
              <HoverPicture
                title="Settings.py File"
                picture="https://i.gyazo.com/70927a342714624ed9f1f46be5715d30.png"
              ></HoverPicture>
              <CodeBlock
                lines={[
                  "import os",
                  "STATIC_ROOT = os.path.join(BASE_DIR, 'static/')",
                ]}
              ></CodeBlock>
              <HoverPicture
                title="Settings.py File"
                picture="https://i.gyazo.com/bc403d508c2b89b38d67a987a01f54aa.png"
              ></HoverPicture>
              <CodeBlock
                linuxc={true}
                lines={[
                  "sudo apt install libpq-dev python3-dev",
                  "pip install psycopg2",
                  "python manage.py makemigrations",
                  "python manage.py migrate",
                  "python manage.py createsuperuser",
                  "python manage.py collectstatic",
                ]}
              ></CodeBlock>
            </>
          }
        ></SectionComp>
        <SectionComp
          title="Setup Gunicorn Socket and Service Files"
          desc={
            <>
              <CodeBlock
                linuxc={true}
                lines={["sudo nano /etc/systemd/system/myProjectName.socket"]}
              ></CodeBlock>
              <BigBlock
                block={`
[Unit]
Description=myProjectName socket

[Socket]
ListenStream=/run/myProjectName.sock

[Install]
WantedBy=sockets.target            
`}
              ></BigBlock>
              <CodeBlock
                linuxc={true}
                lines={["sudo nano /etc/systemd/system/myProjectName.service"]}
              ></CodeBlock>
              <BigBlock
                block={`
[Unit]
Description=myProjectName daemon
Requires=myProjectName.socket
After=network.target

[Service]
User=eric
Group=www-data
WorkingDirectory=/home/eric/myProjectName
ExecStart=/home/eric/myProjectName/env/bin/gunicorn \\
          --access-logfile - \\
          --workers 3 \\
          --bind unix:/run/myProjectName.sock \\
          myProjectName.wsgi:application
[Install]
WantedBy=multi-user.target              
`}
              ></BigBlock>
              <OneLineSpan line="Socket file creates listern for project"></OneLineSpan>
              <OneLineSpan line="Service file starts django project when request is received"></OneLineSpan>
              <OneLineSpan line="For multiple projects on one server create multiple myProjectName.socket and myProjectName.service files"></OneLineSpan>
              <CodeBlock
                linuxc={true}
                lines={[
                  "sudo systemctl start myProjectName.socket",
                  "sudo systemctl enable myProjectName.socket",
                  "sudo systemctl status myProjectName.socket",
                  "file /run/myProjectName.sock",
                ]}
              ></CodeBlock>
              <OneLineSpan line="Start listener"></OneLineSpan>
              <OneLineSpan line="Enable listener to start when server starts"></OneLineSpan>
              <OneLineSpan
                line="Status and file to check socket is working correctly"
                desc={
                  <HoverPicture
                    title="Result"
                    picture="https://i.gyazo.com/d79f02877c8b9dfd6b3ee188e3d71578.png"
                    sameline="sameline_image"
                  ></HoverPicture>
                }
              ></OneLineSpan>

              <CodeBlock
                linuxc={true}
                lines={[
                  "curl --unix-socket /run/myProjectName.sock localhost",
                  "sudo systemctl status myProjectName",
                ]}
              ></CodeBlock>
              <OneLineSpan line="Send request to start server"></OneLineSpan>
              <OneLineSpan
                line="Check status"
                desc={
                  <HoverPicture
                    title="Result"
                    picture="https://i.gyazo.com/292f5f2ac33d0d44cfc445c1dd12d0cc.png"
                    sameline="sameline_image"
                  ></HoverPicture>
                }
              ></OneLineSpan>
            </>
          }
        ></SectionComp>

        <SectionComp
          title="Setup Nginx to Proxy to Gunicorn"
          lines={["sudo nano /etc/nginx/sites-available/myProjectName"]}
          linuxc={true}
          desc={
            <>
              <BigBlock
                block={`
server {
  listen 80;
  server_name server_domain_or_IP extra_domain sub.domain.com;

  location = /favicon.ico { access_log off; log_not_found off; }
  location /static/ {
      root /home/eric/myProjectName;
  }

  location / {
      include proxy_params;
      proxy_pass http://unix:/run/myProjectName.sock;
  }
}
`}
              ></BigBlock>
              <CodeBlock
                linuxc={true}
                lines={[
                  "sudo ln -sf /etc/nginx/sites-available/myProjectName /etc/nginx/sites-enabled",
                  "sudo nginx -t",
                  "sudo systemctl restart nginx"
                ]}
              ></CodeBlock>
              <OneLineSpan line="Setup nginx file to listen for server_name requests and routes according"></OneLineSpan>
              <OneLineSpan line="Create multiple nginx files for multiple projects on one server"></OneLineSpan>
              <OneLineSpan line="If everything is correct you should be able to visit your website"></OneLineSpan>
            </>
          }
        ></SectionComp>
      </div>
    </>
  );
}

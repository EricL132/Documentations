import "./uwsgiLinux.css";
import HoverPicture from "../../Components/HoverPicture/Hover";
import CodeBlock from "../../Components/CodeBlock/CodeBlock";
import BigBlock from "../../Components/BigBlock/BigBlock";
import SectionComp from "../../Components/SectionComp/SectionComp";
import OneLineSpan from "../../Components/OneLineSpan/OneLineSpan";
export default function Home() {
    return (
        <div className="main_flex_center">
            <div className="main_flex_container">
                <h1 className="page_title">Setup Django Nginx With uWSGI on Linux Server</h1>

                <div className="container_box">
                    <HoverPicture
                        title="Google Cloud Server Setup"
                        picture="https://i.gyazo.com/1add9539b57bc499244988bf1c6e7132.png"
                    ></HoverPicture>
                    <SectionComp
                        title="1. Update Server"
                        linuxc={true}
                        lines={["sudo apt update", "sudo apt upgrade"]}
                    ></SectionComp>
                    <SectionComp
                        title="2. Update Python to at Least Python3.6"
                        linuxc={true}
                        lines={[
                            "sudo add-apt-repository ppa:deadsnakes/ppa",
                            "sudo apt update",
                            "sudo apt install python3.6",
                        ]}
                    ></SectionComp>
                    <SectionComp
                        title="3. Setup Virutal Environment for Python"
                        linuxc={true}
                        lines={[
                            "sudo apt install python3.6-venv",
                            "mkdir /home/eric/env/",
                            "python3.6 -m venv /home/eric/env/myEnv",
                            "source /home/eric/env/myEnv/bin/activate",
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
                                <OneLineSpan line="Replace myEnv with any name"></OneLineSpan>
                            </div>
                        }
                    ></SectionComp>

                    <SectionComp
                        title="4. Create or Import Django Project"
                        linuxc={true}
                        lines={[
                            "pip install Django",
                            "django-admin startproject myProjectName",
                            "cd myProjectName",
                        ]}
                    ></SectionComp>
                    <SectionComp
                        title="2. Setup uwsgi"
                        linuxc={true}
                        lines={[
                            "sudo apt install python3.6-dev",
                            "sudo apt install gcc",
                            "pip install uwsgi",
                        ]}
                    ></SectionComp>
                    <SectionComp
                        title="5. Connect Uwsgi to Django"
                        lines={["uwsgi --http :8000 --module djangoProjectName.wsgi"]}
                        linuxc={true}
                        desc={
                            <div className="guide_bottom_discription">
                                <OneLineSpan
                                    line="Make sure to allow port 8000 access in firewall settings"
                                    desc={
                                        <HoverPicture
                                            title="How it should look"
                                            picture="https://i.gyazo.com/bc032f563ed57f33d49e1a332a2290ee.png"
                                            sameline="sameline_image"
                                        ></HoverPicture>
                                    }
                                ></OneLineSpan>
                                <OneLineSpan line="Make sure to add server IP or domain to Allowed hosts in django settings.py folder"></OneLineSpan>
                                <OneLineSpan line="The above command goes into the djangoProjectName folder and the file wsgi.py"></OneLineSpan>
                                <OneLineSpan line="If everything is correct you should be able to go to IPADDRESS/DOMAIN:8000 in your browser"></OneLineSpan>
                            </div>
                        }
                    ></SectionComp>
                    <SectionComp
                        title="6. Setup Nginx"
                        linuxc={true}
                        lines={[
                            "sudo apt install nginx",
                            "sudo vim /etc/nginx/sites-available/djangoProjectName.conf",
                        ]}
                        desc={
                            <>
                                <div className="guide_bottom_discription">
                                    <OneLineSpan line="Click i to edit file/enter insert mode in vim"></OneLineSpan>
                                    <OneLineSpan line="Paste the below code block into the file"></OneLineSpan>
                                    <OneLineSpan line="Leave insert mode with esc and type :wq to save file"></OneLineSpan>
                                </div>
                                <BigBlock
                                    block={`
# the upstream component nginx needs to connect to
upstream django {
    server unix:///home/eric/djangoProjectName/djangoProjectName.sock;
}

# configuration of the server
server {
    listen      80;
    server_name domain.com anotherdomain.com 37.258.87.257 ;
    charset     utf-8;

    # max upload size
    client_max_body_size 75M;

    # Django media and static files
    location /media  {
        alias /home/eric/djangoProjectName/media;
    }
    location /static {
        alias /home/eric/djangoProjectName/static;
    }

    # Send all non-media requests to the Django server.
    location / {
        uwsgi_pass  django;
        include     /home/eric/djangoProjectName/uwsgi_params;
    }
}
`}
                                ></BigBlock>
                                <div className="guide_bottom_discription">
                                    <OneLineSpan line="Create uwsgi_params file"></OneLineSpan>
                                </div>
                                <CodeBlock
                                    linuxc={true}
                                    lines={["vim /home/eric/djangoProjectName/uwsgi_params"]}
                                ></CodeBlock>
                                <div className="guide_bottom_discription">
                                    <OneLineSpan line="Copy and Paste params into file"></OneLineSpan>
                                </div>
                                <BigBlock
                                    block={`
uwsgi_param  QUERY_STRING       $query_string;
uwsgi_param  REQUEST_METHOD     $request_method;
uwsgi_param  CONTENT_TYPE       $content_type;
uwsgi_param  CONTENT_LENGTH     $content_length;
uwsgi_param  REQUEST_URI        $request_uri;
uwsgi_param  PATH_INFO          $document_uri;
uwsgi_param  DOCUMENT_ROOT      $document_root;
uwsgi_param  SERVER_PROTOCOL    $server_protocol;
uwsgi_param  REQUEST_SCHEME     $scheme;
uwsgi_param  HTTPS              $https if_not_empty;
uwsgi_param  REMOTE_ADDR        $remote_addr;
uwsgi_param  REMOTE_PORT        $remote_port;
uwsgi_param  SERVER_PORT        $server_port;
uwsgi_param  SERVER_NAME        $server_name;
          `}
                                ></BigBlock>
                                <div className="guide_bottom_discription">
                                    <OneLineSpan line="Push changes to nginx, Run this line everytime you change myProjectName.conf"></OneLineSpan>
                                </div>
                                <CodeBlock
                                    linuxc={true}
                                    lines={[
                                        "sudo ln -s /etc/nginx/sites-available/myDjangoProject.conf /etc/nginx/sites-enabled/",
                                    ]}
                                ></CodeBlock>
                                <div className="guide_bottom_discription">
                                    <OneLineSpan line="Setup static root in django settings.py file"></OneLineSpan>
                                    <OneLineSpan
                                        line="import os"
                                        desc={
                                            <HoverPicture
                                                picture="https://i.gyazo.com/c084ec986fb34fb6a302fdc59c3166c0.png"
                                                title="Where to put it"
                                                sameline="sameline_image"
                                            ></HoverPicture>
                                        }
                                    ></OneLineSpan>
                                    <OneLineSpan
                                        line="Add below line into settings.py"
                                        desc={
                                            <HoverPicture
                                                picture="https://i.gyazo.com/a1650c0b01ff3afbd54601154e78a1f3.png"
                                                title="Where to put it"
                                                sameline="sameline_image"
                                            ></HoverPicture>
                                        }
                                    ></OneLineSpan>

                                    <CodeBlock
                                        lines={[`STATIC_ROOT = os.path.join(BASE_DIR, "static/")`]}
                                    ></CodeBlock>
                                    <OneLineSpan
                                        line="Run below line in ssh"
                                        desc={
                                            <HoverPicture
                                                picture="https://i.gyazo.com/6b028bfde94fbe18a56dc9e82980798c.png"
                                                title="What ssh should look"
                                                sameline="sameline_image"
                                            ></HoverPicture>
                                        }
                                    ></OneLineSpan>

                                    <CodeBlock
                                        linuxc={true}
                                        lines={["python manage.py collectstatic"]}
                                    ></CodeBlock>
                                    <OneLineSpan line="Run below line everyime you change myDjangoProject.conf"></OneLineSpan>
                                    <CodeBlock
                                        linuxc={true}
                                        lines={["sudo /etc/init.d/nginx restart"]}
                                    ></CodeBlock>
                                </div>
                            </>
                        }
                    ></SectionComp>

                    <SectionComp
                        title="7. Combine Nginx, Django, and uwsgi"
                        desc={
                            <>
                                <CodeBlock
                                    linuxc={true}
                                    lines={[
                                        "uwsgi --socket djangoProjectName.sock --module djangoProjectName.wsgi --chmod-socket=666",
                                    ]}
                                ></CodeBlock>
                                <OneLineSpan line="Run above line to check if everything is working should get 502 Bad Gateway"></OneLineSpan>
                            </>
                        }
                    ></SectionComp>

                    <SectionComp
                        title="8. Setup uwsgi for Production"
                        desc={
                            <>
                                <OneLineSpan line="Run below line in root of django project"></OneLineSpan>
                                <CodeBlock
                                    linuxc={true}
                                    lines={["vim djangoProjectName_uwsgi.ini"]}
                                ></CodeBlock>
                                <OneLineSpan line="Copy and paste below text into file above"></OneLineSpan>
                                <BigBlock
                                    block={`
[uwsgi]
# full path to Django project's root directory
chdir            = /home/eric/djangoProjectName/
# Django's wsgi file
module           = djangoProjectName.wsgi
# full path to python virtual env
home             = /home/eric/env/myEnv
# enable uwsgi master process
master          = true
# maximum number of worker processes
processes       = 10
# the socket (use the full path to be safe
socket          = /home/eric/djangoProjectName/djangoProjectName.sock
# socket permissions
chmod-socket    = 666
# clear environment on exit
vacuum          = true
# daemonize uwsgi and write messages into given log
daemonize       = /home/eric/uwsgi-emperor.log
`}
                                ></BigBlock>
                                <OneLineSpan line="Run below line you should see django launch page"></OneLineSpan>
                                <CodeBlock
                                    linuxc={true}
                                    lines={["uwsgi --ini djangoProjectName_uwsgi.ini"]}
                                ></CodeBlock>
                            </>
                        }
                    ></SectionComp>

                    <SectionComp
                        title="9. Setup uwsgi emporer mode"
                        desc={
                            <>
                                <CodeBlock
                                    linuxc={true}
                                    lines={[
                                        "cd /home/eric/env/myEnv/",
                                        "mkdir vassals",
                                        "sudo ln -s /home/eric/djangoProjectName/djangoProjectName_uwsgi.ini /home/eric/env/myEnv/vassals/",
                                    ]}
                                ></CodeBlock>
                                <OneLineSpan line="Run below line you should see django launch page"></OneLineSpan>
                                <CodeBlock
                                    linuxc={true}
                                    lines={[
                                        "uwsgi --emperor /home/eric/env/myEnv/vassals --uid www-data --gid www-data",
                                    ]}
                                ></CodeBlock>
                            </>
                        }
                    ></SectionComp>
                    <SectionComp
                        title="10. Start uwsgi on server start"
                        desc={
                            <>
                                <OneLineSpan line="Create systemd file"></OneLineSpan>
                                <CodeBlock
                                    linuxc={true}
                                    lines={["sudo vim /etc/systemd/system/emperor.uwsgi.service"]}
                                ></CodeBlock>
                                <OneLineSpan line="Copy and paste below into file"></OneLineSpan>
                                <BigBlock
                                    block={`
[Unit]
Description=uwsgi emperor
After=network.target
[Service]
User=eric
Restart=always
ExecStart=/home/eric/env/myEnv/bin/uwsgi --emperor /home/eric/env/myEnv/vassals --uid www-data --gid www-data
[Install]
WantedBy=multi-user.target
            
            `}
                                ></BigBlock>
                                <OneLineSpan line="Enable uwsgi to start on system boot by running below commands"></OneLineSpan>
                                <CodeBlock
                                    linuxc={true}
                                    lines={[
                                        "sudo systemctl enable emperor.uwsgi.service",
                                        "sudo systemctl start emperor.uwsgi.service",
                                    ]}
                                ></CodeBlock>
                                <OneLineSpan line="Reboot server to make sure everything is working"></OneLineSpan>
                                <CodeBlock linuxc={true} lines={["sudo reboot"]}></CodeBlock>
                            </>
                        }
                    ></SectionComp>
                </div>
            </div>
        </div>
    );
}

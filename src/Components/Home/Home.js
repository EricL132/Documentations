import "./Home.css";
import HoverPicture from "../HoverPicture/Hover";
import CodeBlock from "../CodeBlock/CodeBlock";
import BigBlock from "../BigBlock/BigBlock";
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
            2. Update Python to at Least Python3.6
          </h1>
          <CodeBlock
            lines={[
              "sudo add-apt-repository ppa:deadsnakes/ppa",
              "sudo apt-get update",
              "sudo apt-get install python3.6",
            ]}
          ></CodeBlock>
        </div>
        <div className="guide_part_block">
          <h1 className="guide_part_block_header">
            3. Setup Virutal Environment for Python
          </h1>
          <CodeBlock
            lines={[
              "sudo apt-get install python3.6-venv",
              "mkdir /home/eric/env/",
              "python3.6 -m venv /home/eric/env/myEnv",
              "source /home/eric/env/myEnv/bin/activate",
            ]}
          ></CodeBlock>

          <div className="guide_bottom_discription">
            <span className="guide_span">
              Replace eric with ubuntu username
              <div className="hover_image_containers sameline_image">
                How to check username
                <HoverPicture picture="https://i.gyazo.com/3a3a70e658b1e9b6152f06c46d92cfd0.png"></HoverPicture>
              </div>
            </span>
            <span>Replace myEnv with any name</span>
          </div>
        </div>

        <div className="guide_part_block">
          <h1 className="guide_part_block_header">
            4. Create or Import Django Project
          </h1>
          <CodeBlock
            lines={[
              "pip install Django",
              "django-admin startproject myProjectName",
              "cd myProjectName",
            ]}
          ></CodeBlock>
        </div>
        <div className="guide_part_block">
          <h1 className="guide_part_block_header">2. Setup uwsgi</h1>
          <CodeBlock
            lines={[
              "sudo apt-get install python3.6-dev",
              "sudo apt-get install gcc",
              "pip install uwsgi",
            ]}
          ></CodeBlock>
        </div>
        <div className="guide_part_block">
          <h1 className="guide_part_block_header">
            5. Connect Uwsgi to Django
          </h1>
          <CodeBlock
            lines={["uwsgi --http :8000 --module djangoProjectName.wsgi"]}
          ></CodeBlock>
          <div className="guide_bottom_discription">
            <span className="guide_span">
              Make sure to allow port 8000 access in firewall settings
              <div className="hover_image_containers sameline_image">
                How it should look
                <HoverPicture picture="https://i.gyazo.com/bc032f563ed57f33d49e1a332a2290ee.png"></HoverPicture>
              </div>
            </span>
            <span className="guide_span">
              Make sure to add server IP or domain to Allowed hosts in django
              settings.py folder
            </span>
            <span className="guide_span">
              The above command goes into the djangoProjectName folder and the
              file wsgi.py
            </span>
            <span className="guide_span">
              If everything is correct you should be able to go to
              IPADDRESS/DOMAIN:8000 in your browser
            </span>
          </div>
        </div>
        <div className="guide_part_block">
          <h1 className="guide_part_block_header">6. Setup Nginx</h1>
          <CodeBlock
            lines={[
              "sudo apt-get install nginx",
              "sudo vim /etc/nginx/sites-available/djangoProjectName.conf",
            ]}
          ></CodeBlock>

          <div className="guide_bottom_discription">
            <span className="guide_span">
              Click i to edit file/enter insert mode in vim
            </span>
            <span className="guide_span">
              Paste the below code block into the file
            </span>
            <span className="guide_span guide_span_bottom">
              Leave insert mode with esc and type :wq to save file
            </span>
          </div>
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
          <span className="guide_span guide_span_bottom">
            Create uwsgi_params file
          </span>
        </div>
        <CodeBlock
          lines={["vim /home/eric/djangoProjectName/uwsgi_params"]}
        ></CodeBlock>
        <div className="guide_bottom_discription">
          <span className="guide_span guide_span_bottom">
            Copy and Paste params into file
          </span>
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
          <span className="guide_span guide_span_bottom">
            Push changes to nginx, Run this line everytime you change
            myProjectName.conf
          </span>
        </div>
        <CodeBlock
          lines={[
            "sudo ln -s /etc/nginx/sites-available/myDjangoProject.conf /etc/nginx/sites-enabled/",
          ]}
        ></CodeBlock>
        <div className="guide_bottom_discription">
          <span className="guide_span ">
            Setup static root in django settings.py file
          </span>
          <span className="guide_span ">
            import os
            <div className="hover_image_containers sameline_image">
              Where to put it
              <HoverPicture picture="https://i.gyazo.com/c084ec986fb34fb6a302fdc59c3166c0.png"></HoverPicture>
            </div>
          </span>
          <span className="guide_span guide_span_bottom">
            Add below line into settings.py
            <div className="hover_image_containers sameline_image">
              Where to put it
              <HoverPicture picture="https://i.gyazo.com/a1650c0b01ff3afbd54601154e78a1f3.png"></HoverPicture>
            </div>
          </span>
          <CodeBlock
            lines={[`STATIC_ROOT = os.path.join(BASE_DIR, "static/")`]}
          ></CodeBlock>
          <span className="guide_span guide_span_bottom">
            Run below line in ssh
            <div className="hover_image_containers sameline_image">
              What ssh should look
              <HoverPicture picture="https://i.gyazo.com/6b028bfde94fbe18a56dc9e82980798c.png"></HoverPicture>
            </div>
          </span>

          <CodeBlock lines={["python manage.py collectstatic"]}></CodeBlock>
          <span className="guide_span guide_span_bottom">
            Run below line everyime you change myDjangoProject.conf
          </span>
          <CodeBlock lines={["sudo /etc/init.d/nginx restart"]}></CodeBlock>
        </div>
        <h1 className="guide_part_block_header">
          7. Combine Nginx, Django, and uwsgi
        </h1>
        <CodeBlock
          lines={[
            "uwsgi --socket djangoProjectName.sock --module djangoProjectName.wsgi --chmod-socket=666",
          ]}
        ></CodeBlock>
        <span className="guide_span guide_span_bottom">
          Run above line to check if everything is working should get 502 Bad
          Gateway
        </span>
        <h1 className="guide_part_block_header">
          8. Setup uwsgi for Production
        </h1>
        <span>Run below line in root of django project</span>
        <CodeBlock lines={["vim djangoProjectName_uwsgi.ini"]}></CodeBlock>
        <span>Copy and paste below text into file above</span>
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
        <span>Run below line you should see django launch page</span>
        <CodeBlock
          lines={["uwsgi --ini djangoProjectName_uwsgi.ini"]}
        ></CodeBlock>
        <h1 className="guide_part_block_header">9. Setup uwsgi emporer mode</h1>
        <CodeBlock
          lines={[
            "cd /home/eric/env/myEnv/",
            "mkdir vassals",
            "sudo ln -s /home/eric/djangoProjectName/djangoProjectName_uwsgi.ini /home/eric/env/myEnv/vassals/",
          ]}
        ></CodeBlock>
        <span>Run below line you should see django launch page</span>
        <CodeBlock
          lines={[
            "uwsgi --emperor /home/eric/env/myEnv/vassals --uid www-data --gid www-data",
          ]}
        ></CodeBlock>
        <h1 className="guide_part_block_header">10. Start uwsgi on server start</h1>
          <span className="guide_span">Create systemd file</span>
          <CodeBlock lines={["vim /etc/systemd/system/emperor.uwsgi.service"]}></CodeBlock>
          <span>Copy and paste below into file</span>
          <BigBlock block={`
[Unit]
Description=uwsgi emperor
After=network.target
[Service]
User=eric
Restart=always
ExecStart=/home/eric/env/myEnv/bin/uwsgi --emperor /home/eric/env/myEnv/vassals --uid www-data --gid www-data
[Install]
WantedBy=multi-user.target
          
          `}></BigBlock>
          <span>Enable uwsgi to start on system boot by running below commands</span>
          <CodeBlock lines={["systemctl enable emperor.uwsgi.service","systemctl start emperor.uwsgi.service"]}></CodeBlock>
          <span>Reboot server to make sure everything is working</span>
          <CodeBlock lines={["sudo reboot"]}></CodeBlock>
      </div>
    </>
  );
}

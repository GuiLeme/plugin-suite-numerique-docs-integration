#!@/bin/bash
sudo cp hocuspocus.nginx /usr/share/bigbluebutton/nginx/hocuspocus.nginx
sudo systemctl restart nginx

cd hocuspocus-server
node dist/src/index.js

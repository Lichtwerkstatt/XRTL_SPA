#!/bin/bash
echo Checking for new dependencies 
cd "/home/pi/XRTL_SPA/client"
sudo npm install
cd "/home/pi/XRTL_SPA/server"
sudo npm install

echo Done with checking & installing
sudo git checkout main
echo Pull request
sudo git pull

echo Starting server.js 
cd "/home/pi/XRTL_SPA/server"
sudo node server_himbeere.js


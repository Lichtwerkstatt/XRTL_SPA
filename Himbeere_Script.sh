#!/bin/bash
echo Checking for new dependencies 
cd "/home/pi/XRTL_SPA"
npm install
cd "/home/pi/XRTL_SPA/client"
npm install
cd "/home/pi/XRTL_SPA/server"
npm install

echo Done with checking & installing
git checkout main
echo Pull request
git pull

echo Starting server.js 
cd "/home/pi/XRTL_SPA/server"
node server_himbeere.js

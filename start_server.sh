#!/bin/bash

# Enter the file path of the XRTL server folder here
cd "XRTL_DIRCECTORY/server"

echo "$(tput setaf 3)Git pull request$(tput setaf 7)"
git pull

echo "$(tput setaf 3)Checking for new dependencies$(tput setaf 7)"
npm install
echo "$(tput setaf 3)Done with checking and installing$(tput setaf 7)"

echo "$(tput setaf 3)Reproxy update $(tput setaf 7)"
# Enter file path to the build folder, so that the build folders is copied into the folder, which Nginx hosts
sudo cp -r PATH_TO_BUILD_FOLDER/build/. /var/www/html
#Restart of the webserver
sudo service nginx restart

echo "$(tput setaf 2)Update was successful!$(tput setaf 7)"
sleep 2

echo "Starting server.js"
node server.js


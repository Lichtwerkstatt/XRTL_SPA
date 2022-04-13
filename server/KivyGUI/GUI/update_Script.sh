#!/bin/bash
echo "$(tput setaf 3)Checking for new dependencies$(tput setaf 7)"
cd ..
cd ..
npm install
cd ..
npm install
cd client
npm install

echo "$(tput setaf 3)Done with checking and installing$(tput setaf 7)"
git checkout main
echo "$(tput setaf 3)Git pull request$(tput setaf 7)"
git pull

echo "$(tput setaf 2)Update was successful!$(tput setaf 7)"
sleep 2

# echo "Starting server.js"
# cd ..
# cd server
# node server_local.js


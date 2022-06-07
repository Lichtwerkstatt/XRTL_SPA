#!/bin/bash
echo "$(tput setaf 3)Start installing all the pip dependencies$(tput setaf 7)"
pip install kivy[full] python-socketio kivymd virtualenv

echo "$(tput setaf 2)Done with the installation!$(tput setaf 7)"

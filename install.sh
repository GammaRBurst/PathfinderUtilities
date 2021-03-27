#!/bin/bash
sudo apt update
sudo apt install python3 python3-dev python3-pip -y
sudo -H pip3 install --upgrade pip
sudo -H pip3 install -r requirements.txt


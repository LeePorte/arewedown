#!/usr/bin/env bash
sudo apt-get update

#install node js
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install nodejs  -y

# npm dev packages
sudo npm install yarn -g
sudo npm install pkg@5.1.0 -g
sudo npm install nyc@15.1.0 -g
sudo npm install codecov -g

# docker
sudo apt install docker.io -y
sudo apt install docker-compose -y
sudo usermod -aG docker vagrant

# force startup folder to vagrant project
echo "cd /vagrant/src" >> /home/vagrant/.bashrc

# set hostname, makes console easier to identify
sudo echo "arewedown" > /etc/hostname
sudo echo "127.0.0.1 arewedown" >> /etc/hosts

# Ansible Playbook Generator Angular UI

Before starting, for details on Ansible Docs, refer to [Ansible Docs](https://docs.ansible.com/ansible/2.8/modules/modules_by_category.html)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.29.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Overview

The idea is to build a single production grade Angular UI with the following

      • Ability to generate Ansible Playbook instead of coding the YAML

## Web App 
	
[Deployed Here](http://www.ansiplaygen.xyz/) on Google Cloud Platform - Kubernetes Cluster

### Video Sample

[![Watch the video](https://img.youtube.com/vi/yR0x0XGLcFo/maxresdefault.jpg)](https://youtu.be/yR0x0XGLcFo)

## Motivation

To avoid the pain points of

      • Manually taking care of indentation or special characters.
      
      • Ease of interaction with UI technologies like Angular

## Tech / Framework used

      --> Docker Image to host the Angular app. 
	  			
      --> Angular 8

## Dependencies

1) [Ansible Docs Boot](https://github.com/maheshyaddanapudi/ansible-docs-boot) 
2) [Ansible Playbook JSON 2 YAML](https://github.com/maheshyaddanapudi/ansible-playbook-json2yaml) 

## Containerization CI (Continuous Integration)

| CI Provider | Status          |
| ------- | ------------------ |
| Docker   | ![Docker](https://github.com/maheshyaddanapudi/ansible-playbook-generator-ui/workflows/Docker/badge.svg?branch=main) |
| Docker Image CI   | ![Docker Image CI](https://github.com/maheshyaddanapudi/ansible-playbook-generator-ui/workflows/Docker%20Image%20CI/badge.svg?branch=main) |

Docker Image published to <a href="https://hub.docker.com/repository/docker/zzzmahesh/ansible-playbook-generator-ui" target="_blank">DockerHub here</a>

Image is equipped with production ready Nginx

To pull the image :

	docker pull zzzmahesh/ansible-playbook-generator-ui

## Run Docker Compose

Clone the repository to your local.

    git clone https://github.com/maheshyaddanapudi/ansible-playbook-generator-ui.git

Verify if tha git submodules ansible-docs-boot and ansible-playbook-json2yaml have corresponding Dockerfile inside the respective folders.
If not, use the below command to link and checkout

    git submodule add -b main -f https://github.com/maheshyaddanapudi/ansible-docs-boot
    git submodule add -b main -f https://github.com/maheshyaddanapudi/ansible-playbook-json2yaml

To run the docker-compose : For ansible-docs-boot and ansible-playbook-json2yaml into different containters, using their corresponding docker images.

    docker-compose build
    docker-compose up or docker-compose up -d (For deamonizing the processes)

Once all containers are started successfully, the "docker ps" output should look something similar to below.

    CONTAINER ID   IMAGE                                  COMMAND                  CREATED          STATUS          PORTS                                     NAMES
    8898cad78b57   ansible-playbook-generator-ui:latest   "/docker-entrypoint.…"   13 minutes ago   Up 13 minutes   0.0.0.0:80->80/tcp                        ansible-playbook-generator-ui_ansible-playbook-generator-ui_1
    6d11bf56c037   ansible-playbook-json2yaml             "/entrypoint.sh /sta…"   26 minutes ago   Up 13 minutes   80/tcp, 443/tcp, 0.0.0.0:5000->5000/tcp   ansible-playbook-generator-ui_ansible-playbook-json2yaml_1
    1fdba166d095   ansible-docs-boot                      "/bin/bash /appln/sc…"   26 minutes ago   Up 13 minutes   0.0.0.0:8080->8080/tcp                    ansible-playbook-generator-ui_ansible-docs-boot_1

Access the UI --> http://localhost

## Run : Angular

		cd <to project root folder>
		
	Below command will start the application
		ng serve

## Application URLs

		http://localhost:4200 - To access Home Page

## Run ansible Boot : Docker

To run the container :

    docker run --name ansible-playbook-generator-ui -p 80:80 -d zzzmahesh/ansible-playbook-generator-ui:latest
    

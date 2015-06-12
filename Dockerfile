############################################################
# Dockerfile to build Nginx Server For Jobo's WanderlustBlog
# Based on Ubuntu
############################################################

# Set the base image to Ubuntu
FROM ubuntu

# File Author / Maintainer
MAINTAINER Bugi Goertz

# Update the repository
RUN apt-get update

# Install necessary packages
RUN apt-get install -y nano wget dialog net-tools

RUN apt-get install -y nginx
# Remove the default Nginx configuration file
RUN rm -v /etc/nginx/nginx.conf
# Copy a configuration file from the current directory
ADD conf/nginx.conf /etc/nginx/


RUN apt-get install -y npm
RUN apt-get install -y nodejs-legacy

RUN npm install -g \
 	bower \
	gulp \
	gulp-autoprefixer \
	gulp-concat \
	gulp-sass \
	gulp-util

# Prepend openlayers to prevent complete rebuild after changes in htdocs/
ADD openlayers /openlayers/
WORKDIR /openlayers
RUN npm install openlayers

ADD htdocs /data/
WORKDIR /data
RUN bower --allow-root --config.interactive=false install
RUN npm link gulp gulp-sass gulp-concat gulp-util gulp-autoprefixer && gulp deploy

EXPOSE 80

CMD exec /usr/sbin/nginx
#!/bin/bash

# Description:  The script for moving the portal build.
# This is script 2 of 2, the previous one is cpg.sh,
# which is run by beta_portal_user.

# MUST USE SUDO TO RUN!!!

# Make sure we're in the right directory.
cd /home/beta_portal_user/portal/build/


# Moving

# Get rid of the portal folder.
rm /var/www/html/beta_portal -rf

# Re-make the build folder.
mkdir /var/www/html/beta_portal/

# Copy the build folder over.
cp * /var/www/html/beta_portal/ -r

# Change permissions.
chmod 755 /var/www/html/beta_portal/ -R

# Restart the service.
systemctl restart nginx


#!/bin/bash

# Description:  The script for cloning from GitHub.
# This is script 1 of 2, the next one is mpb.sh,
# run by any wheel user.

# Make sure we're in the right directory.
cd ~


# Cloning

# Remove the portal folder.
rm portal -rf

# Clone the repository.
git clone https://github.com/carmstrong1gw/portal

# Get in the repository.
cd portal

# Install.
npm install

# Build.
npm run-script build

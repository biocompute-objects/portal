# BCO portal


There are two scripts for deploying the portal, cpg.sh (Clone Portal from Github) and mpb.sh (Move Portal Build).  cpg.sh should be run in beta_portal_user or portal_user's home directory, as that is where the build is done.  mpb.sh should be run in a wheel user's home directory, as the script requires sudo permissions to move the build from beta_portal_user or portal_user's home directory. In summary,

### Steps

1. cpg.sh (Clone Portal from Github) - Run in beta_portal_user or portal_user's home directory.
2. mpb.sh (Move Portal Build) - Run in a wheel user's home directory using "sudo mpb.sh".

### UserDB

The git folder (application) that contains all of the user information for the portal is /portal/userdb/.  You'll want to create a virtual environment and a super user to administer the user application using the following steps.

### Steps

1. cd /portal/userdb/
2. virtualenv env
3. source env/bin/activate
4. cd portalusers
4. pip3 install -r requirements.txt
5. python3 manage.py makemigrations
6. python3 manage.py migrate
7. python3 manage.py createsuperuser (fill out the information)

(Optional) If you're not using nginx and gunicorn, you can serve the application directly by following these steps.

1. python3 manage.py runserver 8000


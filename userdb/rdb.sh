#!/usr/bin/bash

find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc"  -delete

cd portalusers

rm db.sqlite3

python3 manage.py makemigrations
python3 manage.py migrate

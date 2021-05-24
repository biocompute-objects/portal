#!/usr/bin/bash

deactivate

clear

find . -path "./migrations/*.py" -not -name "__init__.py" -delete
find . -path "./migrations/*.pyc"  -delete

cd ..

rm db.sqlite3

python3 manage.py makemigrations
python3 manage.py migrate

if [[ $1 == '-r' ]]
then

	python3 manage.py runserver 8080

fi


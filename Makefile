setup:
	pip install -r requirements.txt
	python manage.py makemigrations user
	python manage.py migrate user
	python manage.py makemigrations
	python manage.py migrate
	npm install
	npm run build
	@echo "Now execute make run"

run:
	python manage.py runserver
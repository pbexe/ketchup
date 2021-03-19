
FROM python:3.8.0-slim-buster
WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
EXPOSE 8000

RUN apt-get update && apt-get install -y build-essential zlib1g-dev libjpeg-dev libpq-dev && rm -rf /var/lib/apt/lists/*

COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

COPY . /usr/src/app/

CMD python manage.py runserver 0.0.0.0:8000

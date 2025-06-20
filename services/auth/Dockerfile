FROM python:3.12.7

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 15000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
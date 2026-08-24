#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --no-input

# Run migrations
python manage.py migrate

# Create superuser if it doesn't exist
python manage.py shell -c "
from django.contrib.auth.models import User
if not User.objects.filter(username='Nina').exists():
    User.objects.create_superuser('Nina', 'nina@example.com', 'Nina#1234')
    print('Superuser Nina created.')
else:
    print('Superuser Nina already exists.')
"

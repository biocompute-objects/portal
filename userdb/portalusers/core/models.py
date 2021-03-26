# Customer user model.
# Source: https://docs.djangoproject.com/en/3.1/topics/auth/customizing/#extending-the-existing-user-model
# Source: https://docs.djangoproject.com/en/3.1/topics/db/models/#many-to-one-relationships

from django.db import models
from django.contrib.auth.models import User

# API Information is kept separate so that we can use it
# elsewhere easily.

# API Information
class ApiInfo(models.Model):

    # Servers for which the user has keys.

    # max_length = 15 because hostnames are xxx.xxx.xxx.xxx
    hostname = models.CharField(max_length=15)

    # "Arbitrarily" long API key
    apikey = models.CharField(max_length=1000)

    # Allow it to be accessible.
    pass

class BcoUser(models.Model):
    
    # Standard user information.

    # Require differented related_name fields.
    # Source: https://stackoverflow.com/questions/26955319/django-reverse-accessor-clashes
    username = models.OneToOneField(User, on_delete=models.CASCADE, related_name='custom_username')
    password = models.OneToOneField(User, on_delete=models.CASCADE, related_name='custom_password')
    first_name = models.OneToOneField(User, on_delete=models.CASCADE, related_name='custom_first_name')
    last_name = models.OneToOneField(User, on_delete=models.CASCADE, related_name='custom_last_name')
    email = models.OneToOneField(User, on_delete=models.CASCADE, related_name='custom_email')
    groups = models.OneToOneField(User, on_delete=models.CASCADE, related_name='custom_groups')

    # API information.
    #api_info = models.ForeignKey(ApiInfo, on_delete=models.CASCADE)

    


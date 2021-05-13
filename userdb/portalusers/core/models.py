# Customer user model.
# Source: https://docs.djangoproject.com/en/3.1/topics/auth/customizing/#extending-the-existing-user-model
# Source: https://docs.djangoproject.com/en/3.1/topics/db/models/#many-to-one-relationships

from django.db import models
from django.contrib.auth.models import User


# API Information is kept separate so that we can use it
# elsewhere easily.


# API Information
class ApiInfo(models.Model):

    # Set the local user.
    local_username = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'custom_user')
    
    # Servers for which the user has keys.

    # The username on the server.
    username = models.CharField(blank = True, max_length = 1000)

    # max_length = 15 because hostnames are xxx.xxx.xxx.xxx
    hostname = models.CharField(blank = True, max_length = 15)

    # Need to use a human-readable name
    human_readable_hostname = models.CharField(blank = True, max_length = 1000)

    # "Arbitrarily" long token
    token = models.CharField(blank = True, max_length = 1000)

    # Permissions and other information.
    other_info = models.JSONField()

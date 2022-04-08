from pyexpat import model
from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class CustomUser(AbstractUser):
    full_name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)

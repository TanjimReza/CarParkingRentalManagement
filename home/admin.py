from django.contrib import admin
from .models import CustomUser
from home.models import CustomUser
from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
# Register your models here.
admin.site.register(CustomUser)
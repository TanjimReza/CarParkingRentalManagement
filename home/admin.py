from django.contrib import admin
from .models import *
from home.models import Users
from django.contrib import admin
from django.contrib.auth.models import User
# Register your models here.
admin.site.register(Users)
admin.site.register(ParkingSlots)
admin.site.register(SpotOwner)
admin.site.register(Rentee)
admin.site.register(Engine)
admin.site.register(FuelType)
# admin.site.register(Payment)
admin.site.register(Rentee_Reviews_ParkingSlots)
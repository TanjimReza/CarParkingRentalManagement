from django.contrib import admin
from .models import Users, ParkingSlots, Rentee, Rentee_Reviews_ParkingSlots, SpotOwner
from home.models import Users
from django.contrib import admin
from django.contrib.auth.models import User
# Register your models here.
admin.site.register(Users)
admin.site.register(ParkingSlots)
admin.site.register(SpotOwner)
admin.site.register(Rentee)
admin.site.register(Rentee_Reviews_ParkingSlots)
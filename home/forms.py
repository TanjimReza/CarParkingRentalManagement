import email
from django.forms import ModelForm
from .models import Users, ParkingSlots, Rentee, Rentee_Reviews_ParkingSlots, SpotOwner

class UserForm(ModelForm):
    class Meta: 
        model = Users
        fields = '__all__'


class RenteeForm(ModelForm):
    class Meta:
        model = Rentee
        fields = '__all__'

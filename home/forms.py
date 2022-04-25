import email
from django.forms import ModelForm
from .models import *
from django.contrib.auth.forms import UserCreationForm


class UserForm(ModelForm):
    class Meta: 
        model = Users
        fields = '__all__'


class OwnerForm(ModelForm):
    class Meta:
        model = SpotOwner
        fields = '__all__'

class RenteeForm(ModelForm):
    class Meta:
        model = Rentee
        fields = '__all__'
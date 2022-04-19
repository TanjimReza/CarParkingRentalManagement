import email
from django.forms import ModelForm
from .models import *

class UserForm(ModelForm):
    class Meta: 
        model = Users
        fields = '__all__'

class SpotOwnerForm(ModelForm):
    class Meta:
        model = SpotOwner
        fields = '__all__'
class RenteeForm(ModelForm):
    class Meta:
        model = Rentee
        fields = '__all__'

class EngineForm(ModelForm):
    class Meta:
        model = Engine
        fields = '__all__'
        
class FuelTypeForm(ModelForm):
    class Meta:
        model = FuelType
        fields = '__all__'
class PaymentForm(ModelForm):
    class Meta:
        model = Payment
        fields = '__all__'
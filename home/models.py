from importlib.abc import Traversable
import django
from django.contrib.auth.models import (AbstractBaseUser, AbstractUser,
                                      BaseUserManager)
from django.db import models


class UsersManager(BaseUserManager):
    def create_user(self, nid, password=None):
        if not nid:
            raise ValueError('Users must have an nid address')
        user = self.model(
            nid=self.normalize_email(nid),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
class Users(AbstractBaseUser):
    user_type = (
        ('R', 'Rentee'),
        ('S', 'Spot Owner'),
    )
    nid = models.CharField(max_length=30, unique=True, primary_key=True)
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=128)
    contact = models.CharField(max_length=15, null=True)
    last_login = models.DateTimeField(auto_now_add=True, null=True)
    is_owner = models.CharField(max_length=10, choices=user_type,default='user')
    USERNAME_FIELD = 'nid'
    objects = UsersManager()
    def __str__(self):
        return self.nid

class SpotOwner(models.Model):
    user_type = (
        ('R', 'Rentee'),
        ('S', 'Spot Owner'),
    )
    nid = models.ForeignKey(Users, on_delete=models.CASCADE, unique=True, primary_key=True)
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=128)
    contact = models.CharField(max_length=15, null=True)
    last_login = models.DateTimeField(auto_now_add=True, null=True)
    is_owner = models.CharField(max_length=10, choices=user_type,default='user')
    # USERNAME_FIELD = 'nid'
    # objects = UsersManager()
    
    def __str__(self):
        return str(self.nid)

class Rentee(models.Model):
    user_type = (
        ('R', 'Rentee'),
        ('S', 'Spot Owner'),
    )
    nid = models.ForeignKey(Users, on_delete=models.CASCADE, unique=True, primary_key=True)
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=128)
    contact = models.CharField(max_length=15, null=True)
    last_login = models.DateTimeField(auto_now_add=True, null=True)
    is_owner = models.CharField(max_length=10, choices=user_type,default='user')
    # USERNAME_FIELD = 'nid'
    # objects = UsersManager()
    def __str__(self):
        return str(self.nid)


class ParkingSlots(models.Model):
    SLOTS = ['9:00AM-11:00AM','11:00AM-1:00PM','1:00PM-3:00PM','3:00PM-5:00PM']
    # owner_nid = models.ForeignKey(SpotOwner, on_delete=models.SET_NULL, null=True)
    slot_id = models.CharField(max_length=30, unique=True, primary_key=True)
    owner = models.ForeignKey(SpotOwner, related_name='parking_slots', on_delete=models.CASCADE, null=True)
    house = models.CharField(max_length=200)
    area = models.CharField(max_length=200)
    street = models.CharField(max_length=200)
    time_slots = models.CharField(max_length=256, default=SLOTS, null=True,editable=False)
#     city = models.CharField(max_length=200)
    
    def __str__(self) -> str:
        return str(self.slot_id)

class Credit(models.Model):
    nid = models.ForeignKey(Rentee, on_delete=models.CASCADE)
    rentee_credit = models.IntegerField()

class Rentee_Reviews_ParkingSlots(models.Model):
    rentee_nid = models.ForeignKey(Rentee, on_delete=models.CASCADE)
    slot_id = models.ForeignKey(ParkingSlots, on_delete=models.CASCADE)
    description = models.CharField(max_length=200)
    rating = models.CharField(max_length=200)


class payment(models.Model):
    nid= models.ForeignKey(Rentee, null=True, on_delete=models.SET_NULL)
    amount = models.IntegerField(null=True)
    credit = models.IntegerField(null=True)
    trxID = models.CharField(max_length=20, null=True)
    
    def __str__(self) -> str:
        return str(self.nid)
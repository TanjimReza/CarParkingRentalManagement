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
    is_spot_owner = models.CharField(max_length=10, choices=user_type,default='user')
    USERNAME_FIELD = 'nid'
    objects = UsersManager()
    def __str__(self):
        return self.nid

class SpotOwner(models.Model):
    nid = models.OneToOneField(Users, on_delete=models.CASCADE, unique=True, primary_key=True)
    is_spot_owner = models.CharField(max_length=10, choices=Users.user_type,default='user')
    def __str__(self) -> str:
        return self.nid.nid
    
class Rentee(models.Model):
    nid = models.ForeignKey(Users, on_delete=models.CASCADE)
    vehicle_type = models.CharField(max_length=200)
    rentee_credit = models.IntegerField()
    def __str__(self):
        return self.name

class ParkingSlots(models.Model):
    slot_id = models.CharField(max_length=30, unique=True, primary_key=True)
    owner = models.ForeignKey(SpotOwner, on_delete=models.CASCADE)
    house = models.CharField(max_length=200)
    area = models.CharField(max_length=200)
    street = models.CharField(max_length=200)
#     city = models.CharField(max_length=200)
    
    def __str__(self) -> str:
        return self.slot_id

class Credit(models.Model):
    nid = models.ForeignKey(Rentee, on_delete=models.CASCADE)
    rentee_credit = models.IntegerField()

class Rentee_Reviews_ParkingSlots(models.Model):
    rentee_nid = models.ForeignKey(Rentee, on_delete=models.CASCADE)
    slot_id = models.ForeignKey(ParkingSlots, on_delete=models.CASCADE)
    description = models.CharField(max_length=200)
    rating = models.CharField(max_length=200)



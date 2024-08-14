from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from phonenumber_field.modelfields import PhoneNumberField
from .manager import UserManager


# Create your models here.

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=256, unique=True, verbose_name="Email Address")
    first_name = models.CharField(max_length=100, verbose_name="First Name")
    last_name = models.CharField(max_length=100, verbose_name="Last Name")
    phone_number = PhoneNumberField(blank=True, null=True, verbose_name="Phone Number")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

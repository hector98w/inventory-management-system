from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.utils import timezone

class UserManager(BaseUserManager):
    def create_user(self,username,password=None,is_active=True,is_staff=False,is_admin=False,is_superuser=False):
        user=self.model(
            username=username,
            )
        user.set_password(password)
        user.is_staff=is_staff
        user.is_admin=is_admin
        user.is_active=is_active
        user.is_superuser=is_superuser
        user.store = None
        user.save(using=self._db)
        return user

    def create_superuser(self,username,password=None):
        user = self.create_user(
            username=username,
            password=password,
            is_staff=True,
            is_admin=True,
            is_superuser=True
            )
        user.store = None
        return user

class Store(models.Model):
    name = models.CharField(
        max_length=20,
        choices=[('Store 1', 'Store 1'), ('Store 2', 'Store 2'), ('Store 3', 'Store 3'),])
    
    def __str__(self):
        return (self.name)
    
class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=20, unique=True)
    store = models.ForeignKey(Store, on_delete=models.CASCADE, null=True)

    is_staff =models.BooleanField(default=False)
    is_admin =models.BooleanField(default=False)
    is_active=models.BooleanField(default=True)

    USERNAME_FIELD = 'username'

    objects = UserManager()

    def __str__(self):
        return (self.username)

class Stock(models.Model):
    category = models.CharField(max_length=20)
    sku = models.CharField(max_length=20, unique=True)
    item_name = models.CharField(max_length=20)
    stock = models.PositiveIntegerField(default=0)
    minimum_stock = models.PositiveIntegerField(default=0)
    created_at = models.DateField(default=timezone.now)
    store = models.ForeignKey(Store, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return (self.item_name)
    
class Report(models.Model):
    category = models.CharField(max_length=20)
    sku = models.CharField(max_length=20)
    item_name = models.CharField(max_length=20)
    stock = models.CharField(max_length=20, null=True)
    edited_date = models.DateField(auto_now_add=True)
    action = models.CharField(max_length=20, null=True)
    store = models.ForeignKey(Store, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return (self.item_name)
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django.core.validators import RegexValidator


class UserManager(BaseUserManager):
  def _create_user(self, phone, password,is_superuser, is_staff, is_admin,**extra_fields):
    if not phone:
        raise ValueError('Users must have a phone')
    now = timezone.now()
    user = self.model(
        phone=phone,
        is_superuser=is_superuser,
        is_staff=is_staff, 
        is_active=True,
        is_admin=is_admin, 
        last_login=now,
        date_joined=now, 
        **extra_fields
    )
    user.set_password(password)
    user.save(using=self._db)
    return user

  def create_user(self, phone, password, **extra_fields):
    return self._create_user(phone, password,False, False,False, **extra_fields)

  def create_superuser(self,phone, password,**extra_fields):
    user=self._create_user(phone, password,True, True,True, **extra_fields)
    return user








class User(AbstractBaseUser, PermissionsMixin):

  first_name = models.CharField(max_length=50, default='worker')

  second_name = models.CharField(max_length=50, default='worker')

  phone = models.CharField(max_length=11,unique=True,validators=[RegexValidator(
            regex='^[0][5][0|2|3|4|5|6|9]{1}[-]{0,1}[0-9]{7}$',
            message='wrong Phone number',
            code='invalid_phone'
        ),])


  username = None

  image = models.ImageField(upload_to='images/',blank=True,null=True)

  is_staff =models.BooleanField(default=False)

  is_admin=models.BooleanField(default=False)

  
  is_active = models.BooleanField(default=True)

  is_superuser=models.BooleanField(default=False)

  last_login = models.DateTimeField(null=True, blank=True)

  date_joined = models.DateTimeField(auto_now_add=True)
    
  #token = models.CharField(max_length=100, default=0)

  objects = UserManager()

  USERNAME_FIELD = 'phone'

  REQUIRED_FIELDS = ['first_name','second_name',]

  def __str__(self):
    if  self.first_name and self.second_name :
      return self.first_name+" "+self.second_name
    return self.first_name  

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
  if created:
    Token.objects.create(user=instance)
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class City(models.Model):
    name = models.CharField(max_length=100)    
    def __str__(self):
        return self.name


class UserProfile(models.Model):
    user = models.OneToOneField(User)
    email_address = models.EmailField(max_length=250)
    profile_picture = models.ImageField(upload_to='uploads', null=True, blank=True)


class Party(models.Model):
    location_name = models.CharField(max_length=100)
    city = models.ForeignKey(City)
    street_address = models.CharField(max_length=200)
    theme = models.CharField(max_length=100, blank=True)
    creator = models.ForeignKey(User)
    date_of_party = models.DateField()
    time_of_party = models.TimeField()

    def __str__(self):
        return self.location_name


class Song(models.Model):
    song_name = models.CharField(max_length=100)
    user = models.ForeignKey(User)
    party = models.ForeignKey(Party)


@receiver(post_save, sender=User)
def create_user_profile(sender, **kwargs):
    user_instance = kwargs.get('instance')
    if kwargs.get('created'):
        UserProfile.objects.create(user=user_instance)

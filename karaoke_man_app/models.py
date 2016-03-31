from django.db import models
from django.contrib.auth.models import User


class City(models.Model):
    name = models.CharField(max_length=100)


class UserProfile(models.Model):
    user = models.OneToOneField(User)
    score = models.IntegerField()
    preferred_city = models.ForeignKey(City)


class Party(models.Model):
    city = models.ForeignKey(City)
    location_name = models.CharField(max_length=100)
    street_address = models.CharField(max_length=200)
    theme = models.CharField(max_length=100, blank=True)


class Song(models.Model):
    song_name = models.CharField(max_length=100)
    user = models.ManyToManyField(User)

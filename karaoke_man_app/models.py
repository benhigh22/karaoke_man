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


class Location(models.Model):
    user = models.ForeignKey(User)
    city = models.ForeignKey(City)
    street_address = models.CharField(max_length=200)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Party(models.Model):
    location = models.ForeignKey(Location)
    creator = models.ForeignKey(User)
    date_of_party = models.DateField()
    time_of_party = models.TimeField()
    party_name = models.CharField(max_length=75)
    desription = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.party_name


class Attendee(models.Model):
    user = models.ManyToManyField(User)
    party = models.ForeignKey(Party)


class SongQueue(models.Model):
    party = models.ForeignKey(Party)
    attendees = models.ForeignKey(Attendee)
    singer_name = models.CharField(max_length=100)
    song_name = models.CharField(max_length=100)
    time_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.song_name


@receiver(post_save, sender=User)
def create_user_profile(sender, **kwargs):
    user_instance = kwargs.get('instance')
    if kwargs.get('created'):
        UserProfile.objects.create(user=user_instance)

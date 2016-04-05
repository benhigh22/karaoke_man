from django.contrib.auth.models import User
from rest_framework import serializers

from karaoke_man_app.models import UserProfile, City, Party, Song


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile


class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City


class PartySerializer(serializers.ModelSerializer):

    class Meta:
        model = Party


class SongSerializer(serializers.ModelSerializer):

    class Meta:
        model = Song

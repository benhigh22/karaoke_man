from django.contrib.auth.models import User
from rest_framework import serializers

from karaoke_man_app.models import UserProfile, City, Party, Attendee, SongQueue, Location


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

    def create(self, validated_data):
        user = User(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            if key == 'password':
                instance.set_password(value)
            else:
                setattr(instance, key, value)
        instance.save()
        return instance


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile


class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location


class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City


class PartySerializer(serializers.ModelSerializer):
    location_name = serializers.SerializerMethodField()

    def get_location_name(self, obj):
        return obj.location.name

    class Meta:
        model = Party



class AttendeeSerializer(serializers.ModelSerializer):
    party_name = serializers.SerializerMethodField()
    party_date = serializers.SerializerMethodField()
    party_time = serializers.SerializerMethodField()

    def get_party_name(self, obj):
        return obj.party.party_name

    def get_party_date(self, obj):
        return obj.party.date_of_party

    def get_party_time(self, obj):
        return obj.party.time_of_party

    class Meta:
        model = Attendee


class SongQueueSerializer(serializers.ModelSerializer):

    class Meta:
        model = SongQueue

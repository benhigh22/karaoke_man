import json
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from django.views.generic import TemplateView
from karaoke_man_app.models import City, Party, Attendee, SongQueue, UserProfile, Location
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from karaoke_man_app.serializers import UserSerializer, UserProfileSerializer, LocationSerializer, CitySerializer, PartySerializer, AttendeeSerializer, SongQueueSerializer
from django.shortcuts import render_to_response, redirect
from django.contrib.auth import logout as auth_logout
from django.template.context import RequestContext
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from bs4 import BeautifulSoup
from urllib.parse import parse_qs
import datetime



def login_view(request):
    return render_to_response('login.html', context=RequestContext(request))


def index(request):
    context = RequestContext(request, {'request': request, 'user': request.user})
    return render_to_response('index.html', context_instance=context)


def logout_view(request):
    auth_logout(request)
    return redirect('/')


class IndexView(TemplateView):
    template_name = 'index.html'


"""Beginning of API Views"""


class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


@api_view(['POST'])
@permission_classes((AllowAny, ))
def login_api_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    response_content = {}
    if user is not None:
        serializer = UserSerializer(user)
        if user.is_active:
            login(request, user)
            response_content = {'user': serializer.data, 'success': user.is_authenticated()}
            return JsonResponse(response_content)
    else:
        response_content = {'user': None, 'success': False}
        return JsonResponse(response_content)


@api_view()
def logout_api_view(request):
    serializer = UserSerializer(request.user)
    logout(request)
    return JsonResponse({'user': serializer.data, 'logged_out': True})


class UserProfileCreateAPIView(generics.ListCreateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return UserProfile.objects.filter(user_id=self.kwargs.get('user'))

    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.pk
        return super().create(request, *args, **kwargs)


class UserProfileRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        return UserProfile.objects.filter(user_id=self.kwargs.get('user'), id=self.kwargs.get('pk'))


class CityListCreateAPIView(generics.ListCreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class CityRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class LocationListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = LocationSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Location.objects.filter(city_id=self.kwargs.get('city'))

    def create(self, request, *args, **kwargs):
        request.data['creator'] = request.user.pk
        return super().create(request, *args, **kwargs)


class LocationRetrieveUpdateDestroyAPIView(generics.ListCreateAPIView):
    serializer_class = LocationSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Location.objects.filter(city_id=self.kwargs.get('city'), id=self.kwargs.get('pk'))


class UserListAPIView(generics.ListAPIView):
    serializer_class = PartySerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Party.objects.filter(creator_id=self.kwargs.get('pk'))


class UserLocationListAPIView(generics.ListAPIView):
    serializer_class = LocationSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Location.objects.filter(user_id=self.kwargs.get('pk'))


class PartyListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = PartySerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Party.objects.filter(location_id=self.kwargs.get('location'))


class PartyRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PartySerializer

    def get_queryset(self):
        return Party.objects.filter(location_id=self.kwargs.get('location'), id=self.kwargs.get('pk'))


class AttendeeListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = AttendeeSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Attendee.objects.filter(party_id=self.kwargs.get('party'))

    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.pk
        return super().create(request, *args, **kwargs)


class AttendeeRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AttendeeSerializer

    def get_queryset(self):
        return Attendee.objects.filter(party_id=self.kwargs.get('party'), id=self.kwargs.get('pk'))


class UserAttendeeListAPIView(generics.ListAPIView):
    serializer_class = AttendeeSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Attendee.objects.filter(user_id=self.kwargs.get('user'))


class UserAttendeeRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AttendeeSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Attendee.objects.filter(user_id=self.kwargs.get('user'), id=self.kwargs.get('pk'))


class SongQueueListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = SongQueueSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return SongQueue.objects.filter(attendees__party_id=self.kwargs.get('party'))


class SongQueueRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SongQueueSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return SongQueue.objects.filter(attendees__party_id=self.kwargs.get('party'), id=self.kwargs.get('pk'))


class SongLookupAPIView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        song_name = self.request.GET.get('song_name')
        if song_name:
            scraped_content = requests.get("https://www.youtube.com/results?search_query={}+karaoke+version".format(song_name)).content
            clean_data = BeautifulSoup(scraped_content).find_all(class_="yt-lockup-title")
            song_link = [(song.find("a").get("title"), song.find("a").get("href")) for song in clean_data if not "*" in song.find("a").get("title")][:5]
            links = [{"url": parse_qs(link[1][6:]).get("?v")[0], "title": link[0]} for link in song_link]
            return JsonResponse({'body': links})


class AllCitiesPartiesListAPIView(generics.ListCreateAPIView):
    serializer_class = PartySerializer

    def get_queryset(self):
        todays_date = datetime.date.today()
        return Party.objects.filter(location__city_id=self.kwargs.get('city'), date_of_party__gte=todays_date)

    def create(self, request, *args, **kwargs):
        request.data['city'] = self.kwargs.get('city')
        return super().create(request, *args, **kwargs)

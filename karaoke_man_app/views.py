from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.views.generic import CreateView, TemplateView, ListView, DetailView, UpdateView
from karaoke_man_app.models import City, Party, Queue, UserProfile, Location
from karaoke_man_app.forms import NewUserCreationForm
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from karaoke_man_app.serializers import UserSerializer, UserProfileSerializer, LocationSerializer, CitySerializer, PartySerializer, QueueSerializer
from django.shortcuts import render_to_response, redirect
from django.contrib.auth import logout as auth_logout
from django.template.context import RequestContext


def login_view(request):
    return render_to_response('login.html', context=RequestContext(request))


def index(request):
    context = RequestContext(request, {'request': request, 'user': request.user})
    return render_to_response('index.html', context_instance=context)


def logout_view(request):
    auth_logout(request)
    return redirect('/')


class UserCreateView(CreateView):
    model = User
    form_class = NewUserCreationForm

    def get_success_url(self):
        return reverse("login")


class IndexView(TemplateView):
    template_name = 'index.html'


class CityListView(ListView):
    model = City


class CityDetailView(DetailView):
    model = City

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['parties'] = Party.objects.filter(city=self.kwargs.get('pk'))
        return context


class PartyCreateView(CreateView):
    model = Party
    fields = ('location_name', 'date_of_party', 'time_of_party', 'city', 'street_address')

    def get_success_url(self):
        return reverse("party_detail_view", kwargs={'pk': self.object.pk})


class PartyDetailView(DetailView):
    model = Party

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['queue_list'] = Queue.objects.filter(party=self.kwargs.get('pk'))
        return context


class PartyUpdateView(UpdateView):
    model = Party
    template_name = 'karaoke_man_app/party_update.html'
    fields = ('location_name', 'city', 'street_address')

    def get_success_url(self):
        return reverse("index_view")


class QueueCreateView(CreateView):
    model = Queue
    fields = ('song_name',)

    def form_valid(self, form):
        queue_object = form.save(commit=False)
        queue_object.user = self.request.user
        queue_object.party = Party.objects.get(pk=self.kwargs.get('pk'))
        return super().form_valid(form)

    def get_success_url(self):
        return reverse("index_view")


"""Beginning of API Views"""


class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


@api_view(['POST'])
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
        return Party.objects.filter(location__city_id=self.kwargs.get('city'))


    def create(self, request, *args, **kwargs):
        request.data['creator'] = request.user.pk
        return super().create(request, *args, **kwargs)


class PartyRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PartySerializer

    def get_queryset(self):
        return Party.objects.filter(location__city_id=self.kwargs.get('city'), id=self.kwargs.get('pk'))


class QueueListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = QueueSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Queue.objects.filter(party_id=self.kwargs.get('party'))

    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.pk
        return super().create(request, *args, **kwargs)


class QueueRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = QueueSerializer

    def get_queryset(self):
        return Queue.objects.filter(party_id=self.kwargs.get('party'), id=self.kwargs.get('pk'))


class UserQueueListAPIView(generics.ListAPIView):
    serializer_class = QueueSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Queue.objects.filter(user_id=self.kwargs.get('user'))


class UserQueueRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = QueueSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Queue.objects.filter(user_id=self.kwargs.get('user'), id=self.kwargs.get('pk'))

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.views.generic import CreateView, TemplateView, ListView, DetailView, UpdateView
from karaoke_man_app.models import City, Party, Song, UserProfile
from karaoke_man_app.forms import NewUserCreationForm
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from karaoke_man_app.serializers import UserSerializer, UserProfileSerializer, CitySerializer, PartySerializer, SongSerializer
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
    fields = ('location_name', 'date_of_party', 'time_of_party', 'city', 'street_address', 'theme')

    def get_success_url(self):
        return reverse("party_detail_view", kwargs={'pk': self.object.pk})


class PartyDetailView(DetailView):
    model = Party

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['song_list'] = Song.objects.filter(party=self.kwargs.get('pk'))
        return context


class PartyUpdateView(UpdateView):
    model = Party
    template_name = 'karaoke_man_app/party_update.html'
    fields = ('location_name', 'city', 'street_address', 'theme')

    def get_success_url(self):
        return reverse("index_view")


class SongCreateView(CreateView):
    model = Song
    fields = ('song_name',)

    def form_valid(self, form):
        song_object = form.save(commit=False)
        song_object.user = self.request.user
        song_object.party = Party.objects.get(pk=self.kwargs.get('pk'))
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


class UserProfileListCreateAPIView(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.pk
        return super().create(request, *args, **kwargs)


class UserProfileRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class CityListCreateAPIView(generics.ListCreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class CityRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class PartyListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = PartySerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Party.objects.filter(city_id=self.kwargs.get('pk'))
        
    def create(self, request, *args, **kwargs):
        request.data['creator'] = request.user.pk
        return super().create(request, *args, **kwargs)


class PartyRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Party.objects.all()
    serializer_class = PartySerializer


class SongListCreateAPIView(generics.ListCreateAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.pk
        return super().create(request, *args, **kwargs)


class SongRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

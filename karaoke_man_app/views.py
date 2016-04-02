from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.views.generic import CreateView, TemplateView, ListView, DetailView, UpdateView
from karaoke_man_app.models import City, Party, Song
from karaoke_man_app.forms import NewUserCreationForm


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
    fields = ('location_name', 'city', 'street_address', 'theme')

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

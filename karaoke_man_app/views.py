from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.views.generic import CreateView, TemplateView, ListView, DetailView, UpdateView
from karaoke_man_app.models import City, Party
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


class PartyUpdateView(UpdateView):
    model = Party
    template_name = 'karaoke_man_app/party_update.html'
    fields = ('location_name', 'city', 'street_address', 'theme')

    def get_success_url(self):
        return reverse("index_view")

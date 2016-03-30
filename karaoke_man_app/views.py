from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.views.generic import CreateView, TemplateView


class UserCreateView(CreateView):
    model = User
    form_class = UserCreationForm

    def get_success_url(self):
        return reverse("login")


class IndexView(TemplateView):
    template_name = 'index.html'

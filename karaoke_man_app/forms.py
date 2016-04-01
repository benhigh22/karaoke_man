from django import forms
from django.contrib.auth.forms import UserCreationForm
from karaoke_man_app.models import City,


class NewUserCreationForm(UserCreationForm):
    email = forms.EmailField()
    preferred_city = forms.ForeignKey(City)

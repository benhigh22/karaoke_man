from django import forms
from django.contrib.auth.forms import UserCreationForm


class NewUserCreationForm(UserCreationForm):
    email = forms.EmailField()

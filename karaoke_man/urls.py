
from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth import views as auth_views
from karaoke_man_app.views import UserCreateView, IndexView


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^signup', UserCreateView.as_view(), name='signup'),
    url(r'^login', auth_views.login, name='login'),
    url(r'^logout', auth_views.logout_then_login, name='logout'),
    url(r'^$', IndexView.as_view(), name='index_view'),
]

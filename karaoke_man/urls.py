
from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth import views as auth_views
from karaoke_man_app import views


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^signup', views.UserCreateView.as_view(), name='signup'),
    url(r'^login', auth_views.login, name='login'),
    url(r'^logout', auth_views.logout_then_login, name='logout'),
    url(r'^$', views.IndexView.as_view(), name='index_view'),
    url(r'^city/$', views.CityListView.as_view(), name='city_list_view'),
    url(r'^city/(?P<pk>\d+)/$', views.CityDetailView.as_view(), name='city_detail_view'),
    url(r'^create/party/$', views.PartyCreateView.as_view(), name='party_create_view'),
    url(r'^party/(?P<pk>\d+)/$', views.PartyDetailView.as_view(), name='party_detail_view'),
    url(r'^partyupdate/(?P<pk>\d+)/$', views.PartyUpdateView.as_view(), name='party_update_view'),
    url(r'^party/(?P<pk>\d+)/addsong/$', views.SongCreateView.as_view(), name='song_create_view'),
]

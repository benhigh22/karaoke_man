from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth import views as auth_views
from karaoke_man_app import views
from django.contrib.auth.decorators import login_required


urlpatterns = [
    # API Signup and Login views
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/users/$', views.UserCreateAPIView.as_view(), name='user_create'),
    url(r'^api/login/$', views.api_login_view, name='api_login'),
    url(r'^api/logout/$', views.api_logout_view, name='api_logout'),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url('', include('django.contrib.auth.urls', namespace='auth')),
    url(r'^media/(?P<path>.*)', "django.views.static.serve", {"document_root": settings.MEDIA_ROOT}),
     # API List/Create URLs
    url(r'^api/userprofiles/$', views.UserProfileListCreateAPIView.as_view(), name='userprofile_list_create'),
    url(r'^api/cities/$', views.CityListCreateAPIView.as_view(), name='city_list_create'),
    url(r'^api/parties/$', views.PartyListCreateAPIView.as_view(), name='party_list_create'),
    url(r'^api/songs/$', views.SongListCreateAPIView.as_view(), name='song_list_create'),
    # Retrieve/Update/Destroy API Views
    url(r'^api/userprofiles/(?P<pk>\d+)/$', views.UserProfileRetrieveUpdateDestroyAPIView.as_view(), name='userprofile_retrieve_update_destroy'),
    url(r'^api/cities/(?P<pk>\d+)/$', views.CityRetrieveUpdateDestroyAPIView.as_view(), name='city_retrieve_update_destroy'),
    url(r'^api/parties/(?P<pk>\d+)/$', views.PartyRetrieveUpdateDestroyAPIView.as_view(), name='party_retrieve_update_destroy'),
    url(r'^api/songs/(?P<pk>\d+)/$', views.SongRetrieveUpdateDestroyAPIView.as_view(), name='song_retrieve_update_destroy'),
    # Django template URLs
    url(r'^$', views.IndexView.as_view(), name='index_view'),
    url(r'^city/$', views.CityListView.as_view(), name='city_list_view'),
    url(r'^city/(?P<pk>\d+)/$', views.CityDetailView.as_view(), name='city_detail_view'),
    url(r'^create/party/$', login_required(views.PartyCreateView.as_view()), name='party_create_view'),
    url(r'^party/(?P<pk>\d+)/$', views.PartyDetailView.as_view(), name='party_detail_view'),
    url(r'^partyupdate/(?P<pk>\d+)/$', login_required(views.PartyUpdateView.as_view()), name='party_update_view'),
    url(r'^party/(?P<pk>\d+)/addsong/$', views.SongCreateView.as_view(), name='song_create_view')
]

from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from karaoke_man_app import views
from django.contrib.auth.decorators import login_required


urlpatterns = [
    # API Signup and Login views
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/users/$', views.UserCreateAPIView.as_view(), name='user_create'),
    url(r'^api/login/$', views.login_api_view, name='login_api'),
    url(r'^api/logout/$', views.logout_api_view, name='logout_api'),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url('', include('django.contrib.auth.urls', namespace='auth')),
    url(r'^media/(?P<path>.*)', "django.views.static.serve", {"document_root": settings.MEDIA_ROOT}),
     # API List/Create URLs
    url(r'^api/users/(?P<user>\d+)/userprofiles/$', views.UserProfileCreateAPIView.as_view(), name='userprofile_create'),
    url(r'^api/cities/$', views.CityListCreateAPIView.as_view(), name='city_list_create'),
    url(r'^api/users/(?P<pk>\d+)/parties/$', views.UserListAPIView.as_view(), name='user_list'),
    url(r'^api/cities/(?P<city>\d+)/locations/$', views.LocationListCreateAPIView.as_view(), name='location_list_create'),
    url(r'^api/locations/(?P<location>\d+)/parties/$', views.PartyListCreateAPIView.as_view(), name='party_list_create'),
    url(r'^api/parties/(?P<party>\d+)/queue/$', views.QueueListCreateAPIView.as_view(), name='queue_list_create'),
    url(r'^api/users/(?P<user>\d+)/queue/$', views.UserQueueListAPIView.as_view(), name='user_queue_list'),
    # Retrieve/Update/Destroy API Views
    url(r'^api/users/(?P<user>\d+)/userprofiles/(?P<pk>\d+)/$', views.UserProfileRetrieveUpdateDestroyAPIView.as_view(), name='userprofile_retrieve_update_destroy'),
    url(r'^api/cities/(?P<city>\d+)/$', views.CityRetrieveUpdateDestroyAPIView.as_view(), name='city_retrieve_update_destroy'),
    url(r'^api/cities/(?P<city>\d+)/locations/(?P<pk>\d+)/$', views.LocationRetrieveUpdateDestroyAPIView.as_view(), name='location_retrieve_update_destroy'),
    url(r'^api/locations/(?P<location>\d+)/parties/(?P<pk>\d+)/$', views.PartyRetrieveUpdateDestroyAPIView.as_view(), name='party_retrieve_update_destroy'),
    url(r'^api/parties/(?P<party>\d+)/queue/(?P<pk>\d+)/$', views.QueueRetrieveUpdateDestroyAPIView.as_view(), name='queue_retrieve_update_destroy'),
    url(r'^api/users/(?P<user>\d+)/queue/(?P<pk>\d+)/$', views.UserQueueRetrieveUpdateDestroyAPIView.as_view(), name='user_queue_retrieve_update_destroy'),
    # Django template URLs
    url(r'^$', views.IndexView.as_view(), name='index_view'),
    url(r'^city/$', views.CityListView.as_view(), name='city_list_view'),
    url(r'^city/(?P<pk>\d+)/$', views.CityDetailView.as_view(), name='city_detail_view'),
    url(r'^create/party/$', login_required(views.PartyCreateView.as_view()), name='party_create_view'),
    url(r'^party/(?P<pk>\d+)/$', views.PartyDetailView.as_view(), name='party_detail_view'),
    url(r'^partyupdate/(?P<pk>\d+)/$', login_required(views.PartyUpdateView.as_view()), name='party_update_view'),
    url(r'^party/(?P<pk>\d+)/queue/$', views.QueueCreateView.as_view(), name='queue_create_view')
]

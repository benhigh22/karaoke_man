from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from karaoke_man_app import views


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
    url(r'^api/users/(?P<pk>\d+)/locations/$', views.UserLocationListAPIView.as_view(), name='user_location_list'),
    url(r'^api/cities/(?P<city>\d+)/locations/$', views.LocationListCreateAPIView.as_view(), name='location_list_create'),
    url(r'^api/cities/(?P<city>\d+)/parties/$', views.PartyListCreateAPIView.as_view(), name='party_list_create'),
    url(r'^api/parties/(?P<party>\d+)/attendees/$', views.AttendeeListCreateAPIView.as_view(), name='attendee_list_create'),
    url(r'^api/users/(?P<user>\d+)/attendees/$', views.UserAttendeeListAPIView.as_view(), name='user_attendee_list'),
    url(r'^api/parties/(?P<party>\d+)/songqueues/$', views.SongQueueListCreateAPIView.as_view(), name='song_queue_list_create'),
    # Retrieve/Update/Destroy API Views
    url(r'^api/users/(?P<user>\d+)/userprofiles/(?P<pk>\d+)/$', views.UserProfileRetrieveUpdateDestroyAPIView.as_view(), name='userprofile_retrieve_update_destroy'),
    url(r'^api/cities/(?P<city>\d+)/$', views.CityRetrieveUpdateDestroyAPIView.as_view(), name='city_retrieve_update_destroy'),
    url(r'^api/cities/(?P<city>\d+)/locations/(?P<pk>\d+)/$', views.LocationRetrieveUpdateDestroyAPIView.as_view(), name='location_retrieve_update_destroy'),
    url(r'^api/cities/(?P<city>\d+)/parties/(?P<pk>\d+)/$', views.PartyRetrieveUpdateDestroyAPIView.as_view(), name='party_retrieve_update_destroy'),
    url(r'^api/parties/(?P<party>\d+)/attendees/(?P<pk>\d+)/$', views.AttendeeRetrieveUpdateDestroyAPIView.as_view(), name='attendee_retrieve_update_destroy'),
    url(r'^api/users/(?P<user>\d+)/attendees/(?P<pk>\d+)/$', views.UserAttendeeRetrieveUpdateDestroyAPIView.as_view(), name='user_attendee_retrieve_update_destroy'),
    url(r'^api/parties/(?P<party>\d+)/songqueues/(?P<pk>\d+)/$', views.SongQueueRetrieveUpdateDestroyAPIView.as_view(), name='song_queue_retrieve_update_destroy'),
    # Django template URLs
    url(r'^$', views.IndexView.as_view(), name='index_view'),

]

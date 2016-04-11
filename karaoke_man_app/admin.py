from django.contrib import admin
from karaoke_man_app.models import UserProfile, City, Party, Attendee, SongQueue, Location


admin.site.register(UserProfile)
admin.site.register(City)
admin.site.register(Party)
admin.site.register(Attendee)
admin.site.register(SongQueue)
admin.site.register(Location)

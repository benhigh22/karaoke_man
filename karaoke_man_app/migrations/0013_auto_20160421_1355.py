# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-21 13:55
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('karaoke_man_app', '0012_auto_20160421_1354'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendee',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-11 20:44
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('karaoke_man_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='attendee',
            name='user',
        ),
        migrations.AddField(
            model_name='attendee',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-02 16:00
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('karaoke_man_app', '0006_party_creator'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='preferred_city',
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-01 18:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('karaoke_man_app', '0004_party_song'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='party',
            name='song',
        ),
        migrations.AddField(
            model_name='song',
            name='party',
            field=models.ManyToManyField(to='karaoke_man_app.Party'),
        ),
    ]

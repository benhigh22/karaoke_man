# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-14 19:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('karaoke_man_app', '0003_remove_songqueue_party'),
    ]

    operations = [
        migrations.AlterField(
            model_name='party',
            name='time_of_party',
            field=models.CharField(max_length=30),
        ),
    ]

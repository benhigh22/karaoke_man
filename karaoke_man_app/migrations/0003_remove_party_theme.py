# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-08 18:06
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('karaoke_man_app', '0002_auto_20160405_1947'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='party',
            name='theme',
        ),
    ]

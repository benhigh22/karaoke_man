# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-14 22:48
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('karaoke_man_app', '0005_party_city'),
    ]

    operations = [
        migrations.RenameField(
            model_name='party',
            old_name='desription',
            new_name='description',
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-08 21:36
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('karaoke_man_app', '0002_auto_20160408_2036'),
    ]

    operations = [
        migrations.AddField(
            model_name='party',
            name='city',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='karaoke_man_app.City'),
            preserve_default=False,
        ),
    ]
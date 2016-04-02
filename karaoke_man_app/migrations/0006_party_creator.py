# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-02 15:51
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('karaoke_man_app', '0005_auto_20160401_1830'),
    ]

    operations = [
        migrations.AddField(
            model_name='party',
            name='creator',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]

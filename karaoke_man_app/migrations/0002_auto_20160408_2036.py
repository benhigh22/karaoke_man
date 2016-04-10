# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-08 20:36
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('karaoke_man_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street_address', models.CharField(max_length=200)),
                ('name', models.CharField(max_length=200)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='karaoke_man_app.City')),
            ],
        ),
        migrations.RemoveField(
            model_name='party',
            name='city',
        ),
        migrations.RemoveField(
            model_name='party',
            name='location_name',
        ),
        migrations.RemoveField(
            model_name='party',
            name='street_address',
        ),
        migrations.AddField(
            model_name='party',
            name='location',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='karaoke_man_app.Location'),
            preserve_default=False,
        ),
    ]
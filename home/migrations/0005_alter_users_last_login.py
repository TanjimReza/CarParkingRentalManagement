# Generated by Django 4.0.3 on 2022-04-15 10:16

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0004_alter_users_last_login'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='last_login',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 15, 16, 16, 51, 593917)),
        ),
    ]
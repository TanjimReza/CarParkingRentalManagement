# Generated by Django 4.0.3 on 2022-04-19 14:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('nid', models.CharField(max_length=30, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=200)),
                ('email', models.CharField(max_length=200)),
                ('password', models.CharField(max_length=128)),
                ('contact', models.CharField(max_length=15, null=True)),
                ('last_login', models.DateTimeField(auto_now_add=True, null=True)),
                ('is_owner', models.CharField(choices=[('R', 'Rentee'), ('S', 'Spot Owner')], default='user', max_length=10)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='FuelType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'fuel_type',
            },
        ),
        migrations.CreateModel(
            name='SpotOwner',
            fields=[
                ('ownerInfo', models.CharField(max_length=200, null=True, verbose_name='ownerinfo')),
                ('Users_ptr', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
            bases=('home.users',),
        ),
        migrations.CreateModel(
            name='Rentee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vehicle_type', models.CharField(max_length=200)),
                ('rentee_credit', models.IntegerField()),
                ('nid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rentee_nid', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Engine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('power', models.FloatField()),
                ('consumation', models.FloatField()),
                ('fuel_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='engines', to='home.fueltype')),
            ],
            options={
                'db_table': 'engine',
            },
        ),
    ]
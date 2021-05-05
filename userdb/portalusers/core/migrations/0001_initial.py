# Generated by Django 3.1.7 on 2021-05-05 16:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ApiInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hostname', models.CharField(blank=True, max_length=15)),
                ('human_readable_hostname', models.CharField(blank=True, max_length=1000)),
                ('token', models.CharField(blank=True, max_length=1000)),
                ('other_info', models.JSONField()),
                ('username', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='custom_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

# Generated by Django 2.2.2 on 2019-07-13 11:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_user_userprofile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='user',
        ),
        migrations.DeleteModel(
            name='User',
        ),
        migrations.DeleteModel(
            name='UserProfile',
        ),
    ]

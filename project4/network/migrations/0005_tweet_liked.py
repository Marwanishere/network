# Generated by Django 4.2.4 on 2024-01-31 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0004_remove_fs_followstatus_remove_fs_user_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='tweet',
            name='liked',
            field=models.BooleanField(default=False),
        ),
    ]
# Generated by Django 4.1 on 2024-03-03 04:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campus', '0012_remove_answerarchive_student'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='average_mark',
            field=models.FloatField(default=0),
        ),
    ]

# Generated by Django 4.1 on 2024-03-02 20:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        (
            "campus",
            "0005_alter_answerarchive_options_alter_answertask_options_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="studentsubjectprogress",
            name="num_of_pairs",
            field=models.PositiveIntegerField(default=10),
        ),
        migrations.AlterField(
            model_name="studentsubjectprogress",
            name="num_of_visited_pairs",
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name="studentsubjectprogress",
            name="sum_marks",
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name="subject",
            name="specialty",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="subjects",
                to="campus.specialty",
            ),
        ),
        migrations.AlterField(
            model_name="subject",
            name="teacher",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="subjects",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]

# Generated by Django 4.1 on 2024-03-03 00:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("campus", "0008_answertest_alter_answertask_options_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="test",
            name="group",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="tests",
                to="campus.group",
            ),
        ),
    ]

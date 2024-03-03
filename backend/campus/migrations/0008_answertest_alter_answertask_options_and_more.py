# Generated by Django 4.1 on 2024-03-03 00:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('campus', '0007_rename_variatsofanswer_variantofanswer'),
    ]

    operations = [
        migrations.CreateModel(
            name='AnswerTest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='answer_tests', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Відповідь на тест',
                'verbose_name_plural': 'Відповіді на тести',
            },
        ),
        migrations.AlterModelOptions(
            name='answertask',
            options={'verbose_name': 'Розвязок на питання', 'verbose_name_plural': 'Розвязки на питання'},
        ),
        migrations.AddField(
            model_name='test',
            name='data_of_start',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='test',
            name='is_completed',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='test',
            name='data_created',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.CreateModel(
            name='ChoosenAnswerTest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='choosen_answers', to='campus.variantofanswer')),
                ('answer_test', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='choosen_answers', to='campus.answertest')),
            ],
        ),
        migrations.AddField(
            model_name='answertest',
            name='test',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='campus.test'),
        ),
    ]

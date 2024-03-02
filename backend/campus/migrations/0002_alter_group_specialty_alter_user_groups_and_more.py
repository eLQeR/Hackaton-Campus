# Generated by Django 4.1 on 2024-03-02 17:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('campus', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='specialty',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='groups', to='campus.specialty'),
        ),
        migrations.AlterField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(related_name='teachers_groups', to='campus.group'),
        ),
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('Студент', 'Student'), ('Адмін', 'Admin'), ('Вчитель', 'Teacher')], default='Студент', max_length=63),
        ),
    ]
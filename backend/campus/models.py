import os
import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.text import slugify


class Courses(models.TextChoices):
    first = "1"
    second = "2"
    third = "3"
    fourth = "4"
    fifth = "5"
    sixth = "6"


class Degrees(models.TextChoices):
    bachelor = "Бакалавр"
    master = "Магістр"


class TypesStudying(models.TextChoices):
    contract = "Контракт"
    budget = "Бюджет"


class FormsStudying(models.TextChoices):
    day = "Денна"
    distant = "Дистанційна"
    ofday = "Заочна"


class University(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Course(models.Model):
    course = models.CharField(choices=Courses.choices, max_length=63)
    degree = models.CharField(choices=Degrees.choices, max_length=63)

    def __str__(self):
        return f"{self.course} - {self.degree}"

class Faculty(models.Model):
    name = models.CharField(max_length=255)
    university = models.ForeignKey(to=University, on_delete=models.CASCADE, related_name="faculties")

    def __str__(self):
        return self.name

class Specialty(models.Model):
    name = models.CharField(max_length=255, unique=True)
    code = models.IntegerField(unique=True)
    faculty = models.ForeignKey(to=Faculty, on_delete=models.CASCADE, related_name="specialities")

    def __str__(self):
        return f"{self.code} {self.name}"

class Group(models.Model):
    code = models.CharField(max_length=10, unique=True)
    specialty = models.ForeignKey(to=Specialty, on_delete=models.CASCADE, related_name="groups")
    course = models.ForeignKey(to=Course, on_delete=models.CASCADE, related_name="groups")
    form_of_studying = models.CharField(choices=FormsStudying.choices, max_length=255, null=True)

    def __str__(self):
        return self.code
class RolesUser(models.TextChoices):
    STUDENT = "Студент"
    ADMIN = "Адмін"
    TEACHER = "Вчитель"

class User(AbstractUser):
    first_name = models.CharField(max_length=255)
    second_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    role = models.CharField(choices=RolesUser.choices, max_length=63, default=RolesUser.STUDENT)
    # STUDENT FIELDS
    group = models.ForeignKey(to=Group, on_delete=models.CASCADE, related_name="students_of_group", null=True)
    type_of_studying = models.CharField(choices=TypesStudying.choices, null=True, max_length=63)
    # TEACHER FIELDS
    specialities = models.ManyToManyField(to=Specialty, related_name="teachers")
    groups = models.ManyToManyField(to=Group, related_name="teachers_groups")

    def __str__(self):
        if self.second_name:
            return f"{self.last_name} {self.first_name} {self.second_name} - {self.role}"
        return f"{self.last_name} {self.first_name} - {self.role}"


class Subject(models.Model):
    name = models.CharField(max_length=255)
    amount_of_pairs = models.PositiveIntegerField()
    teacher = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name="subject")
    specialty = models.ForeignKey(to=Specialty, on_delete=models.CASCADE, related_name="subject")


class StudentSubjectProgress(models.Model):
    subject = models.ForeignKey(to=Subject, on_delete=models.CASCADE, related_name="students_progress")
    student = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name="students_progress")
    num_of_pairs = models.PositiveIntegerField()
    num_of_visited_pairs = models.PositiveIntegerField()
    sum_marks = models.PositiveIntegerField()

    @property
    def visit_rate(self):
        return round(self.num_of_pairs / self.num_of_visited_pairs, 2)


class TypesTask(models.TextChoices):
    zr_task = "Залікова робота"
    rr_task = "Розрахункова робота"
    lr_task = "Лабораторна робота"
    cr_task = "Курсова робота"


class Task(models.Model):
    name = models.CharField(max_length=255)
    max_mark = models.PositiveIntegerField()
    data_created = models.DateField(auto_now_add=True)
    data_of_start = models.DateTimeField()
    type = models.CharField(choices=TypesTask.choices, max_length=63)
    dead_line = models.DateTimeField()


class AnswerTask(models.Model):
    student = models.ForeignKey(to=User, on_delete=models.DO_NOTHING)
    task = models.ForeignKey(to=Task, on_delete=models.CASCADE)


def create_custom_path(instance, filename):
    _, extension = os.path.splitext(filename)
    return os.path.join(
        "uploads/answers/",
        f"{slugify(instance.answer.student.last_name)}-{uuid.uuid4()}{extension}"
    )


class AnswerArchive(models.Model):
    file = models.FileField(upload_to=create_custom_path)
    answer = models.ForeignKey(to=AnswerTask, on_delete=models.CASCADE)


class Test(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    data_created = models.DateField(auto_now_add=True)
    test_time = models.TimeField()
    max_mark = models.PositiveIntegerField()


class Question(models.Model):
    question = models.TextField()
    is_correct = models.BooleanField(default=False)
    test = models.ForeignKey(to=Test, on_delete=models.CASCADE, related_name="questions")
    mark = models.PositiveIntegerField()

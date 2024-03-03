from django.contrib import admin
from .models import User, Specialty, Faculty, Group, University, Course, Subject, Task, Question, Test, VariantOfAnswer, ArchiveTask


class ArchiveTaskInline(admin.TabularInline):
    fk_name = 'task'
    model = ArchiveTask
    extra = 3


class QuestionInline(admin.TabularInline):
    fk_name = 'test'
    model = Question
    extra = 1



class AnswerInline(admin.TabularInline):
    fk_name = 'question'
    model = VariantOfAnswer
    extra = 4


@admin.register(User)
class ProductAdmin(admin.ModelAdmin):
    pass

@admin.register(Test)
class ProductAdmin(admin.ModelAdmin):
    pass


@admin.register(Question)
class ProductAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]

@admin.register(Task)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ArchiveTaskInline]



admin.site.register(Faculty)
admin.site.register(Specialty)
admin.site.register(Group)
admin.site.register(University)
admin.site.register(Course)
admin.site.register(Subject)

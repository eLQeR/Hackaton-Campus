from django.contrib import admin
from .models import User, Specialty, Faculty, Group, University, Course, Subject, Task, Question, Test


class QuestionInline(admin.TabularInline):
    fk_name = 'test'
    model = Question
    extra = 5

#
# class VariantOfItemInline(admin.TabularInline):
#     fk_name = 'item'
#     model = VariantOfItem
#     extra = 5
#
#
@admin.register(User)
class ProductAdmin(admin.ModelAdmin):
    pass

@admin.register(Test)
class ProductAdmin(admin.ModelAdmin):
    inlines = [QuestionInline, ]

admin.site.register(Faculty)
admin.site.register(Specialty)
admin.site.register(Group)
admin.site.register(University)
admin.site.register(Course)
admin.site.register(Subject)
admin.site.register(Task)

from django.contrib import admin
from .models import User, Specialty, Faculty, Group, University, Course, Subject

# class GalleryInline(admin.TabularInline):
#     fk_name = 'item'
#     model = Gallery
#     extra = 5
#
#
# class VariantOfItemInline(admin.TabularInline):
#     fk_name = 'item'
#     model = VariantOfItem
#     extra = 5
#
#
# @admin.register(Item)
# class ProductAdmin(admin.ModelAdmin):
#     exclude = ["article"]
#     inlines = [GalleryInline, VariantOfItemInline]


admin.site.register(User)
admin.site.register(Faculty)
admin.site.register(Specialty)
admin.site.register(Group)
admin.site.register(University)
admin.site.register(Course)
admin.site.register(Subject)

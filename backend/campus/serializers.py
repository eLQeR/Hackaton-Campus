from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "username", "email", "password", "is_staff")
        read_only_fields = ("id", "is_staff")
        extra_kwargs = {
            "password": {"write_only": True, "min_length": 5}
        }

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()
        return user


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ("id",
                  "name",
                  "description",
                  "data_created",
                  "test_time",
                  "max_mark")


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ("id",
                  "name",
                  "max_mark",
                  "data_created",
                  "data_of_start",
                  "type",
                  "dead_line")


class StudentSubjectProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentSubjectProgress
        fields = ("id",
                  "subject",
                  "student",
                  "num_of_pairs",
                  "num_of_visited_pairs",
                  "sum_marks")


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ("id",
                  "code",
                  "specialty",
                  "course",
                  "form_of_studying")


class SpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialty
        fields = ("id",
                  "name",
                  "code",
                  "faculty")


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ("id",
                  "name",
                  "university")


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ("id",
                  "course",
                  "degree")


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ("id",
                  "name",
                  "address")


class AnswerTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerTask
        fields = ("id",
                  "student",
                  "task")


class AnswerArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerTask
        fields = (
            "id",
            "file",
            "answer"
        )


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("id",
                  "question",
                  "is_correct",
                  "test",
                  "mark")


class QuestionDetailSerializer(serializers.ModelSerializer):
    # test = TestSerializer(many=False, read_only=False)
    pass

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ("id",
                  "amount_of_pairs",
                  "amount_of_pairs",
                  "teacher",
                  "specialty")


class SubjectDetailSerializer(serializers.ModelSerializer):
    teacher = UserSerializer(many=False, read_only=False)

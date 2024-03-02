from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import *


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


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ("id",
                  "name",
                  "university")


class FacultyDetailSerializer(FacultySerializer):
    university = UniversitySerializer(many=False, read_only=False)


class SpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialty
        fields = ("id",
                  "name",
                  "code",
                  "faculty")


class SpecialtyDetailSerializer(SpecialtySerializer):
    faculty = FacultySerializer(many=True, read_only=False)


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ("id",
                  "code",
                  "specialty",
                  "course",
                  "form_of_studying")


class GroupDetailSerializer(GroupSerializer):
    specialty = SpecialtySerializer(many=False, read_only=False)
    course = CourseSerializer(many=False, read_only=False)


class GroupListSerializer(GroupSerializer):
    course = serializers.SlugRelatedField(slug_field="course", read_only=True)
    degree = serializers.SlugRelatedField(source="course", slug_field="degree", read_only=True)
    class Meta:
        model = Group
        fields = ("id",
                  "code",
                  "course",
                  "degree",
                  "form_of_studying")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "username", "email", "password", "is_staff", "last_name", "first_name", "second_name")
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


class UserDetailSerializer(UserSerializer):
    group = GroupSerializer(many=False, read_only=False)
    specialities = SpecialtySerializer(many=True, read_only=False)
    groups = GroupSerializer(many=True, read_only=False)


class UserListSerializer(UserSerializer):
    group = GroupSerializer(many=False, read_only=False)
    specialities = SpecialtySerializer(many=True, read_only=False)
    groups = GroupSerializer(many=True, read_only=False)

    class Meta:
        model = get_user_model()
        fields = ("id", "username", "email", "password", "is_staff", "last_name", "first_name", "second_name")
        read_only_fields = ("id", "is_staff")
        extra_kwargs = {
            "password": {"write_only": True, "min_length": 5}
        }


class AnswerTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerTask
        fields = ("id",
                  "student",
                  "task")


class AnswerTaskDetailSerializer(AnswerTaskSerializer):
    task = TaskSerializer(many=False, read_only=False)
    student = UserSerializer(many=False, read_only=False)


class AnswerTaskListSerializer(AnswerTaskSerializer):
    task = TaskSerializer(many=False, read_only=False)
    student = UserSerializer(many=False, read_only=False)

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


class AnswerArchiveDetailSerializer(AnswerArchiveSerializer):
    answer = AnswerTaskSerializer(many=False, read_only=False)


class AnswerArchiveListSerializer(AnswerArchiveSerializer):
    answer = AnswerTaskSerializer(many=False, read_only=False)

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


class QuestionDetailSerializer(QuestionSerializer):
    test = TestSerializer(many=False, read_only=False)


class QuestionListSerializer(QuestionSerializer):
    test = TestSerializer(many=False, read_only=False)

    class Meta:
        model = Question
        fields = ("id",
                  "question",
                  "is_correct",
                  "mark")


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ("id",
                  "name",
                  "amount_of_pairs",
                  "teacher",
                  "specialty")


class SubjectDetailSerializer(SubjectSerializer):
    teacher = UserSerializer(many=False, read_only=False)
    specialty = SpecialtySerializer(many=False, read_only=False)


class SubjectListSerializer(SubjectSerializer):
    teacher = UserSerializer(many=False, read_only=False)
    specialty = SpecialtySerializer(many=False, read_only=False)

    class Meta:
        model = Subject
        fields = ("id",
                  "name",
                  "teacher")


class StudentSubjectProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentSubjectProgress
        fields = ("id",
                  "subject",
                  "student",
                  "num_of_pairs",
                  "num_of_visited_pairs",
                  "sum_marks")


class StudentSubjectProgressDetailSerializer(StudentSubjectProgressSerializer):
    subject = SubjectSerializer(many=False, read_only=False)
    student = UserSerializer(many=False, read_only=False)


class StudentSubjectProgressListSerializer(StudentSubjectProgressSerializer):
    subject = SubjectSerializer(many=False, read_only=False)
    student = UserSerializer(many=False, read_only=False)

    class Meta:
        model = StudentSubjectProgress
        fields = ("id",
                  "subject",
                  "student",
                  "sum_marks",
                  "visit_rate")

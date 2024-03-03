from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail

from .models import *


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = (
            "id", "name", "description",
            "data_created", "test_time", "max_mark"
        )


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = (
            "id",
            "name",
            "max_mark",
            "data_created",
            "data_of_start",
            "type",
            "dead_line",
        )


class AnswerArchiveCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerTest
        fields = ("id", "file", "answer")


class TaskCreateSerializer(serializers.ModelSerializer):
    answer = AnswerArchiveCreateSerializer(
        many=False,
        read_only=False
    )

    class Meta:
        model = Task
        fields = (
            "id",
            "name",
            "max_mark",
            "data_created",
            "data_of_start",
            "type",
            "dead_line",
            "answer",
        )


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ("id", "course", "degree")


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ("id", "name", "address")


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ("id", "name", "university")


class FacultyDetailSerializer(FacultySerializer):
    university = UniversitySerializer(many=False, read_only=False)


class FacultyListSerializer(FacultySerializer):
    university = UniversitySerializer(many=False, read_only=False)

    class Meta:
        model = Faculty
        fields = ("id", "name", "university")


class SpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialty
        fields = ("id", "name", "code", "faculty")


class SpecialtyDetailSerializer(SpecialtySerializer):
    faculty = FacultySerializer(many=True, read_only=False)


class SpecialtyListSerializer(SpecialtySerializer):
    faculty = FacultySerializer(many=True, read_only=False)

    class Meta:
        model = Specialty
        fields = ("id", "name", "code")


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ("id", "code", "specialty", "course", "form_of_studying")


class GroupDetailSerializer(GroupSerializer):
    specialty = SpecialtySerializer(many=False, read_only=False)
    course = CourseSerializer(many=False, read_only=False)


class GroupListSerializer(GroupSerializer):
    course = serializers.SlugRelatedField(
        slug_field="course", read_only=True
    )
    degree = serializers.SlugRelatedField(
        source="course", slug_field="degree", read_only=True
    )

    class Meta:
        model = Group
        fields = ("id", "code", "course", "degree", "form_of_studying")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            "id",
            "username",
            "email",
            "password",
            "is_staff",
            "last_name",
            "first_name",
            "second_name",
            "average_mark",
            "role",
            "group",
        )
        read_only_fields = ("id", "is_staff")
        extra_kwargs = {"password": {"write_only": True, "min_length": 5}}

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


class UserListSerializer(UserSerializer):
    group = serializers.SlugRelatedField(slug_field="code", read_only=True)

    class Meta:
        model = get_user_model()
        fields = ("id", "last_name", "first_name", "second_name", "average_mark", "group")


class AnswerTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerTask
        fields = ("id", "student", "task")


class AnswerTaskDetailSerializer(AnswerTaskSerializer):
    task = TaskSerializer(many=False, read_only=False)
    student = UserSerializer(many=False, read_only=False)


class AnswerTaskListSerializer(AnswerTaskSerializer):
    task = TaskSerializer(many=False, read_only=False)
    student = UserSerializer(many=False, read_only=False)

    class Meta:
        model = AnswerTask
        fields = ("id", "student", "task")


class AnswerArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerTask
        fields = ("id", "file", "answer")


class AnswerArchiveDetailSerializer(AnswerArchiveSerializer):
    answer = AnswerTaskSerializer(many=False, read_only=False)


class AnswerArchiveListSerializer(AnswerArchiveSerializer):
    answer = AnswerTaskSerializer(many=False, read_only=False)

    class Meta:
        model = AnswerTask
        fields = ("id", "file", "answer")


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = (
            "id",
            "question",
            "test",
            "mark",
        )


class QuestionListSerializer(QuestionSerializer):
    test = TestSerializer(many=False, read_only=False)

    class Meta:
        model = Question
        fields = ("id", "question", "is_correct", "mark")


class SubjectSerializer(serializers.ModelSerializer):
    specialty = SpecialtySerializer(many=False, read_only=True)

    class Meta:
        model = Subject
        fields = ("id", "name", "amount_of_pairs", "teacher", "specialty")


class SubjectDetailSerializer(SubjectSerializer):
    teacher = UserSerializer(many=False, read_only=False)
    specialty = SpecialtySerializer(many=False, read_only=False)


class SubjectListSerializer(SubjectSerializer):
    teacher = UserSerializer(many=False, read_only=False)
    specialty = SpecialtySerializer(many=False, read_only=False)

    class Meta:
        model = Subject
        fields = ("id", "name", "teacher")


class StudentSubjectProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentSubjectProgress
        fields = (
            "id",
            "subject",
            "student",
            "num_of_pairs",
            "num_of_visited_pairs",
            "sum_marks",
        )


class StudentSubjectProgressDetailSerializer(StudentSubjectProgressSerializer):
    subject = SubjectSerializer(many=False, read_only=False)
    student = UserSerializer(many=False, read_only=False)


class StudentSubjectProgressListSerializer(StudentSubjectProgressSerializer):
    subject = SubjectSerializer(many=False, read_only=False)
    student = UserSerializer(many=False, read_only=False)

    class Meta:
        model = StudentSubjectProgress
        fields = ("id", "subject", "student", "sum_marks", "visit_rate")


class VariantOfAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariantOfAnswer
        fields = ("id", "answer", "is_correct", "question")


class QuestionDetailSerializer(QuestionSerializer):
    variants = VariantOfAnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ("id", "question", "test", "mark", "variants")


class TestDetailSerializer(serializers.ModelSerializer):
    questions = QuestionDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Test
        fields = (
            "id",
            "name",
            "description",
            "data_created",
            "test_time",
            "max_mark",
            "questions",
        )


class QuestionCreateSerializer(serializers.ModelSerializer):
    variants = VariantOfAnswerSerializer(many=True, read_only=False)

    class Meta:
        model = Question
        fields = ("id", "question", "test", "mark", "variants")


class TestCreateSerializer(serializers.ModelSerializer):
    questions = QuestionCreateSerializer(many=True, read_only=False)

    class Meta:
        model = Test
        fields = (
            "id",
            "name",
            "description",
            "data_created",
            "test_time",
            "max_mark",
            "questions",
        )

    def create(self, validated_data):
        test_name = validated_data["name"]
        description = validated_data["description"]
        test_time = validated_data["test_time"]
        max_mark = validated_data["max_mark"]
        questions = validated_data["questions"]
        test = Test.objects.create(
            name=test_name,
            description=description,
            test_time=test_time,
            max_mark=max_mark,
        )
        for question in questions:
            question_ask = question.get("question")
            test_id = test.id
            mark = question.get("mark")
            created_question_id = Question.objects.create(
                question=question_ask, test_id=test_id, mark=mark
            ).id
            for variant in question.get("variants"):
                VariantOfAnswer.objects.create(
                    answer=variant.get("answer"),
                    is_correct=variant.get("is_correct"),
                    question_id=created_question_id,
                )
        send_mail(
            f"Викладач створив нове завдання - {test.name}",
            f"{test.description}",
            "rosulka.abaldui@gmail.com",
            [user.email for user in list(User.objects.filter(group_id=1))],
            fail_silently=False,
        )
        return test


@api_view(["POST"])
def create_test(request):
    if request.method == "POST":
        serializer = TestCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)


class ChoosenAnswerTestCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChoosenAnswerTest
        fields = "__all__"


class AnswerTestSerializer(serializers.ModelSerializer):
    choosen_answers = ChoosenAnswerTestCreateSerializer(many=True, read_only=True)

    class Meta:
        model = AnswerTest
        fields = ("student", "test", "choosen_answers", "get_mark")


class AnswerTestCreateSerializer(serializers.ModelSerializer):
    choosen_answers = ChoosenAnswerTestCreateSerializer(many=True, read_only=False)

    class Meta:
        model = AnswerTest
        fields = ("student", "test", "choosen_answers")

    def create(self, validated_data):
        user = validated_data["student"]
        test = validated_data["test"]
        answer_on_test = AnswerTest.objects.create(student=user, test=test)
        for answer in validated_data.get("choosen_answers"):
            ChoosenAnswerTest.objects.create(
                answer_test=answer_on_test, answer=answer.get("answer")
            )
        return answer_on_test


@api_view(["POST"])
def create_answer_on_test(request):
    if request.method == "POST":
        serializer = AnswerTestCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)


class TeacherSerializer(serializers.ModelSerializer):
    subjects = SubjectSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = ("id", "last_name", "first_name", "second_name", "subjects")
        read_only_fields = ("id", "is_staff")
        extra_kwargs = {"password": {"write_only": True, "min_length": 5}}


class UserDetailSerializer(UserSerializer):
    group = GroupSerializer(many=False, read_only=False)
    specialities = SpecialtySerializer(many=True, read_only=False)
    groups = GroupSerializer(many=True, read_only=False)
    students_progress = StudentSubjectProgressSerializer(
        many=True, read_only=False
    )

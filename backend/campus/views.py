from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import *
from .serializers import *
from django.core.mail import send_mail


def send_mail_func(request):
    send_mail(
        "check",
        "nazar lox",
        "rosulka.abaldui@gmail.com",
        ["h2o2hcl55@gmail.com"],
        fail_silently=False,
    )
    return Response(data="", status=status.HTTP_201_CREATED)


class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class StudentView(viewsets.ModelViewSet):
    queryset = User.objects.filter(role="Студент")
    serializer_class = UserSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        if self.action == "list":
            return UserListSerializer
        return UserSerializer

    def get_queryset(self):
        queryset = self.queryset
        group = self.request.query_params.get("group")

        if group:
            queryset = queryset.filter(group=group)
        return queryset.select_related("group")


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        queryset = self.queryset
        group = self.request.query_params.get("group")

        if group:
            queryset = queryset.filter(group=group)
        return queryset.select_related("specialty").select_related("teacher")


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = SubjectSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        if self.action == "list":
            return GroupListSerializer
        return GroupSerializer

    def get_queryset(self):
        queryset = self.queryset
        form_of_studying = self.request.query_params.get("form_of_studying")

        if form_of_studying:
            queryset = queryset.filter(form_of_studying=form_of_studying)
        return queryset.prefetch_related("students_of_group__groups__teachers_groups").select_related("course")


class StudentSubjectProgressViewSet(viewsets.ModelViewSet):
    queryset = StudentSubjectProgress.objects.all()
    serializer_class = StudentSubjectProgressSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        if self.action == "list":
            return StudentSubjectProgressListSerializer
        return StudentSubjectProgressSerializer

    def get_queryset(self):
        queryset = self.queryset
        form_of_studying = self.request.query_params.get("form_of_studying")

        if form_of_studying:
            queryset = queryset.filter(form_of_studying=form_of_studying)
        return queryset.prefetch_related(
            "student__answer_tests__choosen_answers"
        ).select_related(
            "subject__specialty"
        ).select_related("subject")


class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        if self.action == "list":
            return TestSerializer
        if self.action == "retrieve":
            return TestDetailSerializer
        if self.action == "create":
            return TestCreateSerializer
        return TestSerializer

    # def create(self, request, *args, **kwargs):
    #
    def get_queryset(self):
        queryset = self.queryset
        group = self.request.query_params.get("group")
        if group:
            queryset = queryset.filter(group=group)
        return queryset.prefetch_related("group__students_of_group__answer_tests")


class AnswerTestViewSet(viewsets.ModelViewSet):
    queryset = AnswerTest.objects.all()
    serializer_class = AnswerTestSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        queryset = self.queryset.filter(student=self.request.user)
        form_of_studying = self.request.query_params.get("form_of_studying")

        if form_of_studying:
            queryset = queryset.filter(form_of_studying=form_of_studying)
        return queryset


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(role="Викладач")
    serializer_class = TeacherSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        queryset = self.queryset
        group = self.request.query_params.get("group")

        if group:
            queryset = queryset.filter(group=group)
        return queryset.prefetch_related("group__specialty__subjects").prefetch_related("specialities__teachers__students_progress")

class MarkViewSet(viewsets.ModelViewSet):
    queryset = Mark.objects.all()
    serializer_class = MarkSerializer

    def get_queryset(self):
        queryset = self.queryset
        subject = self.request.query_params.get("subject")
        if subject:
            queryset = queryset.filter(subject_id=subject)
        user = self.request.query_params.get("user")
        if subject:
            queryset = queryset.filter(student_id=user)
        return queryset.prefetch_related("student__groups").select_related("subject")

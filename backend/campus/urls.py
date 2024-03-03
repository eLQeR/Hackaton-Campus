from django.urls import path, include

from .serializers import create_answer_on_test
from .views import ManageUserView, SubjectViewSet, GroupViewSet, StudentView, StudentSubjectProgressViewSet, \
    TestViewSet, create_test, send_mail_func, AnswerTestViewSet
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()

router.register("subjects", SubjectViewSet)
router.register("groups", GroupViewSet)
router.register("students", StudentView)
router.register("students-progress", StudentSubjectProgressViewSet)
router.register("tests", TestViewSet)
router.register("answers-tests", AnswerTestViewSet)
# router.register("items", ItemViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path("send-mail/", send_mail_func, name="send-mail-func"),
    path("create-test/", create_test, name="create-test"),
    path("create-answer-test/", create_answer_on_test, name="create-answer-test"),
    path("me/", ManageUserView.as_view(), name="manage"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

app_name = "shop"

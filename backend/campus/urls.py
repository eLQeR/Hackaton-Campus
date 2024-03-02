from django.urls import path, include
from .views import ManageUserView, SubjectViewSet
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()

router.register("subjects", SubjectViewSet)
# router.register("items", ItemViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("me/", ManageUserView.as_view(), name="manage"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

app_name = "shop"

from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import *
from .serializers import UserSerializer, SubjectSerializer, SpecialtySerializer


class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

    # def get_serializer_class(self):
    #     if self.action == "list":
    #         return ItemListSerializer
    #     return ItemSerializer

    def get_queryset(self):
        queryset = self.queryset
        group = self.request.query_params.get("group")

        if group:
            queryset = queryset.filter(group=group)
        return queryset

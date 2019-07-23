from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, viewsets
from django.shortcuts import get_object_or_404

from .models import UserProfile, User, Topic
from  .serializers import UserProfileSerializer, UserSerializer, TopicSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class UserListView(APIView):
    def get(self, request, pk=None):
        serializer_context = {
            'request': request,
        }
        users = User.objects.all()
        data = UserSerializer(users,context=serializer_context, many=True).data
        return Response(data)

class UserDetailsView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    def get(self, request, *args, **kwargs):
        try:
            user = self.queryset.get(pk=kwargs["pk"])
            return Response(UserSerializer(user).data)
        except User.DoesNotExist:
            return Response(
                status=status.HTTP_404_NOT_FOUND
            )

class TopicList(APIView):
    def get(self, request):
        topics = Topic.objects.all()
        data = TopicSerializer(topics,many=True).data
        return Response(data)
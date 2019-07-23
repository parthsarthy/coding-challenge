from django.urls import path, re_path, include
from .apiviews import UserListView, TopicList, UserDetailsView
from . import views
from rest_framework import routers
from .apiviews import UserViewSet, ProfileViewSet, UserListView

router = routers.DefaultRouter()
router.register(r'user', UserViewSet);
router.register(r'profile', ProfileViewSet);


urlpatterns = [
    re_path('^user', include(router.urls)),
    path("", UserListView.as_view()),
    path("topic", TopicList.as_view()),
    path('<int:pk>', UserDetailsView.as_view()),
]
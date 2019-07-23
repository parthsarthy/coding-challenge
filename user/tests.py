from django.test import TestCase

# Create your tests here.
from .serializers import UserProfileSerializer, UserSerializer
from .models import User, UserProfile

class UserProfileSerializer(TestCase):
    def test_model_fields(self):
        user = UserProfile()
        for field_name in ['id', 'bio', 'currentPosition','topics']:
            self.assertEqual(
                serializer.data[field_name],
                getattr(user, field_name)
            )
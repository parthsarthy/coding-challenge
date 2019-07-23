from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from .models import Topic, UserProfile, User
from rest_auth.models import TokenModel
class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields= ('currentPosition',"bio","topics")

class UserSerializer(serializers.HyperlinkedModelSerializer):
    profile = UserProfileSerializer(required=False)
    topics = serializers.SerializerMethodField

    
    class Meta:
        model = User
        fields = ('id','email', 'first_name', 'last_name', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        if 'profile' in validated_data:
            profile = instance.profile
            profile.currentPosition = profile_data.get('currentPosition', profile.currentPosition)
            profile.bio = profile_data.get('bio', profile.bio)
            profile.topics = profile_data.get('topics', profile.topics)
            profile.save()
        else:
            profile = UserProfile()
            profile.currentPosition = profile_data.get('currentPosition', profile.currentPosition)
            profile.bio = profile_data.get('bio', profile.bio)
            profile.topics = profile_data.get('topics', profile.topics)
            profile.user_id = instance.id
            profile.save()
        
        instance.email = validated_data.get('email', instance.email)
        
        if validated_data['first_name']:    
            instance.first_name = validated_data.get('first_name', validated_data['first_name'])
        if validated_data['last_name']:    
            instance.last_name = validated_data.get('last_name', validated_data['last_name'])
        instance.save()

        return instance


class TokenSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = TokenModel
        fields = ('key', 'user')
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User

# API model
from .models import ApiInfo

# Groups require special processing.
# Source: https://stackoverflow.com/questions/33844003/how-to-serialize-groups-of-a-user-with-django-rest-framework/33844179
from django.contrib.auth.models import Group


# API serializer
class ApiSerializer(serializers.ModelSerializer):

    class Meta:
        model = ApiInfo
        fields = ('username', 'hostname', 'apikey',)


class GroupSerializer(serializers.ModelSerializer):    
    
    class Meta:
        model = Group
        fields = ('name',)


class UserSerializer(serializers.ModelSerializer):

    apiinfo = ApiSerializer(source='custom_user', many=True)
    groups = GroupSerializer(many=True)
    
    class Meta:
        model = User
        fields = ('username', 'password', 'first_name', 'last_name', 'email', 'groups', 'apiinfo',)


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password', 'first_name', 'last_name', 'email', 'groups',)

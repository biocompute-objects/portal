from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from .models import ApiInfo
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ApiSerializer, UserSerializer, UserSerializerWithToken

# POST body parsing.
import json


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)

    print('+++++++++++++++')
    print(serializer.data)
    print('+++++++++++++++')

    return Response(serializer.data)

@api_view(['POST'])
def add_api(request):
    """
    Update a user's information based on their token.
    """

    # Get the user.
    user = UserSerializer(request.user).data['username']

    # TODO: right way to do this?
    # Get the user ID so that we can link across tables.
    user_object = User.objects.get(username = user)

    # Get the bulk information.
    bulk = json.loads(request.body)

    # Get the hostname.
    hostname = bulk['api_hostname']

    # Get the human-readable hostname.
    human_readable = bulk['api_human_readable']

    # Get the new API key.
    api_key = bulk['api_key']

    # Add the key for the user.
    updated = ApiInfo(username = user_object, hostname = hostname, human_readable = human_readable, apikey = api_key)
    updated.save()

    print('========')
    print(user)
    print(api_key)
    print(updated)
    print('=========')
    return(Response(UserSerializer(request.user).data))


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

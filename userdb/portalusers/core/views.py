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
    print('HERE')
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

    # Add the key for the user.
    updated = ApiInfo(
    	username = user_object, 
    	hostname = bulk['hostname'], 
    	human_readable_hostname = bulk['human_readable_hostname'], 
    	token = bulk['token'],
        other_info = bulk['other_info']
    )
    updated.save()

    print('========')
    print(user)
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
        
        print('request.data: ')
        print(request.data)
        print('===============')

        # Does this user already exist?
        if User.objects.filter(username = request.data['username']).exists():

            # Bad request because the user already exists.
            return Response(status=status.HTTP_409_CONFLICT)
        
        else:
            
            serializer = UserSerializerWithToken(data=request.data)
            
            if serializer.is_valid():
                serializer.save()
                
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            else:

                # The request didn't provide what we needed.
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# (OPTIONAL) Special "one-off" view for an API writing to user
# because 1) we don't want a persisent user-writable account
# outside of the system, and 2) the API has no way of writing
# without the user's token.

# So, write to the table, then change the token.
# We could have gone with a temporary token here, but
# that may be too much too worry about.
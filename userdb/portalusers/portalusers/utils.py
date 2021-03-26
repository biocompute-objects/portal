from core.serializers import UserSerializer, ApiSerializer


def my_jwt_response_handler(token, user=None, request=None):

    # BAD SOLUTION!!!
    # Couldn't get the groups to work quite right, so a bit hacky here.
    user_info = UserSerializer(user, context={'request': request}).data
    print('user')
    print(user)
    print('------')
    api_info = ApiSerializer(user, context={'request': request}).data
    print(user_info)
    print(api_info)
    user_info['groups'] = [list(i.items())[0][1] for i in user_info['groups']]

    return {
        'token': token,
        'user': user_info
    }

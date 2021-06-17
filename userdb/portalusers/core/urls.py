from django.urls import path
from .views import current_user, add_api, UserList, update_user

urlpatterns = [
    path('users/current_user/', current_user),
    path('users/add_api/', add_api),
    path('users/list/', UserList.as_view()),
    path('update_user/', update_user)
]

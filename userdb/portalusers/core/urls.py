from django.urls import path
from .views import current_user, add_api, UserList

urlpatterns = [
    path('current_user/', current_user),
    path('add_api/', add_api),
    path('users/', UserList.as_view())
]

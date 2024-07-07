from django.urls import path
from .views import RegisterView, BlacklistTokenUpdateView
# from .views import UserListView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name="sign_up"),
     path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist')
    # path('users/', UserListView.as_view(), name='user-list'),

]
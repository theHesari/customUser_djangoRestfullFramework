from django.urls import path
from .views import *


urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),
    path('change_personal_information/', ChangePersonalInformationView.as_view(), name='change_personal_information')
]
from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path, include
from rest_framework.authtoken import views

from .views import UserView,RegistrationView,LogoutView,UpdateUserView


urlpatterns = [
  path('',UserView.as_view(),name=''),
  path('login/',obtain_auth_token),
  path('register/',RegistrationView.as_view()),
  path('logout/',LogoutView.as_view()),
  path('<int:pk>/edit/',UpdateUserView.as_view()),
]

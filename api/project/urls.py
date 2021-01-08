from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path, include
from rest_framework.authtoken import views

from .views import ProjectView,ManageProjectView,CreateProjectView,FileView


urlpatterns = [
  path('',ProjectView.as_view(),name='view'),
  path('file/<int:pk>/',FileView.as_view(),name='file'),
  path('create/',CreateProjectView.as_view(),name='create'),
  path('<int:pk>/manage/',ManageProjectView.as_view(),name='project'),
]

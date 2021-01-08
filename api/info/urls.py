from django.urls import path, include
from rest_framework.authtoken import views

from .views import InfoListView,InfoUpdateView,CarView


urlpatterns = [
  path('<int:pk>/',InfoListView.as_view(),),
  path('<int:pk>/update/',InfoUpdateView.as_view()),
  path('<int:pk>/car/',CarView.as_view(),name='car'),
  
]

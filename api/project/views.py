from django.http import request
from django.shortcuts import render
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.generics import RetrieveUpdateDestroyAPIView,ListAPIView,CreateAPIView,ListCreateAPIView
from .serializers import ProjectSerializer,FileSerializers
from .models import Project,File

# Create your views here.
class ProjectView(ListAPIView):
    serializer_class=ProjectSerializer
    queryset=Project.objects.all()
   # permission_classes=(IsAuthenticated,)
   




   


   

   

class FileView(RetrieveUpdateDestroyAPIView):
    serializer_class=FileSerializers
    queryset=File.objects.all()
    #def get_queryset(self):
    #    queryset = File.objects.filter(id=self.kwargs["pk"])
      #  return queryset
   

class CreateFileView(CreateAPIView):
    serializer_class=FileSerializers
    queryset=File.objects.all()

class CreateProjectView(CreateAPIView):
    serializer_class=ProjectSerializer
    queryset=Project.objects.all()
   # permission_classes=(IsAuthenticated,IsAdminUser)

class ManageProjectView(RetrieveUpdateDestroyAPIView):
    serializer_class=ProjectSerializer
    def get_queryset(self):
        queryset = Project.objects.filter(id=self.kwargs["pk"])
        return queryset
    permission_classes=(IsAuthenticated,IsAdminUser)
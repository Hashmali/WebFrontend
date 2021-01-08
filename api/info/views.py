from django.shortcuts import render
from .serializers import InfoSerializers,CarSerializer
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView,RetrieveUpdateAPIView,ListAPIView,RetrieveAPIView
from .models import Info,Car


class InfoUpdateView(RetrieveUpdateAPIView):
    def get_queryset(self):
        queryset = Info.objects.filter(id=self.kwargs["pk"])
        return queryset
    serializer_class=InfoSerializers
    permission_classes=[IsAuthenticated,IsAdminUser]

class InfoListView(RetrieveAPIView):
    def get_queryset(self):
        queryset = Info.objects.filter(id=self.kwargs["pk"])
        return queryset    
    serializer_class=InfoSerializers
    permission_classes=[IsAuthenticated,]

class CarView(RetrieveUpdateDestroyAPIView):
    serializer_class=CarSerializer
    def get_queryset(self):
        queryset = Car.objects.filter(id=self.kwargs["pk"])
        return queryset
   
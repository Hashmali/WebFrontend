from rest_framework.generics import CreateAPIView,RetrieveUpdateDestroyAPIView,ListAPIView
from .serializers import ScheduleSerializers
from .models import Schedule
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics



class ScheduleListView(ListAPIView):
    queryset=Schedule.objects.all()
    serializer_class=ScheduleSerializers
    permission_classes=(IsAuthenticated,)


class ScheduleCreateView(CreateAPIView):
    queryset=Schedule.objects.all()
    serializer_class=ScheduleSerializers
    permission_classes=(IsAuthenticated,)
    




class ScheduleUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    def get_queryset(self):
        queryset = Schedule.objects.filter(id=self.kwargs["pk"])
        return queryset
    serializer_class=ScheduleSerializers
    permission_classes=(IsAuthenticated,)


from django.shortcuts import render
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from .serializers import UserSerializer,RegistrationSerializer,LogoutSerializer
from .models import User
from django.contrib.auth import get_user_model


User = get_user_model()

class UserView(generics.GenericAPIView,mixins.ListModelMixin,mixins.CreateModelMixin):
    serializer_class=UserSerializer
    queryset=User.objects.all()
    permission_classes=(IsAuthenticated,IsAdminUser)
    def get(self,request,*args,**kwargs):
        return self.list(request,*args,**kwargs)
    def post(self,request,*args,**kwargs):
        return self.create(request,*args,**kwargs)


class RegistrationView(generics.GenericAPIView,mixins.ListModelMixin,mixins.CreateModelMixin):
    serializer_class=RegistrationSerializer
    queryset=User.objects.all()
    permission_classes=(IsAuthenticated,IsAdminUser)
    def post(self,request,*args,**kwargs):
        return self.create(request,*args,**kwargs)




class LogoutView(generics.GenericAPIView,mixins.ListModelMixin,mixins.CreateModelMixin):
    serializer_class=LogoutSerializer
    queryset= User.objects.all()
    def get(self,request,*args,**kwargs):
        #simply delete the token to force a login
        request.user.auth_token.delete()
        content = 'success'
        return Response(content,status=status.HTTP_200_OK)



class UpdateUserView(RetrieveUpdateDestroyAPIView):
    def get_queryset(self):
        queryset = User.objects.filter(id=self.kwargs["pk"])
        return queryset
    serializer_class = UserSerializer
    permission_classes=(IsAuthenticated,IsAdminUser)
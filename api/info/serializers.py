from rest_framework import serializers
from .models import Info,Car
from api.worker.serializers import UserSerializer


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model=Car
        fields="__all__"

class InfoSerializers(serializers.ModelSerializer):
    car=serializers.HyperlinkedRelatedField(many=True,read_only=True,view_name='car')
    user1=UserSerializer(read_only=True)
    user2=UserSerializer(read_only=True)
    class Meta:
        model=Info
        fields=(
            '__all__'
            )
        depth = 1



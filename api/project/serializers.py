from rest_framework import serializers
from .models import Project,File




class FileSerializers(serializers.ModelSerializer):
        project=serializers.HyperlinkedRelatedField(read_only=True,view_name='project')
        class Meta:
            model = File
            fields=(
             '__all__'
                )





class ProjectSerializer(serializers.ModelSerializer):
    file=FileSerializers(many=True,read_only=True)
    class Meta:
        model = Project
        fields=(
           '__all__'
            )
    
   

        




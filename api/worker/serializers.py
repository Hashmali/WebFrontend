from rest_framework import serializers
from .models import User



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=(
            'first_name','second_name','phone','image',
            )



class RegistrationSerializer(serializers.ModelSerializer):

	password2 				= serializers.CharField(style={'input_type': 'password'}, write_only=True)

	class Meta:
		model = User
		fields = ('phone', 'password', 'password2','first_name','second_name','is_admin')
		extra_kwargs = {
				'password': {'write_only': True},
		}	


	def	save(self):
		user = User(
                    phone=self.validated_data['phone'],
					first_name=self.validated_data['first_name'],
					second_name=self.validated_data['second_name'],
                    is_admin=self.validated_data['is_admin'],
				)
        
		password = self.validated_data['password']
		password2 = self.validated_data['password2']
		if password != password2:
			raise serializers.ValidationError({'password': 'Passwords must match.'})
		user.set_password(password)
		user.save()
		return user




class LogoutSerializer(serializers.ModelSerializer):
	model = User
	fields=(
            'first_name','second_name','phone','image',
            )


from rest_framework import serializers
from .models import UserData

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = UserData
        fields = ["id", "email", "name", "password"]
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, value):
        if UserData.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def validate_name(self, value):
        if UserData.objects.filter(name=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def create(self, validated_data):
        user = UserData.objects.create(
            email=validated_data['email'],
            name=validated_data['name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

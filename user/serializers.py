from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import User


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, min_length=8, write_only=True)
    password2 = serializers.CharField(max_length=128, min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password', '')
        password2 = attrs.get('password2', '')
        if password != password2:
            raise serializers.ValidationError('passwords do not match')
        return super().validate(attrs)

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            password=validated_data.get('password')
        )

        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True, style={"input_type": "password"})

    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password', '')

        if email and password:
            user = authenticate(username=email, password=password)
            if not user:
                raise serializers.ValidationError('Email or password is incorrect')
        else:
            raise serializers.ValidationError('Please enter your email and password')

        attrs['user'] = user
        return attrs


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "first_name", "last_name"]

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()
        return instance


class UserChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={"input_type": "password"}, max_length=128)
    password2 = serializers.CharField(write_only=True, style={"input_type": "password"}, max_length=128)

    class Meta:
        model = User
        fields = ['password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')

        user = self.context['request'].user
        if password != password2:
            raise serializers.ValidationError('Passwords do not match')
        user.set_password(password)
        user.save()
        return attrs


class ChangePersonalInformationSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=128)
    last_name = serializers.CharField(max_length=128)

    class Meta:
        model = User
        fields = ['first_name', 'last_name']

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)

        # Only update first_name and last_name, leave email unchanged
        instance.save()
        return instance
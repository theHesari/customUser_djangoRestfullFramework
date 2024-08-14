from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserProfileSerializer,
    UserChangePasswordSerializer,
    ChangePersonalInformationSerializer
)


def get_user_tokens(user):
    refresh_token = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh_token),
        'access': str(refresh_token.access_token)
    }


class UserRegistrationView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

    def post(self, request):
        user_data = request.data
        serializer = self.serializer_class(data=user_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.data
            return Response({'message': 'User created',
                             'user': user}, status=status.HTTP_201_CREATED)


class UserLoginView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer

    def post(self, request):
        user_data = request.data
        serializer = self.serializer_class(data=user_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data['user']
            token = get_user_tokens(user)
            return Response({'message': 'User Logged in',
                             'user': serializer.data,
                             'tokens': token}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({'message': 'User logged out'}, status=status.HTTP_205_RESET_CONTENT)
        except TokenError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserProfileSerializer

    def get(self, request):
        selrializer = self.serializer_class(request.user)
        return Response(selrializer.data, status=status.HTTP_200_OK)


class ChangePasswordView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserChangePasswordSerializer

    def put(self, request):
        user_data = request.data
        serializer = self.serializer_class(data=user_data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response({'message': 'Password Changed successfully'}, status=status.HTTP_200_OK)


class ChangePersonalInformationView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePersonalInformationSerializer

    def get_object(self):
        # Get the current user instance
        return self.request.user

    def put(self, request, *args, **kwargs):
        # Get the current user object
        user = self.get_object()

        # Instantiate the serializer with the user instance and request data
        serializer = self.serializer_class(user, data=request.data, partial=True)

        # Validate and save the data
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

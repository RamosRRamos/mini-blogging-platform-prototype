
from drf_spectacular.utils import extend_schema
from rest_framework import status, viewsets

from .models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing users.

    This viewset provides actions to:
    - List all users
    - Create a new user
    - Retrieve a specific user by ID
    - Update a user
    - Delete a user
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer

    @extend_schema(
        summary="Retrieve a User",
        description="Retrieves details of a specific user by ID.",
        responses={status.HTTP_200_OK: UserSerializer},
    )
    def retrieve(self, request, *args, **kwargs):
        """
        Handle the retrieval of a specific user by ID.
        """
        return super().retrieve(request, *args, **kwargs)

    @extend_schema(
        summary="List Users",
        description="Retrieves a list of all users.",
        responses={status.HTTP_200_OK: UserSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        """
        Handle listing of all users.
        """
        return super().list(request, *args, **kwargs)

    @extend_schema(
        summary="Create a User",
        description="Creates a new user.",
        responses={status.HTTP_201_CREATED: UserSerializer},
    )
    def create(self, request, *args, **kwargs):
        """
        Handle the creation of a new user.
        """
        return super().create(request, *args, **kwargs)

    @extend_schema(
        summary="Update a User",
        description="Updates an existing user.",
        responses={status.HTTP_200_OK: UserSerializer},
    )
    def update(self, request, *args, **kwargs):
        """
        Handle the update of an existing user.
        """
        return super().update(request, *args, **kwargs)

    @extend_schema(
        summary="Delete a User",
        description="Deletes an existing user.",
    )
    def destroy(self, request, *args, **kwargs):
        """
        Handle the deletion of an existing user.
        """
        return super().destroy(request, *args, **kwargs)

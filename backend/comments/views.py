from typing import ClassVar

from common.permissions import IsCommentAuthorIsAuthenticatedOrReadOnly
from drf_spectacular.utils import extend_schema
from rest_framework import status, viewsets

from comments.models import Comment
from comments.serializers import CommentSerializer


class CommentViewSet(viewsets.ModelViewSet):
    """
    ViewSet class for Comment model.

    This viewset provides actions to:
    - List all comments
    - Create a new comment (only for authenticated users, and the comment's author is set to the current user)
    - Retrieve a specific comment by ID
    - Update a comment (only the comment's author can update)
    - Delete a comment (only the comment's author can delete)
    """

    http_method_names: ClassVar[list[str]] = ["get", "post", "put", "delete"]
    permission_classes = [IsCommentAuthorIsAuthenticatedOrReadOnly]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    @extend_schema(
        summary="Retrieve a Comment",
        description="Retrieves details of a specific comment by ID.",
        responses={status.HTTP_200_OK: CommentSerializer},
    )
    def retrieve(self, request, *args, **kwargs):
        """
        Handle the retrieval of a specific comment by ID.
        """
        return super().retrieve(request, *args, **kwargs)

    @extend_schema(
        summary="List Comments",
        description="Retrieves a list of all comments.",
        responses={status.HTTP_200_OK: CommentSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        """
        Handle listing of all comments.
        """
        return super().list(request, *args, **kwargs)

    @extend_schema(
        summary="Create a Comment",
        description="Creates a new comment. Only authenticated users can create comments, and the comment's author "
        "is automatically set to the current user.",
        responses={status.HTTP_201_CREATED: CommentSerializer},
    )
    def create(self, request, *args, **kwargs):
        """
        Handle the creation of a new comment.

        The author of the comment is automatically set to the current user.
        """
        request.data["author"] = request.user.id
        return super().create(request, *args, **kwargs)

    @extend_schema(
        summary="Update a Comment",
        description="Updates an existing comment. Only the comment's author can update it.",
        responses={status.HTTP_200_OK: CommentSerializer},
    )
    def update(self, request, *args, **kwargs):
        """
        Handle the update of an existing comment.

        Only the comment's author can update it.
        """
        return super().update(request, *args, **kwargs)

    @extend_schema(
        summary="Delete a Comment",
        description="Deletes an existing comment. Only the comment's author can delete it.",
    )
    def destroy(self, request, *args, **kwargs):
        """
        Handle the deletion of an existing comment.

        Only the comment's author can delete it.
        """
        return super().destroy(request, *args, **kwargs)

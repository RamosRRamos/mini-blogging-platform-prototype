"""
Viewset for managing posts in the posts app.

This viewset provides actions to:
- List all posts
- Create a new post (only for authenticated users, and the post's author is set to the current user)
- Retrieve a specific post by ID
- Update a post (only the post's author can update)
- Delete a post (only the post's author can delete)
"""

from typing import ClassVar

from drf_spectacular.utils import extend_schema
from rest_framework import status, viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from common.permissions import IsPostAuthorIsAuthenticatedOrReadOnly
from posts.models import Post
from posts.serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling post CRUD operations.
    """

    http_method_names: ClassVar[list[str]] = ["get", "post", "put", "delete"]
    # pylint: disable=RUF012
    permission_classes = [IsPostAuthorIsAuthenticatedOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        # Verifica se o slug está presente nos parâmetros da URL
        slug = self.kwargs.get('slug')
        if slug:
            # Filtra os posts com base no slug
            post = Post.objects.filter(author__slug=slug)
            return post
        else:
            return Post.objects.all()

    @extend_schema(
        summary="Retrieve a Post",
        description="Retrieves details of a specific post by ID.",
        responses={status.HTTP_200_OK: PostSerializer},
        operation_id="retrieve_post",


    )
    def retrieve(self, request, *args, **kwargs):
        """
        Handle the retrieval of a specific post by ID.
        """
        return super().retrieve(request, *args, **kwargs)



    @extend_schema(
        summary="List Posts",
        description="Retrieves a list of all posts.",
        responses={status.HTTP_200_OK: PostSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        """
        Handle listing of all posts.        """

        return super().list(request, *args, **kwargs)

    @extend_schema(
        summary="Create a Post",
        description="Creates a new post. Only authenticated users can create posts, and the post's author "
                    "is automatically set to the current user.",
        responses={status.HTTP_201_CREATED: PostSerializer},
    )
    def create(self, request, *args, **kwargs):
        """
        Handle the creation of a new post.

        The author of the post is automatically set to the current user.
        """
        data = request.data.copy()
        data["author"] = request.user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    @extend_schema(
        summary="Update a Post",
        description="Updates an existing post. Only the post's author can update it.",
        responses={status.HTTP_200_OK: PostSerializer},
    )
    def update(self, request, *args, **kwargs):
        """
        Handle the update of an existing post.

        Only the post's author can update it.
        """
        return super().update(request, *args, **kwargs)

    @extend_schema(
        summary="Delete a Post",
        description="Deletes an existing post. Only the post's author can delete it.",
    )
    def destroy(self, request, *args, **kwargs):
        """
        Handle the deletion of an existing post.

        Only the post's author can delete it.
        """
        return super().destroy(request, *args, **kwargs)

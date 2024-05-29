"""
Viewset for managing posts in the posts app.

This viewset provides actions to:
- List all posts
- Create a new post (only for authenticated users, and the post's author is set to the current user)
- Retrieve a specific post by ID
- Update a post (only the post's author can update)
- Delete a post (only the post's author can delete)
"""

from rest_framework import viewsets, status
from rest_framework.response import Response

from common.permissions import IsPostAuthorIsAuthenticatedOrReadOnly
from posts.models import Post
from posts.serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling post CRUD operations.
    """

    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsPostAuthorIsAuthenticatedOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

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

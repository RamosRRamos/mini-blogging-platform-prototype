"""
Module: views

This module contains the CommentViewSet class for handling CRUD operations related to Comment objects.

Classes:
    - CommentViewSet: ViewSet class for Comment model.
"""

from rest_framework import viewsets

from comments.models import Comment
from comments.serializers import CommentSerializer
from common.permissions import IsCommentAuthorIsAuthenticatedOrReadOnly


class CommentViewSet(viewsets.ModelViewSet):
    """
    ViewSet class for Comment model.
    """
    http_method_names = ["get", "post", "put", "delete"]
    permission_classes = [IsCommentAuthorIsAuthenticatedOrReadOnly]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

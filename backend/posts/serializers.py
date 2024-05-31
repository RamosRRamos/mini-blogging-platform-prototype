"""
Serializer for the Post model.

This serializer handles the serialization and deserialization of Post objects,
enabling their conversion to and from JSON format for API interactions.
"""

from rest_framework import serializers

from comments.serializers import CommentSerializer
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    """
    Serializer for the Post model.

    This serializer automatically generates fields based on the Post model.
    It includes all the fields of the model for comprehensive data handling.
    """

    comments = CommentSerializer(source="comment_set", many=True, read_only=True)
    author_name = serializers.CharField(source='author.slug', read_only=True)

    class Meta:
        model = Post
        fields = "__all__"

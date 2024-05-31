"""
Module: serializers

This module contains the CommentSerializer class for serializing and deserializing Comment objects.

Classes:
    - CommentSerializer: Serializer class for Comment model.
"""

from rest_framework import serializers

from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer class for Comment model.
    """
    author_name = serializers.CharField(source='author.slug', read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"

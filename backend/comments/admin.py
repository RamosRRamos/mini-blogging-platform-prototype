"""
Module: admin

This module contains the configuration for the Django admin panel related to comments.

Classes:
    - CommentAdmin: Admin configuration for the Comment model.
"""

from django.contrib import admin

from .models import Comment


class CommentAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Comment model.
    """

    list_display = ("content", "author", "post", "is_removed")
    list_filter = ("is_removed", "author")
    search_fields = ("content", "author__username", "post__title")
    readonly_fields = ("author", "post")

    def save_model(self, request, obj, form, change):
        """Define o autor do comentário como o usuário logado ao salvar."""
        if not obj.author:
            obj.author = request.user
        obj.save()


admin.site.register(Comment, CommentAdmin)

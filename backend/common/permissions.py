"""
Custom permission classes for ensuring only authors can edit or delete their posts and comments,
while allowing authenticated users to create new posts and comments.

Classes:
    IsCommentAuthorIsAuthenticatedOrReadOnly - Custom permission to only allow the author of a comment to edit or delete
    it.
    IsPostAuthorIsAuthenticatedOrReadOnly - Custom permission to only allow the author of a post to edit or delete it.
"""

from rest_framework import permissions


class IsCommentAuthorIsAuthenticatedOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow the author of a comment to edit or delete it.
    """

    def has_object_permission(self, request, view, obj):
        """
        Object-level permission to allow only the author of the comment to edit or delete it.
        """
        # Read permissions are allowed for any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the author of the comment
        if request.method == "PUT":
            return obj.author == request.user

        # Delete permissions are allowed to the author of the post or the comment
        if request.method == "DELETE":
            return obj.post.author == request.user or obj.author == request.user

        return False

    def has_permission(self, request, view):
        """
        Permission to allow any authenticated user to create a comment.
        """
        # Creation is allowed if the user is authenticated
        if request.method == "POST":
            return request.user.is_authenticated

        return True


class IsPostAuthorIsAuthenticatedOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow the author of a post to edit or delete it.
    """

    def has_object_permission(self, request, view, obj):
        """
        Object-level permission to allow only the author of the post to edit or delete it.
        """
        # Read permissions are allowed for any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write and delete permissions are only allowed to the author of the post
        if request.method in ["PUT", "DELETE"]:
            return obj.author == request.user

        return False

    def has_permission(self, request, view):
        """
        Permission to allow any authenticated user to create a post.
        """
        # Creation is allowed if the user is authenticated
        if request.method == "POST":
            return request.user.is_authenticated

        return True

"""
Tests for the CommentViewSet in the comments app.

These tests cover the following actions:
- Listing all comments
- Creating a new comment
- Retrieving a specific comment by ID
- Updating a comment using PUT
- Partially updating a comment using PATCH
- Deleting a comment by ID
"""

from django.urls import reverse

from common.utils.tests import TestCaseUtils
from model_bakery import baker
from rest_framework.test import APITestCase

from posts.models import Post
from ..models import Comment


class CommentViewSetTest(TestCaseUtils, APITestCase):
    """
    Tests for the CommentViewSet to ensure the comment API endpoints are working correctly.
    """

    def test_list_comments(self):
        """
        Ensure we can list all comments.
        """
        post = baker.make(Post)
        baker.make(Comment, post=post, _quantity=5)

        response = self.auth_client.get(reverse("comment-list"))

        self.assertResponse200(response)
        self.assertEqual(response.data.get("count"), 5)
        self.assertEqual(len(response.data.get("results")), 5)

    def test_create_comment(self):
        """
        Ensure we can create a new comment.
        """
        post = baker.make(Post)
        data = {
            "post": post.id,
            "author": self.user.id,
            "content": "Test comment content",
        }

        response = self.auth_client.post(reverse("comment-list"), data=data)

        self.assertResponse201(response)
        comment = Comment.objects.get(id=response.data["id"])
        self.assertEqual(comment.post.id, post.id)
        self.assertEqual(comment.author.id, self.user.id)
        self.assertEqual(comment.content, data["content"])

    def test_retrieve_comment(self):
        """
        Ensure we can retrieve a comment by ID.
        """
        comment = baker.make(Comment, _fill_optional=True)

        response = self.auth_client.get(reverse("comment-detail", args=[comment.id]))

        self.assertResponse200(response)
        self.assertEqual(response.data["id"], str(comment.id))
        self.assertEqual(response.data["content"], comment.content)

    def test_put_update_comment(self):
        """
        Ensure we can update a comment using PUT.
        """
        comment = baker.make(Comment, _fill_optional=True)
        data = {
            "content": "Updated comment content",
        }

        response = self.auth_client.put(
            reverse("comment-detail", args=[comment.id]), data=data
        )

        self.assertResponse200(response)
        comment.refresh_from_db()
        self.assertEqual(comment.content, data["content"])

    def test_patch_update_comment(self):
        """
        Ensure we can partially update a comment using PATCH.
        """
        comment = baker.make(Comment, _fill_optional=True)
        data = {
            "content": "Updated comment content",
        }

        response = self.auth_client.patch(
            reverse("comment-detail", args=[comment.id]), data=data
        )

        self.assertResponse200(response)
        comment.refresh_from_db()
        self.assertEqual(comment.content, data["content"])

    def test_delete_comment(self):
        """
        Ensure we can delete a comment by ID.
        """
        comment = baker.make(Comment, _fill_optional=True)

        response = self.auth_client.delete(reverse("comment-detail", args=[comment.id]))

        self.assertResponse204(response)
        self.assertFalse(Comment.objects.filter(id=comment.id).exists())

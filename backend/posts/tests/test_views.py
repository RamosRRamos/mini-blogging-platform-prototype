"""
Tests for the PostViewSet in the posts app.

These tests cover the following actions:
- Listing all posts
- Creating a new post
- Retrieving a specific post by ID
- Updating a post using PUT
- Partially updating a post using PATCH
- Deleting a post by ID
"""

from uuid import UUID
from django.urls import reverse
from common.utils.tests import TestCaseUtils
from model_bakery import baker
from rest_framework.test import APITestCase
from ..models import Post


class PostViewSetTest(TestCaseUtils, APITestCase):
    """
    Tests for the PostViewSet to ensure the post API endpoints are working correctly.
    """

    def test_list_posts(self):
        """
        Ensure we can list all posts.
        """
        baker.make(Post, _quantity=5)

        response = self.auth_client.get(reverse("post-list"))

        self.assertResponse200(response)
        self.assertEqual(response.data.get("count"), 5)
        self.assertEqual(len(response.data.get("results")), 5)

    def test_create_post(self):
        """
        Ensure we can create a new post.
        """
        data = {
            "title": "Test Post",
            "content": "This is a test post content.",
        }

        response = self.auth_client.post(reverse("post-list"), data=data)

        self.assertResponse201(response)
        post = Post.objects.get(id=response.data["id"])
        self.assertEqual(post.title, data["title"])

    def test_retrieve_post(self):
        """
        Ensure we can retrieve a post by ID.
        """
        post = baker.make(Post, _fill_optional=True)

        response = self.auth_client.get(reverse("post-detail", args=[post.id]))

        self.assertResponse200(response)
        self.assertEqual(UUID(response.data["id"]), post.id)
        self.assertEqual(response.data["title"], post.title)

    def test_put_update_post(self):
        """
        Ensure we can update a post using PUT.
        """
        post = baker.make(Post, title="Test Post", _fill_optional=True)
        data = {
            "title": "Updated Post",
            "content": "This is an updated post content.",
        }

        response = self.auth_client.put(
            reverse("post-detail", args=[post.id]), data=data
        )

        self.assertResponse200(response)
        post.refresh_from_db()
        self.assertEqual(post.title, data["title"])

    def test_patch_update_post(self):
        """
        Ensure we can partially update a post using PATCH.
        """
        post = baker.make(Post, title="Test Post", _fill_optional=True)
        data = {
            "title": "Updated Post",
        }

        response = self.auth_client.patch(
            reverse("post-detail", args=[post.id]), data=data
        )

        self.assertResponse200(response)
        post.refresh_from_db()
        self.assertEqual(post.title, data["title"])

    def test_delete_post(self):
        """
        Ensure we can delete a post by ID.
        """
        post = baker.make(Post, _fill_optional=True)

        response = self.auth_client.delete(reverse("post-detail", args=[post.id]))

        self.assertResponse204(response)
        self.assertFalse(Post.objects.filter(id=post.id).exists())

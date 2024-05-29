from django.contrib import admin

from comments.models import Comment
from .models import Post


class CommentInline(admin.TabularInline):
    model = Comment
    extra = 1


class PostAdmin(admin.ModelAdmin):
    inlines = (CommentInline,)
    list_display = ("title", "author", "is_draft")
    list_filter = ("is_draft", "author")
    search_fields = ("title", "author__username")
    readonly_fields = ("author",)

    def save_model(self, request, obj, form, change):
        """Define o autor do post como o usuário logado ao salvar."""
        if not obj.author:
            obj.author = request.user
        obj.save()


admin.site.register(Post, PostAdmin)

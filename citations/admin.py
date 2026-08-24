from django.contrib import admin
from django.utils.html import format_html
from .models import Citation


@admin.register(Citation)
class CitationAdmin(admin.ModelAdmin):
    """Custom admin interface for managing citations."""

    list_display = (
        'short_text', 'author', 'category',
        'is_published', 'image_preview', 'created_at'
    )
    list_filter = ('is_published', 'category', 'created_at')
    search_fields = ('text', 'author')
    list_editable = ('is_published',)
    date_hierarchy = 'created_at'
    list_per_page = 20

    fieldsets = (
        ('Contenu', {
            'fields': ('text', 'author', 'image', 'image_preview_large')
        }),
        ('Options', {
            'fields': ('category', 'is_published')
        }),
    )
    readonly_fields = ('image_preview_large',)

    def short_text(self, obj):
        if len(obj.text) > 80:
            return obj.text[:80] + '...'
        return obj.text
    short_text.short_description = "Citation"

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="height:50px; border-radius:5px;" />',
                obj.image.url
            )
        return "—"
    image_preview.short_description = "Aperçu"

    def image_preview_large(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height:300px; border-radius:10px;" />',
                obj.image.url
            )
        return "Aucune image"
    image_preview_large.short_description = "Aperçu de l'image"


# Customize admin site branding
admin.site.site_header = "Nina — Administration"
admin.site.site_title = "Nina Admin"
admin.site.index_title = "Gestion des citations"

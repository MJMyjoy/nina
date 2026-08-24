from django.db import models


class Citation(models.Model):
    """A citation/quote published by Nina with an illustration."""

    CATEGORY_CHOICES = [
        ('amour', 'Amour'),
        ('vie', 'Vie'),
        ('inspiration', 'Inspiration'),
        ('sagesse', 'Sagesse'),
        ('reve', 'Rêve'),
        ('autre', 'Autre'),
    ]

    text = models.TextField(verbose_name="Texte de la citation")
    author = models.CharField(
        max_length=100,
        default="Nina",
        verbose_name="Auteur"
    )
    image = models.ImageField(
        upload_to='citations/',
        verbose_name="Illustration"
    )
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default='inspiration',
        verbose_name="Catégorie"
    )
    is_published = models.BooleanField(
        default=True,
        verbose_name="Publiée"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Date de création"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Dernière modification"
    )

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Citation"
        verbose_name_plural = "Citations"

    def __str__(self):
        preview = self.text[:50]
        if len(self.text) > 50:
            preview += '...'
        return f'"{preview}" — {self.author}'

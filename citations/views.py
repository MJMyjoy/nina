from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from .models import Citation


def home(request):
    """Display the homepage with a grid of published citations."""
    citations_list = Citation.objects.filter(is_published=True)

    # Filter by category if provided
    category = request.GET.get('category')
    if category:
        citations_list = citations_list.filter(category=category)

    paginator = Paginator(citations_list, 12)
    page_number = request.GET.get('page')
    citations = paginator.get_page(page_number)

    categories = Citation.CATEGORY_CHOICES

    return render(request, 'home.html', {
        'citations': citations,
        'categories': categories,
        'current_category': category,
    })


def citation_detail(request, pk):
    """Display a single citation with its full illustration."""
    citation = get_object_or_404(Citation, pk=pk, is_published=True)

    # Get related citations from the same category
    related = Citation.objects.filter(
        is_published=True,
        category=citation.category
    ).exclude(pk=pk)[:4]

    return render(request, 'citation_detail.html', {
        'citation': citation,
        'related': related,
    })

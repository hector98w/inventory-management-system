from django.urls import path, include
from .views import StockViewSet, UserViewSet, ReportViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('stock', StockViewSet, basename='stock')
router.register('report', ReportViewSet, basename='report')
router.register('users', UserViewSet)

urlpatterns = [
    path("", include(router.urls))
]
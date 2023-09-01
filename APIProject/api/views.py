from .models import Stock, User, Report
from .serializers import StockSerializer, UserSerilizer, ReportSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerilizer

class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    authentication_classes = (TokenAuthentication,)

    def list(self, request, pk=None):
        if request.user.is_authenticated:
            storeId = request.user.store_id
            queryset = Stock.objects.filter(store=storeId)
            serializer = StockSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response(None)
    
class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    authentication_classes = (TokenAuthentication,)

    def list(self, request, pk=None):
        if request.user.is_authenticated:
            start = request.query_params.get("start")
            end = request.query_params.get("end")
            storeId = request.user.store_id
            queryset = Report.objects.filter(store_id=storeId)
            queryset = Report.objects.filter(edited_date__range=(start, end)).order_by('item_name')
            serializer = ReportSerializer(queryset, many=True) 
            return Response(serializer.data)
        return Response(None)
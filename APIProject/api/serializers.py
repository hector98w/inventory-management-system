from rest_framework import serializers
from .models import Stock, User, Report
from rest_framework.authtoken.views import Token

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ('id', 'category', 'sku', 'item_name', 
                  'stock', 'minimum_stock', 'created_at', 'store')
        
class UserSerilizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'store')

        extra_kwargs = {'password':{
            'write_only':True,
            'required':True
        }}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user
    
class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ('id', 'category', 'sku', 'item_name', 
                  'stock', 'created_at', 'edited_at', 'store')
from django.contrib import admin
from .models import Stock, Store, User, Report
from django.contrib.auth.admin import UserAdmin

class UserAdmin(UserAdmin):
    list_display=['username','store','is_admin']

    fieldsets = (
        (None, {'fields': ('username', 'password', 'store')}),

        ('Permissions', {'fields': ('is_admin', 'is_staff')}),
    )

    search_fields =  ('username', 'email')
    ordering = ('username',)

    filter_horizontal = ()


admin.site.register(User, UserAdmin)
admin.site.register(Stock)
admin.site.register(Store)
admin.site.register(Report)
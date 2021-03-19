from django.contrib import admin

from .models import User


class UserAdmin(admin.ModelAdmin):
    model = User
    list_display = ['username', 'email', 'is_active', 'is_staff', 'is_superuser']
    search_fields = ['username', 'email']
    list_filter = ['is_active', 'is_staff']


admin.site.register(User, UserAdmin)

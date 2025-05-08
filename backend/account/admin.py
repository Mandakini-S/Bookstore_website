# account/admin.py
from django.contrib import admin
from .models import UserData
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea
from django.db import models


class UserAdminConfig(UserAdmin):
    model = UserData
    search_fields = ('email', 'name',)
    list_filter = ('email', 'name', 'is_active', 'is_staff')
    ordering = ('-date_joined',)
    list_display = ('email','id', 'name', 'is_active', 'is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('email', 'name',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
        ('Personal', {'fields': ('about',)}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser')}
         ),
    )

admin.site.register(UserData, UserAdminConfig)

from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from .views import create_task, delete_task, todo_detail, todo_list, update_task

urlpatterns = [
    path('todo_list', todo_list, name='todo_list'),
    path('delete_task/<int:pk>', delete_task, name='delete_task'),
    path('create_task', create_task, name='create_task'),
    path('update_task/<int:pk>', update_task, name='update_task'),
    path('todo_detail/<int:pk>', todo_detail, name='todo_detail')
]
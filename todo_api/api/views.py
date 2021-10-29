from django.shortcuts import render
from .models import Task
from .serializers import TaskSerializers
from rest_framework.response import Response
from rest_framework.decorators import api_view


# Create your views here.
@api_view(('GET',))
def todo_list(request):
    tasks = Task.objects.all()
    serializer = TaskSerializers(tasks, many = True)
    return Response(serializer.data)

@api_view(('GET',))
def todo_detail(request, pk):
    task = Task.objects.get(pk=pk)
    serializer = TaskSerializers(task)
    return Response(serializer.data)


@api_view(('GET',))
def delete_task(request, pk):
    task = Task.objects.get(pk=pk)
    task.delete()
    tasks = Task.objects.all()
    serializer = TaskSerializers(tasks, many = True)
    return Response(serializer.data)
    

@api_view(('GET','POST'))
def create_task(request):
    serializer = TaskSerializers(data = request.data)
    if serializer.is_valid():
        serializer.save()
    tasks = Task.objects.all()
    serializer = TaskSerializers(tasks, many = True)
    return Response(serializer.data)


@api_view(('GET','POST'))
def update_task(request, pk):
    task = Task.objects.get(pk=pk)
    serializer = TaskSerializers(data = request.data, instance = task)
    if serializer.is_valid():
        serializer.save()
    serializer = TaskSerializers(task)
    return Response(serializer.data)
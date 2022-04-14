from collections import UserList
from email import contentmanager
import re
from django.shortcuts import redirect, render
from .forms import CustomUserForm
from .models import CustomUser
from django.contrib.auth import authenticate,login, logout
from django.contrib.auth.models import User
from django.contrib import messages
# Create your views here.

def home(request):
    UserList = CustomUser.objects.values()
    context = {'context': UserList}
    return render(request, 'home/home.html',context=context)

def userlogin(request):
    if request.user.is_authenticated:
        print('Authenticated User:', request.user.username)
    print(request.POST)
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(request, username=username, password=password)
    print(user)
    if user is not None:
        login(request, user,backend='django.contrib.auth.backends.ModelBackend')
        messages.success(request, 'User logged in successfully')
        return redirect('home')
    else: 
        messages.error(request, 'Invalid credentials')
        return render(request, 'home/userlogin.html',context={})
        # return redirect('login')
        # return render 
    # form = CustomUserForm(request.POST)
    # if request.method == 'POST':
    #     print(request.POST)
    #     if form.is_valid():
    #         form.save()
    #         messages.success(request, 'User logged in successfully')
    #         return redirect('/')
    # context = {'form': form}
def userlogout(request):
    logout(request)
    context = {'context': 'Logged out successfully'}
    return redirect('home')

def signup(request):
    form = CustomUserForm(request.POST)
    if request.method == 'POST':
        print(request.POST)
        if form.is_valid():
            user = form.save()
            # print("userpass:",user.password)
            user.set_password(request.POST.get('password'))
            user.save()
            login(request,user,backend='django.contrib.auth.backends.ModelBackend')
            messages.success(request, 'User created successfully')
            return redirect('/')
    context = {'form': form}
    return render(request, 'home/signup.html',context=context)

def testlogin(request):
    form = CustomUserForm(request.POST)
    if request.method == 'POST':
        print(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'User created successfully')
            return redirect('/')
    context = {'form': form}
    return render(request, 'home/test_login.html',context=context)
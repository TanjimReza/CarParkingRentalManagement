
import re
from django.shortcuts import redirect, render
from .forms import *
from .models import *
from django.contrib.auth import authenticate,login, logout
from django.contrib import messages
# Create your views here.

def index(request):
    context = {}
    return render(request, 'home/index.html',context= context)

def home(request):
    print(request.user.is_authenticated)
    UserList = Users.objects.values()
    context = {'context': UserList}
    return render(request, 'home/home.html',context=context)

def userlogin(request):
    if request.user.is_authenticated:
        print('Authenticated User:', request.user.nid)
    print(request.POST)
    nid = request.POST.get('nid')
    password = request.POST.get('password')
    user = authenticate(request, nid=nid, password=password)
    print(user)
    if user is not None:
        login(request, user, backend='django.contrib.auth.backends.ModelBackend')
        messages.success(request, 'User logged in successfully')
        # return redirect('home')
        return redirect('dashboard')
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
    if request.POST.get('is_spot_owner') =="S":
        form = OwnerForm(request.POST)
    else: 
        form = RenteeForm(request.POST)
    print(request.POST)
    print("Errors",form.errors)
    if request.method == 'POST':
        print(request.POST)
        if form.is_valid():
            user = form.save()
            user.set_password(request.POST.get('password'))
            user.save()
            nid = request.POST.get('nid')
            password = request.POST.get('password')
            user = authenticate(request, nid=nid, password=password)
            login(request,user,backend='django.contrib.auth.backends.ModelBackend')
            messages.success(request, 'User created successfully')
            return redirect('/')
        else: 
            print("Form invalid")
    context = {'form': form}
    return render(request, 'home/signup.html',context=context)

def testlogin(request):
    form = UserForm(request.POST)
    # form = SpotOwnerForm(request.POST)
    if request.method == 'POST':
        print(request.POST)
        if form.is_valid():
            user = form.save()
            user.set_password(request.POST.get('password'))
            user.save()
            messages.success(request, 'User created successfully')
            user_type = request.POST.get('is_spot_owner')
            print("USERTYPE",user_type)
            if user_type == "S":
                usertype = SpotOwner(nid=user)
                usertype.save()             
            return redirect('/')
        else: 
            print("Form invalid")
    context = {'form': form}
    print(context)
    return render(request, 'home/test_login.html',context=context)
    

def spots(request):
    spots = SpotOwner.objects.filter(nid=request.user)
    print(spots)
    context = {'spots': spots}
    return render(request, 'home/spots.html',context=context)

def dashboard(request):
    if request.user.is_authenticated:
        return render(request,'home/dashboard.html')
    else:
        messages.error(request,"You need to login first!")
        return redirect(userlogin)
def sidebar(request):
    return render(request, 'home/sidebar.html')

def bookslot(request):
    return render(request, 'home/bookslot.html')
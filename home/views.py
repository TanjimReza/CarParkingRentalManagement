
import re
from django.shortcuts import redirect, render
from .forms import *
from .models import *
from django.contrib.auth import authenticate, logout
from django.contrib.auth import login as auth_login
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

def login(request):
    if request.user.is_authenticated:
        print('Authenticated User:', request.user.nid)

    if request.method == 'POST':
        print(request.POST)
        nid = request.POST.get('nid')
        password = request.POST.get('password')
        user = authenticate(request, nid=nid, password=password)
        print(user)
        if user is not None:
            auth_login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            messages.success(request, 'User logged in successfully')
            return redirect('home')
        else: 
            context = {'context': 'Invalid Credentials'}
            messages.error(request, 'Invalid credentials')
            return render(request, 'home/login.html',context=context)
    else: 
        return render(request, 'home/login.html')

def userlogout(request):
    logout(request)
    context = {'context': 'Logged out successfully'}
    return redirect('home')

def signup(request):
    form = UserForm(request.POST)
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
    # form = PaymentForm(request.POST)
    form2 = SpotOwnerForm(request.POST)
    form3 = EngineForm(request.POST)
    form4 = FuelTypeForm(request.POST)
    if request.method == 'POST':
        print(request.POST)
        if form.is_valid():
            if request.POST.get('is_owner') == 'S':
                print("WE GOT OWNER")
                user = form.save(commit=False)
                user.set_password(request.POST.get('password'))
                user.save()
                messages.success(request, 'User created successfully')
                return redirect('/testlogin')
        else: 
            print("Form invalid")
    if request.method == 'POST':
        print(request.POST)
        if form4.is_valid():
            form4.save()      
            messages.success(request, 'Spot Created')
            return redirect('/spots')
        else: 
            print("Form invalid")
    if request.method == 'POST':
        print(request.POST)
        if form3.is_valid():
            form3.save()      
            messages.success(request, 'Spot Created')
            return redirect('/test_login')
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
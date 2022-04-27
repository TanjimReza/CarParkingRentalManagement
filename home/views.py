import re
from django.shortcuts import redirect, render
from .forms import *
from .models import *
from django.contrib.auth import authenticate
from django.contrib.auth import login as login_user
from django.contrib.auth import logout as logout_user
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
    print(request.POST)
    nid = request.POST.get('nid')
    password = request.POST.get('password')
    user = authenticate(request, nid=nid, password=password)
    print(user)
    if user is not None:
        login_user(request, user, backend='django.contrib.auth.backends.ModelBackend')
        messages.success(request, 'User logged in successfully')
        # return redirect('home')
        return redirect('dashboard')
    else: 
        messages.error(request, 'Invalid credentials')
        return render(request, 'home/login.html',context={})
  
def logout(request):
    logout_user(request)
    context = {'context': 'Logged out successfully'}
    return redirect('index')

def signup(request):
    form = UserForm(request.POST)
    if request.method == 'POST':
        print(request.POST)
        if form.is_valid():
            user = form.save()
            user.set_password(request.POST.get('password'))
            user.save()
            
        if request.POST.get('is_owner') == "S":
            print("OWNER")
            owner = OwnerForm(request.POST)
            if owner.is_valid():
                owner.save()
            else: 
                print("Invalid Owner")
        if request.POST.get('is_owner') == "R": 
            print("Rentee")
            rentee = RenteeForm(request.POST)
            if rentee.is_valid():
                rentee.save()
            else:
                print("Invalid Rentee")
            
        return redirect(dashboard)
    else: 
        print("Form invalid")
 
    context = {'form': form}
    return render(request, 'home/signup.html',context=context)

def testlogin(request):
    
    # form = ParkingSlotsForm(request.POST)
    form = ParkingSlotsForm(request.POST)
    if request.method == 'POST':
        print(request.POST)
        if form.is_valid():
            form.save()
        else: 
            print("Form invalid")
    context = {'form': form}
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
        return redirect(login)
def sidebar(request):
    return render(request, 'home/sidebar.html')

def bookslot(request):
    if request.method == 'POST':
        slot_id = request.POST.get('slot_id')
        booked_slots = request.POST.getlist('favorite_fruits')
        result = slot_id
        
    #! GET SLOT OBJECT FROM ID
        slot = ParkingSlots.objects.get(slot_id=slot_id)
        prev_slots = slot.time_slots
        prev_slots = prev_slots.replace("'", "").replace(" ", "")[1:-1:].split(",")
        print("Booked:", booked_slots, type(booked_slots))
        print("Prev Slots:", prev_slots, type(prev_slots))
        for slot in booked_slots:
            if slot in prev_slots:
                prev_slots.remove(slot)
        print("Rem Slots:", prev_slots)
        str = "["
        for i in prev_slots:
            str += "'" + i + "',"
        str = str[:-1]
        str += "]"
        prev_slots = str        
        print(prev_slots)
        ParkingSlots.objects.filter(slot_id=slot_id).update(time_slots=prev_slots)
        print("Updated Slots:", prev_slots)
        
        context = {'result_areas': result}
        # print(context)
        return render(request,'home/bookslot.html',context=context)
    else: 
        print("Not Searching..")
    context = {'result':'None'}
    return render(request, 'home/bookslot.html',context=context)

def searchslot(request):
    if request.method == 'POST':
        searchArea = request.POST.get('searcharea')
        result = ParkingSlots.objects.filter(area=searchArea)
        print(result)
        context = {'result_areas': result}
        print(context)
        return render(request,'home/searchslot.html',context=context)
    else: 
        print("Not Searching..")
    context = {'result':'None'}
    return render(request, 'home/searchslot.html',context=context)

def createslot(request):
    form = ParkingSlotsForm(request.POST)
    
    if not request.user.is_authenticated:
        return redirect(login)
    else:
        if request.method == "POST":
            print("Here")
            print(request.POST)
            form = ParkingSlotsForm(request.POST)
            if form.is_valid():
                print("FORM IS VALID SAVING")
                form.save()
                return redirect(dashboard)
            else: 
                print("INVALID")
                messages.error(request, 'Invalid Form Data. Check Your NID')
        else: 
            print("NOT POST")
        context = {'form': form}
    return render(request, 'home/createslot.html', context=context)

def payment(request):
    print(request.POST)
    form = paymentForm(request.POST)
    if request.method == "POST":
        if form.is_valid():
            print("FORM IS VALID")
            form.save()
        else:
            print("FORM INVALIIIIIIIIID")
    context = {'form':form}
    return render(request, 'home/payment.html',context=context)
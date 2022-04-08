from email import contentmanager
from django.shortcuts import redirect, render
from .forms import CustomUserForm
from .models import CustomUser
#import messages 
from django.contrib import messages
# Create your views here.


def home(request):
    form = CustomUserForm(request.POST)
    if request.method == 'POST':
        print(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'User created successfully')
            return redirect('home')
    context = {'form': form}
    return render(request, 'home/home.html',context=context)
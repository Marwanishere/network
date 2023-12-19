from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse

from .models import User
from .models import NewPost

def index(request):
    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
    
# def call_posts(request):
#     if request.method != 'POST':
#         posts = NewPost.objects.all()
#         # above line acquired through cs50.ai chatbot
#         posts_list = NewPost(user=posts.cleaned_data['user'],content=posts.cleaned_data['content'],
#                              timestamp=posts.cleaned_data['timestamp'],title=posts.cleaned_data['title'],)
#         posts_list.save()

#         return JsonResponse(posts_list, safe = False)
    # returns the posts as javascript object notation. line acquired through cs50.ai chatbot

def call_posts(request):
    if request.method != 'POST':
        posts = NewPost.objects.all()
        posts_list = [{'user': post.user.username, 'content': post.content, 'timestamp': post.timestamp, 'title': post.title} for post in posts]
        return JsonResponse(posts_list, safe=False)
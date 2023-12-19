from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class NewPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name= "user1")
    title = models.CharField(max_length=64)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)


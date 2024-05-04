from django import forms
from .models import Vid


# the below form was made with the assistance of cs50.ai chatbot
class UploadVideoForm(forms.ModelForm):
    class Meta:
        model = Vid
        fields = ['video']
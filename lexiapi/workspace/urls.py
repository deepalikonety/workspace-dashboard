from django.urls import path
from . import views

urlpatterns = [
    path('workspaces/', views.workspace_list_create),
    path('workspaces/<int:id>/', views.workspace_detail),  # ✅ correct place
]

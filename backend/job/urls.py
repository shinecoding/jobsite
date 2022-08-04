from django.urls import path
from . import views

urlpatterns = [
    path('jobs/', views.getAllJobs, name="jobs"),
    path('job/<str:pk>/', views.getJob, name="job"),
    path('job/new/', views.newJob, name="new_job"),
    path('jobs/update/<str:pk>/', views.updateJob, name="update_job"),
    path('jobs/delete/<str:pk>/', views.deleteJob, name="delete_job"),
    path('stats/<str:topic>/', views.getTopicStats, name="topic_stats")
]
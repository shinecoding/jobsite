from django.shortcuts import render
from rest_framework.decorators import api_view

from .serializers import JobSerializer
from .models import Job
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db.models import Avg, Min, Max, Count
from rest_framework.pagination import PageNumberPagination
from .filters import JobFilter

@api_view(['GET'])
def getAllJobs(request):

    filterset = JobFilter(request.GET, queryset=Job.objects.all().order_by('id'))

    count = filterset.qs.count()

    #Pagination
    resPerPage = 3

    paginator = PageNumberPagination()
    paginator.page_size = resPerPage

    queryset = paginator.paginate_queryset(filterset.qs, request)

    serializer = JobSerializer(queryset, many=True)
    return Response({
        "count": count,
        'resPerPage': resPerPage,
        'jobs':serializer.data})


@api_view(['GET'])
def getJob(request, pk):

    job = get_object_or_404(Job, id=pk)

    # candidates = job.candidatesapplied_set.all().count()
    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)
    # return Response({'job': serializer.data, 'candidates': candidates})



@api_view(['POST'])
def newJob(request):
    data = request.data
    job = Job.objects.create(**data)
    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


@api_view(['PATCH'])
def updateJob(request, pk):

    job = get_object_or_404(Job, id=pk)
    job.title = request.data['title']
    job.description = request.data['description']
    job.email = request.data['email']
    job.address = request.data['address']
    job.jobType = request.data['title']
    job.education = request.data['education']
    job.industry = request.data['industry']
    job.experience = request.data['experience']
    job.salary = request.data['salary']
    job.positions = request.data['positions']
    job.company = request.data['company']

    job.save()

    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteJob(request, pk):
    job = get_object_or_404(Job, id=pk)
    job.delete()

    return Response({'message': 'Job is Deleted.'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def getTopicStats(request, topic):
    args= {'title__icontains': topic}
    jobs = Job.objects.filter(**args)

    if len(jobs) == 0:
        return Response({'message': 'Not stats found for {topic}'.format(topic=topic)})

    stats = jobs.aggregate(
        total_jobs = Count('title'),
        avg_positions = Avg('posisionts'),
        avg_salary = Avg('salary'),
        min_salary = Min('salary'),
        max_salary = Max('salary')
    )
    return Response(stats)
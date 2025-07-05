
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Workspace
from datetime import datetime

@csrf_exempt
def workspace_list_create(request):
    if request.method == 'GET':
        workspaces = Workspace.objects.all().order_by('-created_at')
        data = [
            {
                'id': w.id,
                'name': w.name,
                'client': w.client,
                'opponent': w.opponent,
                'case_type': w.case_type,
                'accused': w.accused,
                'victim': w.victim,
                'allegations': w.allegations,
                'facts_summary': w.facts_summary,
                'date_of_incident': w.date_of_incident.strftime('%Y-%m-%d') if w.date_of_incident else None,
                'representatives': w.representatives,
                'created_at': w.created_at.strftime('%Y-%m-%dT%H:%M:%S'),
                'last_active_at': w.last_active_at.strftime('%Y-%m-%dT%H:%M:%S') if w.last_active_at else None,  # ✅ added
            }
            for w in workspaces
        ]
        return JsonResponse(data, safe=False)


    elif request.method == 'POST':
        try:
            data = json.loads(request.body)

            workspace = Workspace.objects.create(
                name=data['name'],
                client=data['client'],
                opponent=data['opponent'],
                case_type=data['case_type'],
                accused=data['accused'],
                victim=data['victim'],
                allegations=data['allegations'],
                facts_summary=data['facts_summary'],
                date_of_incident=datetime.strptime(data['date_of_incident'], '%Y-%m-%d'),
                representatives=data['representatives'],
            )
            return JsonResponse({'message': 'Workspace created', 'id': workspace.id}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    else:

        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
        
@csrf_exempt
def workspace_detail(request, id):
    try:
        workspace = Workspace.objects.get(id=id)
    except Workspace.DoesNotExist:
        return JsonResponse({'error': 'Not found'}, status=404)

    if request.method == 'DELETE':
        workspace.delete()
        return JsonResponse({'message': 'Deleted successfully'}, status=200)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

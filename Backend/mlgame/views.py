from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from .reward import reward_user, get_account,set_account,charge_fees
from .aibot.bot import personality,chatbot ,reset
import json

@csrf_exempt
def index(request):
    if request.method=='POST':
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        account_value = body_data.get('account')
        set_account(account_value)
        print(account_value)
        charge_fees(2*1000000000000000000)
        temp_ans=chatbot('','abc111')
        print(temp_ans)
        answer=personality('abc111')
        print(answer)
        return HttpResponse('Ok')

    return HttpResponse('home page')

@csrf_exempt
def answer(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        user_prompt = body_data.get('question')
    
        answer=chatbot(user_prompt,'abc111')

        if answer.lower()=='yes':
            return JsonResponse({'answer': 'Yes'})
        else:
            return JsonResponse({'answer': 'No'})
        

    return HttpResponse('Yes or No')

@csrf_exempt
def character(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        final_answer = body_data.get('guess')
        questions = body_data.get('questionCount')

        answer=personality('abc111')

        print(final_answer,questions,answer)

        reward_amount=int(((1+(10-questions)*0.1*4)*1000000000000000000))

        reset()
        
        if answer.lower()==final_answer.lower():
            reciept = reward_user(reward_amount)
            print(reciept)
            return JsonResponse({'answer': 'Correct'})
        else:
            return JsonResponse({'answer': 'Incorrect'})
        

    return HttpResponse('Correct or Not')
# code written by ryan541
# run terminal
#type
# python3 MakeAssessmentJson.py
# copy and paste contents on terminal into visual code studio
# after you copy, select all, alt+shift+F to neatly format



import json

def buildTask(questionName, description=""):
  task = {
    "name": questionName,
    "description": description,
    "marks": [
      {
        "value": "1",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 1
          }
        ]
      }
    ],
    "events": {
      "start": { "element": "questionLib", "property": "value", "data": {"action":"questionStart","name":questionName} },
      "end": { "element": "questionLib", "property": "value", "data": {"action":"questionEnd","name":questionName} }
    },
    "history": {
      "element": "questionLib",
      "property": "historyFor" + questionName
    }
  }
  return json.dumps(task)
print('{"tasks": [')
print(','.join(map(lambda x: buildTask(x), ("low", "medium", "high"))))
print(']}')
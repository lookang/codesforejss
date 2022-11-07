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

questionNames = ()

print('{"tasks": [')
print(','.join(map(lambda x: buildTask(str(x)), questionNames)))
print(']}')

import json

def buildTask(questionName, marks=1, description=""):
  task = {
    "name": questionName,
    "description": description,
    "marks": list(map(lambda x: {
        "value": str(x),
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": x
          }
        ]
      }, range(1, marks + 1))),
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

# questionNames = map(lambda x: f"Q{x}", range(1, 4))
questionNames = ("a", "b", "c", "d", "e", "f")
# questionNames = ("Measurement",)
# BAD: questionNames = ("Measurement")
marks = 2 # for setting the number of marks for all questions

print('{"tasks": [')
print(','.join(map(lambda x: buildTask(str(x), marks), questionNames)))
print(']}')

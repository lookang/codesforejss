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
      },
      {
        "value": "2",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 2
          }
        ]
      },
      {
        "value": "3",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 3
          }
        ]
      },{
        "value": "4",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 4
          }
        ]
      },
      {
        "value": "5",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 5
          }
        ]
      },
      {
        "value": "6",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 6
          }
        ]
      },
      {
        "value": "7",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 7
          }
        ]
      },
      {
        "value": "8",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 8
          }
        ]
      },
      {
        "value": "9",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 9
          }
        ]
      },
      {
        "value": "10",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 10
          }
        ]
      },
      {
        "value": "11",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 11
          }
        ]
      },
      {
        "value": "12",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 12
          }
        ]
      },
      {
        "value": "13",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 13
          }
        ]
      },
      {
        "value": "14",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 14
          }
        ]
      },
      {
        "value": "15",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 15
          }
        ]
      },
      {
        "value": "16",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 16
          }
        ]
      },
      {
        "value": "17",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 17
          }
        ]
      },
      {
        "value": "18",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 18
          }
        ]
      },
      {
        "value": "19",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 19
          }
        ]
      },
      {
        "value": "20",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 20
          }
        ]
      },
      {
        "value": "21",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 21
          }
        ]
      },
      {
        "value": "22",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 22
          }
        ]
      },
      {
        "value": "23",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 23
          }
        ]
      },
      {
        "value": "24",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 24
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

questionNames = ("National Identity & Awareness","Active Community Life","Global Awareness","Cross-Cultural Awareness","Inventive Problem Solving","Sound Reasoning & Decision Making","Metacognition","Resilience & Adaptability","Communication","Collaboration","Information Management")

descriptions = (
  "Description for National Identity & Awareness",
  "Description for Active Community Life",
  "Description for Global Awareness",
  "Description for Cross-Cultural Awareness",
  "Description for Inventive Problem Solving",
  "Description for Sound Reasoning & Decision Making",
  "Description for Metacognition",
  "Description for Resilience & Adaptability",
  "Description for Communication",
  "Description for Collaboration",
  "Description for Information Management"
)
print('{"tasks": [')
print(','.join(map(lambda x, y: buildTask(str(x), str(y)), questionNames, descriptions)))
print(']}')

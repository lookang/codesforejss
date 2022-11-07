// Assume ECMAScript 6; Chrome >=49, Edge >=14, Firefox >=41, Opera >=36, Safari >=8

const debugMode = true;
const _questionLib = {};
_questionLib.stack = [];
_questionLib.history = Object.create(null);
_questionLib.questionMarksAwarded = Object.create(null);

const _nullFunction = debugMode ?
  console.log
  :
  function(){};

function _debugPrint(msg) {
  if (debugMode) {
    console.log(msg);
  }
}

function _getCurrentQuestion() {
  if (!isQuestionStarted()) {
    return null;
  }
  return _questionLib.stack[_questionLib.stack.length - 1];
}

function isQuestionStarted() {
  return _questionLib.stack.length > 0;
}

// for assessment.json event - start
function startQuestion(questionName) {
  _view._addInteraction(_nullFunction, {action:"questionStart", name:questionName}, {element:"questionLib", property:"value"});
  _debugPrint("Start question: " + questionName);
  
  _questionLib.stack.push(questionName);
}

// for assessment.json history
function addQuestionHistory(history, questionName=null) {
  if (questionName === null && isQuestionStarted()) {
    questionName = _getCurrentQuestion();
  }
  
  if (!(questionName in _questionLib.history)) {
    _debugPrint("Create question history for " + questionName);
    
    _questionLib.history[questionName] = [];
  }
  if (debugMode) {
    console.log("Push \"" + history + "\" to question history for " + questionName);
  }
  _questionLib.history[questionName].push(history);
  _flushQuestionHistory(questionName);
}

function _flushQuestionHistory(questionName) {
  // TODO: check if need to flush
  if (questionName === _getCurrentQuestion()) {
    const outputHistory = _getQuestionHistory(questionName);
    _view._addInteraction(_nullFunction, outputHistory, {property: "historyFor" + questionName, element: "questionLib"});
  }
}

function _getQuestionHistory(questionName) {
  if (questionName in _questionLib.history) {
    return _questionLib.history[questionName].join("\n");
  } else {
    _debugPrint("No question \"" + questionName + "\" exists");

    return "";
  }
}

// for assessment.json event - states
function onAnswer(answer, isCorrect=false, history=answer, questionName=null) {
  if (questionName === null && isQuestionStarted()) {
    questionName = _questionLib.stack[_questionLib.stack.length - 1];
  }
  if (questionName !== null) {
    const explainer = Object.create(null);
    explainer[true] = " ✅";
    explainer[false] = " ❌";

    addQuestionHistory(history + explainer[isCorrect], questionName);
    if (questionName === _getCurrentQuestion()) {
      _view._addInteraction(_nullFunction, {name:questionName, answer:answer, isCorrect:isCorrect, action:"questionAnswer"}, {property: "answer", element:"questionLib"});
    }
  }
}

// for assessment.json event - end
function endQuestion() {
  if (_questionLib.stack.length > 0) {
    const questionName = _questionLib.stack.pop();
    _debugPrint("End question: " + questionName);
    _view._addInteraction(_nullFunction, {action:"questionEnd", name:questionName}, {element: "questionLib", property: "value"});
  }
}

// for assessment.json marks
function awardQuestionMarks(marks=1) {
  if (isQuestionStarted()) {
    const questionName = _getCurrentQuestion();
    _questionLib.questionMarksAwarded[questionName] = 1;
    
    for (; _questionLib.questionMarksAwarded[questionName] < marks + 1; _questionLib.questionMarksAwarded[questionName]++) {
      _view._addInteraction(_nullFunction, _questionLib.questionMarksAwarded[questionName], {element:"questionLib", property:"awardMarkFor"+questionName});
    }
  }
}

function resetQuestionMarks(questionName) {
  _questionLib.questionMarksAwarded[questionName] = 0;
}

function questionInstantMark(questionName, message) {
  startQuestion(questionName);
  _debugPrint("" + message);
  if (message) {
    addQuestionHistory(message);
  } else {
    _flushQuestionHistory(questionName);
  }
  awardQuestionMarks();
  endQuestion();
}

function questionAppendHistory(questionName, message) {
  if (!(questionName in _questionLib.questionMarksAwarded)) {
    _questionLib.questionMarksAwarded[questionName] = 0;
  }
  let shouldPushQuestion = _getCurrentQuestion() !== questionName;
  if (shouldPushQuestion) {
    startQuestion(questionName);
  }
  awardQuestionMarks(_questionLib.questionMarksAwarded[questionName])
  addQuestionHistory(message);
  if (shouldPushQuestion) {
    endQuestion();
  }
}

function resetQuestionHistory(questionName) {
  _questionLib.history[questionName] = [];
}

function resetQuestion(questionName) {
  resetQuestionHistory(questionName);
  resetQuestionMarks(questionName);
}

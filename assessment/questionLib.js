//how to use https://weelookang.blogspot.com/2022/11/questionlibjsmakeassessmentjsonpy.html
//Variable

//isQuestionAnswered = false // used in checking if Question is answered before 
//isFirstTry = true  //used in checking if is First Try for marks award 2 instead of 1
//clicked = // use to reset 500 ms later to force Moodle to redraw nicely on the elements

//Initialisation case 1
// new way to make Moodle slow down to reset afrer 500 ms then run the code _reset
// 500 is decided after testing on moodle, as an acceptable delay
if (!clicked){
  window.setTimeout(_reset,1000)
  clicked=true;

}

//Initialisation case 2
//lookang need to add this startQuestion to start immediately after game starts 
startQuestion(`Q${correct + 1}`);
//or
startQuestion(`Q${1}`);

//Play button example
//How to use isQuestionStarted() cos Moodle and EJSS hasnt started "talking"
if (!isQuestionStarted() && !isQuestionAnswered) {
   startQuestion(`Q${stage}`); //moodle part of the start
    //addQuestionHistory(`Target Measurement: ${l_answer}`); //moodle part of the history
    addQuestionHistory(`v1= ${v1}, v1answer= ${v1answer}`); //moodle part of the history
  }

//How to use isQuestionStarted() cos Moodle and EJSS hasnt started "talking"
if (!isQuestionStarted() && !isQuestionAnswered) {
    startQuestion("Measurement"); //moodle part of the start
    //addQuestionHistory(`Target Measurement: ${l_answer}`); //moodle part of the history
    addQuestionHistory(`Target Measurement: ${l_msg}`); //moodle part of the history
  }
//expected output
//Target Measurement: d = 11.0+0.11-(0.00)= 11.11 mm


// display of history
onAnswer(l_enterK1f, l_answer == l_enterK1f);
//expected output
//0.05 ❌
//11.11 ✅

// awardQuestionMarks use case 1
if (isFirstTry) {
      awardQuestionMarks(2);
    } else {
      awardQuestionMarks(1);
       isFirstTry =true // set back to true for next question
    }
    endQuestion(); // stamp the end of Question
    isQuestionAnswered = true; 

// awardQuestionMarks use case 2
if (once) {
      addQuestionHistory(`$ {
        questionNumber
      } = $ {
        question
      } `); //moodle part of the history
      once=false
    }
    onAnswer(coordinates,true)
    if (isFirstTry) {
      awardQuestionMarks(2);
      once=true // set back to true to prepare for next q
    }
    else {
      awardQuestionMarks(1);
      isFirstTry =true //reset
      once=true // set back to true to prepare for next q
    }

//another example is to add inside the play button
function submitAnalytics() {
  const modeToQn = {"elastic": "Q1", "inelastic": "Q2", "perfectly inelastic": "Q3"};
  const qn = modeToQn[elasticityMode];
  // m1 = mass1
  // m2 = mass2
  // u1 = vx1s
  // u2 = vx2s
  const output = `Mode: ${elasticityMode}\nm1 = ${mass1}\nm2 = ${mass2}\nu1 = ${vx1s}\nu2 = ${vx2s}`;
  questionInstantMark(qn, output);
}

function submitAnalytics2() {
  const modeToQn = {"elastic": "Q1", "inelastic": "Q2", "perfectly inelastic": "Q3"};
  const qn = modeToQn[elasticityMode];
  // m1 = mass1
  // m2 = mass2
  // u1 = vx1s
  // u2 = vx2s
  //const output = `Mode: ${elasticityMode},m1 = ${mass1},u1 = ${vx1s},m2 = ${mass2},u1 = ${vx1s},u2 = ${vx2s}`;
  const output = `m1 = ${mass1},u1 = ${vx1s},m2 = ${mass2},u1 = ${vx1s},u2 = ${vx2s}`;
  //questionInstantMark(qn, output);
  startQuestion(qn);
  addQuestionHistory(output); //moodle part of the history
  awardQuestionMarks(1);
  endQuestion(); // stamp the end of Question
}


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

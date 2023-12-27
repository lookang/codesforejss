//Variables
//define a variable called editable

editable = true // for teacher version
editable = false // for student version


// Initialization
//new tab called import
```
//if (editable) { // for debugging
  if (!editable) {
    attemptLoadGraph().then(function(data) {
      //alert( "loading new values")
      startLineText = data.startLineText
      startLineColor = data.startLineColor;
      showcm = data.showcm;
      //
      bottleshowUnknown = data.bottleshowUnknown
      bottletextUnknown = data.bottletextUnknown
      spotshowUnknown = data.spotshowUnknown
      droppershowUnknown= data.droppershowUnknown //lookang added 20231227
      
      nbottle = data.nbottle
      nbottleshow = data.nbottleshow //fazli comboxbox
      droppershow = data.droppershow //lookang added 20231227
      
      bottletext = data.bottletext
      spotshow = data.spotshow
      spotshow2 = data.spotshow2
      spotshow3 = data.spotshow3
      
      //_view._addInteraction(function(){}  ,"Q1",{"property":"value", "element":"question"}); // use to detect beginning of Q1
      //alert( "add interaction")
      
      _update();
      //alert( not working if use "_view._update")
    } );


  }
```


//Custom
// link to external file of code
 ./lib/FileSaver.js 
./lib/jszip.js 

//tab export
```
async function exportGraph(exportObject, filename="export.zip") {
  // Get the zipped export template
  const exportTemplatePath = "export-template.zip";
  const graphFileName = "records.json";

  //const IS_TESTING_EXPORT = true;

  let exportZip;
  //if (IS_TESTING_EXPORT) {
   // exportZip = new JSZip();
  //} else {
    exportZip = await getZipFromPath(exportTemplatePath);
  //}

  exportZip.file(graphFileName, JSON.stringify(exportObject));

  exportZip.generateAsync({type: "blob"}).then(blob => saveAs(blob, filename));
}

function onGraphExportComplete() {
  alert("Export complete");
}

async function getZipFromPath(path) {
  return await JSZip.loadAsync(await (await fetch(path)).blob());
}

function saveBlob(blob, filename) {
  var elem = window.document.createElement("a");
  var objectUrl = window.URL.createObjectURL(blob);
  elem.href = objectUrl;
  elem.download = filename;
  elem.click();
  
  // Cleanup allocated objects to avoid memory leaks
  // These objects do not get GCed
  setTimeout(function(elem, objectUrl) {
    elem.remove();
    window.URL.revokeObjectURL(objectUrl);
  }, 1_000, elem, objectUrl);
}
```

//tab import
```
//written by ryan451
//copy to custom function of ejss

//version 2
/**
 * @async
 * @function attemptLoadGraph
 * @returns {Promise<object>} Promise resolved: an object representing the data that was loaded
 */

async function attemptLoadGraph() {
  const graphResponse = await fetch("records.json");
  const graphSettings = await graphResponse.json();
  return graphSettings;
}
/*
Use like this:

attemptLoadGraph().then(function(data) {
  uiVariable1 = data.uiVariable1;
  buttonText = data.buttonText;
  _view.update();
});

*/
```

//Download simulation button
//OnClick
// hi felix
// this download is for the whole new ejss model, not just the records.json
//i suggest the records.json be saved automatically inside the folder where the index.html is placed - ejss_model_graphUI
// the download button should save the whole ejss_model_graphUI.zip with the records.json
// at the initialisation, the ejss_model_graphUI check the records.json and loads it
// that is the new "customisable ejss idea" - able to create new variant of ejss natively from the ejss_model_graphUI index.html itself

```
var records = {};
// needs to be defined by developer
records['startLineText'] = startLineText
records['startLineColor'] = startLineColor
records['showcm'] = showcm

records['bottleshowUnknown'] = bottleshowUnknown
records['bottletextUnknown'] = bottletextUnknown
records['spotshowUnknown'] = spotshowUnknown
records['droppershowUnknown'] = droppershowUnknown //lookang added 20231227

records['nbottleshow'] = nbottleshow
records['nbottle'] = nbottle
records['bottletext'] = bottletext
records['droppershow'] = droppershow

records['spotshow'] = spotshow
records['spotshow2'] = spotshow2
records['spotshow3'] = spotshow3


exportGraph(records).then(onGraphExportComplete);
// EJSS_TOOLS.File.downloadText("records.json", JSON.stringify(records));
  ```

var tableBegin = "<table><tr><th>Mile</th><th>Time</th></tr>";//this is only the header

var tableEnd = "</table>";//closes the table

function displayT() {
    //displays the header of the table 
   document.getElementById('outputTable').innerHTML = tableBegin + tableEnd;
}

function paceCalculate() {
   var dist = document.getElementById('distance').value;
   var pace = document.getElementById('pace').value;

   var separator = pace.indexOf(":");

   var min = pace.substring(0,separator);
   min = parseInt(min);
   var sec = pace.substring(separator+1);
   sec = parseInt(sec);

   sec += min*60;
   
   if (isNaN(min) || isNaN(sec)) {
    alert("Please enter valid minutes and seconds.");
    return;
}

   computePace(dist, sec);
}

function computePace(dist, sec) {
    //list(array) of all the times results per mile 
    var list = [];
    //what if dist has a fraction???
    for (let i = 1; i <=dist; i++) {
        var t = calculateTime(i,sec);
        list.push(t);
    }
    if(dist %1!=0){
        var partialTime =calculateTime(dist, sec);
        list.push(partialTime);
        
    }
    makeTable(list,dist);
}
function calculateTime(d, sec) {
   var seconds = sec * d;
   var minutes = 0;
   var hours = 0;
   var time = "";

   if (seconds >= 3600) {
       hours = Math.floor(seconds / 3600);
       seconds = seconds % 3600;
   }

   if (seconds >= 60) {
       minutes = Math.floor(seconds / 60);
       seconds = seconds % 60;
   }

   seconds = Math.round(seconds);


   if (hours > 0 && hours < 10) {
       hours = "0" + hours;
   }

   if (minutes < 10) {
       minutes = "0" + minutes;
   }

   if (seconds < 10) {
       seconds = "0" + seconds
   }

   if (hours != 0) {
       time = hours + ":" + minutes + ":" + seconds;
   }

   else {
       time = minutes + ":" + seconds;
   }

   return time;
}

function makeTable(list, dist) {
   var tableAddition = "";

   for (var j = 1; j <= dist; j++) {
       tableAddition += "<tr><td>" + j + "</td><td>" + list[j-1] + "</td></tr>";
   }

   if (dist % 1 != 0) {
       tableAddition += "<tr><td>" + dist + "</td><td>" + list[list.length - 1] + "</td></tr>";
   }

   document.getElementById('outputTable').innerHTML = tableBegin + tableAddition + tableEnd;
}
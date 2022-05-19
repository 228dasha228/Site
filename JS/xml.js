var xmlDoc;
let xmlFile = "../XML/db.xml";
let xmlhttp;
if (window.XMLHttpRequest) { // для IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
} else { // для IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

xmlhttp.open("GET", xmlFile, false);
xmlhttp.setRequestHeader("Content-Type", "text/xml");
xmlhttp.send(null);
xmlDoc = xmlhttp.responseXML;
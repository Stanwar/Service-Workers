/*
Copyright 2018 Google Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
   http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const express = require('express');
const app = express();

var fileData = "";
var fs = require('fs'),
    path = require('path');
    // filePath = path.join(__dirname, 'style/main.css');
var filePaths = [];
var fileJSON = {};
const filesToCache = [
	// '/',
	'style/main.css',
	'images/still_life_medium.jpg',
	'index.html',
	'pages/offline.html',
	'pages/404.html'
]

filesToCache.forEach(function(item){
	filePaths.push(path.join(__dirname, item));
});

var cryptoJS = require('crypto-js');

for (var i=0 ; i< filePaths.length ; i++){
	var filePath = filePaths[i];
	var data = fs.readFileSync(filePath, { encoding: 'utf-8'});
	fileJSON[filePath] = cryptoJS.SHA256(data.toString()).toString();
}

console.log("JSON Constructed");
console.log(fileJSON);

fs.writeFile("tagged.json", JSON.stringify(fileJSON), function(err){
	if (err){
		console.log(" Error while writing to file : ", err);
	}
})

// This serves static files from the specified directory
app.use(express.static(__dirname));

const server = app.listen(8081, () => {

  const host = server.address().address;
  const port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});

const express = require('express');
const fs = require('fs');
const cprocess = require('child_process');
const filetxt1 = 'statusInstance1.txt';
const filetxt2 = 'statusInstance2.txt';
var arrayInstance1=[];
var arrayInstance2=[];
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('<h1>Página de status del sitio</h1>');

	cprocess.exec('sh scriptStatus.sh', (err,stdout,stderr)=>{
		if(err){
			console.log("\n"+stderr);
		}else{
			console.log(stdout);
			//Instancia 1
			var contentInstance1 = fs.readFileSync(`./status/${filetxt1}`, 'UTF-8');
			var byContentInstance1 = contentInstance1.split('\n');
			var byStringInstance1 = byContentInstance1[byContentInstance1.length-1].split(';');
			var mostRecentStatusInstance1=byStringInstance1[1];
			if(mostRecentStatusInstance1=='live'){
				res.send('<h1>Instancia 1: <span style="color:green">viva</span></h1>');
			}else{
				res.send('<h1>Instancia 1: <span style="color:red">muerta</span></h1>');
			}
			//Instancia 2
			var contentInstance2 = fs.readFileSync(`./status/${filetxt2}`, 'UTF-8');
			var byContentInstance2 = contentInstance2.split('\n');
			var byStringInstance2 = byContentInstance2[byContentInstance2.length-1].split(',');
			var mostRecentStatusInstance2=byStringInstance2[1];

			if(mostRecentStatusInstance2=='live'){
				res.send('<h1>Instancia 2: <span style="color:green">viva</span></h1>');
			}else{
				res.send('<h1>Instancia 2: <span style="color:muerta">viva</span></h1>');
			}

			
		}
	});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
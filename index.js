const path = require('path');
const express = require('express');
const fs = require('fs');
const cprocess = require('child_process');
const filetxt1 = 'statusInstance1.txt';
const filetxt2 = 'statusInstance2.txt';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	//res.sendFile(path.resolve(__dirname, 'index.html'));

	cprocess.exec('sh scriptStatus.sh', (err,stdout,stderr)=>{
		if(err){
			console.log("\n"+stderr);
		}else{
			console.log(stdout);
			//Instancia 1
			var contentInstance1 = fs.readFileSync(`./status/${filetxt1}`, 'UTF-8');
			var byContentInstance1 = contentInstance1.split('\n');
			var byStringInstance1 = byContentInstance1[byContentInstance1.length-2].split(';');
			var mostRecentStatusInstance1=byStringInstance1[1];

			//Instancia 2
			var contentInstance2 = fs.readFileSync(`./status/${filetxt2}`, 'UTF-8');
			var byContentInstance2 = contentInstance2.split('\n');
			var byStringInstance2 = byContentInstance2[byContentInstance2.length-2].split(',');
			var mostRecentStatusInstance2=byStringInstance2[1];

			if(mostRecentStatusInstance1=='live'&& mostRecentStatusInstance2=='live'){
				res.send('<h1>Instancia 1: <span style="color:green">viva</span></h1><br><h1>Instancia 2: <span style="color:green">viva</span></h1>');
			}else if(mostRecentStatusInstance1=='die' && mostRecentStatusInstance2=='die'){
				res.send('<h1>Instancia 1: <span style="color:red">muerta</span></h1><br><h1>Instancia 2: <span style="color:red">muerta</span></h1>');
			}else if(mostRecentStatusInstance1=='live' && mostRecentStatusInstance2=='die'){
				res.send('<h1>Instancia 1: <span style="color:green">viva</span></h1><br><h1>Instancia 2: <span style="color:red">muerta</span></h1>');
			}else if(mostRecentStatusInstance1=='die' && mostRecentStatusInstance2=='live'){
				res.send('<h1>Instancia 1: <span style="color:red">muerta</span></h1><br><h1>Instancia 2: <span style="color:green">live</span></h1>');
			}

			
		}
	});

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

p=0
while(p!=0){
p;

}
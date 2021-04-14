const { execFile } = require('child_process');

const child = execFile('./command.txt',(err,res)=>{
    if(err){
        throw err;
        
    }
    console.log('Total Files in Folder : ' + res);
})
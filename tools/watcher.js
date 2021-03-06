/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */
const fs = require("fs").promises
const path = require("path")
var watch = require('node-watch');
var sass = require('node-sass');
require("colors")
var glob = require("glob").Glob
var csso = require('csso');

const arg = require('arg');

const args = arg({
	// Types
	'--help':    Boolean,
	'--watch_dir':   Boolean,
    '--path':    String,      
    
	// Aliases
	'-d':        '--watch_dir',
	'-p':        '--path'
});

function watchDir(pathToWatch){

    watch(pathToWatch, { recursive: true }, async (evt, path) => {
        processFile(path)
    });
}

/**
 * processedData
 * @param {*} path 
 */
async function processFile(filePath){
      
    let fileExt =  filePath.split('.').pop();
    
    if(fileExt == "scss"){

        let destFile = await getDestinationPath(filePath,"css");

        processStyleData(filePath,destFile,true)
    }
    
    /*else if(/(png|svg)/.test(fileExt)){

        let destFile = await getDestinationPath(filePath);

        
        let processedImg = "";

        if(fileExt == "svg"){
            let fileData = (await fs.readFile(filePath,'utf8')).toString()
            const encoded = encodeURIComponent(fileData)
                                .replace(/'/g, '%27')
                                .replace(/"/g, '%22')
            processedImg = `data:image/svg+xml,${encoded}`;
        } else {

            let fileData = (await fs.readFile(filePath,'base64')).toString()

            processedImg = `data:image/${fileExt};base64,${fileData}`
        }

        let parseFilePath = path.parse(filePath)

        let fileNameWithExt = parseFilePath.name;

        //lets create basic style
        let imgStyle = `.${fileNameWithExt}_icon{background-image:url('${processedImg}');}`;

        dataToEs6Module(imgStyle,destFile,false)
    }*/
} //end fun npm install csso --save-dev


/**
 * scanAndProcess
 * @param {*} path 
 */
async function scanDirAndProcess(dir){
    
    let options = {
        cwd: path.resolve(dir),
        nodir: true,
        absolute: true
    }

    glob("**/*", options, function (err, files) {
        
        if(err){
            console.log(err,err.stack); 
            return;
        }

        files.forEach(async(file) => {
            processFile(file)
        });
    });
}

/**
 * fileExists
 */
async function pathExists(path){
    try {
        await fs.stat(path)
        return true;
    } catch(err){  
        if (err.code === 'ENOENT') {
            return false
        }
        console.log(e,e.stack)
    }
}

/**
 * convert sass to es6 module
 */
const processStyleData = (srcData, destFilePath, isSrcAFile = true) => {

    let opts = {
        outputStyle: "compressed"
    }

    if(isSrcAFile){
        opts.file = srcData;
    } else {
        opts.data = srcData
    }
    
    sass.render(opts, async function(err, result) {

        console.log(`Writing optimized style at ${destFilePath}`)

        if(err){
            console.log(err,err.stack)
            return false;
        }   

        let compiledCss = result.css.toString().trim();

        //lets optimize css
        var result = csso.minify(compiledCss, {
            restructure: true,   
            debug: true,          
            forceMediaMerge: true,
            comments: false,

        }).css;


        try{
            await fs.writeFile(destFilePath,result)
        } catch(e){
            console.log(e,e.stack)
        }

    });

} //end fun

/**
 * getDestinationPath
 */
const getDestinationPath = async (srcPath,outFileExt) => {

    let fileInfo = path.parse(srcPath); 

    let fileNameWithoutExt = fileInfo.name;
    let fileDir = fileInfo.dir;

    let destDir = `${fileDir}/`

    if(!(await pathExists(destDir))){
       try{ await fs.mkdir(destDir) } catch(e){}
    }

    let destFilePath = `${destDir}/${fileNameWithoutExt}.${outFileExt}`
    
    return destFilePath;
}//end fun 

//lets check watch
let shouldWatch = args["--watch_dir"] || false;
let pathToWatch = args["--path"] || "";

if(shouldWatch){
    watchDir(pathToWatch)
}

scanDirAndProcess(pathToWatch)
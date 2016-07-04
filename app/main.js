const electron = require('electron')
const cp = require('child_process');
const path = require('path');
const fs = require('fs');
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain;
const ToolLib = require(__dirname + '/lib/tool.js');
let toolLib = new ToolLib();

let config = require(__dirname + '/config_default.json');
let fileClose = false;
config.baseDir = __dirname;
//set category
if (config.plugin) {
    let pluginPath = path.join(__dirname, config.plugin)
    toolLib.reloadConfig(pluginPath, config);
    function isEmptyObject(e) {  
        var t;  
        for (t in e)  
            return true;  
        return false
    }  
    if (isEmptyObject(config)) {
        fileClose = true;
        fs.writeFileSync(__dirname + '/config.json', JSON.stringify(config, null, 4));
        fileClose = false;
    }
}

let mainWindow
let keyword

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
    if (mainWindow) {
        if (!mainWindow.isVisible()) {
            mainWindow.show();
            mainWindow.focus();
        }
        mainWindow.setContentSize(config.width, config.height, true);
    }
});

if (shouldQuit) {

    app.quit();
    return;
}

function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: config.width, 
        height: config.height,
        resizable: false,
        title: config.title,
        type:'toolbar',
        backgroundColor: 'alpha(opacity=0)',
        frame: false,
        show: false,
        autoHideMenuBar: true,
        transparent:true,
        alwaysOnTop: true,
        disableAutoHideCursor: true,
        icon: path.join(__dirname, "./uafred.png")
    })

    let bounds = mainWindow.getBounds();
    let positionX = config.position.x || bounds.x;
    let positionY = config.position.y || (bounds.y -150);
    mainWindow.setPosition(positionX, positionY, true);

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/www/template/index.html`)

    // Open the DevTools.
    if (config.debug){
        mainWindow.webContents.openDevTools()
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    })
    mainWindow.on('blur', function() {
        window_close(); 
    })
    mainWindow.show();
    mainWindow.focus();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//
ipcMain.on('window-resize', function(event, arg){
    let height = arg.height || mainWindow.getContentSize()['height'];
    let width = config.width || arg.width || mainWindow.getContentSize()['width'];
    if (!config.debug){
        mainWindow.setContentSize(width, height, true);
    }
    //mainWindow.center();
});
ipcMain.on('window-close', function(event, arg){
    window_close();
});

ipcMain.on('search', function(event, arg){
    try{
        keyword = arg;
        let category = arg.category;
        let ExecShell = '';

        if (typeof config.category[category] == 'undefined'){
            ExecShell = config.category.app.path; 
            arg.args.unshift(category);
        } else {
            ExecShell = config.category[category].path;
        }

        let exists = fs.existsSync(ExecShell);
        if (!exists){
            ExecShell = config.category.app.path;
            if (category != 'app'){
                arg.args.unshift(category);
            }
        }
        let result = cp.spawn(ExecShell, arg.args);
        result.stdout.on('data', function(data){
            if (arg == keyword){
                event.sender.send('result', data); 
            }
        });
        result.stdout.on('end', function(data){
            if (arg == keyword){
                event.sender.send('result-over', data);
            } 
        });
    } catch(e){

    }
});
ipcMain.on('exec', function(event, arg){
    //xdg-open 
    if (arg.length = 0){
        return ; 
    }
    try{
        let child = cp.exec(arg);
    } catch(e){

    }
    window_close();
});

function window_close(){
    //mainWindow.minimize();
    mainWindow.hide();
}

const electron = require('electron')
const cp = require('child_process');
const path = require('path');
const fs = require('fs');
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
let config = require('./config.json');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let keyword

function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: config.width, 
        height: config.height,
        resizable: false,
        title: config.title,
        backgroundColor: 'alpha(opacity=0)',
        frame: false,
        show: false,
        autoHideMenuBar: true,
        transparent:true,
        icon: path.join(__dirname, "./uafred.png")
    })

    let bounds = mainWindow.getBounds();
    mainWindow.setPosition(bounds.x, bounds.y-150, true);

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
            mainWindow = null
        })
    mainWindow.show();
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
const ipcMain = require('electron').ipcMain;
ipcMain.on('window-resize', function(event, arg){
    let height = arg.height || mainWindow.getContentSize()['height'];
    let width = 600 || arg.width || mainWindow.getContentSize()['width'];
    if (!config.debug){
        mainWindow.setContentSize(width, height, true);
    }
    //mainWindow.center();
});
ipcMain.on('window-close', function(event, arg){
    mainWindow.close(); 
});

ipcMain.on('search', function(event, arg){
    try{
        keyword = arg;
        let category = arg.category;
        let ExecShell = path.join(__dirname, config.category[category].path);
        let exists = fs.existsSync(ExecShell);
        if (!exists){
            ExecShell = path.join(__dirname, config.category.app.path);
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
    //mainWindow.close();
    app.exit(0);
});

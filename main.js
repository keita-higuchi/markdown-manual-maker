const electron = require('electron');
const app = electron.app;

const {ipcMain, dialog} = require('electron');

const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const fs = require('fs')

const os = require('os');

let mainWindow

function createWindow () {
  //mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow = new BrowserWindow({width: 1200, height: 800})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
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



ipcMain.on('printPdf', (event, arg) => {

    // ファイル書き込み
    let html = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

    // css ファイルパス
    html = html.replace(/\{\{basedir\}\}/g, __dirname)

    //fs.writeFile('prev.html', html.replace(/\{\{content\}\}/, arg.html));
    fs.writeFile(path.join(app.getPath('temp'), 'prev.html'), html.replace(/\{\{content\}\}/, arg.html));

    let tmpWindow = new BrowserWindow({parent: mainWindow, show: false});

    tmpWindow.loadURL(url.format({
        pathname: path.join(app.getPath('temp'), 'prev.html'),
        protocol: 'file:',
        slashes: true
    }));

    tmpWindow.once('ready-to-show', () => {

        dialog.showSaveDialog({
            defaultPath: path.join(os.homedir(), 'Desktop'),
            filters: [{name: 'PDF', extensions:['pdf']}]
        }, (val) => {

            if (val != undefined) {

                let landscape = false;
                if (arg.pdfOrientation == 'Landscape') {
                    landscape = true;
                }

                // A4
                let pageSize = {
                    width: 210000,
                    height: 297000,
                }

                switch (arg.pageSize) {
                case 'B5':
                    pageSize = {
                        width: 182000,
                        height: 257000,
                    }
                    break;
                }


                tmpWindow.webContents.printToPDF({
                    pageSize: pageSize,
                    landscape: landscape,
                    printBackground: true
                }, (err, data) => {
                    if (err) throw err;

                    fs.writeFile(val, data, (err) => {
                        if (err) throw err;
                    });
                });
            }

        });


    });


    tmpWindow.on('closed', function () {
      tmpWindow = null
    });


    event.returnValue = 'pog';

});


ipcMain.on('openFile', (event, arg) => {

    dialog.showOpenDialog({
        defaultPath: path.join(os.homedir(), 'Desktop'),
        filters: [{name: 'Markdown', extensions:['md']}]
    }, (val) => {

        if (val === undefined) {
            val = '';
        }
        event.returnValue = val;
    });
});


ipcMain.on('saveFile', (event, arg) => {

    dialog.showSaveDialog({
        defaultPath: path.join(os.homedir(), 'Desktop'),
        filters: [{name: 'Markdown', extensions:['md']}]
    }, (val) => {
        if (val === undefined) {
            val = '';
        }
        event.returnValue = val;
    });
});



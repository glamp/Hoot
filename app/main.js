var electron = require('electron');
var autoUpdater = require('auto-updater');
var os = require('os');
var app = electron.app;  // Module to control application life.
var BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
var Menu = electron.Menu;
var ipcMain = require('electron').ipcMain


var mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

  // Create the browser window.
  var atomScreen = require('screen');
  var size = atomScreen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({ width: size.width, height: size.height });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/../static/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  function checkForUpdates() {
    var platform = os.platform() + '_' + os.arch();
    var version = app.getVersion();
    var updateUrl = "https://new-url.com?" + "platform=" + platform + "&version=" + version;
    var updateUrl = "https://rodeo-updates.yhat.com?" + "platform=" + platform + "&version=" + version;

    autoUpdater.on('error', function(err, msg) {
      console.log('[ERROR]: ' + err + ' --> ' + msg);
    });

    autoUpdater.on('update-available', function(data) {
      console.log('[INFO]: update available --> ' + JSON.stringify(data));
    });

    autoUpdater.on('update-not-available', function(data) {
      console.log('[INFO]: no update available');
    });

    autoUpdater.on('update-downloaded', function(evt, releaseNotes, releaseName, releaseDate, udpateURL) {
      console.log('[INFO]: log', releaseNotes + '---' + releaseName + '---' + releaseDate + '---' + udpateURL);
      console.log('[INFO]: update-ready', { platform: 'osx' });
    });
    
    autoUpdater.setFeedURL(updateUrl);
    autoUpdater.checkForUpdates();
    console.log("checking for updates");
  }

  checkForUpdates();

  ipcMain.on('set-badge', function(evt, counts) {
    console.log(counts);
    var keys = Object.keys(counts);
    var values = keys.map(function(v) { return myHash[v]; });
    var n = Math.sum(values);
    if (n > 0) {
      app.dock.setBadge(n.toString());
    } else {
      app.dock.setBadge('');
    }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

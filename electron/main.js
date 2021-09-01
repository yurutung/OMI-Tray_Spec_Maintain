const { app, BrowserWindow } = require('electron')

let mainWindow
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 800,
        autoHideMenuBar: true
    })

    mainWindow.loadURL('http://localhost:3000/')

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

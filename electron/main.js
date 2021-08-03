const { app, BrowserWindow } = require('electron')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1100,
        height: 800
    })

    // mainWindow.loadFile('../backend/out/index.js')
    mainWindow.loadURL('http://localhost:8888')

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
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

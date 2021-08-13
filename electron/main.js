const { app, BrowserWindow } = require('electron')
require('dotenv').config()

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: Number(process.env.WINDOWS_HEIGHT) || 1100,
        height: Number(process.env.WINDOWS_WIDTH) || 800,
        autoHideMenuBar: true
    })

    mainWindow.loadURL(process.env.LOAD_URL || 'http://localhost:8888')

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

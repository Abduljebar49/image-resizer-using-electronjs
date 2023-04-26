const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';


//main window
function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "Image Resizer",
        width: isDev ? 1000 : 500,
        height: 600,
    })
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

//Menu template
const menu = [
    {
        role:'fileMenu',
        // label: 'File',
        // submenu: [
        //     {
        //         label: 'Quit',
        //         click: () => app.quit(),
        //         accelerator: 'CmdOrCtrl+W'
        //     }
        // ]
    }
]

app.whenReady().then(() => {
    createMainWindow();

    //we will implement menu here 
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    })
})

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit();
    }
})
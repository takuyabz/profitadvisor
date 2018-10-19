if (require('electron-squirrel-startup')) return;
const os = require("os");
const electron = require("electron")
const {app, BrowserWindow, autoUpdater, dialog, Menu, protocol, ipcMain, Tray} = electron
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const log = require('electron-log');
const path = require("path");

const isDev = require("electron-is-dev");
const version = app.getVersion();
const platform = os.platform() + "_" + os.arch();

app.setAboutPanelOptions({
  copyright: "Coppyright@ 2018 Technology Fixer Sato Takuya"
});

app.setLoginItemSettings({
  openAtLogin: true
});
autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";
log.info('App starting...');

let template = []
let mainWindow
const trayIconPath = path.join(__dirname, "tray.png")

app.on("ready", async ()=> {
  appIcon = new Tray(trayIconPath);
  var contextMenu = Menu.buildFromTemplate([
    {
      label:"インデックスカード習慣",
      submenu: [
        {
          label: "起業家資産構築 表示切り替え",
          accelerator: "Command+T",
          click: () => {
            if (mainWindow.isVisible()){
              mainWindow.hide();
              app.dock.hide();
            } else {
              mainWindow.show();
              app.dock.show();
            }
          }
        }
      ]
    },
    {
      label:"決済サービスStripe",
      submenu: [
        {
          label: "ダッシュボード",
          click: () => {
            const {shell} = require('electron');
            shell.openExternal("https://dashboard.stripe.com/dashboard");
          }          
        },
        {
          label: "継続課金商品を作る",
          click: () => {
            const {shell} = require('electron');
            shell.openExternal("https://dashboard.stripe.com/subscriptions/products");
          }          
        },
        {
          label: "売上計上/請求書を作る",
          click: () => {
            const {shell} = require('electron');
            shell.openExternal("https://dashboard.stripe.com/invoices");
          }          
        },
      ]
    },
    {
      label:"スペシャルレポート",
      submenu: [
        {
          label: "エンジニアリング入門理論大百科",
          click: () => {
            const {shell} = require('electron');
            shell.openExternal("https://fxj.herokuapp.com/lcc2510");
          }          
        },
        {
          label: "モバイルビジネスオーナーになる方法",
          click: () => {
            const {shell} = require('electron');
            shell.openExternal("https://fxj.herokuapp.com/l348966");
          }          
        },
        {
          label: "ギークなハッカーになる方法",
          click: () => {
            const {shell} = require('electron');
            shell.openExternal("https://fxj.herokuapp.com/la0f60b");
          }          
        },
        {
          label: "高額売上創出法",
          click: () => {
            const {shell} = require('electron');
            shell.openExternal("http://fxj.herokuapp.com/l48c556");
          }          
        },
        {
          label: "売上アップフォーミュラ",
          click: () => {
            const {shell} = require('electron');
            shell.openExternal("https://s3-ap-northeast-1.amazonaws.com/technology-fixer/p1/12percent_fomura.html");
          }          
        },
        {
          label: "サクセスラーニング",
          click: () => {
            const {shell} = require('electron');
            shell.openExternal("http://fxj.herokuapp.com/l4e9939");
          }          
        },
      ]
    },
    {
      label: app.getName() + "について...",
      role: 'about'
    },
    {
      label: "ProfitAdvisorを終了する",
      accelerator: "Command+Q",
      selector: "terminate:"
    },
  ]);
  appIcon.setToolTip("ProfitAdvisor");
  appIcon.setContextMenu(contextMenu);

  const menu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(menu);

  var size = electron.screen.getPrimaryDisplay().size;
  var fontSize = 48;
  card = {
    width: fontSize * 15,
    height: fontSize * 8
  }
  padding = 60;
  mainWindow = new BrowserWindow({
    width: card.width, //size.width,
    height: card.height, //size.height,
    frame: false,
    show: false,
    // transparent: true,
    resizable: false,
    useContentSize: true,
    transparent: true,
    hasShadow:false,
    alwaysOnTop:true
  });
  mainWindow.setPosition(size.width - card.width - padding,
     size.height - card.height - padding);
  // mainWindow.webContents.openDevTools()
  mainWindow.setIgnoreMouseEvents(true);
  mainWindow.loadURL(`file://${__dirname}/index.html`); 
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
  // mainWindow.webContents.on('did-finish-load', () => {
  //   mainWindow.show()
  // })
  mainWindow.once('ready-to-show', () => {
    mainWindow.setAlwaysOnTop(true);
    mainWindow.show();
  });


  // if (!isDev) {
    // autoUpdater.checkForUpdates();
    await autoUpdater.checkForUpdatesAndNotify();
    setTimeout(()=>{
      autoUpdater.checkForUpdatesAndNotify();
    }, 60 * 1000);
    // },4 * 60 * 60 * 1000);
  // }
})

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});


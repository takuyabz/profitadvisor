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

autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";
log.info('App starting...');

let template = []
let mainWindow

const trayIconPath = path.join(__dirname, "tray.png")

app.setLoginItemSettings({
  openAtLogin: true
});

app.on("ready", async ()=> {
  if (os.platform() == "darwin") {
    var template2 = [
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
      }
    ];

    var contextMenu2 = Menu.buildFromTemplate(template2);
    app.dock.setMenu(contextMenu2);
  }



  var template = [
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
    }
  ];

  if (os.platform() == "darwin") {
    template.unshift(
      {
        label:"インデックスカード習慣",
        accelerator: "Command+T",
        submenu: [
          {
            label: "起業家資産構築 表示切り替え",
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
      }
    );
  }

  if (os.platform() == "darwin") {
    template.unshift(
      {
          label: app.getName() + "について...",
          role: 'about'
      }
    );
    template.push(
      {
        label: "ProfitAdvisorを終了する",
        accelerator: "Command+Q",
        selector: "terminate:"
      }
    );
  }

  var contextMenu = Menu.buildFromTemplate(template);
  var appIcon = null;
  if (os.platform() == "darwin") 
    appIcon = new Tray(trayIconPath);
  if (os.platform() == "win32")
    appIcon = new Tray(path.join(__dirname, "wintray.ico"));
  if (appIcon == null) {
    appIcon = new Tray(trayIconPath);
  }
  // // appIcon = new Tray(process.execPath);
  appIcon.setToolTip("ProfitAdvisor");
  appIcon.setContextMenu(contextMenu);
  // const menu = Menu.buildFromTemplate(contextMenu);
  // Menu.setApplicationMenu(menu);
  // Menu.setApplicationMenu(contextMenu);


  if (os.platform() == "win32") {
    app.setJumpList([
    { // has a name so `type` is assumed to be "custom"
      name: '決済サービスStripe',
      items: [
        {
          type: 'task',
          title: 'ダッシュボード',
          program: "https://dashboard.stripe.com/dashboard",
          args: "",
          icon: process.execPath,
          iconIndex: 0,
          description: '表示'
        },
        {
          type: 'task',
          title: '継続課金商品を作る',
          program: "https://dashboard.stripe.com/subscriptions/products",
          args: "",
          icon: process.execPath,
          iconIndex: 0,
          description: '表示'
        },
        {
          type: 'task',
          title: '売上計上/請求書を作る',
          program: "https://dashboard.stripe.com/invoices",
          args: "",
          icon: process.execPath,
          iconIndex: 0,
          description: '表示'
        },
      ]
    },
    { // has a name so `type` is assumed to be "custom"
      name: 'スペシャルレポート',
      items: [
        {
          type: 'task',
          title: 'エンジニアリング入門理論大百科',
          program: "https://fxj.herokuapp.com/lcc2510",
          args: "",
          icon: process.execPath,
          iconIndex: 0,
          description: '表示'
        },
        {
          type: 'task',
          title: 'モバイルビジネスオーナーになる方法',
          program: "https://fxj.herokuapp.com/l348966",
          args: "",
          icon: process.execPath,
          iconIndex: 0,
          description: '表示'
        },
        {
          type: 'task',
          title: 'ギークなハッカーになる方法',
          program: "https://fxj.herokuapp.com/la0f60b",
          args: "",
          icon: process.execPath,
          iconIndex: 0,
          description: '表示'
        },
        {
          type: 'task',
          title: '高額売上創出法',
          program: "http://fxj.herokuapp.com/l48c556",
          args: "",
          icon: process.execPath,
          iconIndex: 0,
          description: '表示'
        },
        {
          type: 'task',
          title: '売上アップフォーミュラ',
          program: "https://s3-ap-northeast-1.amazonaws.com/technology-fixer/p1/12percent_fomura.html",
          args: "",
          icon: process.execPath,
          iconIndex: 0,
          description: '表示'
        },
        {
          type: 'task',
          title: 'サクセスラーニング',
          program: "http://fxj.herokuapp.com/l4e9939",
          args: "",
          icon: process.execPath,
          iconIndex: 0,
          description: '表示'
        },
      ]
    },
    ]);
  }

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
    if (process.platform === 'darwin') {
      app.setAboutPanelOptions({
        copyright: "Coppyright@ 2018 Technology Fixer Sato Takuya"
      });
    }
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


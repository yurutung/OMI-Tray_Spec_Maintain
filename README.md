# Tray Spec Maintain

## Environment
* Node.js
* MariaDB  
    Needs to create DB, tables.

## Code
download zip or clone
```powershell
git clone https://github.com/yurutung/OMI-Tray_Spec_Maintain.git
```

## Install & Usage
1. build frontend
    ```powershell
    cd frontend
    npm run build
    ```
2. run backend
    ```powershell
    cd backend
    npm run build
    npm start
    ```
3. run electron
    run if you want to use electron app
    ```powershell
    cd electron
    npm start
    ```
Web Url: http://localhost:8888

## Project Structure
```
OMI-Tray_Spec_Maintain
├─ backend
│  ├─ .env
│  ├─ jest.config.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ src
│  │  ├─ index.ts                  ----- entry point  
│  │  ├─ models                    ----- database models
│  │  │  ├─ index.ts
│  │  │  ├─ tray_lsr_mrk.ts
│  │  │  ├─ tray_msl.ts
│  │  │  └─ tray_spec.ts
│  │  ├─ plugins                   ----- database connection 
│  │  │  └─ mariadb.ts
│  │  ├─ repo                      ----- CRUD to database repository
│  │  │  ├─ tray_lsr_mrk-repo.ts
│  │  │  ├─ tray_msl-repo.ts
│  │  │  └─ tray_spec-repo.ts
│  │  ├─ server.ts                 ----- fastify server
│  │  ├─ test                      ----- unit test
│  │  │  ├─ tray_lsr_mrk.spec.ts
│  │  │  ├─ tray_msl.spec.ts
│  │  │  └─ tray_spec.spec.ts
│  │  └─ types                     ----- type definition
│  │     ├─ tray_lsr_mrk.ts
│  │     ├─ tray_msl.ts
│  │     └─ tray_spec.ts
│  └─ tsconfig.json
├─ electron
│  ├─ .env
│  ├─ main.js                      ----- electron entry point
│  ├─ package-lock.json
│  └─ package.json
├─ frontend
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ logo192.png
│  │  ├─ logo512.png
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  ├─ src
│  │  ├─ api                       ----- call backend api
│  │  │  ├─ tray_lsr_mrk.ts
│  │  │  ├─ tray_msl.ts
│  │  │  └─ tray_spec.ts
│  │  ├─ App.tsx                   ----- react renderer entry point
│  │  ├─ asset
│  │  │  ├─ css
│  │  │  │  ├─ App.css
│  │  │  │  ├─ bootstrap.css
│  │  │  │  └─ index.css
│  │  │  └─ i18n
│  │  │     ├─ en.json
│  │  │     └─ zh-TW.json
│  │  ├─ components                ----- components
│  │  │  ├─ AddTrayLsrMrk.tsx
│  │  │  ├─ AddTrayMsl.tsx
│  │  │  ├─ AddTraySpec.tsx
│  │  │  ├─ Datas.tsx
│  │  │  ├─ Home.tsx
│  │  │  ├─ Search.tsx
│  │  │  ├─ TrayMslTable.tsx
│  │  │  ├─ TraySpecTable.tsx
│  │  │  └─ UploadPreview.tsx
│  │  ├─ functions.tsx
│  │  ├─ i18n.ts                   ----- multiple language setting
│  │  ├─ index.tsx                 ----- entry point
│  │  ├─ logo.svg
│  │  ├─ react-app-env.d.ts
│  │  ├─ reportWebVitals.ts
│  │  ├─ setupTests.ts 
│  │  ├─ test
│  │  │  └─ App.test.tsx
│  │  └─ type.d.ts                 ----- type definition
│  └─ tsconfig.json
└─ README.md
```

### Backend
* API Document: [Project URL]/documnetation (http://localhost:8888/documnetation)

#### Package
* [sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript)  
    a promise-based Node.js ORM tool for Postgres, MySQL, **MariaDB**, SQLite and Microsoft SQL Server.  
    ```powershell
    npm install mariadb reflect-metadata sequelize sequelize-typescript
    npm install -D @types/node @types/validator
    ```
    * setting
        tsconfig.json
        ```json
        "target": "es6", // or a more recent ecmascript version
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
        ```
        babel.config.js
        ```javascript
        plugins: [
            ['@babel/plugin-transform-runtime', {regenerator: true}],
            ['@babel/plugin-proposal-decorators', {legacy: true}],
            ['@babel/plugin-proposal-class-properties', {loose: true}],
          ]
        ```
    * [transaction](https://sequelize.org/master/manual/transactions.html)
        ```typescript
        import { DBConnection } from './plugins/mariadb'
        ...
        // function
        const t = await DBConnection.getSequelize().transaction()
        try {
          await traySpec.create(traySpecBody, { transaction: t })
          await trayLsrMrk.create(trayLsrMrkBody, { transaction: t })
          ...
          await t.commit()
        } catch (error) {
          await t.rollback()
        }
        ```
* [sequelize-typescript-generator](https://www.npmjs.com/package/sequelize-typescript-generator)  
    自動抓取DB，生成sequelize-typescript所需的定義檔案
    ```powershell
    npm i -D sequelize-typescript-generator
    npx stg -D mariadb -h localhost -p 3306 -d TRAY_MAINTAIN -u root -x password --indices --case camel --out-dir ./models --clean
    ```
* [fastify-swagger](https://www.npmjs.com/package/fastify-swagger): [DOC](https://swagger.io/docs/)  
    easy to set api document, can try api by web UI  
    server.ts
    ```typescript
    import fastifySwagger from 'fastify-swagger'
    ...
    server.register(fastifySwagger, {
        mode: 'static',
        routePrefix: '/documentation',
        exposeRoute: true,
        specification: {
            path: 'docs/swagger.yaml',
            postProcessor: (_) => _,
            baseDir: ''
        }
    })
    ```
    add `docs/swagger.yaml`
    ```yaml
    openapi: "3.0.2"
    info:
      title: API spec of Tray Spec Maintain
      version: "1.0"
      description: API spec of Tray Spec Maintain for handling data transfer between frontend and backend
    servers:
      - url: http://localhost:8888/api
        description: API endpoint of backend
    paths:
      /tray_spec:
        post:
          tags:
            - Tray Spec
          summary: Post new tray spec
          description: Post a new tray spec
          requestBody:
            required: true
            content:
              applicationapplication/json:
                schema:
                  $ref: "#/components/schemas/tray_spec"
          responses:
            "201":
              description: Successfully post a new tray spec
              content:
                application/json:
                  schema:
                    type: object
                    properties:
                      traySpec:
                        $ref: "#/components/schemas/tray_spec"

    components:
      schemas:
        tray_spec:
          type: object
          properties:
            CUST_CD:
              type: string
              required: ture
              description: Customer Code
            PRODSPEC_ID:
              type: string
              required: ture
              description: TSMC Part
            CUST_PART_ID:
              type: string
              description: Customer Part
              ...
    ```


### Frontend
**TODO** add component diagram

#### Package
* [react bootstrap table](https://www.npmjs.com/package/react-bootstrap-table-next)  
    easy to create table  
    * 規定需要一個欄位當keyField
    ```typescript
    import BootstrapTable, { SelectRowProps } from "react-bootstrap-table-next"

    const columns = [
        {
          dataField: "msl",
          text: "MSL ID",
          sort: true,
        },
        {
          dataField: "floorLife",
          text: "Floor Life",
          sort: true,
        },
    ]
    const selectRow: SelectRowProps<any> = {
        mode: 'radio',
        clickToSelect: true,
        style: { backgroundColor: '#c8e6c9' },
        onSelect: handleOnSelect,
    }

    return (
        <BootstrapTable keyField="msl" data={datas} columns={columns} selectRow={selectRow} />
    )
    ```
* [react-shortcut](https://www.npmjs.com/package/react-shortcut)  
    easy to setup shortcut
    ```typescript
    import ReactShortcut from 'react-shortcut'
    ...
    <ReactShortcut
        keys={'f1'}
        onKeysPressed={() => { document.getElementById('tray_spec').click() }}
    />
    ```
* [sweetalert2](https://www.npmjs.com/package/sweetalert2): [DOC](https://sweetalert2.github.io/)  
    easy to have a pretty alert
    * 定義toast alert格式
        ```typescript
        const toastMixin = Swal.mixin({
            toast: true,
            icon: 'success', //error, info
            title: 'General Title',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        ```
    * 使用alert
        ```typescript
        toastMixin.fire({
            title: 'Add data Successfully!'
        })
        ```
* [react-csv-downloader](https://www.npmjs.com/package/react-csv-downloader)  
    easy to change json to csv format, then download
    ```typescript
    import CsvDownloader from 'react-csv-downloader'
    <CsvDownloader datas={data} filename={`exportData.csv`}></CsvDownloader>
    ```
* [csvtojson](https://www.npmjs.com/package/csvtojson)  
    change csv format to json, easy to input data to DB
    ```typescript
    const reader = new FileReader()
    reader.onloadend = (e) => {
        const csvData: string = reader.result?.toString() || ''
        csv().fromString(csvData).then(o => console.log(o))
    }
    reader.readAsText(file)
    ```
* [react-hook-form](https://react-hook-form.com/)  
    easy to validation
    ```typescript
    import { useForm } from "react-hook-form"
    const { register, watch, handleSubmit, formState: { errors } } = useForm<ITraySpec>({ mode: 'all', defaultValues: initData() })
    ...
    <form className="needs-validation" onSubmit={handleSubmit(saveTraySpec, checkLsrMrk)}>
        <input type="number" {...register('CUST_CD', { required: true, maxLength: 64 })} />
    </form>
    ```
* [react-i18next](https://react.i18next.com/)  
    set mulitiple language, and east to change language  
    add `i18n.ts`
    ```typescript
    import i18n from 'i18next'
    import { initReactI18next } from 'react-i18next'
    import en from './asset/i18n/en.json'
    import tw from './asset/i18n/zh-TW.json'

    const resources = {
      en: {
        translation: en,
      },
      'zh-TW': {
        translation: tw,
      },
    }

    i18n.use(initReactI18next).init({
      resources,
      lng: 'zh-TW',             //預設語言
      fallbackLng: 'zh-TW',     //如果當前切換的語言沒有對應的翻譯則使用這個語言，
      interpolation: {
        escapeValue: false,
      },
    })

    export default i18n
    ```
    update `App.tsx`
    ```typescript
    import './i18n'
    import { useTranslation } from "react-i18next"
    const { t } = useTranslation()
    ...
    <div>{t('button.back')</div>
    ```


### Electron

#### Environment & Install
公司環境開發機無法直接install，僅能用NB install後再傳到開發機  
* 公司環境透過npm install只能下載到版本5.0.3，較新版本(目前最新版本為13.1.8)整個環境下載下來執行也會有Error，不太確定原因為何
* 新舊版差異
    * 目前發現的差異為CSS的部分，舊版的不支援gap

#### Usage
##### iframe
架設基礎electron即可，透過網址連接已架好的web
* 目前使用這種方式

##### build a app
相關參考
* 我之前的[半成品](https://github.com/yurutung/Tray_Spec_Maintain)
* [Electron forge](https://www.electronforge.io/)
    * Electron create、build、package tool
    * 公司環境無法install，整個環境在公司電腦也無法執行，不確定原因為何
* [electron-typescript-react](https://github.com/diego3g/electron-typescript-react)
    * Electron, React and Typescript template
    * 公司環境無法install

build exe 方式
* [electron-packager](https://www.npmjs.com/package/electron-packager)
    ```
    npm run package
    ```
    * 可於`package.json`中更改參數
* [electron-builder](https://www.npmjs.com/package/electron-builder)
    * 公司環境無法使用，但網路上大多推薦這個方式

可能遇到問題 & 解決方式
* 是否顯示menu bar
    * 更改`main.js`中，`autoHideMenuBar: true`
* 渲染時抓不到css
    * 使用[css-loader](https://www.npmjs.com/package/css-loader)、[style-loader](https://www.npmjs.com/package/style-loader)
        ```powershell
            npm install bootstrap react-bootstrap-table-next
            npm install -D css-loader style-loader @types/react-bootstrap-table-next
        ```
        * setting
            rules.webpack.js
            ```javascript
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
            ```
            index.tsx
            ```typescript
            // css
            import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
            import 'bootstrap/dist/css/bootstrap.min.css'
            ```
* get Database data by ipcMain, ipcRenderer
    * package.json 設定 preload js
        ```json
        "entryPoints": [
            {
              "html": "./public/index.html",
              "js": "./src/index.tsx",
              "name": "main_window",
              "preload": {
                "js": "./electron/bridge.ts"
              }
            }
        ]
        ```
    * 前端頁面透過`window.Main.FUNC_NAME()`呼叫 bridge.ts 內function
    * bridge.ts 加入function，透過ipcRenderer連接 main.ts 內的ipcMain
        ```typescript
        getData: async (mode: string, id: string): Promise<[]> => {
            const res = await ipcRenderer.sendSync('getData', mode, id)
            if (res.status == 200) {
              return res.data
            }
            else {
              throw new Error(res.data)
            }
        },
        ```
    * main.ts 呼叫DB service
        ```typescript
        ipcMain.on('getData', async (_, mode, id) => {
            try {
              _.returnValue = {
                  status: 200,
                  data: await tsService.getDatas(id)
                }
            } catch (error) {
              console.error(`getData/${mode}/${id} Error: ${error}`)
              _.returnValue = {
                status: 500,
                data: `getData/${mode}/${id} Error: ${error}`
              }
            }
          })
        ```
    * ipcMain catch error之後直接throw error會有`UnhandlePromise`的error，不知道怎麼解決，所以先用status code判斷
* 透過網址切換畫面，且可傳送Object data
    * [react-router-dom](https://www.npmjs.com/package/react-router-dom)實作出利用網址切換頁面
    * Electron無法使用BrowserRouter，HashRouter無法使用state傳遞參數，故使用MemoryRouter
        App.tsx
        ```typescript
        import { MemoryRouter, Route, Redirect } from "react-router-dom"

        <MemoryRouter>
            <Route path="/" exact component={Home} />
            <Route path="/search/:mode" component={Search} />
            <Route path="/datas/:mode/:id" component={Datas} />
            <Route path="/add/tray_spec/:id" component={AddTraySpec} />
            <Route path="/add/tray_msl/:id" component={AddTrayMsl} />
            <Route render={() => <Redirect to="/" />} />
        </MemoryRouter>
        ```
        * exact: 需為全符合
        
        使用`location.state`來得到selected row
        ```typescript
        import { useHistory } from "react-router-dom"
        const history = useHistory()
        history.push(
            `/add/tray_msl/${id}`,
            {
              isEdit: true,
              selectedData: selected
            }
        )
        ```
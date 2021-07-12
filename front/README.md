[TOC]

## electron-forge project with React, Typescript 參考
- [How to create an electron-forge project with React, Typescript and HMR](https://dev.to/raphaelbadia/how-to-create-an-electron-forge-project-with-react-typescript-and-hmr-1gi3)

### electron-forge install
```powershell
npm install -g electron-forge
```

### webpack-typescript template
```powershell
npx create-electron-app front --template=typescript-webpack
```

### adding react
```powershell
npm install react react-dom
npm install -D @types/react @types/react-dom
```

- src/index.html
    ```html
    <body>
        <div id="root"></div>
    </body>
    ```
- src/App.tsx
    ```tsx
    import React from 'react';

    const App = () => {
        return (<div>Hi from react !</div>)
    }

    export default App;
    ```
- tsconfig.json
    To make sure typescript understands jsx
    ```json
    "compilerOptions": {
        ...,
        "jsx": "react-jsx"
    }
    ```
- src/renderer.tsx  ←rename renderer.ts
    ```tsx
    import './index.css';
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';

    ReactDOM.render(<App />, document.getElementById('root'));
    ```
- package.json
    ```json
    "entryPoints": 
    [
      {
        "html": "./src/index.html",
        "js": "./src/renderer.tsx",
        "name": "main_window"
      }
    ]
    ```

### start
```powershell
npm start
```

### package to exe
```powershell
npm run package
```



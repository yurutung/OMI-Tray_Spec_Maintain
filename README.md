# OMI-Tray_Spec_Maintain

1. set mariadb
    ```
    docker run -p 127.0.0.1:3306:3306  --name mariadb -e MARIADB_ROOT_PASSWORD=password -d mariadb
    ```
2. cd frontend
    ```
    npm install
    npm run build
    ```
3. cd backend
    ```
    npm install
    npm run build
    npm start
    ```

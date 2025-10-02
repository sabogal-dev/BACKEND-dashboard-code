# Backend Dashboard Odoo ERP

API desarrollada en **Node.js** con **Express** que sirve como intermediario entre **Odoo ERP** y un **dashboard de visualización**.  
Su objetivo es simplificar la obtención de datos organizados y filtrados desde Odoo, entregándolos listos para graficar en el frontend.

## 🚀 Funcionalidad

* Conectar con la API de Odoo ERP mediante credenciales seguras (usuario y contraseña en variables de entorno).
* Recibir únicamente **fechas de filtro** como parámetros de entrada.
* Consultar los datos en Odoo ERP, procesarlos y organizarlos automáticamente.
* Responder al frontend con la información **ya filtrada y estructurada**, lista para colocar en gráficos y reportes.
* **Importante:** Esta API es exclusivamente de **lectura**. No registra, modifica ni elimina información en Odoo.

## 🛠️ Tecnologías utilizadas

* **Node.js**
* **Express.js**
* **CORS**
* **dotenv**

## 📦 Instalación

Clona el repositorio y entra en el directorio del proyecto:

```bash
git clone https://github.com/sabogal-dev/BACKEND-dashboard-code
cd BACKEND-dashboard-code
npm install
```
## 🔐 Configuración de API
* Crea un archivo .env en la raíz del proyecto con las siguientes variables:
    - DATABASE_USER=usuario_odoo
    - DATABASE_PASSWORD=clave_odoo
    - PORT=3000

##  📄 Licencia

Copyright (c) 2025 CODEOPTIKAL SAS

Todos los derechos reservados.

Este código es propiedad privada y no puede ser utilizado, copiado, modificado ni distribuido sin autorización expresa por escrito del titular.


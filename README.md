# Proyecto de automatización QA - Automation Exercise

Hola! Este proyecto contiene todas las pruebas automatizadas que he creado para el sitio Automation Exercise. Básicamente, automatizo los flujos más importantes tanto de la interfaz web como de las APIs para asegurarme de que todo funciona bien.

Mi objetivo principal fue demostrar que puedo:
- Diseñar pruebas que realmente funcionen
- Escribir código de automatización que sea fácil de entender y mantener
- Organizar bien un proyecto para que cualquiera pueda trabajar con él
- Documentar todo de forma clara

Todo está hecho pensando en que sea simple de mantener y que se pueda seguir agregando más pruebas sin complicarse la vida.

Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Tecnologías que usé](#tecnologías-que-usé)
- [Cómo está organizado el proyecto](#cómo-está-organizado-el-proyecto)
- [Cómo instalarlo](#cómo-instalarlo)
- [Cómo configurarlo](#cómo-configurarlo)
- [Cómo ejecutar las pruebas](#cómo-ejecutar-las-pruebas)
- [Qué pruebas están incluidas](#qué-pruebas-están-incluidas)
- [Ver los reportes](#ver-los-reportes)
- [Problemas comunes y cómo solucionarlos](#problemas-comunes-y-cómo-solucionarlos)
- [Sobre mí](#sobre-mí)

Descripción General

Este proyecto automatiza los flujos más importantes del sitio Automation Exercise. Incluye:

**Pruebas de Interfaz (UI):**
- Login y logout de usuarios
- Agregar productos al carrito
- Verificar que el carrito muestre bien los productos (nombre, precio, cantidad)
- Actualizar cantidades en el carrito
- Eliminar productos del carrito
- Proceso de checkout completo
- Validar que los datos del usuario se carguen correctamente

**Pruebas de API:**
- Login a través de la API
- Crear nuevas cuentas de usuario
- Obtener información de productos
- Validar respuestas y códigos de estado
- Casos especiales (edge cases) como credenciales inválidas

**Pruebas de Integración:**
- Validar que los datos entre UI y API coincidan (validación cruzada)
- Asegurarme de que lo que veo en la pantalla sea consistente con lo que devuelve la API

**Data-Driven Testing:**
- Pruebas de login con múltiples usuarios usando datos externos (archivos JSON)

Todo está organizado de forma modular para que sea fácil encontrar las cosas y agregar más pruebas después.

Tecnologías que usé

- **Playwright** con JavaScript (no TypeScript, aunque Playwright lo soporta)
- **Node.js** como entorno de ejecución
- **Axios** para hacer las llamadas a las APIs
- **Git** para control de versiones
- Los reportes HTML que Playwright genera automáticamente

Cómo está organizado el proyecto

```
Reto-flare-SR/
├── tests/                    # Aquí están todos los tests
│   ├── ui/                   # Tests de interfaz web
│   │   ├── login.spec.js
│   │   ├── login-data-driven.spec.js
│   │   ├── logout.spec.js
│   │   ├── cart.spec.js
│   │   └── checkout.spec.js
│   ├── api/                  # Tests de API
│   │   ├── login.api.spec.js
│   │   ├── createAccount.api.spec.js
│   │   ├── products.api.spec.js
│   │   └── edgeCases.api.spec.js
│   └── integration/          # Tests que combinan UI + API
│       └── crossValidation.spec.js
│
├── pages/                    # Page Objects - cada página tiene su clase
│   ├── LoginPage.js
│   ├── HomePage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── api/                      # Servicios para llamar a las APIs
│   ├── auth.api.js          # Login, logout, etc.
│   ├── products.api.js      # Obtener productos
│   └── user.api.js          # Crear usuarios, gestionar cuentas
│
├── utils/                    # Utilidades y configuración
│   ├── config.js            # URLs, timeouts, credenciales
│   ├── testData.js          # Datos de prueba
│   └── helpers.js           # Funciones auxiliares
│
├── playwright.config.js     # Configuración de Playwright
└── package.json             # Dependencias y scripts
```

Cómo instalarlo

Primero, instala las dependencias:

```bash
npm install
```

Luego, instala los navegadores que Playwright necesita:

```bash
npx playwright install
```

Cómo configurarlo

La configuración principal está en `playwright.config.js`. Ahí puedes cambiar cosas como:
- La URL base del sitio (actualmente: https://automationexercise.com)
- Los timeouts (cuánto tiempo esperar antes de que falle un test)
- Qué navegador usar (por defecto usa Chrome)

Los datos de prueba (como credenciales de usuario) están en `utils/config.js` y `utils/testData.js`. Si necesitas cambiar algo, esos son los archivos.

Cómo ejecutar las pruebas

**Ejecutar todas las pruebas:**
```bash
npm test
```
o
```bash
npx playwright test
```

**Ejecutar solo pruebas de interfaz (UI):**
```bash
npm run test:ui
```

**Ejecutar solo pruebas de API:**
```bash
npm run test:api
```

**Ejecutar pruebas de integración:**
```bash
npm run test:integration
```

**Ejecutar un grupo específico de pruebas:**
```bash
npm run test:ui:login      # Solo tests de login UI
npm run test:ui:cart       # Solo tests del carrito
npm run test:ui:checkout   # Solo tests de checkout
npm run test:ui:logout     # Solo tests de logout
```

**Ejecutar un test específico:**
```bash
npx playwright test tests/ui/cart.spec.js --grep "TC-CART-003"
```

**Ver las pruebas ejecutándose (modo headed):**
```bash
npm run test:ui:headed
```

**Modo debug (para ver qué está pasando paso a paso):**
```bash
npm run test:debug
```

**Modo interactivo (interfaz visual de Playwright):**
```bash
npx playwright test --ui
```

Qué pruebas están incluidas

### Pruebas de Interfaz (UI)

**Login (`login.spec.js`):**
- Login exitoso con credenciales válidas
- Validar que aparece el mensaje "Logged in as [nombre]"
- Login con credenciales inválidas
- Validar mensajes de error

**Login Data-Driven (`login-data-driven.spec.js`):**
- Pruebas de login con múltiples usuarios usando datos de un archivo JSON
- Validar diferentes escenarios con diferentes credenciales

**Logout (`logout.spec.js`):**
- Cerrar sesión correctamente
- Validar que después del logout se redirige a la página de login

**Carrito (`cart.spec.js`):**
- Agregar productos al carrito
- Verificar que aparece el modal de confirmación
- Navegar al carrito desde el modal
- Verificar que los productos se muestran correctamente (nombre, precio, cantidad)
- Actualizar la cantidad de productos
- Eliminar productos del carrito
- Validar que el carrito quede vacío

**Checkout (`checkout.spec.js`):**
- Navegar desde el carrito al checkout
- Validar que la dirección del usuario se carga automáticamente
- Agregar comentarios en la orden
- Validar que todos los datos se muestran correctamente

### Pruebas de API

**Login API (`login.api.spec.js`):**
- Login exitoso (código 200)
- Login con password inválido (código 404)
- Validar estructura de las respuestas

**Crear Cuenta (`createAccount.api.spec.js`):**
- Crear nuevas cuentas de usuario
- Validar que se crean correctamente

**Productos (`products.api.spec.js`):**
- Obtener lista de productos
- Obtener detalles de un producto específico
- Validar estructura de datos

**Casos Especiales (`edgeCases.api.spec.js`):**
- Probar escenarios límite y casos especiales
- Validar manejo de errores

### Pruebas de Integración

**Validación Cruzada (`crossValidation.spec.js`):**
- Comparar datos entre UI y API
- Asegurar consistencia entre lo que muestra la interfaz y lo que devuelve la API

Ver los reportes

Después de ejecutar las pruebas, puedes ver un reporte visual con:

```bash
npm run test:report
```

o

```bash
npx playwright show-report
```

El reporte incluye:
- Qué pruebas pasaron y cuáles fallaron
- Screenshots cuando algo falla
- Videos de las pruebas que fallaron
- Trazas de lo que pasó paso a paso

Problemas comunes y cómo solucionarlos

**Error: "No se encuentran los navegadores"**
```bash
npx playwright install
```

**Error: "No se encuentra el archivo de tests"**
Verifica que estés en la carpeta correcta del proyecto. Deberías ver una carpeta llamada `tests`.

**Error: "Variables o datos faltantes"**
Revisa los archivos en `utils/config.js` y `utils/testData.js`. Ahí están las credenciales y configuraciones.

**Las pruebas fallan porque el sitio está lento**
El sitio de Automation Exercise a veces está bajo carga pesada. Los timeouts están configurados para esperar un poco más, pero si sigue fallando, puedes aumentar los tiempos en `playwright.config.js`.

**Error: "Target page has been closed"**
Este error puede pasar cuando navegas muy rápido entre páginas. Ya lo corregí en los tests del carrito, pero si aparece en otros lugares, asegúrate de esperar a que la página cargue completamente antes de hacer verificaciones.

Sobre mí

**Sara Rojas**  
QA Analyst | QA Manual & Automation



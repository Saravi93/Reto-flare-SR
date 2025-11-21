# Proyecto de Automatización QA - Automation Exercise

Este proyecto contiene la automatización completa de pruebas UI y API para el sitio [Automation Exercise](https://automationexercise.com/), desarrollado como parte de una prueba de validación técnica QA.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución de Tests](#ejecución-de-tests)
- [Documentación Teórica](#documentación-teórica)
- [Arquitectura](#arquitectura)
- [Casos de Prueba](#casos-de-prueba)

## 🎯 Descripción

Este proyecto implementa una suite completa de automatización de pruebas que cubre:

- **Pruebas UI**: Login, Carrito, Checkout, Logout
- **Pruebas API**: Autenticación, Productos, Creación de Cuenta, Casos Edge
- **Pruebas de Integración**: Validación cruzada UI + API
- **Data-Driven Testing**: Tests parametrizados con datos externos

Además, incluye documentación teórica completa sobre estrategia de pruebas, casos de prueba y propuesta de automatización.

## 🛠 Tecnologías

- **Playwright**: Framework de automatización UI
- **JavaScript/Node.js**: Lenguaje de programación
- **Axios**: Cliente HTTP para pruebas API
- **Jest/Playwright Test**: Test runner
- **Page Object Model**: Patrón de diseño para mantenibilidad

## 📁 Estructura del Proyecto

```
prueba-qa/
├── README.md                          # Este archivo
├── package.json                       # Dependencias y scripts
├── playwright.config.js               # Configuración de Playwright
├── .gitignore                         # Archivos a ignorar
│
├── docs/                              # Documentación teórica
│   ├── 01-estrategia-pruebas.md      # Estrategia general de pruebas
│   ├── 02-casos-prueba.md            # Casos de prueba representativos
│   └── 03-propuesta-automatizacion.md # Propuesta de automatización
│
├── tests/                             # Tests de automatización
│   ├── ui/                           # Tests de interfaz de usuario
│   │   ├── login.spec.js
│   │   ├── login-data-driven.spec.js
│   │   ├── cart.spec.js
│   │   ├── checkout.spec.js
│   │   └── logout.spec.js
│   ├── api/                          # Tests de API
│   │   ├── login.api.spec.js
│   │   ├── products.api.spec.js
│   │   ├── createAccount.api.spec.js
│   │   └── edgeCases.api.spec.js
│   └── integration/                  # Tests de integración
│       └── crossValidation.spec.js
│
├── pages/                            # Page Object Model
│   ├── LoginPage.js
│   ├── HomePage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── api/                              # Servicios API
│   ├── auth.api.js
│   ├── products.api.js
│   └── user.api.js
│
├── utils/                            # Utilidades
│   ├── testData.js                   # Datos de prueba
│   ├── helpers.js                    # Funciones auxiliares
│   └── config.js                     # Configuración
│
├── data/                             # Datos externos
│   └── loginTestData.json            # Datos para data-driven testing
│
└── reports/                          # Reportes generados (gitignored)
    ├── playwright-report/
    └── test-results/
```

## 🚀 Instalación

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar o descargar el proyecto**

```bash
cd prueba-qa
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Instalar navegadores de Playwright**

```bash
npx playwright install
```

O instalar navegadores específicos:

```bash
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

## ⚙️ Configuración

### Variables de Configuración

El archivo `utils/config.js` contiene la configuración centralizada:

- **baseURL**: URL base de la aplicación (https://automationexercise.com)
- **apiBaseURL**: URL base de la API
- **timeouts**: Timeouts para navegación, elementos y API
- **testUsers**: Credenciales de prueba

### Personalizar Configuración

Puedes modificar `utils/config.js` para ajustar:
- URLs de diferentes ambientes
- Timeouts según necesidades
- Credenciales de prueba

## 🧪 Ejecución de Tests

### Ejecutar Todos los Tests

```bash
npm test
```

### Ejecutar Tests UI

```bash
npm run test:ui
```

### Ejecutar Tests API

```bash
npm run test:api
```

### Ejecutar Tests de Integración

```bash
npm run test:integration
```

### Ejecutar Tests Específicos

```bash
# Tests de login UI
npm run test:ui:login

# Tests de carrito UI
npm run test:ui:cart

# Tests de checkout UI
npm run test:ui:checkout

# Tests de logout UI
npm run test:ui:logout
```

### Ejecutar en Modo Headed (con navegador visible)

```bash
npm run test:headed
```

### Ejecutar en Modo Debug

```bash
npm run test:debug
```

### Ver Reportes

```bash
npm run test:report
```

Esto abrirá el reporte HTML en el navegador.

### Ejecutar Tests en Navegadores Específicos

```bash
# Solo Chromium
npx playwright test --project=chromium

# Solo Firefox
npx playwright test --project=firefox

# Solo WebKit
npx playwright test --project=webkit
```

## 📚 Documentación Teórica

La documentación teórica completa se encuentra en la carpeta `docs/`:

1. **Estrategia de Pruebas** (`docs/01-estrategia-pruebas.md`)
   - Tipos de pruebas
   - Metodología
   - Estructura de ambientes
   - Validaciones pre-merge
   - Manejo de evidencias y reportes

2. **Casos de Prueba** (`docs/02-casos-prueba.md`)
   - Casos de prueba representativos
   - Estructura de casos
   - Priorización
   - Matriz de trazabilidad

3. **Propuesta de Automatización** (`docs/03-propuesta-automatizacion.md`)
   - Herramientas y frameworks
   - Arquitectura
   - Estrategia de ejecución
   - Métricas de éxito

## 🏗 Arquitectura

### Page Object Model (POM)

Cada página tiene su propia clase que encapsula:
- Selectores de elementos
- Métodos de interacción
- Validaciones específicas

**Ejemplo:**
```javascript
const loginPage = new LoginPage(page);
await loginPage.navigate();
await loginPage.login('email@example.com', 'password');
```

### Servicios API

Los servicios API encapsulan las llamadas HTTP:
- Manejo de requests/responses
- Manejo de errores
- Configuración de headers

**Ejemplo:**
```javascript
const response = await authAPI.login('email@example.com', 'password');
expect(response.status).toBe(200);
```

### Utilidades

Funciones reutilizables para:
- Generación de datos de prueba
- Validaciones comunes
- Helpers de formateo

## 📝 Casos de Prueba

### Tests UI

#### Login (`tests/ui/login.spec.js`)
- ✅ Login exitoso
- ✅ Login fallido por contraseña incorrecta
- ✅ Login fallido por usuario inexistente
- ✅ Validación de mensajes de error

#### Login Data-Driven (`tests/ui/login-data-driven.spec.js`)
- ✅ Múltiples combinaciones de login inválido
- ✅ Validación de formatos de email
- ✅ Campos vacíos

#### Carrito (`tests/ui/cart.spec.js`)
- ✅ Agregar producto al carrito
- ✅ Validar modal de confirmación
- ✅ Verificar nombre, cantidad y precio
- ✅ Actualizar cantidad
- ✅ Eliminar producto
- ✅ Validar carrito vacío

#### Checkout (`tests/ui/checkout.spec.js`)
- ✅ Proceder al checkout
- ✅ Validar dirección cargada
- ✅ Añadir comentario
- ✅ Place Order (sin pago real)
- ✅ Validar mensaje final

#### Logout (`tests/ui/logout.spec.js`)
- ✅ Clic en Logout
- ✅ Validar redirección a Login
- ✅ Validar acceso bloqueado sin sesión

### Tests API

#### Login API (`tests/api/login.api.spec.js`)
- ✅ Login exitoso (200)
- ✅ Login con password inválido (404)
- ✅ Login con email inexistente (404)
- ✅ Validar estructura JSON

#### Productos API (`tests/api/products.api.spec.js`)
- ✅ Endpoint responde 200
- ✅ Validar existencia de productos
- ✅ Verificar estructura (id, name, price)
- ✅ Validar IDs no duplicados

#### Crear Cuenta API (`tests/api/createAccount.api.spec.js`)
- ✅ Creación exitosa con email nuevo
- ✅ Intento con email existente (debe fallar)
- ✅ Validar campos requeridos

#### Casos Edge API (`tests/api/edgeCases.api.spec.js`)
- ✅ Parámetros vacíos
- ✅ Parámetros incorrectos
- ✅ Sin headers requeridos
- ✅ Validar estructura de errores
- ✅ Validar tiempos de respuesta
- ✅ Caracteres especiales
- ✅ Límites de longitud
- ✅ Métodos HTTP incorrectos

### Tests de Integración

#### Validación Cruzada (`tests/integration/crossValidation.spec.js`)
- ✅ Login por UI y validar con API
- ✅ Consistencia de datos entre UI y API
- ✅ Validar que datos mostrados coinciden

## 🔧 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm test` | Ejecuta todos los tests |
| `npm run test:ui` | Ejecuta solo tests UI |
| `npm run test:api` | Ejecuta solo tests API |
| `npm run test:integration` | Ejecuta tests de integración |
| `npm run test:headed` | Ejecuta tests con navegador visible |
| `npm run test:debug` | Ejecuta tests en modo debug |
| `npm run test:report` | Abre reporte HTML de resultados |

## 📊 Reportes

Los reportes se generan automáticamente después de cada ejecución:

- **HTML Report**: `playwright-report/index.html`
- **JSON Report**: `test-results/results.json`
- **Screenshots**: Capturados automáticamente en fallos
- **Videos**: Grabados automáticamente en fallos (si está configurado)

Para ver el reporte HTML:

```bash
npm run test:report
```

## 🐛 Troubleshooting

### Problemas Comunes

1. **Error: "Browser not found"**
   ```bash
   npx playwright install
   ```

2. **Tests fallan por timeouts**
   - Aumentar timeouts en `playwright.config.js`
   - Verificar conexión a internet
   - Verificar que el sitio está accesible

3. **Error de módulos no encontrados**
   ```bash
   npm install
   ```

4. **Tests flaky (inestables)**
   - Revisar selectores en Page Objects
   - Aumentar timeouts de espera
   - Verificar condiciones de carrera

## 📖 Buenas Prácticas Implementadas

- ✅ **Page Object Model**: Separación de lógica de UI y tests
- ✅ **Servicios API**: Centralización de llamadas API
- ✅ **Data-Driven Testing**: Separación de datos y código
- ✅ **Utilidades Reutilizables**: Código DRY
- ✅ **Configuración Centralizada**: Fácil mantenimiento
- ✅ **Reportes Automáticos**: Evidencias de ejecución
- ✅ **Documentación Completa**: Fácil onboarding

## 🤝 Contribuciones

Este proyecto fue desarrollado como parte de una prueba técnica. Para mejoras o sugerencias:

1. Revisar la estructura existente
2. Seguir los patrones establecidos
3. Mantener documentación actualizada
4. Agregar tests para nuevas funcionalidades

## 📄 Licencia

Este proyecto es de uso educativo y para demostración de habilidades QA.

## 👤 Autor

Desarrollado como parte de prueba de validación técnica QA.

---

**Nota**: Este proyecto está configurado para trabajar con el sitio [Automation Exercise](https://automationexercise.com/), que es un sitio web de e-commerce libre de producción diseñado específicamente para testing.


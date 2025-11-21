# Casos de Prueba Representativos

## Estructura de Casos de Prueba

Cada caso de prueba sigue esta estructura:
- **ID**: Identificador único
- **Título**: Descripción concisa
- **Prioridad**: Crítica / Alta / Media / Baja
- **Tipo**: Funcional / Integración / Regresión / Smoke
- **Precondiciones**: Estado inicial requerido
- **Pasos**: Secuencia de acciones
- **Resultado Esperado**: Comportamiento validado
- **Datos de Prueba**: Valores específicos

---

## Módulo: Autenticación

### TC-AUTH-001: Login Exitoso
- **ID**: TC-AUTH-001
- **Título**: Validar login exitoso con credenciales válidas
- **Prioridad**: Crítica
- **Tipo**: Funcional / Smoke
- **Precondiciones**: 
  - Usuario registrado en el sistema
  - Acceso a la aplicación web
- **Pasos**:
  1. Navegar a la página de Login
  2. Ingresar email válido
  3. Ingresar contraseña válida
  4. Hacer clic en botón "Login"
- **Resultado Esperado**:
  - Usuario es autenticado exitosamente
  - Mensaje de bienvenida visible: "Logged in as {user name}"
  - Opciones de menú de usuario autenticado disponibles
- **Datos de Prueba**: 
  - Email válido registrado
  - Password válida

### TC-AUTH-002: Login Fallido - Contraseña Incorrecta
- **ID**: TC-AUTH-002
- **Título**: Validar mensaje de error con contraseña incorrecta
- **Prioridad**: Alta
- **Tipo**: Funcional
- **Precondiciones**: Usuario registrado en el sistema
- **Pasos**:
  1. Navegar a la página de Login
  2. Ingresar email válido
  3. Ingresar contraseña incorrecta
  4. Hacer clic en botón "Login"
- **Resultado Esperado**:
  - Login falla
  - Mensaje de error visible: "Your email or password is incorrect!"
  - Usuario permanece en página de login
- **Datos de Prueba**: 
  - Email válido
  - Password incorrecta

### TC-AUTH-003: Login Fallido - Usuario Inexistente
- **ID**: TC-AUTH-003
- **Título**: Validar mensaje de error con usuario inexistente
- **Prioridad**: Alta
- **Tipo**: Funcional
- **Precondiciones**: Ninguna
- **Pasos**:
  1. Navegar a la página de Login
  2. Ingresar email inexistente
  3. Ingresar cualquier contraseña
  4. Hacer clic en botón "Login"
- **Resultado Esperado**:
  - Login falla
  - Mensaje de error visible: "Your email or password is incorrect!"
  - Usuario permanece en página de login
- **Datos de Prueba**: 
  - Email inexistente
  - Password cualquiera

### TC-AUTH-004: Validación de Campos Vacíos
- **ID**: TC-AUTH-004
- **Título**: Validar comportamiento con campos vacíos
- **Prioridad**: Media
- **Tipo**: Funcional
- **Precondiciones**: Ninguna
- **Pasos**:
  1. Navegar a la página de Login
  2. Dejar campos email y password vacíos
  3. Hacer clic en botón "Login"
- **Resultado Esperado**:
  - Validación de campos requeridos activada
  - Mensajes de validación HTML5 visibles
  - Login no se procesa
- **Datos de Prueba**: Campos vacíos

---

## Módulo: Carrito de Compras

### TC-CART-001: Agregar Producto al Carrito
- **ID**: TC-CART-001
- **Título**: Validar agregar producto al carrito desde la página principal
- **Prioridad**: Crítica
- **Tipo**: Funcional / Smoke
- **Precondiciones**: Usuario autenticado
- **Pasos**:
  1. Navegar a la página principal
  2. Hacer clic en "Add to cart" de un producto
  3. Verificar modal de confirmación
- **Resultado Esperado**:
  - Modal de confirmación aparece
  - Producto se agrega al carrito
  - Opciones "View Cart" y "Continue Shopping" disponibles
- **Datos de Prueba**: Producto disponible en catálogo

### TC-CART-002: Validar Modal de Confirmación
- **ID**: TC-CART-002
- **Título**: Validar que el modal de confirmación muestra información correcta
- **Prioridad**: Alta
- **Tipo**: Funcional
- **Precondiciones**: Usuario autenticado
- **Pasos**:
  1. Agregar producto al carrito
  2. Verificar contenido del modal
- **Resultado Esperado**:
  - Modal muestra mensaje de confirmación
  - Contiene enlaces para ver carrito o continuar comprando
- **Datos de Prueba**: Producto agregado

### TC-CART-003: Verificar Información del Carrito
- **ID**: TC-CART-003
- **Título**: Validar que el carrito muestra nombre, cantidad y precio correctos
- **Prioridad**: Crítica
- **Tipo**: Funcional
- **Precondiciones**: Usuario autenticado, producto en carrito
- **Pasos**:
  1. Agregar producto al carrito
  2. Navegar al carrito
  3. Verificar información mostrada
- **Resultado Esperado**:
  - Nombre del producto es correcto
  - Cantidad es correcta (por defecto 1)
  - Precio es correcto
  - Total calculado correctamente
- **Datos de Prueba**: Producto con precio conocido

### TC-CART-004: Actualizar Cantidad en el Carrito
- **ID**: TC-CART-004
- **Título**: Validar actualización de cantidad de productos en el carrito
- **Prioridad**: Alta
- **Tipo**: Funcional
- **Precondiciones**: Usuario autenticado, producto en carrito
- **Pasos**:
  1. Navegar al carrito
  2. Actualizar cantidad de un producto
  3. Verificar que se actualiza correctamente
- **Resultado Esperado**:
  - Cantidad se actualiza (si el sitio lo permite)
  - Total se recalcula correctamente
- **Datos de Prueba**: Cantidad inicial y nueva cantidad

### TC-CART-005: Eliminar Producto del Carrito
- **ID**: TC-CART-005
- **Título**: Validar eliminación de productos del carrito
- **Prioridad**: Alta
- **Tipo**: Funcional
- **Precondiciones**: Usuario autenticado, productos en carrito
- **Pasos**:
  1. Navegar al carrito
  2. Eliminar un producto
  3. Verificar que se elimina correctamente
- **Resultado Esperado**:
  - Producto se elimina del carrito
  - Carrito se actualiza mostrando menos productos
- **Datos de Prueba**: Producto en carrito

### TC-CART-006: Validar Carrito Vacío
- **ID**: TC-CART-006
- **Título**: Validar comportamiento cuando el carrito está vacío
- **Prioridad**: Media
- **Tipo**: Funcional
- **Precondiciones**: Usuario autenticado
- **Pasos**:
  1. Eliminar todos los productos del carrito
  2. Verificar estado del carrito
- **Resultado Esperado**:
  - Mensaje indicando que el carrito está vacío
  - Opciones para continuar comprando disponibles
- **Datos de Prueba**: Carrito con productos

---

## Módulo: Checkout

### TC-CHECKOUT-001: Navegar al Checkout
- **ID**: TC-CHECKOUT-001
- **Título**: Validar navegación desde carrito al checkout
- **Prioridad**: Crítica
- **Tipo**: Funcional / Smoke
- **Precondiciones**: Usuario autenticado, productos en carrito
- **Pasos**:
  1. Estar en la página del carrito
  2. Hacer clic en "Proceed to Checkout"
- **Resultado Esperado**:
  - Navegación exitosa a página de checkout
  - URL contiene "/checkout"
- **Datos de Prueba**: Carrito con productos

### TC-CHECKOUT-002: Validar Dirección del Usuario
- **ID**: TC-CHECKOUT-002
- **Título**: Validar que la dirección del usuario se carga automáticamente
- **Prioridad**: Crítica
- **Tipo**: Funcional
- **Precondiciones**: Usuario autenticado con dirección registrada
- **Pasos**:
  1. Navegar al checkout
  2. Verificar que la dirección está cargada
- **Resultado Esperado**:
  - Dirección del usuario es visible
  - Información completa y correcta
- **Datos de Prueba**: Usuario con dirección registrada

### TC-CHECKOUT-003: Agregar Comentario a la Orden
- **ID**: TC-CHECKOUT-003
- **Título**: Validar funcionalidad de agregar comentario en el checkout
- **Prioridad**: Media
- **Tipo**: Funcional
- **Precondiciones**: Usuario autenticado, en página de checkout
- **Pasos**:
  1. Navegar al checkout
  2. Agregar comentario en el campo de texto
  3. Verificar que se guarda
- **Resultado Esperado**:
  - Comentario se puede ingresar
  - Comentario se mantiene al navegar
- **Datos de Prueba**: Texto de comentario

### TC-CHECKOUT-004: Proceso de Place Order
- **ID**: TC-CHECKOUT-004
- **Título**: Validar proceso de colocar orden (sin pago real)
- **Prioridad**: Crítica
- **Tipo**: Funcional
- **Precondiciones**: Usuario autenticado, en checkout
- **Pasos**:
  1. Completar información de checkout
  2. Hacer clic en "Place Order"
  3. Verificar navegación
- **Resultado Esperado**:
  - Navegación a página de pago o confirmación
  - Proceso continúa correctamente
- **Datos de Prueba**: Información de checkout completa

### TC-CHECKOUT-005: Validar Mensaje Final
- **ID**: TC-CHECKOUT-005
- **Título**: Validar mensaje o navegación después de completar orden
- **Prioridad**: Alta
- **Tipo**: Funcional
- **Precondiciones**: Usuario autenticado, proceso de checkout iniciado
- **Pasos**:
  1. Completar proceso de checkout
  2. Verificar mensaje final o navegación
- **Resultado Esperado**:
  - Mensaje de éxito visible (si aplica)
  - Navegación correcta
- **Datos de Prueba**: Orden completada

---

## Módulo: Logout

### TC-LOGOUT-001: Cerrar Sesión
- **ID**: TC-LOGOUT-001
- **Título**: Validar funcionalidad de logout
- **Prioridad**: Alta
- **Tipo**: Funcional
- **Precondiciones**: Usuario autenticado
- **Pasos**:
  1. Hacer clic en "Logout"
  2. Verificar redirección
- **Resultado Esperado**:
  - Sesión se cierra correctamente
  - Redirección a página de login
- **Datos de Prueba**: Usuario autenticado

### TC-LOGOUT-002: Validar Redirección después de Logout
- **ID**: TC-LOGOUT-002
- **Título**: Validar que después del logout se redirige correctamente
- **Prioridad**: Alta
- **Tipo**: Funcional
- **Precondiciones**: Usuario autenticado
- **Pasos**:
  1. Hacer clic en "Logout"
  2. Verificar URL y estado
- **Resultado Esperado**:
  - URL contiene "/login"
  - Usuario no está autenticado
- **Datos de Prueba**: Usuario autenticado

### TC-LOGOUT-003: Acceso Restringido después de Logout
- **ID**: TC-LOGOUT-003
- **Título**: Validar que áreas protegidas requieren login después de logout
- **Prioridad**: Media
- **Tipo**: Funcional
- **Precondiciones**: Usuario que hizo logout
- **Pasos**:
  1. Hacer logout
  2. Intentar acceder a área protegida
- **Resultado Esperado**:
  - Acceso bloqueado o redirección a login
  - Mensaje apropiado mostrado
- **Datos de Prueba**: Área protegida (ej: /account)

---

## Módulo: APIs

### TC-API-LOGIN-001: Login Exitoso por API
- **ID**: TC-API-LOGIN-001
- **Título**: Validar login exitoso mediante API
- **Prioridad**: Crítica
- **Tipo**: API
- **Precondiciones**: Usuario registrado
- **Pasos**:
  1. Llamar a API de login con credenciales válidas
  2. Verificar respuesta
- **Resultado Esperado**:
  - Status code 200
  - Respuesta contiene datos de usuario
- **Datos de Prueba**: Credenciales válidas

### TC-API-PRODUCTS-001: Obtener Lista de Productos
- **ID**: TC-API-PRODUCTS-001
- **Título**: Validar obtención de lista de productos por API
- **Prioridad**: Crítica
- **Tipo**: API
- **Precondiciones**: Ninguna
- **Pasos**:
  1. Llamar a API de productos
  2. Verificar respuesta
- **Resultado Esperado**:
  - Status code 200
  - Array de productos con estructura válida
- **Datos de Prueba**: Endpoint de productos

---

## Módulo: Validación de Resultados

### TC-VALIDATE-001: Validación Cruzada UI-API
- **ID**: TC-VALIDATE-001
- **Título**: Validar que los datos mostrados en UI coinciden con API
- **Prioridad**: Crítica
- **Tipo**: Integración
- **Precondiciones**: Usuario autenticado
- **Pasos**:
  1. Realizar login por UI
  2. Capturar nombre de usuario mostrado en UI
  3. Llamar a API `/getUserDetailByEmail` con email del usuario
  4. Comparar datos
- **Resultado Esperado**:
  - Nombre de usuario en UI coincide con respuesta de API
  - Datos son consistentes entre frontend y backend
- **Datos de Prueba**: Usuario autenticado

---

## Matriz de Trazabilidad

| Requisito | Casos de Prueba | Prioridad | Estado |
|-----------|----------------|-----------|--------|
| RQ-001: Autenticación de usuarios | TC-AUTH-001, TC-AUTH-002, TC-AUTH-003, TC-AUTH-004 | Crítica | ✅ |
| RQ-002: Gestión de carrito | TC-CART-001, TC-CART-002, TC-CART-003, TC-CART-004, TC-CART-005, TC-CART-006 | Crítica | ✅ |
| RQ-003: Proceso de checkout | TC-CHECKOUT-001, TC-CHECKOUT-002, TC-CHECKOUT-003, TC-CHECKOUT-004, TC-CHECKOUT-005 | Crítica | ✅ |
| RQ-004: Logout | TC-LOGOUT-001, TC-LOGOUT-002, TC-LOGOUT-003 | Alta | ✅ |
| RQ-005: APIs de productos | TC-API-PRODUCTS-001 | Crítica | ✅ |
| RQ-006: Validación de datos | TC-VALIDATE-001 | Crítica | ✅ |

---

## Priorización de Ejecución

### Smoke Tests (Pre-Merge)
- TC-AUTH-001: Login Exitoso
- TC-CART-001: Agregar Producto al Carrito
- TC-CHECKOUT-001: Navegar al Checkout
- TC-VALIDATE-001: Validación Cruzada UI-API

### Suite Completa (Staging)
- Todos los casos de prioridad Crítica y Alta
- Casos de Integración
- Casos de Regresión

### Suite Extendida (Pre-Producción)
- Todos los casos de prueba
- Validaciones de performance
- Casos edge adicionales

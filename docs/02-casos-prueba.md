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
  2. Ingresar email válido: `test@example.com`
  3. Ingresar contraseña válida: `password123`
  4. Hacer clic en botón "Login"
- **Resultado Esperado**:
  - Usuario es autenticado exitosamente
  - Redirección a dashboard de métricas
  - Mensaje de bienvenida visible: "Logged in as {user name}"
  - Opciones de menú de usuario autenticado disponibles
- **Datos de Prueba**: 
  - Email: `test@example.com`
  - Password: `password123`

### TC-AUTH-002: Login Fallido - Contraseña Incorrecta
- **ID**: TC-AUTH-002
- **Título**: Validar mensaje de error con contraseña incorrecta
- **Prioridad**: Alta
- **Tipo**: Funcional
- **Precondiciones**: Usuario registrado en el sistema
- **Pasos**:
  1. Navegar a la página de Login
  2. Ingresar email válido: `test@example.com`
  3. Ingresar contraseña incorrecta: `wrongpassword`
  4. Hacer clic en botón "Login"
- **Resultado Esperado**:
  - Login falla
  - Mensaje de error visible: "Your email or password is incorrect!"
  - Usuario permanece en página de login
  - Campos de entrada mantienen valores ingresados
- **Datos de Prueba**: 
  - Email: `test@example.com`
  - Password: `wrongpassword`

### TC-AUTH-003: Login Fallido - Usuario Inexistente
- **ID**: TC-AUTH-003
- **Título**: Validar mensaje de error con usuario inexistente
- **Prioridad**: Alta
- **Tipo**: Funcional
- **Precondiciones**: Ninguna
- **Pasos**:
  1. Navegar a la página de Login
  2. Ingresar email inexistente: `nonexistent@example.com`
  3. Ingresar cualquier contraseña: `password123`
  4. Hacer clic en botón "Login"
- **Resultado Esperado**:
  - Login falla
  - Mensaje de error visible: "Your email or password is incorrect!"
  - Usuario permanece en página de login
- **Datos de Prueba**: 
  - Email: `nonexistent@example.com`
  - Password: `password123`

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

## Módulo: Carga de Métricas

### TC-METRICS-001: Carga Exitosa de Métricas
- **ID**: TC-METRICS-001
- **Título**: Validar carga correcta de métricas después de login
- **Prioridad**: Crítica
- **Tipo**: Funcional / Smoke
- **Precondiciones**: Usuario autenticado
- **Pasos**:
  1. Realizar login exitoso
  2. Esperar carga de dashboard
  3. Verificar visualización de métricas
- **Resultado Esperado**:
  - Dashboard carga en < 3 segundos
  - Métricas visibles y formateadas correctamente
  - Gráficos/tablas renderizados
  - Sin errores en consola
- **Datos de Prueba**: Usuario con métricas asociadas

### TC-METRICS-002: Carga con Usuario Sin Métricas
- **ID**: TC-METRICS-002
- **Título**: Validar comportamiento cuando usuario no tiene métricas
- **Prioridad**: Media
- **Tipo**: Funcional
- **Precondiciones**: Usuario autenticado sin métricas asociadas
- **Pasos**:
  1. Realizar login exitoso
  2. Esperar carga de dashboard
- **Resultado Esperado**:
  - Dashboard carga correctamente
  - Mensaje informativo: "No hay métricas disponibles"
  - UI no muestra errores
- **Datos de Prueba**: Usuario nuevo sin datos

---

## Módulo: Filtrado

### TC-FILTER-001: Filtro por Fecha - Rango Válido
- **ID**: TC-FILTER-001
- **Título**: Validar filtrado de métricas por rango de fechas
- **Prioridad**: Crítica
- **Tipo**: Funcional / Smoke
- **Precondiciones**: 
  - Usuario autenticado
  - Métricas cargadas
- **Pasos**:
  1. Seleccionar fecha inicial: `01/01/2024`
  2. Seleccionar fecha final: `31/01/2024`
  3. Aplicar filtro
  4. Verificar resultados
- **Resultado Esperado**:
  - Métricas filtradas correctamente
  - Solo se muestran métricas del rango seleccionado
  - Contador de resultados actualizado
  - Tiempo de respuesta < 2 segundos
- **Datos de Prueba**: 
  - Fecha inicio: `01/01/2024`
  - Fecha fin: `31/01/2024`

### TC-FILTER-002: Filtro por Categoría
- **ID**: TC-FILTER-002
- **Título**: Validar filtrado de métricas por categoría
- **Prioridad**: Alta
- **Tipo**: Funcional
- **Precondiciones**: 
  - Usuario autenticado
  - Métricas cargadas con múltiples categorías
- **Pasos**:
  1. Seleccionar categoría del dropdown: `Marketing`
  2. Aplicar filtro
  3. Verificar resultados
- **Resultado Esperado**:
  - Solo se muestran métricas de la categoría seleccionada
  - Dropdown muestra categoría seleccionada
  - Contador actualizado
- **Datos de Prueba**: Categoría: `Marketing`

### TC-FILTER-003: Filtro Combinado - Fecha y Categoría
- **ID**: TC-FILTER-003
- **Título**: Validar filtrado combinado de fecha y categoría
- **Prioridad**: Alta
- **Tipo**: Funcional
- **Precondiciones**: 
  - Usuario autenticado
  - Métricas cargadas
- **Pasos**:
  1. Seleccionar fecha inicial: `01/01/2024`
  2. Seleccionar fecha final: `31/01/2024`
  3. Seleccionar categoría: `Marketing`
  4. Aplicar filtro
- **Resultado Esperado**:
  - Métricas filtradas por ambos criterios
  - Resultados cumplen ambas condiciones
  - Filtros activos visibles en UI
- **Datos de Prueba**: 
  - Fechas: `01/01/2024` - `31/01/2024`
  - Categoría: `Marketing`

### TC-FILTER-004: Limpiar Filtros
- **ID**: TC-FILTER-004
- **Título**: Validar funcionalidad de limpiar filtros aplicados
- **Prioridad**: Media
- **Tipo**: Funcional
- **Precondiciones**: Filtros aplicados
- **Pasos**:
  1. Tener filtros aplicados (fecha y/o categoría)
  2. Hacer clic en botón "Limpiar Filtros"
- **Resultado Esperado**:
  - Todos los filtros se resetean
  - Se muestran todas las métricas sin filtrar
  - Campos de filtro vuelven a valores por defecto
- **Datos de Prueba**: Filtros activos

---

## Módulo: Exportación de Reportes

### TC-EXPORT-001: Exportar Reporte en PDF
- **ID**: TC-EXPORT-001
- **Título**: Validar exportación de reporte en formato PDF
- **Prioridad**: Alta
- **Tipo**: Funcional
- **Precondiciones**: 
  - Usuario autenticado
  - Métricas cargadas (filtradas o no)
- **Pasos**:
  1. Cargar métricas (opcional: aplicar filtros)
  2. Hacer clic en botón "Exportar PDF"
  3. Verificar descarga
- **Resultado Esperado**:
  - Archivo PDF se descarga correctamente
  - Nombre de archivo incluye timestamp
  - Contenido del PDF coincide con métricas mostradas
  - Formato del PDF es legible y profesional
- **Datos de Prueba**: Métricas actuales del dashboard

### TC-EXPORT-002: Exportar Reporte en Excel
- **ID**: TC-EXPORT-002
- **Título**: Validar exportación de reporte en formato Excel
- **Prioridad**: Alta
- **Tipo**: Funcional
- **Precondiciones**: 
  - Usuario autenticado
  - Métricas cargadas
- **Pasos**:
  1. Cargar métricas
  2. Hacer clic en botón "Exportar Excel"
  3. Verificar descarga
- **Resultado Esperado**:
  - Archivo Excel (.xlsx) se descarga
  - Datos exportados son correctos y completos
  - Formato de columnas es adecuado
- **Datos de Prueba**: Métricas actuales

---

## Módulo: Validación de Resultados

### TC-VALIDATE-001: Validación de Datos Mostrados
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

### TC-VALIDATE-002: Validación de Métricas Filtradas
- **ID**: TC-VALIDATE-002
- **Título**: Validar que filtros aplicados se reflejan correctamente en datos
- **Prioridad**: Alta
- **Tipo**: Integración
- **Precondiciones**: Usuario autenticado
- **Pasos**:
  1. Aplicar filtro por fecha: `01/01/2024` - `31/01/2024`
  2. Capturar métricas mostradas en UI
  3. Llamar a API de métricas con mismos filtros
  4. Comparar resultados
- **Resultado Esperado**:
  - Métricas en UI coinciden con respuesta de API
  - Filtros se aplican correctamente en backend
- **Datos de Prueba**: 
  - Fechas: `01/01/2024` - `31/01/2024`

---

## Matriz de Trazabilidad

| Requisito | Casos de Prueba | Prioridad | Estado |
|-----------|----------------|-----------|--------|
| RQ-001: Autenticación de usuarios | TC-AUTH-001, TC-AUTH-002, TC-AUTH-003 | Crítica | ✅ |
| RQ-002: Carga de métricas | TC-METRICS-001, TC-METRICS-002 | Crítica | ✅ |
| RQ-003: Filtrado por fecha | TC-FILTER-001, TC-FILTER-003 | Crítica | ✅ |
| RQ-004: Filtrado por categoría | TC-FILTER-002, TC-FILTER-003 | Alta | ✅ |
| RQ-005: Exportación de reportes | TC-EXPORT-001, TC-EXPORT-002 | Alta | ✅ |
| RQ-006: Validación de datos | TC-VALIDATE-001, TC-VALIDATE-002 | Crítica | ✅ |

---

## Priorización de Ejecución

### Smoke Tests (Pre-Merge)
- TC-AUTH-001: Login Exitoso
- TC-METRICS-001: Carga Exitosa de Métricas
- TC-FILTER-001: Filtro por Fecha
- TC-VALIDATE-001: Validación de Datos

### Suite Completa (Staging)
- Todos los casos de prioridad Crítica y Alta
- Casos de Integración
- Casos de Regresión

### Suite Extendida (Pre-Producción)
- Todos los casos de prueba
- Validaciones de performance
- Casos edge adicionales


# Estrategia General de Pruebas

## Contexto del Proyecto

El sitio Automation Exercise es una plataforma de e-commerce que permite a usuarios autenticados:
- Navegar y buscar productos
- Agregar productos al carrito de compras
- Gestionar el carrito (actualizar cantidades, eliminar productos)
- Completar el proceso de checkout
- Gestionar su cuenta de usuario

El objetivo es validar el flujo completo: **Login → Navegación de Productos → Agregar al Carrito → Checkout → Validación de Datos** antes del merge a develop.

---

## Tipos de Pruebas

### 1. Pruebas Funcionales
**Objetivo**: Validar que cada funcionalidad cumple con los requisitos especificados.

**Alcance**:
- Autenticación (login/logout)
- Navegación y visualización de productos
- Gestión del carrito de compras
- Proceso de checkout
- Validación de permisos y acceso

**Metodología**: Casos de prueba basados en escenarios de usuario, cubriendo flujos happy path y casos negativos.

### 2. Pruebas de Integración
**Objetivo**: Validar la comunicación entre componentes (frontend-backend, servicios, APIs).

**Alcance**:
- Integración UI-API (validación cruzada de datos)
- Consistencia entre datos mostrados en UI y respuestas de API
- Sincronización de estados entre componentes

**Metodología**: Tests end-to-end que validan flujos completos cruzando múltiples capas.

### 3. Pruebas de Regresión
**Objetivo**: Asegurar que nuevas funcionalidades no rompen funcionalidades existentes.

**Alcance**:
- Smoke tests del flujo crítico completo
- Suite de regresión para funcionalidades core
- Validación de compatibilidad con versiones anteriores

**Metodología**: Ejecución automatizada de suite completa en cada release.

### 4. Smoke Tests
**Objetivo**: Validación rápida de que el sistema está operativo y el flujo crítico funciona.

**Alcance**:
- Login exitoso
- Agregar producto al carrito
- Navegar al checkout
- Verificación de datos mostrados

**Metodología**: Subconjunto mínimo de tests críticos, ejecutados pre-merge.

---

## Metodología de Redacción de Casos de Prueba

### Enfoque: BDD (Behavior-Driven Development)

Utilizamos un enfoque basado en escenarios que describe el comportamiento esperado:

```
Given [precondición]
When [acción del usuario]
Then [resultado esperado]
```

### Estructura de Casos de Prueba

Cada caso incluye:
- **ID único**: Identificador alfanumérico
- **Título**: Descripción concisa del caso
- **Prioridad**: Crítica / Alta / Media / Baja
- **Precondiciones**: Estado inicial requerido
- **Pasos**: Secuencia de acciones
- **Resultado esperado**: Comportamiento validado
- **Datos de prueba**: Valores específicos a usar

### Priorización

1. **Crítica**: Flujos core que bloquean funcionalidad principal (login, agregar al carrito, checkout)
2. **Alta**: Funcionalidades importantes para el negocio (gestión de carrito, validación de datos)
3. **Media**: Mejoras de UX y validaciones adicionales
4. **Baja**: Casos edge y mejoras menores

---

## Estructura de Ambientes de Prueba

### Ambiente de Desarrollo (DEV)
- **Propósito**: Desarrollo y pruebas iniciales
- **Características**: Datos de prueba, cambios frecuentes
- **Uso**: Validación rápida durante desarrollo

### Ambiente de Staging
- **Propósito**: Validación pre-merge y pruebas de integración
- **Características**: Datos similares a producción, estabilidad media
- **Uso**: Ejecución de suite completa antes de merge a develop

### Ambiente de Pre-Producción
- **Propósito**: Validación final antes de release
- **Características**: Datos de producción anonimizados, alta estabilidad
- **Uso**: Smoke tests y validación de performance

### Estrategia de Datos
- **Datos de prueba**: Conjuntos predefinidos y reutilizables
- **Aislamiento**: Cada test debe ser independiente y no depender de otros
- **Limpieza**: Restaurar estado inicial después de cada ejecución

---

## Validaciones Pre-Merge

### Checklist Pre-Merge

1. **Smoke Tests**: Todos los smoke tests deben pasar
2. **Flujo Crítico**: Login → Agregar al Carrito → Checkout → Validación debe funcionar end-to-end
3. **Tests de Regresión**: Suite de regresión completa sin fallos
4. **Validación de Código**: 
   - Cobertura de tests > 70% para código nuevo
   - Sin deuda técnica crítica
5. **Documentación**: Casos de prueba actualizados

### Criterios de Aceptación

- ✅ Todos los tests críticos pasan
- ✅ No hay regresiones introducidas
- ✅ Evidencias documentadas (screenshots, logs)
- ✅ Reporte de pruebas generado y revisado

---

## Manejo de Evidencias, Reportes y Comunicación

### Evidencias

**Capturas de Pantalla**:
- Automáticas en fallos de tests
- Manuales para casos específicos documentados
- Almacenadas en `reports/screenshots/` con timestamp

**Videos**:
- Grabación automática de ejecución de tests (solo en fallos)
- Útiles para debugging de flujos complejos

**Logs**:
- Logs estructurados de ejecución
- Traces de Playwright para debugging
- Logs de API requests/responses

### Reportes

**Reportes Automatizados**:
- **HTML Report**: Generado por Playwright con resumen visual
- **JSON Report**: Para integración con CI/CD
- **Allure Report** (opcional): Reportes avanzados con historial

**Estructura del Reporte**:
- Resumen ejecutivo (total tests, pasados, fallidos)
- Detalle por suite de tests
- Evidencias de fallos (screenshots, videos, logs)
- Métricas de tiempo de ejecución

### Comunicación de Resultados

**Canales**:
- **Slack/Teams**: Notificaciones automáticas de resultados
- **Email**: Resumen diario de ejecuciones
- **Dashboard**: Visualización en tiempo real del estado de tests

**Formato de Notificación**:
```
✅ Suite de Pruebas - [Fecha]
📊 Total: 45 tests
✅ Pasados: 43
❌ Fallidos: 2
⏱️ Tiempo: 12m 34s
📎 Ver reporte completo: [link]
```

**Escalamiento**:
- Fallos críticos: Notificación inmediata al equipo
- Fallos no críticos: Incluidos en resumen diario
- Tendencias: Análisis semanal de estabilidad

---

## Estrategia de Automatización

### Niveles de Automatización

1. **Nivel 1 - Crítico**: Flujos core (login, agregar al carrito, checkout) - 100% automatizado
2. **Nivel 2 - Importante**: Funcionalidades principales - 80% automatizado
3. **Nivel 3 - Complementario**: Casos edge y mejoras - 50% automatizado

### Mantenimiento

- **Revisión semanal**: Actualizar tests obsoletos
- **Refactorización**: Mejorar estabilidad y performance
- **Documentación**: Mantener casos de prueba actualizados

---

## Métricas de Calidad

### KPIs a Monitorear

- **Tasa de éxito de tests**: > 95%
- **Tiempo de ejecución**: < 15 minutos para suite completa
- **Cobertura de código**: > 70%
- **Tiempo de detección de bugs**: < 24 horas

### Retroalimentación Continua

- Análisis de fallos recurrentes
- Identificación de tests flaky
- Optimización de suite de pruebas
- Mejora continua de procesos

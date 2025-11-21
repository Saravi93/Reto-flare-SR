/**
 * Configuración centralizada del proyecto
 */

const config = {
    // URL base de la aplicación
    baseURL: 'https://automationexercise.com',

    // URL base de la API
    apiBaseURL: 'https://automationexercise.com/api',

    // Timeouts
    timeouts: {
        navigation: 30000,
        element: 10000,
        api: 15000,
    },

    // Credenciales de prueba
    testUsers: {
        valid: {
            email: 'viviana.rojas9418@gmail.com',
            password: '1234567890*',
            name: 'Viviana'
        },
        invalid: {
            email: 'invalid@example.com',
            password: 'wrongpassword'
        }
    },

    // Configuración de navegadores
    browsers: ['chromium', 'firefox', 'webkit'],

    // Configuración de reportes
    reports: {
        screenshots: true,
        videos: true,
        traces: true
    }
};

module.exports = config;


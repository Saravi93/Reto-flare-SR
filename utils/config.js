const config = {
    baseURL: 'https://automationexercise.com',
    apiBaseURL: 'https://automationexercise.com/api',
    timeouts: {
        navigation: 30000,
        element: 10000,
        api: 15000,
    },
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
    browsers: ['chromium', 'firefox', 'webkit'],
    reports: {
        screenshots: true,
        videos: true,
        traces: true
    }
};

module.exports = config;


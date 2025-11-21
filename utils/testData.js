/**
 * Datos de prueba centralizados
 */

const testData = {
  // Datos de login
  login: {
    valid: {
      email: 'viviana.rojas9418@gmail.com',
      password: '1234567890*',
      name: 'Viviana'
    },
    invalidPassword: {
      email: 'viviana.rojas9418@gmail.com',
      password: 'wrongpassword'
    },
    invalidUser: {
      email: 'nonexistent@example.com',
      password: 'password123'
    },
    emptyFields: {
      email: '',
      password: ''
    }
  },
  
  // Datos de productos
  products: {
    firstProduct: {
      name: 'Blue Top',
      price: 'Rs. 500'
    }
  },
  
  // Datos de checkout
  checkout: {
    comment: 'This is a test order comment'
  },
  
  // Datos de creación de cuenta
  account: {
    newUser: {
      name: 'New Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123',
      firstName: 'New',
      lastName: 'User',
      company: 'Test Company',
      address1: '123 Test Street',
      address2: 'Apt 4B',
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      zipcode: '90001',
      mobileNumber: '1234567890'
    },
    existingUser: {
      name: 'Existing User',
      email: 'existing@example.com',
      password: 'password123'
    }
  },
  
  // Mensajes esperados
  messages: {
    login: {
      success: 'Logged in as',
      error: 'Your email or password is incorrect!'
    },
    cart: {
      empty: 'Cart is empty!',
      added: 'Product added to cart'
    },
    checkout: {
      success: 'Order Placed!'
    }
  }
};

module.exports = testData;


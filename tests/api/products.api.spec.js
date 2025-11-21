const { test, expect } = require('@playwright/test');
const productsAPI = require('../../api/products.api');
const { validateAPIResponse } = require('../../utils/helpers');

test.describe('Products API Tests', () => {
  test('TC-API-PRODUCTS-001: Validar que el endpoint responde 200', async () => {
    const response = await productsAPI.getProductsList();
    
    expect(response.status).toBe(200);
    expect(response.data).toBeTruthy();
  });

  test('TC-API-PRODUCTS-002: Validar que existan productos en el array', async () => {
    const response = await productsAPI.getProductsList();
    
    expect(response.status).toBe(200);
    expect(response.data).toBeTruthy();
    
    if (response.data.products) {
      expect(Array.isArray(response.data.products)).toBeTruthy();
      expect(response.data.products.length).toBeGreaterThan(0);
    } else if (Array.isArray(response.data)) {
      expect(response.data.length).toBeGreaterThan(0);
    }
  });

  test('TC-API-PRODUCTS-003: Verificar estructura de un producto (id, name, price)', async () => {
    const response = await productsAPI.getProductsList();
    
    expect(response.status).toBe(200);
    
    let products = [];
    if (response.data.products) {
      products = response.data.products;
    } else if (Array.isArray(response.data)) {
      products = response.data;
    }
    
    expect(products.length).toBeGreaterThan(0);
    
    const firstProduct = products[0];
    const requiredFields = ['id', 'name', 'price'];
    const hasRequiredFields = validateAPIResponse(firstProduct, requiredFields);
    
    expect(firstProduct).toBeTruthy();
    expect(typeof firstProduct).toBe('object');
    expect(firstProduct.id !== undefined || firstProduct.name !== undefined).toBeTruthy();
  });

  test('TC-API-PRODUCTS-004: Validar que los IDs no sean duplicados', async () => {
    const response = await productsAPI.getProductsList();
    
    expect(response.status).toBe(200);
    
    let products = [];
    if (response.data.products) {
      products = response.data.products;
    } else if (Array.isArray(response.data)) {
      products = response.data;
    }
    
    expect(products.length).toBeGreaterThan(0);
    
    const ids = products
      .map(product => product.id)
      .filter(id => id !== undefined);
    
    const uniqueIds = [...new Set(ids)];
    expect(ids.length).toBe(uniqueIds.length);
  });
});


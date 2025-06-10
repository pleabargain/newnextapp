import { GET, POST } from '../route';
import { NextRequest } from 'next/server';

describe('API Keys Endpoints', () => {
  describe('GET /api/keys', () => {
    it('should return empty array when no keys exist', async () => {
      const request = new NextRequest('http://localhost:3000/api/keys');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual([]);
    });

    it('should handle server errors gracefully', async () => {
      // Mock a server error
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Database error'));

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBeDefined();
      expect(data.error.code).toBe('FETCH_ERROR');
    });
  });

  describe('POST /api/keys', () => {
    it('should create a new API key', async () => {
      const request = new NextRequest('http://localhost:3000/api/keys', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Test Key',
          description: 'Test Description'
        })
      });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toHaveProperty('id');
      expect(data.name).toBe('Test Key');
      expect(data.description).toBe('Test Description');
    });

    it('should return 400 for invalid input', async () => {
      const request = new NextRequest('http://localhost:3000/api/keys', {
        method: 'POST',
        body: JSON.stringify({
          name: '' // Invalid: empty name
        })
      });
      const response = await POST(request);
      expect(response.status).toBe(400);
    });

    it('should validate required fields', async () => {
      const invalidKeyData = {
        // Missing required 'name' field
        expirationDate: new Date().toISOString(),
      };

      const request = new NextRequest('http://localhost:3000/api/keys', {
        method: 'POST',
        body: JSON.stringify(invalidKeyData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error.code).toBe('VALIDATION_ERROR');
    });

    it('should validate field formats', async () => {
      const invalidKeyData = {
        name: 'Test Key',
        expirationDate: 'invalid-date', // Invalid date format
      };

      const request = new NextRequest('http://localhost:3000/api/keys', {
        method: 'POST',
        body: JSON.stringify(invalidKeyData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error.code).toBe('VALIDATION_ERROR');
    });

    it('should handle server errors gracefully', async () => {
      const validKeyData = {
        name: 'Test Key',
      };

      const request = new NextRequest('http://localhost:3000/api/keys', {
        method: 'POST',
        body: JSON.stringify(validKeyData),
      });

      // Mock a server error
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Database error'));

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error.code).toBe('CREATE_ERROR');
    });
  });
}); 
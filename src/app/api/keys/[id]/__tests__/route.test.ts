import { GET, PUT, DELETE } from '../route';
import { NextRequest } from 'next/server';

describe('API Key by ID Endpoints', () => {
  const testId = 'test123';

  describe('GET /api/keys/[id]', () => {
    it('should return 404 for non-existent key', async () => {
      const request = new NextRequest(`http://localhost:3000/api/keys/${testId}`);
      const response = await GET(request, { params: { id: testId } });
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/keys/[id]', () => {
    it('should return 404 for non-existent key', async () => {
      const request = new NextRequest(`http://localhost:3000/api/keys/${testId}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: 'Updated Key',
          description: 'Updated Description'
        })
      });
      const response = await PUT(request, { params: { id: testId } });
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/keys/[id]', () => {
    it('should return 404 for non-existent key', async () => {
      const request = new NextRequest(`http://localhost:3000/api/keys/${testId}`, {
        method: 'DELETE'
      });
      const response = await DELETE(request, { params: { id: testId } });
      expect(response.status).toBe(404);
    });
  });
}); 
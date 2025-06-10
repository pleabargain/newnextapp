'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
}

export default function DashboardPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  const [editedKeyName, setEditedKeyName] = useState('');

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const response = await fetch('/api/keys');
        if (!response.ok) {
          throw new Error('Failed to fetch API keys');
        }
        const keys = await response.json();
        setApiKeys(keys);
      } catch (error) {
        console.error('Error fetching API keys:', error);
        alert('Failed to fetch API keys. Please try again.');
      }
    };
    fetchApiKeys();
  }, []);

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      alert('API Key Name cannot be empty.');
      return;
    }
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newKeyName }),
      });
      if (!response.ok) {
        throw new Error('Failed to create API key');
      }
      const newKey = await response.json();
      setApiKeys((prevKeys) => [...prevKeys, newKey]);
      setIsCreating(false);
      setNewKeyName('');
    } catch (error) {
      console.error('Error creating API key:', error);
      alert('Failed to create API key. Please try again.');
    }
  };

  const handleEditKey = (key: ApiKey) => {
    setEditingKey(key);
    setEditedKeyName(key.name);
  };

  const handleUpdateKey = async () => {
    if (!editingKey) return;
    if (!editedKeyName.trim()) {
      alert('API Key Name cannot be empty.');
      return;
    }
    try {
      const response = await fetch(`/api/keys/${editingKey.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editedKeyName }),
      });
      if (!response.ok) {
        throw new Error('Failed to update API key');
      }
      const updatedKey = await response.json();
      setApiKeys((prevKeys) =>
        prevKeys.map((key) => (key.id === updatedKey.id ? updatedKey : key))
      );
      setEditingKey(null);
      setEditedKeyName('');
    } catch (error) {
      console.error('Error updating API key:', error);
      alert('Failed to update API key. Please try again.');
    }
  };

  const handleDeleteKey = async (id: string) => {
    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete API key');
      }
      setApiKeys((prevKeys) => prevKeys.filter((key) => key.id !== id));
    } catch (error) {
      console.error('Error deleting API key:', error);
      alert('Failed to delete API key. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">API Keys Management</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create New API Key
        </button>
      </div>

      {isCreating && (
        <div className="mb-8 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-lg font-medium mb-4 text-black">Create New API Key</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Enter API Key Name"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
            />
            <button
              onClick={handleCreateKey}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Generate Key
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {editingKey && (
        <div className="mb-8 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-lg font-medium mb-4 text-black">Edit API Key</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={editedKeyName}
              onChange={(e) => setEditedKeyName(e.target.value)}
              placeholder="Edit API Key Name"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
            />
            <button
              onClick={handleUpdateKey}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditingKey(null)}
              className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {apiKeys.map((key) => (
            <li key={key.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-black">{key.name}</h3>
                  <p className="text-sm text-black">Created: {key.createdAt}</p>
                  <p className="text-sm text-black">Last Used: {key.lastUsed}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditKey(key)}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteKey(key.id)}
                    className="p-2 text-red-400 hover:text-red-500"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
          {apiKeys.length === 0 && (
            <li className="px-6 py-4 text-center text-black">
              No API keys found. Create your first API key to get started.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
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

  const handleCreateKey = async () => {
    // TODO: Implement API call to create new key
    setIsCreating(false);
    setNewKeyName('');
  };

  const handleDeleteKey = async (id: string) => {
    // TODO: Implement API call to delete key
  };

  const handleEditKey = async (id: string) => {
    // TODO: Implement API call to edit key
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">API Keys Management</h1>
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
          <h2 className="text-lg font-medium mb-4">Create New API Key</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Enter API Key Name"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              onClick={handleCreateKey}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Generate Key
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
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
                  <h3 className="text-lg font-medium text-gray-900">{key.name}</h3>
                  <p className="text-sm text-gray-500">Created: {key.createdAt}</p>
                  <p className="text-sm text-gray-500">Last Used: {key.lastUsed}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditKey(key.id)}
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
            <li className="px-6 py-4 text-center text-gray-500">
              No API keys found. Create your first API key to get started.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
} 
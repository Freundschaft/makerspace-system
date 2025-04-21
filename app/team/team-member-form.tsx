'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TeamMember } from './columns';
import { format } from 'date-fns';

interface TeamMemberFormProps {
  initialData?: TeamMember;
  mode: 'create' | 'edit';
}

export function TeamMemberForm({ initialData, mode }: TeamMemberFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<TeamMember>>(
    initialData || {
      status: 'ACTIVE',
      startDate: new Date(),
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/team', {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save team member');
      }

      router.push('/team');
      router.refresh();
    } catch (error) {
      console.error('Error saving team member:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="familyName" className="block text-sm font-medium mb-1">
            Family Name *
          </label>
          <input
            type="text"
            id="familyName"
            name="familyName"
            value={formData.familyName || ''}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="givenNames" className="block text-sm font-medium mb-1">
            Given Names *
          </label>
          <input
            type="text"
            id="givenNames"
            name="givenNames"
            value={formData.givenNames || ''}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="nationality" className="block text-sm font-medium mb-1">
            Nationality *
          </label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={formData.nationality || ''}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="photoPath" className="block text-sm font-medium mb-1">
            Photo URL
          </label>
          <input
            type="text"
            id="photoPath"
            name="photoPath"
            value={formData.photoPath || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status *
          </label>
          <select
            id="status"
            name="status"
            value={formData.status || 'ACTIVE'}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium mb-1">
            Start Date *
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate ? format(new Date(formData.startDate), 'yyyy-MM-dd') : ''}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium mb-1">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate ? format(new Date(formData.endDate), 'yyyy-MM-dd') : ''}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium mb-1">
            Department *
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department || ''}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="homeAddress" className="block text-sm font-medium mb-1">
            Home Address
          </label>
          <input
            type="text"
            id="homeAddress"
            name="homeAddress"
            value={formData.homeAddress || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-1">
            Date of Birth *
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth ? format(new Date(formData.dateOfBirth), 'yyyy-MM-dd') : ''}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="legalStatus" className="block text-sm font-medium mb-1">
            Legal Status *
          </label>
          <input
            type="text"
            id="legalStatus"
            name="legalStatus"
            value={formData.legalStatus || ''}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Saving...' : mode === 'create' ? 'Create' : 'Update'}
        </button>
      </div>
    </form>
  );
} 
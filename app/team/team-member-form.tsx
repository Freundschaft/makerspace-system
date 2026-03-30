'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TeamMember } from './columns';
import { format } from 'date-fns';
import { useI18n } from '@/app/components/I18nProvider';

interface TeamMemberFormProps {
  initialData?: TeamMember;
  mode: 'create' | 'edit';
}

export function TeamMemberForm({ initialData, mode }: TeamMemberFormProps) {
  const router = useRouter();
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<TeamMember>>(
    initialData || {
      status: 'ACTIVE',
      googleAccountActive: true,
      startDate: new Date(),
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'edit' && !initialData?.id) {
        throw new Error(t('team.errors.missingId', 'Missing team member id for edit'));
      }

      const endpoint = mode === 'create' ? '/api/team' : `/api/team/${initialData?.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(t('team.errors.saveFailed', 'Failed to save team member'));
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
    const nextValue =
      e.target instanceof HTMLInputElement && e.target.type === 'checkbox'
        ? e.target.checked
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
  };

  const getPhotoPreviewSrc = (value?: string | null) => {
    if (!value) return null;
    const trimmed = value.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('data:image/')) {
      return trimmed;
    }

    // If only raw base64 is stored, assume PNG for preview rendering.
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      return `data:image/png;base64,${trimmed}`;
    }

    return trimmed;
  };

  const photoPreviewSrc = getPhotoPreviewSrc(formData.photoPath);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="familyName" className="block text-sm font-medium mb-1">
            {t('team.form.familyName', 'Family Name')} *
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
            {t('team.form.givenNames', 'Given Names')} *
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
            {t('team.form.nationality', 'Nationality')}
          </label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={formData.nationality || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="photoPath" className="block text-sm font-medium mb-1">
            {t('team.form.photoUrl', 'Photo URL')}
          </label>
          <input
            type="text"
            id="photoPath"
            name="photoPath"
            value={formData.photoPath || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {photoPreviewSrc && (
            <div className="mt-3">
              <p className="mb-2 text-xs text-muted-foreground">{t('team.form.photoPreview', 'Photo preview')}</p>
              <img
                src={photoPreviewSrc}
                alt={t('team.form.photoPreviewAlt', 'Team member preview')}
                className="h-28 w-28 rounded-md border object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            {t('team.form.status', 'Status')} *
          </label>
          <select
            id="status"
            name="status"
            value={formData.status || 'ACTIVE'}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          >
            <option value="ACTIVE">{t('common.active', 'Active')}</option>
            <option value="INACTIVE">{t('common.inactive', 'Inactive')}</option>
          </select>
        </div>

        <div>
          <label htmlFor="googleAccountActive" className="block text-sm font-medium mb-1">
            {t('team.form.googleAccount', 'Google Account')}
          </label>
          <label className="flex items-center gap-3 rounded-md border p-3">
            <input
              type="checkbox"
              id="googleAccountActive"
              name="googleAccountActive"
              checked={formData.googleAccountActive ?? true}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <div>
              <div className="text-sm font-medium">
                {t('team.form.googleAccountActive', 'Keep Google account active')}
              </div>
              <div className="text-xs text-muted-foreground">
                {t(
                  'team.form.googleAccountHelp',
                  'Turn this off only when their Google account should no longer stay active.'
                )}
              </div>
            </div>
          </label>
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium mb-1">
            {t('team.form.startDate', 'Start Date')} *
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
            {t('team.form.endDate', 'End Date')}
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
            {t('team.form.department', 'Department')} *
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
            {t('team.form.email', 'Email')} *
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
            {t('team.form.phone', 'Phone')} *
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
            {t('team.form.homeAddress', 'Home Address')}
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
            {t('team.form.dateOfBirth', 'Date of Birth')} *
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
            {t('team.form.legalStatus', 'Legal Status')} *
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
          className="px-4 py-2 border rounded-md hover:bg-accent/20"
        >
          {t('common.cancel', 'Cancel')}
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {loading
            ? t('common.saving', 'Saving...')
            : mode === 'create'
              ? t('common.create', 'Create')
              : t('common.update', 'Update')}
        </button>
      </div>
    </form>
  );
} 

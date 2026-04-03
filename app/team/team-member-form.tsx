'use client';

import { memo, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TeamMember } from './columns';
import { format } from 'date-fns';
import { useI18n } from '@/app/components/I18nProvider';
import Image from 'next/image';

interface TeamMemberFormProps {
  initialData?: TeamMember;
  mode: 'create' | 'edit';
  returnTo?: string;
}

const teamComplianceCheckboxFields = [
  ['liabilityInsurance', 'Liability Insurance'],
  ['accidentInsurance', 'Accident Insurance'],
  ['livesInCamp', 'Lives in Camp'],
  ['powerToolClearanceWood', 'Power Tool Clearance Wood'],
  ['powerToolClearanceMetal', 'Power Tool Clearance Metal'],
  ['weldingClearance', 'Welding Clearance'],
  ['handToolsClearance', 'Hand Tools Clearance'],
  ['toolLiabilityWaiverSigned', 'Tool Liability Waiver Signed'],
  ['driversLicenseCar', 'Drivers License (Car)'],
  ['registeredForMakerspaceVan', 'Registered for Makerspace Van'],
  ['registeredForOhfVan', 'Registered for OHF Van'],
  ['codeOfConductSigned', 'Code of Conduct Signed'],
  ['safeguardingPolicySigned', 'Safeguarding Policy Signed'],
  ['fireSafetyTraining', 'Fire Safety Training'],
  ['firstAidTraining', 'First Aid Training'],
  ['safetyTraining', 'Safety Training'],
] as const;

const teamComplianceTextFields = [
  ['vaccinationCertificate', 'Vaccination Certificate'],
  ['testCertificate', 'Test Certificate'],
  ['legalSupportStatus', 'Legal Support Status'],
  ['legalSupportComment', 'Legal Support Comment'],
  ['vaccinationComment', 'Vaccination Comment'],
  ['codeOfConductSignedAttachment', 'Code of Conduct (signed attachment)'],
  ['keys', 'Keys'],
  ['cardNumber', 'CARD NR'],
  ['toolLiabilityWaiverSignedAttachment', 'Tool Liability Waiver (signed)'],
] as const;

const teamComplianceDateFields = [
  ['codeOfConductSigningDate', 'Code of Conduct Signing Date'],
  ['safeguardingPolicySigningDate', 'Safeguarding Policy Signing Date'],
  ['toolLiabilityWaiverSigningDate', 'Tool Liability Waiver Signing Date'],
] as const;

function getPhotoPreviewSrc(value?: string | null) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("/")) {
    return `${process.env.NEXT_PUBLIC_FILE_SERVER_URL || "https://files.system.makerspace-lesvos.org"}${trimmed}`;
  }

  if (trimmed.startsWith('data:image/')) {
    return trimmed;
  }

  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return `data:image/png;base64,${trimmed}`;
  }

  return trimmed;
}

const TeamPhotoPreview = memo(function TeamPhotoPreview({
  src,
  title,
  alt,
}: {
  src: string;
  title: string;
  alt: string;
}) {
  return (
    <div className="mt-3">
      <p className="mb-2 text-xs text-muted-foreground">{title}</p>
      <Image
        src={src}
        alt={alt}
        width={112}
        height={112}
        unoptimized
        className="h-28 w-28 rounded-md border object-cover"
      />
    </div>
  );
});

export function TeamMemberForm({
  initialData,
  mode,
  returnTo,
}: TeamMemberFormProps) {
  const router = useRouter();
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const submitLockRef = useRef(false);
  const [formData, setFormData] = useState<Partial<TeamMember>>(() =>
    initialData || {
      status: 'ACTIVE',
      googleAccountActive: true,
      startDate: new Date(),
      liabilityInsurance: false,
      accidentInsurance: false,
      livesInCamp: false,
      powerToolClearanceWood: false,
      powerToolClearanceMetal: false,
      weldingClearance: false,
      handToolsClearance: false,
      toolLiabilityWaiverSigned: false,
      driversLicenseCar: false,
      registeredForMakerspaceVan: false,
      registeredForOhfVan: false,
      codeOfConductSigned: false,
      safeguardingPolicySigned: false,
      fireSafetyTraining: false,
      firstAidTraining: false,
      safetyTraining: false,
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitLockRef.current) {
      return;
    }
    submitLockRef.current = true;
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

      router.push(returnTo || '/team');
      router.refresh();
    } catch (error) {
      console.error('Error saving team member:', error);
    } finally {
      submitLockRef.current = false;
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

  const photoPreviewSrc = useMemo(
    () => getPhotoPreviewSrc(formData.photoPath),
    [formData.photoPath]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-28">
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
            <TeamPhotoPreview
              src={photoPreviewSrc}
              title={t('team.form.photoPreview', 'Photo preview')}
              alt={t('team.form.photoPreviewAlt', 'Team member preview')}
            />
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
          <label htmlFor="secondaryEmail" className="block text-sm font-medium mb-1">
            {t('team.form.secondaryEmail', 'Secondary Email')} *
          </label>
          <input
            type="email"
            id="secondaryEmail"
            name="secondaryEmail"
            value={formData.secondaryEmail || ''}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            {t(
              'team.form.secondaryEmailHelp',
              'Used as the Google Workspace recovery email for password reset.'
            )}
          </p>
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
            {t('team.form.legalStatus', 'Legal Status')}
          </label>
          <input
            type="text"
            id="legalStatus"
            name="legalStatus"
            value={formData.legalStatus || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <section className="space-y-4 rounded-lg border p-4">
        <div>
          <h2 className="text-lg font-semibold">
            {t('team.form.complianceSection', 'Compliance & Documentation')}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t(
              'team.form.complianceSectionHelp',
              'Track legal, safety, and signed-document information for each team member.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamComplianceTextFields.map(([name, fallback]) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium mb-1">
                {t(`team.form.${name}`, fallback)}
              </label>
              <input
                type="text"
                id={name}
                name={name}
                value={(formData[name as keyof TeamMember] as string | null) || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          ))}

          {teamComplianceDateFields.map(([name, fallback]) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium mb-1">
                {t(`team.form.${name}`, fallback)}
              </label>
              <input
                type="date"
                id={name}
                name={name}
                value={
                  formData[name as keyof TeamMember]
                    ? format(
                        new Date(formData[name as keyof TeamMember] as Date | string),
                        'yyyy-MM-dd'
                      )
                    : ''
                }
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {teamComplianceCheckboxFields.map(([name, fallback]) => (
            <label
              key={name}
              className="flex items-center gap-3 rounded-md border p-3"
            >
              <input
                type="checkbox"
                name={name}
                checked={Boolean(formData[name as keyof TeamMember])}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <span className="text-sm font-medium">
                {t(`team.form.${name}`, fallback)}
              </span>
            </label>
          ))}
        </div>
      </section>

      <div className="sticky bottom-0 z-20 -mx-4 flex justify-end gap-4 border-t bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <button
          type="button"
          onClick={() => (returnTo ? router.push(returnTo) : router.back())}
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

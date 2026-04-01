import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { TeamMember } from '../team/columns';
import { prisma } from '@/lib/prisma';
import { TeamMemberStatus } from '@/generated/prisma';

// Initialize the Google Admin SDK
const admin = google.admin('directory_v1');

// Initialize the auth client with domain-wide delegation
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_WORKSPACE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_WORKSPACE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: [
    'https://www.googleapis.com/auth/admin.directory.user',
    'https://www.googleapis.com/auth/admin.directory.user.readonly',
  ],
});

export class GoogleWorkspaceService {
  private static instance: GoogleWorkspaceService;
  private authClient!: JWT;

  private constructor() {}

  public static async getInstance(): Promise<GoogleWorkspaceService> {
    if (!GoogleWorkspaceService.instance) {
      GoogleWorkspaceService.instance = new GoogleWorkspaceService();
      await GoogleWorkspaceService.instance.initialize();
    }
    return GoogleWorkspaceService.instance;
  }

  private async initialize() {
    const client = await auth.getClient();
    if (!(client instanceof google.auth.JWT)) {
      throw new Error('Google Workspace auth client must be a JWT client');
    }

    this.authClient = client;
    // Set the subject (admin user) for domain-wide delegation
    this.authClient.subject = process.env.GOOGLE_WORKSPACE_ADMIN_EMAIL;
  }

  private getBaseOrgUnitPath() {
    const configuredPath = process.env.GOOGLE_WORKSPACE_TEAM_OU_PATH?.trim();
    if (!configuredPath) {
      return '/Team Members';
    }

    if (configuredPath === '/') {
      return '/';
    }

    return configuredPath.startsWith('/') ? configuredPath : `/${configuredPath}`;
  }

  private buildOrgUnitPath(department?: string | null) {
    const basePath = this.getBaseOrgUnitPath();
    const normalizedDepartment = department?.trim();

    if (
      !normalizedDepartment ||
      normalizedDepartment.toLowerCase() === 'unassigned'
    ) {
      return basePath;
    }

    if (basePath === '/') {
      return `/${normalizedDepartment}`;
    }

    return `${basePath}/${normalizedDepartment}`;
  }

  private isInvalidOrgUnitError(error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'errors' in error &&
      Array.isArray((error as { errors?: Array<{ message?: string }> }).errors)
    ) {
      return (error as { errors: Array<{ message?: string }> }).errors.some(
        (entry) => entry.message?.includes('INVALID_OU_ID')
      );
    }

    return false;
  }

  private isHttpErrorWithCode(
    error: unknown,
    code: number
  ): error is { code: number } {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: unknown }).code === code
    );
  }

  private async insertUserWithOrgFallback(teamMember: TeamMember) {
    const requestBody = {
      primaryEmail: teamMember.email,
      recoveryEmail: teamMember.secondaryEmail || undefined,
      name: {
        familyName: teamMember.familyName,
        givenName: teamMember.givenNames,
      },
      password: Math.random().toString(36).slice(-8),
      changePasswordAtNextLogin: true,
      orgUnitPath: this.buildOrgUnitPath(teamMember.department),
      phones: [
        {
          value: teamMember.phone,
          type: 'work',
        },
      ],
      addresses: [
        {
          type: 'home',
          value: teamMember.homeAddress || '',
        },
      ],
    };

    try {
      return await admin.users.insert({
        auth: this.authClient,
        requestBody,
      });
    } catch (error) {
      if (!this.isInvalidOrgUnitError(error) || requestBody.orgUnitPath === '/') {
        throw error;
      }

      return admin.users.insert({
        auth: this.authClient,
        requestBody: {
          ...requestBody,
          orgUnitPath: '/',
        },
      });
    }
  }

  private async updateUserWithOrgFallback(
    teamMember: TeamMember,
    currentEmail?: string
  ) {
    const userKey = currentEmail || teamMember.email;
    const requestBody = {
      primaryEmail: teamMember.email,
      recoveryEmail: teamMember.secondaryEmail || undefined,
      name: {
        familyName: teamMember.familyName,
        givenName: teamMember.givenNames,
      },
      orgUnitPath: this.buildOrgUnitPath(teamMember.department),
      phones: [
        {
          value: teamMember.phone,
          type: 'work',
        },
      ],
      addresses: [
        {
          type: 'home',
          value: teamMember.homeAddress || '',
        },
      ],
    };

    try {
      return await admin.users.update({
        auth: this.authClient,
        userKey,
        requestBody,
      });
    } catch (error) {
      if (!this.isInvalidOrgUnitError(error) || requestBody.orgUnitPath === '/') {
        throw error;
      }

      return admin.users.update({
        auth: this.authClient,
        userKey,
        requestBody: {
          ...requestBody,
          orgUnitPath: '/',
        },
      });
    }
  }

  // Create a user in Google Workspace
  async createUser(teamMember: TeamMember) {
    try {
      const response = await this.insertUserWithOrgFallback(teamMember);

      return response.data;
    } catch (error) {
      console.error('Error creating Google Workspace user:', error);
      throw error;
    }
  }

  // Update a user in Google Workspace
  async updateUser(teamMember: TeamMember, currentEmail?: string) {
    try {
      const response = await this.updateUserWithOrgFallback(
        teamMember,
        currentEmail
      );

      return response.data;
    } catch (error) {
      console.error('Error updating Google Workspace user:', error);
      throw error;
    }
  }

  // Delete a user from Google Workspace
  async deleteUser(email: string) {
    try {
      await admin.users.delete({
        auth: this.authClient,
        userKey: email,
      });
    } catch (error) {
      console.error('Error deleting Google Workspace user:', error);
      throw error;
    }
  }

  // Suspend a user in Google Workspace
  async suspendUser(email: string) {
    try {
      await admin.users.update({
        auth: this.authClient,
        userKey: email,
        requestBody: {
          suspended: true,
        },
      });
    } catch (error) {
      console.error('Error suspending Google Workspace user:', error);
      throw error;
    }
  }

  // Reactivate a user in Google Workspace
  async reactivateUser(email: string) {
    try {
      await admin.users.update({
        auth: this.authClient,
        userKey: email,
        requestBody: {
          suspended: false,
        },
      });
    } catch (error) {
      console.error('Error reactivating Google Workspace user:', error);
      throw error;
    }
  }

  // Get user's photo from Google Workspace
  private async getUserPhoto(email: string): Promise<string | null> {
    try {
      const response = await admin.users.photos.get({
        auth: this.authClient,
        userKey: email,
      });
      
      // Convert web-safe base64 to standard base64
      const photoData = response.data.photoData;
      if (!photoData) return null;
      
      // Replace web-safe characters with standard base64 characters
      return photoData.replace(/-/g, '+').replace(/_/g, '/');
    } catch (error) {
      if (this.isHttpErrorWithCode(error, 404)) {
        // User has no photo, which is fine
        return null;
      }
      console.error(`Error fetching photo for user ${email}:`, error);
      return null;
    }
  }

  // Sync all team members with Google Workspace
  async syncAllUsers(teamMembers: TeamMember[]) {
    try {
      // Get all users from Google Workspace
      const response = await admin.users.list({
        auth: this.authClient,
        domain: process.env.GOOGLE_WORKSPACE_DOMAIN,
        maxResults: 500,
        projection: 'full', // This ensures we get all user fields including photo
      });

      const googleUsers = response.data.users || [];
      const existingMembersByEmail = new Map(
        teamMembers.map((member) => [member.email, member])
      );

      // Create or update users in our database based on Google Workspace data
      for (const googleUser of googleUsers) {
        if (!googleUser.primaryEmail) continue;

        // Get user's photo if available
        const photoPath = await this.getUserPhoto(googleUser.primaryEmail);
        console.log('Google User Photo Data:', {
          email: googleUser.primaryEmail,
          hasPhoto: !!photoPath,
          photoLength: photoPath ? photoPath.length : 0,
        });

        const existingMember = existingMembersByEmail.get(googleUser.primaryEmail);
        const teamMemberData = {
          email: googleUser.primaryEmail,
          secondaryEmail:
            googleUser.recoveryEmail ||
            existingMember?.secondaryEmail ||
            googleUser.primaryEmail,
          familyName: googleUser.name?.familyName || '',
          givenNames: googleUser.name?.givenName || '',
          nationality: existingMember?.nationality ?? null, // Not available in Google Workspace
          photoPath: photoPath,
          googleAccountActive: !googleUser.suspended,
          status: existingMember?.status ?? TeamMemberStatus.ACTIVE,
          startDate: existingMember?.startDate ?? new Date(), // Not available in Google Workspace
          endDate: existingMember?.endDate ?? null,
          department: googleUser.orgUnitPath?.split('/').pop() || 'Unassigned',
          phone: googleUser.phones?.[0]?.value || '',
          homeAddress: googleUser.addresses?.[0]?.value || existingMember?.homeAddress || null,
          dateOfBirth: existingMember?.dateOfBirth ?? new Date(), // Not available in Google Workspace
          legalStatus: existingMember?.legalStatus ?? '', // Not available in Google Workspace
        };

        if (existingMember) {
          // Update existing user
          await prisma.teamMember.update({
            where: { email: googleUser.primaryEmail },
            data: teamMemberData,
          });
        } else {
          // Create new user
          await prisma.teamMember.create({
            data: teamMemberData,
          });
        }
      }
    } catch (error) {
      console.error('Error syncing users with Google Workspace:', error);
      throw error;
    }
  }
} 

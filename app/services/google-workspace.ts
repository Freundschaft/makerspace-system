import { google } from 'googleapis';
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
  private authClient: any;

  private constructor() {}

  public static async getInstance(): Promise<GoogleWorkspaceService> {
    if (!GoogleWorkspaceService.instance) {
      GoogleWorkspaceService.instance = new GoogleWorkspaceService();
      await GoogleWorkspaceService.instance.initialize();
    }
    return GoogleWorkspaceService.instance;
  }

  private async initialize() {
    this.authClient = await auth.getClient();
    // Set the subject (admin user) for domain-wide delegation
    this.authClient.subject = process.env.GOOGLE_WORKSPACE_ADMIN_EMAIL;
  }

  // Create a user in Google Workspace
  async createUser(teamMember: TeamMember) {
    try {
      const response = await admin.users.insert({
        auth: this.authClient,
        requestBody: {
          primaryEmail: teamMember.email,
          name: {
            familyName: teamMember.familyName,
            givenName: teamMember.givenNames,
          },
          password: Math.random().toString(36).slice(-8), // Generate random password
          changePasswordAtNextLogin: true,
          orgUnitPath: `/Team Members/${teamMember.department}`,
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
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error creating Google Workspace user:', error);
      throw error;
    }
  }

  // Update a user in Google Workspace
  async updateUser(teamMember: TeamMember) {
    try {
      const response = await admin.users.update({
        auth: this.authClient,
        userKey: teamMember.email,
        requestBody: {
          name: {
            familyName: teamMember.familyName,
            givenName: teamMember.givenNames,
          },
          orgUnitPath: `/Team Members/${teamMember.department}`,
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
        },
      });

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
      return response.data.photoData || null;
    } catch (error) {
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
      const dbEmails = new Set(teamMembers.map(member => member.email));

      // Create or update users in our database based on Google Workspace data
      for (const googleUser of googleUsers) {
        if (!googleUser.primaryEmail) continue;

        // Get user's photo if available
        const photoPath = await this.getUserPhoto(googleUser.primaryEmail);
        console.log('Google User Photo Data:', {
          email: googleUser.primaryEmail,
          hasPhoto: !!photoPath,
        });

        const teamMemberData = {
          email: googleUser.primaryEmail,
          familyName: googleUser.name?.familyName || '',
          givenNames: googleUser.name?.givenName || '',
          nationality: '', // Not available in Google Workspace
          photoPath: photoPath,
          status: googleUser.suspended ? TeamMemberStatus.INACTIVE : TeamMemberStatus.ACTIVE,
          startDate: new Date(), // Not available in Google Workspace
          endDate: null,
          department: googleUser.orgUnitPath?.split('/').pop() || 'Unassigned',
          phone: googleUser.phones?.[0]?.value || '',
          homeAddress: googleUser.addresses?.[0]?.value || null,
          dateOfBirth: new Date(), // Not available in Google Workspace
          legalStatus: '', // Not available in Google Workspace
        };

        if (dbEmails.has(googleUser.primaryEmail)) {
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
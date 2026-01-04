// lib/partners/certiport.ts
// Certiport (Pearson VUE) API Integration
// Microsoft Office Specialist, IT Specialist, Entrepreneurship certifications

import {
  BasePartnerAPI,
  StudentData,
  PartnerAccount,
  CourseEnrollment,
  ProgressData,
  CertificateData,
} from './base';
import { PartnerConfig } from './config';
import { PartnerAPIError } from './http-client';

export class CertiportAPI extends BasePartnerAPI {
  constructor(config: PartnerConfig) {
    super('certiport', config);
  }

  protected getDefaultHeaders(): Record<string, string> {
    return {
      ...super.getDefaultHeaders(),
      Authorization: `Bearer ${this.config.apiKey}`,
      'X-Organization-Id': this.config.orgId || '',
    };
  }

  async createAccount(student: StudentData): Promise<PartnerAccount> {
    this.log('info', 'Creating Certiport account', { studentId: student.id });

    try {
      const response = await this.httpClient.post<{
        userId: string;
        username: string;
        portalUrl: string;
      }>('/api/v2/users', {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        organizationId: this.config.orgId,
      });

      this.log('info', 'Certiport account created', {
        externalId: response.data.userId,
      });

      return {
        externalId: response.data.userId,
        username: response.data.username,
        loginUrl: response.data.portalUrl,
      };
    } catch (error: unknown) {
      this.log('error', 'Failed to create Certiport account', {
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  async enrollInCourse(
    accountExternalId: string,
    courseExternalCode: string
  ): Promise<CourseEnrollment> {
    this.log('info', 'Enrolling in Certiport exam', {
      accountExternalId,
      courseExternalCode,
    });

    try {
      // Generate exam voucher
      const voucherResponse = await this.httpClient.post<{
        voucherId: string;
        voucherCode: string;
        examCode: string;
        examName: string;
      }>('/api/v2/vouchers', {
        userId: accountExternalId,
        examCode: courseExternalCode,
        organizationId: this.config.orgId,
      });

      // Create enrollment record
      const enrollmentResponse = await this.httpClient.post<{
        enrollmentId: string;
        accessUrl: string;
      }>('/api/v2/enrollments', {
        userId: accountExternalId,
        voucherId: voucherResponse.data.voucherId,
        examCode: courseExternalCode,
      });

      this.log('info', 'Certiport enrollment created', {
        enrollmentId: enrollmentResponse.data.enrollmentId,
        voucherCode: voucherResponse.data.voucherCode,
      });

      return {
        externalEnrollmentId: enrollmentResponse.data.enrollmentId,
        courseId: courseExternalCode,
        courseName: voucherResponse.data.examName,
        accessUrl: enrollmentResponse.data.accessUrl,
      };
    } catch (error: unknown) {
      this.log('error', 'Failed to enroll in Certiport exam', {
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  async getProgress(
    externalEnrollmentId: string
  ): Promise<ProgressData | null> {
    this.log('info', 'Fetching Certiport progress', { externalEnrollmentId });

    try {
      const response = await this.httpClient.get<{
        status: string;
        examTaken: boolean;
        passed: boolean;
        score?: number;
        takenDate?: string;
        practiceTestsCompleted: number;
        totalPracticeTests: number;
      }>(`/api/v2/enrollments/${externalEnrollmentId}/status`);

      const completed = response.data.examTaken && response.data.passed;
      const percentage = response.data.examTaken
        ? response.data.passed
          ? 100
          : 0
        : (response.data.practiceTestsCompleted /
            response.data.totalPracticeTests) *
          50;

      return {
        percentage,
        completed,
        completedAt: response.data.takenDate
          ? new Date(response.data.takenDate)
          : undefined,
        lessonsCompleted: response.data.practiceTestsCompleted,
        totalLessons: response.data.totalPracticeTests,
      };
    } catch (error: unknown) {
      if (error instanceof PartnerAPIError && error.statusCode === 404) {
        return null;
      }
      this.log('error', 'Failed to fetch Certiport progress', {
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  async getCertificate(
    externalEnrollmentId: string
  ): Promise<CertificateData | null> {
    this.log('info', 'Fetching Certiport certificate', {
      externalEnrollmentId,
    });

    try {
      const response = await this.httpClient.get<{
        certificateId: string;
        certificationNumber: string;
        issuedDate: string;
        expirationDate?: string;
        downloadUrl: string;
        verifyUrl: string;
      }>(`/api/v2/enrollments/${externalEnrollmentId}/certificate`);

      return {
        certificateId: response.data.certificateId,
        certificateNumber: response.data.certificationNumber,
        issuedDate: new Date(response.data.issuedDate),
        expirationDate: response.data.expirationDate
          ? new Date(response.data.expirationDate)
          : undefined,
        downloadUrl: response.data.downloadUrl,
        verificationUrl: response.data.verifyUrl,
      };
    } catch (error: unknown) {
      if (error instanceof PartnerAPIError && error.statusCode === 404) {
        return null;
      }
      this.log('error', 'Failed to fetch Certiport certificate', {
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  async getSsoLaunchUrl(params: {
    accountExternalId: string;
    externalEnrollmentId: string;
    returnTo?: string;
  }): Promise<string> {
    this.log('info', 'Generating Certiport SSO launch URL', params);

    try {
      const response = await this.httpClient.post<{
        ssoUrl: string;
        expiresIn: number;
      }>('/api/v2/sso/token', {
        userId: params.accountExternalId,
        enrollmentId: params.externalEnrollmentId,
        returnUrl: params.returnTo,
      });

      return response.data.ssoUrl;
    } catch (error: unknown) {
      this.log('error', 'Failed to generate Certiport SSO URL', {
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }
}

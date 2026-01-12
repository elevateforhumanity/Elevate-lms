/**
 * Unit tests for enrollment flow logic
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the enrollment data structures and validation
interface EnrollmentData {
  userId: string;
  courseId: string;
  programId?: string;
  paymentStatus?: 'pending' | 'completed' | 'failed';
}

interface EnrollmentResult {
  success: boolean;
  enrollmentId?: string;
  error?: string;
  courseAccessUrl?: string;
}

// Validation functions extracted from enrollment logic
function validateEnrollmentData(data: Partial<EnrollmentData>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.userId || typeof data.userId !== 'string') {
    errors.push('userId is required and must be a string');
  }
  
  if (!data.courseId || typeof data.courseId !== 'string') {
    errors.push('courseId is required and must be a string');
  }
  
  if (data.userId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(data.userId)) {
    errors.push('userId must be a valid UUID');
  }
  
  if (data.courseId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(data.courseId)) {
    errors.push('courseId must be a valid UUID');
  }
  
  if (data.paymentStatus && !['pending', 'completed', 'failed'].includes(data.paymentStatus)) {
    errors.push('paymentStatus must be pending, completed, or failed');
  }
  
  return { valid: errors.length === 0, errors };
}

function checkPrerequisites(completedCourseIds: string[], requiredPrereqs: string[]): boolean {
  if (!requiredPrereqs || requiredPrereqs.length === 0) return true;
  return requiredPrereqs.every(prereq => completedCourseIds.includes(prereq));
}

function isAlreadyEnrolled(existingEnrollments: { courseId: string }[], courseId: string): boolean {
  return existingEnrollments.some(e => e.courseId === courseId);
}

function generateCourseAccessUrl(courseId: string): string {
  return `/student/courses/${courseId}`;
}

describe('Enrollment Flow', () => {
  describe('validateEnrollmentData', () => {
    it('should validate correct enrollment data', () => {
      const data: EnrollmentData = {
        userId: '123e4567-e89b-12d3-a456-426614174000',
        courseId: '123e4567-e89b-12d3-a456-426614174001',
        paymentStatus: 'pending',
      };
      
      const result = validateEnrollmentData(data);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing userId', () => {
      const data = {
        courseId: '123e4567-e89b-12d3-a456-426614174001',
      };
      
      const result = validateEnrollmentData(data);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('userId is required and must be a string');
    });

    it('should reject missing courseId', () => {
      const data = {
        userId: '123e4567-e89b-12d3-a456-426614174000',
      };
      
      const result = validateEnrollmentData(data);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('courseId is required and must be a string');
    });

    it('should reject invalid UUID format for userId', () => {
      const data = {
        userId: 'not-a-uuid',
        courseId: '123e4567-e89b-12d3-a456-426614174001',
      };
      
      const result = validateEnrollmentData(data);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('userId must be a valid UUID');
    });

    it('should reject invalid paymentStatus', () => {
      const data = {
        userId: '123e4567-e89b-12d3-a456-426614174000',
        courseId: '123e4567-e89b-12d3-a456-426614174001',
        paymentStatus: 'invalid' as any,
      };
      
      const result = validateEnrollmentData(data);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('paymentStatus must be pending, completed, or failed');
    });
  });

  describe('checkPrerequisites', () => {
    it('should pass when no prerequisites required', () => {
      const completed: string[] = [];
      const required: string[] = [];
      
      expect(checkPrerequisites(completed, required)).toBe(true);
    });

    it('should pass when all prerequisites completed', () => {
      const completed = ['course-1', 'course-2', 'course-3'];
      const required = ['course-1', 'course-2'];
      
      expect(checkPrerequisites(completed, required)).toBe(true);
    });

    it('should fail when prerequisites not met', () => {
      const completed = ['course-1'];
      const required = ['course-1', 'course-2'];
      
      expect(checkPrerequisites(completed, required)).toBe(false);
    });

    it('should fail when no courses completed but prerequisites required', () => {
      const completed: string[] = [];
      const required = ['course-1'];
      
      expect(checkPrerequisites(completed, required)).toBe(false);
    });
  });

  describe('isAlreadyEnrolled', () => {
    it('should return false when not enrolled', () => {
      const enrollments = [
        { courseId: 'course-1' },
        { courseId: 'course-2' },
      ];
      
      expect(isAlreadyEnrolled(enrollments, 'course-3')).toBe(false);
    });

    it('should return true when already enrolled', () => {
      const enrollments = [
        { courseId: 'course-1' },
        { courseId: 'course-2' },
      ];
      
      expect(isAlreadyEnrolled(enrollments, 'course-2')).toBe(true);
    });

    it('should return false when no existing enrollments', () => {
      const enrollments: { courseId: string }[] = [];
      
      expect(isAlreadyEnrolled(enrollments, 'course-1')).toBe(false);
    });
  });

  describe('generateCourseAccessUrl', () => {
    it('should generate correct URL format', () => {
      const courseId = '123e4567-e89b-12d3-a456-426614174001';
      const url = generateCourseAccessUrl(courseId);
      
      expect(url).toBe('/student/courses/123e4567-e89b-12d3-a456-426614174001');
    });

    it('should handle different course IDs', () => {
      expect(generateCourseAccessUrl('abc')).toBe('/student/courses/abc');
      expect(generateCourseAccessUrl('test-course')).toBe('/student/courses/test-course');
    });
  });

  describe('Enrollment Flow Integration', () => {
    it('should complete full validation flow for valid data', () => {
      const enrollmentData: EnrollmentData = {
        userId: '123e4567-e89b-12d3-a456-426614174000',
        courseId: '123e4567-e89b-12d3-a456-426614174001',
        paymentStatus: 'completed',
      };
      
      // Step 1: Validate input
      const validation = validateEnrollmentData(enrollmentData);
      expect(validation.valid).toBe(true);
      
      // Step 2: Check not already enrolled
      const existingEnrollments: { courseId: string }[] = [];
      expect(isAlreadyEnrolled(existingEnrollments, enrollmentData.courseId)).toBe(false);
      
      // Step 3: Check prerequisites
      const completedCourses: string[] = [];
      const prerequisites: string[] = [];
      expect(checkPrerequisites(completedCourses, prerequisites)).toBe(true);
      
      // Step 4: Generate access URL
      const accessUrl = generateCourseAccessUrl(enrollmentData.courseId);
      expect(accessUrl).toContain(enrollmentData.courseId);
    });

    it('should fail flow when already enrolled', () => {
      const enrollmentData: EnrollmentData = {
        userId: '123e4567-e89b-12d3-a456-426614174000',
        courseId: '123e4567-e89b-12d3-a456-426614174001',
        paymentStatus: 'pending',
      };
      
      const existingEnrollments = [{ courseId: enrollmentData.courseId }];
      
      expect(isAlreadyEnrolled(existingEnrollments, enrollmentData.courseId)).toBe(true);
    });

    it('should fail flow when prerequisites not met', () => {
      const completedCourses = ['intro-course'];
      const prerequisites = ['intro-course', 'intermediate-course'];
      
      expect(checkPrerequisites(completedCourses, prerequisites)).toBe(false);
    });
  });
});

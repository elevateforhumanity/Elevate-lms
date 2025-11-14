"""
Core module for Elevate LMS
Contains basic functionality for the learning management system.
"""


class Course:
    """Represents a course in the LMS."""

    def __init__(self, course_id, title, description=""):
        """
        Initialize a new course.

        Args:
            course_id: Unique identifier for the course
            title: Course title
            description: Optional course description
        """
        self.course_id = course_id
        self.title = title
        self.description = description
        self.students = []

    def enroll_student(self, student_id):
        """
        Enroll a student in the course.

        Args:
            student_id: Unique identifier for the student
        """
        if student_id not in self.students:
            self.students.append(student_id)
            return True
        return False

    def get_student_count(self):
        """
        Get the number of enrolled students.

        Returns:
            Number of students enrolled in the course
        """
        return len(self.students)


class Student:
    """Represents a student in the LMS."""

    def __init__(self, student_id, name, email):
        """
        Initialize a new student.

        Args:
            student_id: Unique identifier for the student
            name: Student's full name
            email: Student's email address
        """
        self.student_id = student_id
        self.name = name
        self.email = email
        self.enrolled_courses = []

    def enroll_in_course(self, course_id):
        """
        Enroll student in a course.

        Args:
            course_id: Course identifier to enroll in
        """
        if course_id not in self.enrolled_courses:
            self.enrolled_courses.append(course_id)
            return True
        return False

"""
Tests for the core module
"""
from elevate_lms.core import Course, Student


def test_course_creation():
    """Test creating a new course."""
    course = Course("CS101", "Introduction to Computer Science")
    assert course.course_id == "CS101"
    assert course.title == "Introduction to Computer Science"
    assert course.description == ""
    assert len(course.students) == 0


def test_course_with_description():
    """Test creating a course with description."""
    course = Course("CS101", "Intro to CS", "Learn programming basics")
    assert course.description == "Learn programming basics"


def test_enroll_student():
    """Test enrolling a student in a course."""
    course = Course("CS101", "Intro to CS")
    result = course.enroll_student("S001")
    assert result is True
    assert course.get_student_count() == 1


def test_enroll_duplicate_student():
    """Test that enrolling the same student twice fails."""
    course = Course("CS101", "Intro to CS")
    course.enroll_student("S001")
    result = course.enroll_student("S001")
    assert result is False
    assert course.get_student_count() == 1


def test_student_creation():
    """Test creating a new student."""
    student = Student("S001", "John Doe", "john@example.com")
    assert student.student_id == "S001"
    assert student.name == "John Doe"
    assert student.email == "john@example.com"
    assert len(student.enrolled_courses) == 0


def test_student_enroll_in_course():
    """Test student enrolling in a course."""
    student = Student("S001", "John Doe", "john@example.com")
    result = student.enroll_in_course("CS101")
    assert result is True
    assert "CS101" in student.enrolled_courses


def test_student_enroll_duplicate():
    """Test that enrolling in the same course twice fails."""
    student = Student("S001", "John Doe", "john@example.com")
    student.enroll_in_course("CS101")
    result = student.enroll_in_course("CS101")
    assert result is False
    assert len(student.enrolled_courses) == 1

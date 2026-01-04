export function normalizeCourseMetadata(metadata: Record<string, unknown>) {
  const clean = { ...metadata };

  // Ensure required fields
  if (!clean.title) clean.title = 'Untitled Course';
  if (!clean.summary) clean.summary = '';
  if (!clean.description) clean.description = '';
  if (!clean.objectives) clean.objectives = [];
  if (!clean.modules) clean.modules = [];

  // Generate slug from title
  clean.slug = clean.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Normalize modules
  clean.modules = (clean.modules || []).map((m: any, index: number) => {
    const module = { ...m };

    if (!module.title) module.title = `Module ${index + 1}`;
    if (!module.description) module.description = '';
    if (!module.lessons) module.lessons = [];

    module.slug = module.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Normalize lessons
    module.lessons = (module.lessons || []).map(
      (l: any, lessonIndex: number) => {
        const lesson = typeof l === 'string' ? { title: l } : { ...l };

        if (!lesson.title) lesson.title = `Lesson ${lessonIndex + 1}`;
        if (!lesson.content) lesson.content = '';

        lesson.slug = lesson.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');

        return lesson;
      }
    );

    return module;
  });

  return clean;
}

export function validateCourseMetadata(metadata: Record<string, unknown>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!metadata.title || metadata.title.trim() === '') {
    errors.push('Course title is required');
  }

  if (!metadata.modules || metadata.modules.length === 0) {
    errors.push('Course must have at least one module');
  }

  metadata.modules?.forEach((module: any, index: number) => {
    if (!module.title) {
      errors.push(`Module ${index + 1} is missing a title`);
    }

    if (!module.lessons || module.lessons.length === 0) {
      errors.push(`Module "${module.title}" has no lessons`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

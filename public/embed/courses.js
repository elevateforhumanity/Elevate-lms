/**
 * Elevate for Humanity - Course Catalog Embed Widget
 * Embed this on your Durable site to show courses
 */

(function () {
  'use strict';

  const EFH = window.EFH || {};

  EFH.Courses = {
    apiBase: 'https://api.elevateforhumanity.org',
    lmsBase: 'https://lms.elevateforhumanity.org',

    init: function (options) {
      const config = {
        container: options.container || '#efh-courses',
        limit: options.limit || 6,
        showEnroll: options.showEnroll !== false,
        category: options.category || null,
        ...options,
      };

      this.render(config);
    },

    async fetchCourses(config) {
      try {
        let url = `${this.apiBase}/api/courses?limit=${config.limit}`;
        if (config.category) {
          url += `&category=${config.category}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        return data.data || [];
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        return [];
      }
    },

    async render(config) {
      const container = document.querySelector(config.container);
      if (!container) {
        console.error('Container not found:', config.container);
        return;
      }

      // Show loading
      container.innerHTML = '<div class="efh-loading">Loading courses...</div>';

      // Fetch courses
      const courses = await this.fetchCourses(config);

      if (courses.length === 0) {
        container.innerHTML =
          '<div class="efh-empty">No courses available</div>';
        return;
      }

      // Render courses
      const html = `
        <div class="efh-courses-grid">
          ${courses.map((course) => this.renderCourse(course, config)).join('')}
        </div>
        <style>
          .efh-courses-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 24px;
            margin: 24px 0;
          }
          
          .efh-course-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.2s, box-shadow 0.2s;
          }
          
          .efh-course-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.15);
          }
          
          .efh-course-image {
            width: 100%;
            height: 180px;
            object-fit: cover;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          
          .efh-course-content {
            padding: 20px;
          }
          
          .efh-course-title {
            font-size: 18px;
            font-weight: 600;
            margin: 0 0 8px 0;
            color: #1a202c;
          }
          
          .efh-course-description {
            font-size: 14px;
            color: #718096;
            margin: 0 0 16px 0;
            line-height: 1.5;
          }
          
          .efh-course-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          }
          
          .efh-course-duration {
            font-size: 13px;
            color: #a0aec0;
          }
          
          .efh-course-btn {
            display: inline-block;
            width: 100%;
            padding: 10px 16px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 14px;
            transition: opacity 0.2s;
          }
          
          .efh-course-btn:hover {
            opacity: 0.9;
          }
          
          .efh-loading, .efh-empty {
            text-align: center;
            padding: 40px;
            color: #718096;
          }
        </style>
      `;

      container.innerHTML = html;
    },

    renderCourse(course, config) {
      const imageUrl =
        course.thumbnail_url ||
        'https://via.placeholder.com/400x200?text=Course';
      const duration = course.duration
        ? `${Math.floor(course.duration / 60)} hours`
        : 'Self-paced';
      const enrollUrl = `${this.lmsBase}/courses/${course.id}`;

      return `
        <div class="efh-course-card">
          <img src="${imageUrl}" alt="${course.title}" class="efh-course-image" onerror="this.src='https://via.placeholder.com/400x200?text=Course'">
          <div class="efh-course-content">
            <h3 class="efh-course-title">${course.title}</h3>
            <p class="efh-course-description">${course.description || 'Learn new skills and advance your career'}</p>
            <div class="efh-course-meta">
              <span class="efh-course-duration">⏱️ ${duration}</span>
            </div>
            ${config.showEnroll ? `<a href="${enrollUrl}" class="efh-course-btn">View Course</a>` : ''}
          </div>
        </div>
      `;
    },
  };

  window.EFH = EFH;
})();

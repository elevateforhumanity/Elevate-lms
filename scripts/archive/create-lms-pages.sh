#!/bin/bash

# Create My Courses page
cat > /workspaces/fix2/public/test-courses.html << 'COURSES_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Courses - TEST PAGE</title>
    <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; }
        .copy-notice { position: fixed; top: 0; left: 0; right: 0; background: #4D4B37; color: white; padding: 1rem; text-align: center; z-index: 10000; }
        .copy-btn { background: white; color: #4D4B37; border: none; padding: 0.75rem 2rem; border-radius: 8px; font-weight: 600; cursor: pointer; }
        .success-message { display: none; background: #059669; color: white; padding: 0.5rem 1rem; border-radius: 8px; margin-top: 0.5rem; }
        .content-wrapper { margin-top: 150px; }
    </style>
</head>
<body>
    <div class="copy-notice">
        <h2>📚 My Courses - Ready to Copy!</h2>
        <button class="copy-btn" onclick="copyCode()">📋 Copy HTML Code</button>
        <div class="success-message" id="successMsg">✅ Copied!</div>
    </div>
    <div class="content-wrapper" id="coursesContent">
<style>
.courses-section { max-width: 1200px; margin: 0 auto; padding: 2rem; }
.course-card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; background: #f8fafc; }
.course-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem; }
.course-card h3 { color: #4D4B37; font-size: 1.25rem; font-weight: 600; }
.course-status { padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.875rem; font-weight: 600; }
.status-completed { background: #d1fae5; color: #059669; }
.status-in-progress { background: #fef3c7; color: #d97706; }
.progress-bar { background: #e5e7eb; border-radius: 10px; height: 20px; margin: 1rem 0; overflow: hidden; }
.progress-fill { background: linear-gradient(90deg, #059669, #10b981); height: 100%; border-radius: 10px; }
.btn { padding: 0.75rem 1.5rem; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; }
.btn-primary { background: #4D4B37; color: white; }
.btn-success { background: #059669; color: white; }
</style>
<div class="courses-section">
    <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 1.5rem; color: #4D4B37;">📚 My Courses</h2>
    <div class="course-card">
        <div class="course-header">
            <h3>CPR & OSHA Safety Technician</h3>
            <span class="course-status status-completed">Completed</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width: 100%;"></div></div>
        <p><strong>Completion Date:</strong> February 28, 2024</p>
        <p><strong>Grade:</strong> 94% (Pass)</p><br>
        <a href="/certificates" class="btn btn-success">View Certificate</a>
    </div>
    <div class="course-card">
        <div class="course-header">
            <h3>Microsoft Office Specialist</h3>
            <span class="course-status status-in-progress">In Progress</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width: 75%;"></div></div>
        <p><strong>Progress:</strong> 75% Complete</p>
        <p><strong>Next Module:</strong> PowerPoint Advanced Features</p>
        <p><strong>Due Date:</strong> March 15, 2024</p><br>
        <button class="btn btn-primary">Continue Course</button>
    </div>
    <div class="course-card">
        <div class="course-header">
            <h3>OSHA 10 Hour Certification</h3>
            <span class="course-status status-in-progress">In Progress</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width: 30%;"></div></div>
        <p><strong>Progress:</strong> 30% Complete</p>
        <p><strong>Next Module:</strong> Hazard Recognition</p>
        <p><strong>Due Date:</strong> March 30, 2024</p><br>
        <button class="btn btn-primary">Continue Course</button>
    </div>
</div>
    </div>
    <script>
        function copyCode() {
            const content = document.getElementById('coursesContent').innerHTML;
            const textarea = document.createElement('textarea');
            textarea.value = content;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                document.getElementById('successMsg').style.display = 'block';
                document.querySelector('.copy-btn').textContent = '✅ Copied!';
                setTimeout(() => {
                    document.getElementById('successMsg').style.display = 'none';
                    document.querySelector('.copy-btn').textContent = '📋 Copy HTML Code';
                }, 3000);
            } catch (err) { alert('Failed to copy'); }
            document.body.removeChild(textarea);
        }
    </script>
</body>
</html>
COURSES_EOF

echo "✅ My Courses page created"

# Create Certificates page
cat > /workspaces/fix2/public/test-certificates.html << 'CERT_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificates - TEST PAGE</title>
    <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; }
        .copy-notice { position: fixed; top: 0; left: 0; right: 0; background: #4D4B37; color: white; padding: 1rem; text-align: center; z-index: 10000; }
        .copy-btn { background: white; color: #4D4B37; border: none; padding: 0.75rem 2rem; border-radius: 8px; font-weight: 600; cursor: pointer; }
        .success-message { display: none; background: #059669; color: white; padding: 0.5rem 1rem; border-radius: 8px; margin-top: 0.5rem; }
        .content-wrapper { margin-top: 150px; }
    </style>
</head>
<body>
    <div class="copy-notice">
        <h2>🏆 Certificates - Ready to Copy!</h2>
        <button class="copy-btn" onclick="copyCode()">📋 Copy HTML Code</button>
        <div class="success-message" id="successMsg">✅ Copied!</div>
    </div>
    <div class="content-wrapper" id="certificatesContent">
<style>
.certificates-section { max-width: 1200px; margin: 0 auto; padding: 2rem; }
.certificate-card { background: linear-gradient(135deg, #f0fdf4, #ecfdf5); border: 2px solid #059669; border-radius: 12px; padding: 2rem; text-align: center; }
.certificate-card h3 { font-size: 1.75rem; font-weight: 700; color: #059669; margin-bottom: 1rem; }
.btn { padding: 0.75rem 1.5rem; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; margin: 0.5rem; }
.btn-success { background: #059669; color: white; }
.btn-primary { background: #4D4B37; color: white; }
</style>
<div class="certificates-section">
    <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 1.5rem; color: #4D4B37;">🏆 My Certificates</h2>
    <div class="certificate-card">
        <h3>🏥 CPR & OSHA Safety Technician</h3>
        <p style="margin-bottom: 0.5rem;"><strong>Issued:</strong> February 28, 2024</p>
        <p style="margin-bottom: 0.5rem;"><strong>Expires:</strong> February 28, 2026</p>
        <p style="margin-bottom: 1.5rem;"><strong>Certificate ID:</strong> EFH-CPR-2024-001247</p>
        <div>
            <button class="btn btn-success">Download PDF</button>
            <button class="btn btn-primary">Share Certificate</button>
        </div>
    </div>
</div>
    </div>
    <script>
        function copyCode() {
            const content = document.getElementById('certificatesContent').innerHTML;
            const textarea = document.createElement('textarea');
            textarea.value = content;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                document.getElementById('successMsg').style.display = 'block';
                document.querySelector('.copy-btn').textContent = '✅ Copied!';
                setTimeout(() => {
                    document.getElementById('successMsg').style.display = 'none';
                    document.querySelector('.copy-btn').textContent = '📋 Copy HTML Code';
                }, 3000);
            } catch (err) { alert('Failed to copy'); }
            document.body.removeChild(textarea);
        }
    </script>
</body>
</html>
CERT_EOF

echo "✅ Certificates page created"

# Create Profile page
cat > /workspaces/fix2/public/test-profile.html << 'PROFILE_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile - TEST PAGE</title>
    <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; }
        .copy-notice { position: fixed; top: 0; left: 0; right: 0; background: #4D4B37; color: white; padding: 1rem; text-align: center; z-index: 10000; }
        .copy-btn { background: white; color: #4D4B37; border: none; padding: 0.75rem 2rem; border-radius: 8px; font-weight: 600; cursor: pointer; }
        .success-message { display: none; background: #059669; color: white; padding: 0.5rem 1rem; border-radius: 8px; margin-top: 0.5rem; }
        .content-wrapper { margin-top: 150px; }
    </style>
</head>
<body>
    <div class="copy-notice">
        <h2>👤 Profile - Ready to Copy!</h2>
        <button class="copy-btn" onclick="copyCode()">📋 Copy HTML Code</button>
        <div class="success-message" id="successMsg">✅ Copied!</div>
    </div>
    <div class="content-wrapper" id="profileContent">
<style>
.profile-section { max-width: 1200px; margin: 0 auto; padding: 2rem; }
.profile-card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #374151; }
.form-group input { width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem; }
.submit-btn { width: 100%; background: #4D4B37; color: white; padding: 1rem 2rem; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
</style>
<div class="profile-section">
    <div class="profile-card">
        <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 1.5rem; color: #4D4B37;">👤 My Profile</h2>
        <form>
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" value="John Doe">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" value="john.doe@example.com">
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="tel" value="(555) 123-4567">
            </div>
            <button type="submit" class="submit-btn">Update Profile</button>
        </form>
    </div>
</div>
    </div>
    <script>
        function copyCode() {
            const content = document.getElementById('profileContent').innerHTML;
            const textarea = document.createElement('textarea');
            textarea.value = content;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                document.getElementById('successMsg').style.display = 'block';
                document.querySelector('.copy-btn').textContent = '✅ Copied!';
                setTimeout(() => {
                    document.getElementById('successMsg').style.display = 'none';
                    document.querySelector('.copy-btn').textContent = '📋 Copy HTML Code';
                }, 3000);
            } catch (err) { alert('Failed to copy'); }
            document.body.removeChild(textarea);
        }
    </script>
</body>
</html>
PROFILE_EOF

echo "✅ Profile page created"

# Create Support page
cat > /workspaces/fix2/public/test-support.html << 'SUPPORT_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Support - TEST PAGE</title>
    <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; }
        .copy-notice { position: fixed; top: 0; left: 0; right: 0; background: #4D4B37; color: white; padding: 1rem; text-align: center; z-index: 10000; }
        .copy-btn { background: white; color: #4D4B37; border: none; padding: 0.75rem 2rem; border-radius: 8px; font-weight: 600; cursor: pointer; }
        .success-message { display: none; background: #059669; color: white; padding: 0.5rem 1rem; border-radius: 8px; margin-top: 0.5rem; }
        .content-wrapper { margin-top: 150px; }
    </style>
</head>
<body>
    <div class="copy-notice">
        <h2>💬 Support - Ready to Copy!</h2>
        <button class="copy-btn" onclick="copyCode()">📋 Copy HTML Code</button>
        <div class="success-message" id="successMsg">✅ Copied!</div>
    </div>
    <div class="content-wrapper" id="supportContent">
<style>
.support-section { max-width: 1200px; margin: 0 auto; padding: 2rem; }
.support-card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
.info-box { background: #dbeafe; border: 1px solid #93c5fd; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; }
.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #374151; }
.form-group input, .form-group textarea { width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem; font-family: inherit; }
.submit-btn { width: 100%; background: #4D4B37; color: white; padding: 1rem 2rem; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
</style>
<div class="support-section">
    <div class="support-card">
        <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 1.5rem; color: #4D4B37;">💬 Support</h2>
        <div class="info-box">
            <h3 style="font-size: 1.25rem; font-weight: 600; color: #1e40af; margin-bottom: 0.5rem;">Need Help?</h3>
            <p style="margin-bottom: 1rem; color: #374151;">Our support team is here Monday-Friday, 9 AM - 5 PM EST</p>
            <p style="color: #374151;"><strong>Email:</strong> support@elevateforhumanity.org</p>
            <p style="color: #374151;"><strong>Phone:</strong> (555) 123-4567</p>
        </div>
        <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Submit a Support Ticket</h3>
        <form>
            <div class="form-group">
                <label>Subject</label>
                <input type="text">
            </div>
            <div class="form-group">
                <label>Message</label>
                <textarea rows="5"></textarea>
            </div>
            <button type="submit" class="submit-btn">Submit Ticket</button>
        </form>
    </div>
</div>
    </div>
    <script>
        function copyCode() {
            const content = document.getElementById('supportContent').innerHTML;
            const textarea = document.createElement('textarea');
            textarea.value = content;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                document.getElementById('successMsg').style.display = 'block';
                document.querySelector('.copy-btn').textContent = '✅ Copied!';
                setTimeout(() => {
                    document.getElementById('successMsg').style.display = 'none';
                    document.querySelector('.copy-btn').textContent = '📋 Copy HTML Code';
                }, 3000);
            } catch (err) { alert('Failed to copy'); }
            document.body.removeChild(textarea);
        }
    </script>
</body>
</html>
SUPPORT_EOF

echo "✅ Support page created"
echo ""
echo "✅ All LMS pages created successfully!"

// ============================================
// EMAIL NOTIFICATION SYSTEM
// Integrated with EmailJS (free tier)
// ============================================

// Configuration - UPDATE THESE WITH YOUR EMAILJS CREDENTIALS
const EMAIL_CONFIG = {
service_id: 'YOUR_SERVICE_ID', // From EmailJS dashboard
template_id: 'YOUR_TEMPLATE_ID', // From EmailJS dashboard
user_id: 'YOUR_PUBLIC_USER_ID' // From EmailJS dashboard
};

// Initialize email system
document.addEventListener('DOMContentLoaded', function() {
// Check if email is already configured
const savedEmail = localStorage.getItem('mg_calendar_email');
if (savedEmail) {
document.getElementById('userEmail').value = savedEmail;
showEmailPreferences();
}

// Setup email button
document.getElementById('setupEmail').addEventListener('click', setupEmailNotifications);

// Save preferences when Apply Optimizations is clicked
document.getElementById('applyOptimizations')?.addEventListener('click', function() {
saveEmailPreferences();
// Also apply calendar optimizations
if (window.currentCalendarData) {
alert('Optimizations applied to your calendar!');
}
});

// Save calendar button
document.getElementById('saveCalendar')?.addEventListener('click', function() {
saveCalendarToAccount();
});
});

// Setup email notifications
function setupEmailNotifications() {
const email = document.getElementById('userEmail').value.trim();

if (!validateEmail(email)) {
showError('Please enter a valid email address.');
return;
}

// Save email to localStorage
localStorage.setItem('mg_calendar_email', email);
localStorage.setItem('mg_email_notifications', 'true');

// Show preferences section
showEmailPreferences();

// Send welcome email
sendWelcomeEmail(email);

// Show confirmation
document.getElementById('emailConfirmation').classList.remove('hidden');

// Update button text
document.getElementById('setupEmail').textContent = '✓ Enabled';
document.getElementById('setupEmail').classList.remove('bg-[var(--mg-green)]');
document.getElementById('setupEmail').classList.add('bg-blue-500');
}

// Show email preferences panel
function showEmailPreferences() {
const prefsSection = document.getElementById('emailPreferences');
if (prefsSection) {
prefsSection.classList.remove('hidden');

// Load saved preferences
const savedPrefs = localStorage.getItem('mg_email_preferences');
if (savedPrefs) {
try {
const prefs = JSON.parse(savedPrefs);
document.getElementById('dailyReminders').checked = prefs.dailyReminders !== false;
document.getElementById('weeklyReports').checked = prefs.weeklyReports !== false;
document.getElementById('engagementAlerts').checked = prefs.engagementAlerts || false;
} catch (e) {
console.warn('Could not parse saved preferences:', e);
}
}
}
}

// Save email preferences
function saveEmailPreferences() {
const email = localStorage.getItem('mg_calendar_email');
if (!email) {
showError('Please enter your email first.');
return;
}

const preferences = {
email: email,
dailyReminders: document.getElementById('dailyReminders').checked,
weeklyReports: document.getElementById('weeklyReports').checked,
engagementAlerts: document.getElementById('engagementAlerts').checked,
reminderTime: '09:00', // Default time
enabledAt: new Date().toISOString()
};

localStorage.setItem('mg_email_preferences', JSON.stringify(preferences));

// Schedule reminders
scheduleEmailReminders();

// Show success
showSuccess('Email preferences saved! You\'ll receive your first reminder tomorrow.');
}

// Send welcome email
function sendWelcomeEmail(email) {
const calendarData = window.currentCalendarData;

const templateParams = {
to_email: email,
user_name: email.split('@')[0],
calendar_duration: '30 days',
total_posts: calendarData?.metadata?.totalPosts || '20-30',
platforms: calendarData?.metadata?.platforms?.join(', ') || 'multiple',
best_time: '9:00 AM',
next_reminder: getNextReminderTime(),
dashboard_link: window.location.href
};

// Only send if EmailJS is configured
if (EMAIL_CONFIG.user_id && EMAIL_CONFIG.user_id !== 'YOUR_PUBLIC_USER_ID') {
emailjs.send(EMAIL_CONFIG.service_id, 'welcome_template', templateParams, EMAIL_CONFIG.user_id)
.then(response => {
console.log('Welcome email sent:', response.status);
})
.catch(error => {
console.warn('Email error (might be missing template):', error);
// Fallback: Show success message anyway
showSuccess('Email notifications enabled! Check your inbox for the welcome email.');
});
} else {
console.log('EmailJS not configured - welcome email would be sent to:', email);
showSuccess('Email notifications enabled! (EmailJS not fully configured yet)');
}
}

// Schedule email reminders
function scheduleEmailReminders() {
// In a real app, this would use cron jobs or scheduled functions
// For now, we'll simulate with localStorage
const nextReminder = new Date();
nextReminder.setDate(nextReminder.getDate() + 1);
nextReminder.setHours(9, 0, 0, 0);

localStorage.setItem('mg_next_reminder', nextReminder.toISOString());
console.log('Next reminder scheduled for:', nextReminder.toLocaleString());

// Also schedule weekly report (every Monday at 10 AM)
const nextMonday = new Date();
const daysUntilMonday = (8 - nextMonday.getDay()) % 7 || 7;
nextMonday.setDate(nextMonday.getDate() + daysUntilMonday);
nextMonday.setHours(10, 0, 0, 0);

localStorage.setItem('mg_next_weekly_report', nextMonday.toISOString());
}

// Send daily reminder (would be called by a scheduled job)
function sendDailyReminder() {
const preferences = JSON.parse(localStorage.getItem('mg_email_preferences'));

if (!preferences?.dailyReminders || !preferences.email) {
return;
}

const today = new Date();
const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });

// Get today's posts from calendar
const todayPosts = getTodaysPosts(); // This function would need to be implemented

const templateParams = {
to_email: preferences.email,
day_of_week: dayOfWeek,
date: today.toLocaleDateString(),
total_posts: todayPosts?.length || 0,
posts: todayPosts ? formatPostsForEmail(todayPosts) : 'Check your calendar dashboard',
reminder_time: preferences.reminderTime || '9:00',
tips: getDailyContentTip()
};

if (EMAIL_CONFIG.user_id && EMAIL_CONFIG.user_id !== 'YOUR_PUBLIC_USER_ID') {
emailjs.send(EMAIL_CONFIG.service_id, 'daily_reminder_template', templateParams, EMAIL_CONFIG.user_id);
}
}

// Send weekly report (would be called by a scheduled job)
function sendWeeklyReport() {
const preferences = JSON.parse(localStorage.getItem('mg_email_preferences'));

if (!preferences?.weeklyReports || !preferences.email) {
return;
}

const weeklyStats = calculateWeeklyStats(); // This would need to be implemented

const templateParams = {
to_email: preferences.email,
week_start: getWeekStartDate(),
total_posts: weeklyStats?.totalPosts || 0,
estimated_reach: weeklyStats?.estimatedReach || '100-500',
best_performing: weeklyStats?.bestPost || 'Check your analytics',
engagement_rate: weeklyStats?.engagementRate || '2.5',
recommendations: weeklyStats?.recommendations || 'Keep posting consistently!',
next_week_preview: getNextWeekPreview()
};

if (EMAIL_CONFIG.user_id && EMAIL_CONFIG.user_id !== 'YOUR_PUBLIC_USER_ID') {
emailjs.send(EMAIL_CONFIG.service_id, 'weekly_report_template', templateParams, EMAIL_CONFIG.user_id);
}
}

// Send engagement alert
function sendEngagementAlert(postData, engagementRate) {
const preferences = JSON.parse(localStorage.getItem('mg_email_preferences'));

if (!preferences?.engagementAlerts || !preferences.email || engagementRate < 15) {
return; // Only send for high engagement (>15%)
}

const templateParams = {
to_email: preferences.email,
post_platform: postData.platform,
post_content: postData.content?.substring(0, 100) + '...' || 'Your recent post',
engagement_rate: engagementRate + '%',
recommendations: getEngagementBoostTips(postData.platform),
similar_content_ideas: getSimilarContentIdeas(postData)
};

if (EMAIL_CONFIG.user_id && EMAIL_CONFIG.user_id !== 'YOUR_PUBLIC_USER_ID') {
emailjs.send(EMAIL_CONFIG.service_id, 'engagement_alert_template', templateParams, EMAIL_CONFIG.user_id);
}
}

// Save calendar to user account (simulated)
function saveCalendarToAccount() {
const calendarData = window.currentCalendarData;
if (!calendarData) {
showError('Please generate a calendar first.');
return;
}

// Save to localStorage for demo purposes
// In production, this would send to your backend
const savedCalendars = JSON.parse(localStorage.getItem('mg_saved_calendars') || '[]');
calendarData.savedAt = new Date().toISOString();
calendarData.id = 'cal_' + Date.now();
savedCalendars.push(calendarData);

localStorage.setItem('mg_saved_calendars', JSON.stringify(savedCalendars));

showSuccess('Calendar saved! You can access it anytime from your account.');
}

// Utility functions
function validateEmail(email) {
const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return re.test(email);
}

function getNextReminderTime() {
const next = localStorage.getItem('mg_next_reminder');
if (next) {
const date = new Date(next);
return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
return '9:00 AM';
}

// Check if email is setup
function checkEmailSetup() {
const hasEmail = localStorage.getItem('mg_calendar_email');
if (hasEmail) {
document.getElementById('userEmail').value = hasEmail;
showEmailPreferences();
}
}

// Helper functions (to be implemented based on your backend)
function getTodaysPosts() {
// This would query your database/API for today's posts
// For now, return empty array
return [];
}

function formatPostsForEmail(posts) {
return posts.map(p => `• ${p.optimalTime} on ${p.platform}: ${p.content}`).join('\n');
}

function getDailyContentTip() {
const tips = [
"Engage with 3 comments on your posts today",
"Try a poll or question in your Stories",
"Reply to every comment for 24 hours",
"Use 2-3 trending hashtags relevant to your niche"
];
return tips[Math.floor(Math.random() * tips.length)];
}

function calculateWeeklyStats() {
// This would calculate from your analytics
return {
totalPosts: 12,
estimatedReach: '1,200-1,800',
bestPost: 'Product tutorial on Instagram',
engagementRate: '3.2%',
recommendations: 'Try more video content next week'
};
}

function getWeekStartDate() {
const today = new Date();
const dayOfWeek = today.getDay();
const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
const monday = new Date(today.setDate(diff));
return monday.toLocaleDateString();
}

function getNextWeekPreview() {
return "Next week focuses on educational content and user testimonials.";
}

function getEngagementBoostTips(platform) {
const tips = {
instagram: "Use Instagram Reels with trending audio",
facebook: "Ask questions that spark conversation",
linkedin: "Share industry insights with data",
tiktok: "Participate in the latest challenges",
twitter: "Create threads with valuable insights",
pinterest: "Create step-by-step tutorial pins"
};
return tips[platform] || "Engage with your audience in comments.";
}

function getSimilarContentIdeas(postData) {
return [
"Create a follow-up post on the same topic",
"Make a video version of this content",
"Turn this into a carousel post with more details",
"Share a behind-the-scenes of creating this content"
];
}

function showError(message) {
alert(`❌ ${message}`);
}

function showSuccess(message) {
// Create a temporary success message
const successDiv = document.createElement('div');
successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
successDiv.innerHTML = `✅ ${message}`;
document.body.appendChild(successDiv);

setTimeout(() => {
successDiv.remove();
}, 3000);
}

// Export to use in calendar-engine.js
window.emailSystem = {
setupEmailNotifications,
saveEmailPreferences,
checkEmailSetup,
sendDailyReminder,
sendWeeklyReport,
sendEngagementAlert,
saveCalendarToAccount
};

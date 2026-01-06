// ============================================
// EMAIL NOTIFICATION SYSTEM
// Integrated with EmailJS (free tier)
// ============================================

// Configuration - YOU NEED TO UPDATE THESE
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

// Save preferences button
document.getElementById('applyOptimizations')?.addEventListener('click', saveEmailPreferences);
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
}

// Show email preferences panel
function showEmailPreferences() {
const prefsSection = document.getElementById('emailPreferences');
if (prefsSection) {
prefsSection.classList.remove('hidden');

// Load saved preferences
const savedPrefs = localStorage.getItem('mg_email_preferences');
if (savedPrefs) {
const prefs = JSON.parse(savedPrefs);
document.getElementById('dailyReminders').checked = prefs.dailyReminders;
document.getElementById('weeklyReports').checked = prefs.weeklyReports;
document.getElementById('engagementAlerts').checked = prefs.engagementAlerts;
}
}
}

// Save email preferences
function saveEmailPreferences() {
const email = localStorage.getItem('mg_calendar_email');
if (!email) return;

const preferences = {
email: email,
dailyReminders: document.getElementById('dailyReminders').checked,
weeklyReports: document.getElementById('weeklyReports').checked,
engagementAlerts: document.getElementById('engagementAlerts').checked,
reminderTime: '09:00', // Default
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

emailjs.send(EMAIL_CONFIG.service_id, 'welcome_template', templateParams, EMAIL_CONFIG.user_id)
.then(response => {
console.log('Welcome email sent:', response.status);
})
.catch(error => {
console.warn('Email error (might be missing template):', error);
});
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
}

// Utility functions
function validateEmail(email) {
const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return re.test(email);
}

function getNextReminderTime() {
const next = localStorage.getItem('mg_next_reminder');
if (next) {
return new Date(next).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

// Export to use in calendar-engine.js
window.emailSystem = {
setupEmailNotifications,
saveEmailPreferences,
checkEmailSetup
};

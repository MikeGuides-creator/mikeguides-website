// ============================================
// AI CONTENT CALENDAR ENGINE
// Core algorithms for optimal content scheduling
// ============================================

// Industry-specific optimization algorithms
const industryAlgorithms = {
ecommerce: {
bestDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
bestHours: [9, 12, 15, 19, 21], // EST
contentMix: { educational: 30, promotional: 40, entertainment: 20, engagement: 10 },
platforms: ['instagram', 'facebook', 'pinterest'],
contentIdeas: [
"Product showcase video",
"Customer testimonial story",
"Behind-the-scenes manufacturing",
"Flash sale announcement",
"How-to use product tutorial",
"User-generated content feature",
"Product comparison guide",
"Seasonal promotion"
],
hashtagStrategy: 'Mix of product-specific and lifestyle hashtags'
},

b2b: {
bestDays: ['Tuesday', 'Wednesday', 'Thursday'],
bestHours: [8, 10, 14, 16],
contentMix: { educational: 50, promotional: 20, entertainment: 15, engagement: 15 },
platforms: ['linkedin', 'twitter', 'facebook'],
contentIdeas: [
"Case study highlight",
"Industry insights report",
"Team expertise showcase",
"Whitepaper teaser",
"Webinar promotion",
"Client testimonial video",
"Industry trend analysis",
"Thought leadership article"
],
hashtagStrategy: 'Industry-specific professional hashtags'
},

saas: {
bestDays: ['Tuesday', 'Wednesday', 'Thursday'],
bestHours: [10, 13, 15, 17],
contentMix: { educational: 45, promotional: 30, entertainment: 10, engagement: 15 },
platforms: ['linkedin', 'twitter', 'instagram'],
contentIdeas: [
"Feature tutorial video",
"Customer success story",
"Product update announcement",
"Integration highlight",
"Use case demonstration",
"FAQ session",
"Behind-the-scenes development",
"Free trial promotion"
],
hashtagStrategy: 'Tech and SaaS-specific hashtags'
},

agency: {
bestDays: ['Tuesday', 'Wednesday', 'Thursday'],
bestHours: [9, 11, 15, 18],
contentMix: { educational: 40, promotional: 25, entertainment: 20, engagement: 15 },
platforms: ['linkedin', 'instagram', 'facebook'],
contentIdeas: [
"Client project showcase",
"Marketing tip of the week",
"Team member spotlight",
"Industry event coverage",
"Service deep-dive",
"Client results case study",
"Agency culture highlight",
"Free audit offer"
],
hashtagStrategy: 'Marketing and agency-specific hashtags'
},

creator: {
bestDays: ['Wednesday', 'Thursday', 'Friday', 'Sunday'],
bestHours: [12, 17, 20, 22],
contentMix: { educational: 25, promotional: 15, entertainment: 45, engagement: 15 },
platforms: ['instagram', 'tiktok', 'youtube'],
contentIdeas: [
"Day in the life vlog",
"Q&A session with followers",
"Collaboration teaser",
"Trend participation video",
"Personal story sharing",
"Behind-the-scenes creation",
"Audience challenge",
"Content creation tips"
],
hashtagStrategy: 'Trending and niche community hashtags'
}
};

// Platform-specific optimization algorithms
const platformAlgorithms = {
instagram: {
postTypes: ['Reel', 'Carousel', 'Single Image', 'Story Series'],
optimalLength: { Reel: '15-30s', Carousel: '5-10 slides', Caption: '125-250 chars' },
bestFormats: ['Video', 'Carousel', 'Reels'],
engagementBoosters: ['Polls in Stories', 'Questions in captions', 'User-generated content reposts'],
hashtagCount: '5-15 hashtags',
analyticsToTrack: ['Saves', 'Shares', 'Reach']
},

linkedin: {
postTypes: ['Article', 'Document', 'Video', 'Poll'],
optimalLength: { Article: '800-1500 words', Video: '1-3 minutes', Caption: '150-300 chars' },
bestFormats: ['Article', 'Document', 'Video'],
engagementBoosters: ['@mentions of companies', 'Industry data visualization', 'Professional insights'],
hashtagCount: '3-5 industry-specific hashtags',
analyticsToTrack: ['Comments', 'Reactions', 'Reposts']
},

facebook: {
postTypes: ['Video', 'Link Post', 'Photo Album', 'Live'],
optimalLength: { Video: '1-2 minutes', Caption: '100-200 chars' },
bestFormats: ['Video', 'Live', 'Photo Albums'],
engagementBoosters: ['Questions that spark debate', 'Shareable content', 'Emotional stories'],
hashtagCount: '1-3 broad hashtags',
analyticsToTrack: ['Shares', 'Reactions', 'Click-through rate']
},

tiktok: {
postTypes: ['Trend Sound', 'How-to', 'Storytime', 'Duet'],
optimalLength: { Video: '21-34 seconds', Caption: 'Short and punchy' },
bestFormats: ['Trending Sounds', 'How-to Tutorials'],
engagementBoosters: ['Trend participation', 'Call to action in video', 'Hook in first 3 seconds'],
hashtagCount: '3-5 trending hashtags',
analyticsToTrack: ['Watch time', 'Shares', 'Comments']
},

twitter: {
postTypes: ['Thread', 'Poll', 'Media Tweet', 'Quote Tweet'],
optimalLength: { Tweet: '240 chars max', Thread: '3-7 tweets', Caption: 'Concise' },
bestFormats: ['Threads', 'Polls', 'Media Tweets'],
engagementBoosters: ['Timely commentary', 'Industry news sharing', '@replies to influencers'],
hashtagCount: '1-2 trending hashtags',
analyticsToTrack: ['Retweets', 'Quote Tweets', 'Replies']
},

pinterest: {
postTypes: ['Idea Pin', 'Standard Pin', 'Video Pin'],
optimalLength: { Description: '100-500 chars', Title: 'Clear and keyword-rich' },
bestFormats: ['Idea Pins', 'Video Pins'],
engagementBoosters: ['Step-by-step guides', 'Inspiration boards', 'Seasonal content'],
hashtagCount: '2-5 descriptive hashtags',
analyticsToTrack: ['Saves', 'Clicks', 'Impressions']
}
};

// Main calendar generation function
function generateCalendar() {
console.log('Generating AI-optimized content calendar...');

// Get user inputs
const userInputs = gatherUserInputs();

// Validate inputs
if (!validateInputs(userInputs)) {
showError('Please select at least one platform and your industry.');
return;
}

// Show loading state
showLoadingState(true);

// Generate calendar data (with timeout to simulate processing)
setTimeout(() => {
const calendarData = generateCalendarData(userInputs);
const aiInsights = generateAIInsights(calendarData, userInputs);

// Display results
displayCalendar(calendarData);
displayAIInsights(aiInsights);

// Show success message
showSuccess('Calendar generated successfully!');

// Enable export buttons
enableExportButtons(calendarData);

// Show email panel if not already configured
checkEmailSetup();

showLoadingState(false);

}, 800); // Simulate AI processing time
}

// Gather all user inputs from the form
function gatherUserInputs() {
const industry = document.getElementById('industry').value;

const platforms = Array.from(document.querySelectorAll('input[name="platform"]:checked'))
.map(cb => cb.value);

const audienceSize = document.getElementById('audienceSize').value;

const goals = Array.from(document.querySelectorAll('input[name="goal"]:checked'))
.map(cb => cb.value);

const contentThemes = document.getElementById('contentThemes').value
.split(',')
.map(t => t.trim())
.filter(t => t.length > 0);

return {
industry: industry,
platforms: platforms,
audienceSize: audienceSize,
goals: goals,
contentThemes: contentThemes,
timestamp: new Date().toISOString()
};
}

// Validate required inputs
function validateInputs(inputs) {
if (!inputs.industry) {
return false;
}

if (inputs.platforms.length === 0) {
return false;
}

return true;
}

// Generate 30-day calendar data
function generateCalendarData(inputs) {
const { industry, platforms, audienceSize, contentThemes } = inputs;
const algorithm = industryAlgorithms[industry] || industryAlgorithms.ecommerce;

const calendar = [];
const today = new Date();

// Determine posts per day based on audience size
const postsPerDay = {
small: { instagram: 1, facebook: 1, linkedin: 1, tiktok: 2, twitter: 3, pinterest: 1 },
medium: { instagram: 2, facebook: 1, linkedin: 2, tiktok: 3, twitter: 5, pinterest: 2 },
large: { instagram: 3, facebook: 2, linkedin: 3, tiktok: 5, twitter: 8, pinterest: 3 }
};

const postFrequency = postsPerDay[audienceSize] || postsPerDay.medium;

// Generate 30 days
for (let i = 0; i < 30; i++) {
const currentDate = new Date(today);
currentDate.setDate(today.getDate() + i);

const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
const formattedDate = currentDate.toISOString().split('T')[0];
const dayOfMonth = currentDate.getDate();

// Only generate posts on optimal days for this industry
if (algorithm.bestDays.includes(dayOfWeek)) {
const dayPosts = [];

platforms.forEach(platform => {
const postsCount = postFrequency[platform] || 1;

for (let p = 0; p < postsCount; p++) {
const post = generatePost(platform, algorithm, inputs, i, p);
dayPosts.push(post);
}
});

// Sort posts by optimal time
dayPosts.sort((a, b) => {
const timeA = a.optimalTime.replace(' AM', '').replace(' PM', '').split(':')[0];
const timeB = b.optimalTime.replace(' AM', '').replace(' PM', '').split(':')[0];
return parseInt(timeA) - parseInt(timeB);
});

if (dayPosts.length > 0) {
calendar.push({
date: formattedDate,
dayName: dayOfWeek,
dayOfMonth: dayOfMonth,
month: currentDate.toLocaleDateString('en-US', { month: 'short' }),
posts: dayPosts,
isWeekend: dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday'
});
}
}
}

return {
calendar: calendar,
metadata: {
totalPosts: calendar.reduce((sum, day) => sum + day.posts.length, 0),
totalDays: calendar.length,
platforms: platforms,
industry: industry,
generatedAt: new Date().toISOString()
}
};
}

// Generate a single optimized post
function generatePost(platform, algorithm, inputs, dayIndex, postIndex) {
const platformAlgo = platformAlgorithms[platform] || platformAlgorithms.instagram;
const contentIdeas = algorithm.contentIdeas || ['Engaging content about your topic'];

// Get optimal time based on platform and industry
const optimalTime = getOptimalTime(platform, algorithm, postIndex);

// Get content type based on mix
const contentType = getContentType(algorithm.contentMix, dayIndex, postIndex);

// Generate content idea
const ideaIndex = (dayIndex + postIndex) % contentIdeas.length;
const contentIdea = contentIdeas[ideaIndex];

// Add themes if provided
let finalContent = contentIdea;
if (inputs.contentThemes.length > 0) {
const themeIndex = dayIndex % inputs.contentThemes.length;
const theme = inputs.contentThemes[themeIndex];
finalContent = `${contentIdea} about ${theme}`;
}

// Get platform-specific post type
const postTypeIndex = postIndex % platformAlgo.postTypes.length;
const postType = platformAlgo.postTypes[postTypeIndex];

// Get engagement booster
const engagementBooster = platformAlgo.engagementBoosters[postIndex % platformAlgo.engagementBoosters.length];

// Estimate engagement
const estimatedEngagement = estimateEngagement(inputs.audienceSize, platform, contentType);

// Generate hashtags
const hashtags = generateHashtags(platform, inputs.contentThemes);

return {
platform: platform,
type: postType,
optimalTime: optimalTime,
contentType: contentType,
content: finalContent,
optimization: engagementBooster,
hashtags: hashtags,
estimatedEngagement: estimatedEngagement,
platformColor: getPlatformColor(platform)
};
}

// Calculate optimal posting time
function getOptimalTime(platform, algorithm, postIndex) {
const baseHours = algorithm.bestHours;
const platformAdjustments = {
instagram: 0,
facebook: -1,
linkedin: +1,
tiktok: -2,
twitter: 0,
pinterest: +2
};

const adjustment = platformAdjustments[platform] || 0;
const hourIndex = postIndex % baseHours.length;
let hour = baseHours[hourIndex] + adjustment;

// Keep within reasonable hours (8 AM - 10 PM)
hour = Math.max(8, Math.min(22, hour));

// Format as HH:00 AM/PM
const period = hour >= 12 ? 'PM' : 'AM';
const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
return `${displayHour}:00 ${period}`;
}

// Determine content type based on mix
function getContentType(contentMix, dayIndex, postIndex) {
const types = Object.keys(contentMix);
const weights = Object.values(contentMix);

// Create weighted array
let weightedTypes = [];
types.forEach((type, index) => {
for (let i = 0; i < weights[index]; i++) {
weightedTypes.push(type);
}
});

const typeIndex = (dayIndex + postIndex) % weightedTypes.length;
return weightedTypes[typeIndex];
}

// Generate relevant hashtags
function generateHashtags(platform, themes) {
const platformTags = {
instagram: ['socialmedia', 'digitalmarketing', 'contentcreator'],
linkedin: ['business', 'professional', 'industry'],
tiktok: ['fyp', 'viral', 'trending'],
facebook: ['community', 'update', 'news'],
twitter: ['thread', 'thoughts', 'discussion'],
pinterest: ['inspiration', 'ideas', 'diy']
};

const baseTags = platformTags[platform] || [];
const themeTags = themes.slice(0, 3).map(theme =>
theme.toLowerCase().replace(/\s+/g, '')
);

return [...baseTags, ...themeTags].slice(0, 5);
}

// Estimate engagement score
function estimateEngagement(audienceSize, platform, contentType) {
const baseScores = {
small: { instagram: 4.5, facebook: 3.2, linkedin: 2.8, tiktok: 8.5, twitter: 1.5, pinterest: 2.0 },
medium: { instagram: 3.0, facebook: 2.0, linkedin: 1.8, tiktok: 6.0, twitter: 1.0, pinterest: 1.5 },
large: { instagram: 1.8, facebook: 1.2, linkedin: 1.0, tiktok: 4.0, twitter: 0.8, pinterest: 1.0 }
};

const contentTypeBoost = {
educational: 1.0,
promotional: 0.8,
entertainment: 1.3,
engagement: 1.5
};

const base = baseScores[audienceSize][platform] || 2.0;
const boost = contentTypeBoost[contentType] || 1.0;

return (base * boost).toFixed(1);
}

// Get platform color for styling
function getPlatformColor(platform) {
const colors = {
instagram: '#E4405F',
facebook: '#1877F2',
linkedin: '#0A66C2',
tiktok: '#000000',
twitter: '#1DA1F2',
pinterest: '#E60023'
};
return colors[platform] || '#2563eb';
}

// Generate AI insights from calendar data
function generateAIInsights(calendarData, inputs) {
const { industry, platforms } = inputs;
const algorithm = industryAlgorithms[industry] || industryAlgorithms.ecommerce;

// Calculate statistics
const totalPosts = calendarData.metadata.totalPosts;
const postsByPlatform = {};
const postsByType = {};

calendarData.calendar.forEach(day => {
day.posts.forEach(post => {
postsByPlatform[post.platform] = (postsByPlatform[post.platform] || 0) + 1;
postsByType[post.contentType] = (postsByType[post.contentType] || 0) + 1;
});
});

// Calculate percentages
const platformPercentages = {};
Object.keys(postsByPlatform).forEach(platform => {
platformPercentages[platform] = Math.round((postsByPlatform[platform] / totalPosts) * 100);
});

const typePercentages = {};
Object.keys(postsByType).forEach(type => {
typePercentages[type] = Math.round((postsByType[type] / totalPosts) * 100);
});

// Generate optimal times summary
const optimalTimes = {};
platforms.forEach(platform => {
const times = algorithm.bestHours.map(hour => {
const adj = { instagram: 0, facebook: -1, linkedin: +1, tiktok: -2, twitter: 0, pinterest: +2 }[platform] || 0;
const adjustedHour = Math.max(8, Math.min(22, hour + adj));
const period = adjustedHour >= 12 ? 'PM' : 'AM';
const displayHour = adjustedHour > 12 ? adjustedHour - 12 : adjustedHour;
return `${displayHour}:00 ${period}`;
});
optimalTimes[platform] = [...new Set(times)].slice(0, 3);
});

// Calculate predicted reach
const predictedReach = calculatePredictedReach(inputs.audienceSize, totalPosts);

// Determine best performing platform
let bestPlatform = 'N/A';
let maxPosts = 0;
Object.keys(postsByPlatform).forEach(platform => {
if (postsByPlatform[platform] > maxPosts) {
maxPosts = postsByPlatform[platform];
bestPlatform = platform;
}
});

// Calculate time saved
const timeSaved = Math.round(totalPosts * 0.25); // 15 minutes per post

return {
totalPosts: totalPosts,
platformDistribution: platformPercentages,
contentMix: typePercentages,
optimalTimes: optimalTimes,
predictedReach: predictedReach,
timeSaved: timeSaved,
bestPerformingPlatform: bestPlatform
};
}

// Calculate predicted reach
function calculatePredictedReach(audienceSize, totalPosts) {
const reachPerPost = {
small: { min: 50, max: 200 },
medium: { min: 200, max: 1000 },
large: { min: 1000, max: 5000 }
};

const reach = reachPerPost[audienceSize] || reachPerPost.medium;
const weeklyPosts = Math.ceil(totalPosts / 4.3);
const minWeekly = weeklyPosts * reach.min;
const maxWeekly = weeklyPosts * reach.max;

return {
weekly: `${minWeekly.toLocaleString()} - ${maxWeekly.toLocaleString()}`,
monthly: `${(minWeekly * 4.3).toLocaleString()} - ${(maxWeekly * 4.3).toLocaleString()}`
};
}

// Display the calendar in the UI
function displayCalendar(calendarData) {
const container = document.getElementById('calendarOutput');

if (!calendarData.calendar || calendarData.calendar.length === 0) {
container.innerHTML = `
<div class="text-center py-12">
<div class="text-5xl mb-4">📅</div>
<p class="text-lg font-medium text-slate-700">No posts scheduled for these settings</p>
<p class="text-slate-500 mt-2">Try selecting more platforms or a different industry</p>
</div>
`;
return;
}

// Store calendar data globally for export/email
window.currentCalendarData = calendarData;

let html = `
<div class="mb-6 flex items-center justify-between">
<div>
<span class="text-sm font-semibold text-slate-600">
${calendarData.metadata.totalDays} days • ${calendarData.metadata.totalPosts} posts
</span>
</div>
<div class="flex gap-2">
<button onclick="scrollToToday()" class="text-sm px-3 py-1 bg-slate-100 rounded-lg hover:bg-slate-200">
📍 Today
</button>
<button onclick="toggleView()" class="text-sm px-3 py-1 bg-slate-100 rounded-lg hover:bg-slate-200">
🔄 Toggle View
</button>
</div>
</div>
<div class="calendar-grid" id="calendarView">
`;

// Create calendar grid
calendarData.calendar.forEach(day => {
const isToday = isTodayDate(day.date);
const dayClass = isToday ? 'calendar-day today' : (day.isWeekend ? 'calendar-day weekend' : 'calendar-day');

html += `
<div class="${dayClass}">
<div class="calendar-day-header">
<div class="flex justify-between items-center">
<span class="font-bold">${day.dayOfMonth} ${day.month}</span>
<span class="text-xs ${day.isWeekend ? 'text-orange-600' : 'text-slate-500'}">${day.dayName.substring(0, 3)}</span>
</div>
${isToday ? '<span class="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Today</span>' : ''}
</div>
${day.posts.map(post => `
<div class="post-item platform-${post.platform}" style="border-left-color: ${post.platformColor}">
<div class="flex justify-between items-start">
<div>
<span class="post-time">${post.optimalTime}</span>
<span class="text-xs ml-2 px-1.5 py-0.5 rounded bg-slate-100">${post.platform}</span>
</div>
<span class="text-xs font-semibold" style="color: ${post.platformColor}">${post.type}</span>
</div>
<div class="post-content mt-1">${post.content}</div>
<div class="flex justify-between items-center mt-2">
<span class="post-type">${post.contentType}</span>
<span class="text-xs text-slate-500">👍 ${post.estimatedEngagement}%</span>
</div>
</div>
`).join('')}
</div>
`;
});

html += `</div>`;
container.innerHTML = html;
}

// Display AI insights panel
function displayAIInsights(insights) {
const panel = document.getElementById('aiInsights');
panel.classList.remove('hidden');

// Optimal Times
let timesHTML = '';
Object.entries(insights.optimalTimes).forEach(([platform, times]) => {
timesHTML += `
<div class="mb-2">
<span class="font-medium">${platform}:</span>
<div class="text-sm opacity-90">${times.join(', ')}</div>
</div>
`;
});
document.getElementById('optimalTimesDisplay').innerHTML = timesHTML;

// Content Mix
let mixHTML = '';
Object.entries(insights.contentMix).forEach(([type, percentage]) => {
mixHTML += `
<div class="mb-2">
<div class="flex justify-between mb-1">
<span>${type}</span>
<span>${percentage}%</span>
</div>
<div class="insight-bar">
<div class="insight-bar-fill" style="width: ${percentage}%"></div>
</div>
</div>
`;
});
document.getElementById('contentMixDisplay').innerHTML = mixHTML;

// Performance Predictions
document.getElementById('performancePredictions').innerHTML = `
<div class="mb-2">
<div class="font-medium">Weekly Reach</div>
<div class="text-sm">${insights.predictedReach.weekly}</div>
</div>
<div class="mb-2">
<div class="font-medium">Best Platform</div>
<div class="text-sm">${insights.bestPerformingPlatform}</div>
</div>
<div class="mb-2">
<div class="font-medium">Time Saved</div>
<div class="text-sm">${insights.timeSaved} hours</div>
</div>
`;
}

// Enable export buttons
function enableExportButtons(calendarData) {
document.getElementById('exportPDF').onclick = () => exportToPDF(calendarData);
document.getElementById('exportCSV').onclick = () => exportToCSV(calendarData);
document.getElementById('exportGoogle').onclick = () => exportToGoogle(calendarData);

// Remove disabled styling
['exportPDF', 'exportCSV', 'exportGoogle'].forEach(id => {
document.getElementById(id).classList.remove('opacity-50', 'cursor-not-allowed');
document.getElementById(id).classList.add('hover:bg-slate-50', 'cursor-pointer');
});
}

// Export functions (placeholders)
function exportToPDF(calendarData) {
alert('PDF export would be implemented with a library like jsPDF or a backend service.');
// In production: window.open(`/api/export-pdf?data=${encodeURIComponent(JSON.stringify(calendarData))}`);
}

function exportToCSV(calendarData) {
alert('CSV export functionality would convert calendar data to CSV format for download.');
// In production: Create CSV string and trigger download
}

function exportToGoogle(calendarData) {
alert('Google Calendar integration would use Google Calendar API with OAuth.');
// In production: Redirect to Google OAuth or use API
}

// Utility functions
function isTodayDate(dateString) {
const today = new Date().toISOString().split('T')[0];
return dateString === today;
}

function scrollToToday() {
const todayElement = document.querySelector('.calendar-day.today');
if (todayElement) {
todayElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
todayElement.classList.add('ring-2', 'ring-blue-500');
setTimeout(() => todayElement.classList.remove('ring-2', 'ring-blue-500'), 2000);
}
}

function toggleView() {
const calendarView = document.getElementById('calendarView');
if (calendarView.classList.contains('calendar-grid')) {
calendarView.classList.remove('calendar-grid');
calendarView.classList.add('calendar-list');
alert('Switched to list view (visual toggle not fully implemented)');
} else {
calendarView.classList.remove('calendar-list');
calendarView.classList.add('calendar-grid');
alert('Switched to grid view');
}
}

function showLoadingState(show) {
const button = document.getElementById('generateCalendar');
const originalText = button.innerHTML;

if (show) {
button.innerHTML = '⏳ Generating AI Calendar...';
button.disabled = true;
button.classList.add('opacity-70', 'cursor-not-allowed');
} else {
button.innerHTML = originalText.replace('⏳ Generating AI Calendar...', '🚀 Generate AI-Optimized Calendar');
button.disabled = false;
button.classList.remove('opacity-70', 'cursor-not-allowed');
}
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

function checkEmailSetup() {
// Check if email is already configured
const hasEmail = localStorage.getItem('mg_calendar_email');
if (hasEmail) {
document.getElementById('userEmail').value = hasEmail;
// Trigger email preferences show
if (window.emailSystem && window.emailSystem.checkEmailSetup) {
window.emailSystem.checkEmailSetup();
}
}
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
// Set up generate button
document.getElementById('generateCalendar').addEventListener('click', generateCalendar);

// Initialize audience size buttons
document.querySelectorAll('.size-option').forEach(btn => {
btn.addEventListener('click', function() {
document.querySelectorAll('.size-option').forEach(b => {
b.classList.remove('active', 'bg-blue-50', 'border-blue-200', 'text-blue-700');
b.classList.add('border-slate-300', 'text-slate-700');
});
this.classList.add('active', 'bg-blue-50', 'border-blue-200', 'text-blue-700');
this.classList.remove('border-slate-300', 'text-slate-700');
document.getElementById('audienceSize').value = this.dataset.size;
});
});

// Initialize platform checkbox styling
document.querySelectorAll('input[name="platform"]').forEach(cb => {
cb.addEventListener('change', function() {
const parent = this.closest('label');
if (this.checked) {
parent.classList.add('bg-blue-50', 'border-blue-300');
} else {
parent.classList.remove('bg-blue-50', 'border-blue-300');
}
});
});

// Initialize goal checkbox styling
document.querySelectorAll('input[name="goal"]').forEach(cb => {
cb.addEventListener('change', function() {
const parent = this.closest('label');
if (this.checked) {
parent.classList.add('bg-blue-50', 'border-blue-300');
} else {
parent.classList.remove('bg-blue-50', 'border-blue-300');
}
});
});

console.log('AI Content Calendar Engine loaded successfully.');
});

// DOM Elements
const landingPage = document.getElementById('landing-page');
const mainApp = document.getElementById('main-app');
const getStartedBtn = document.getElementById('getStartedBtn');
const landingDemoBtn = document.getElementById('landingDemoBtn');
const homeBtn = document.getElementById('homeBtn');
const refreshBtn = document.getElementById('refreshBtn');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');
const continueTraining = document.getElementById('continueTraining');
const viewCertificates = document.getElementById('viewCertificates');
const teamProgress = document.getElementById('teamProgress');
const securityTips = document.getElementById('securityTips');
const achievementPopup = document.getElementById('achievementPopup');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

// Navigation between landing page and main app
getStartedBtn.addEventListener('click', () => {
    landingPage.classList.add('hidden');
    mainApp.classList.remove('hidden');
});

landingDemoBtn.addEventListener('click', () => {
    landingPage.classList.add('hidden');
    mainApp.classList.remove('hidden');
});

homeBtn.addEventListener('click', () => {
    mainApp.classList.add('hidden');
    landingPage.classList.remove('hidden');
});

refreshBtn.addEventListener('click', () => {
    location.reload();
});

// Tab System
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show active tab content
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `${tabId}-tab`) {
                content.classList.add('active');
            }
        });
        
        // Initialize charts if analytics tab is selected
        if (tabId === 'analytics') {
            initializeCharts();
        }
    });
});

// Zara AI Chat
sendMessage.addEventListener('click', sendChatMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});

function sendChatMessage() {
    const message = chatInput.value.trim();
    if (message) {
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate Zara's response after a short delay
        setTimeout(() => {
            const responses = [
                "That's a great question about cybersecurity! Let me explain...",
                "I'd be happy to help with that. In cybersecurity terms...",
                "Based on your current training progress, I recommend...",
                "That's an important aspect of security awareness. Here's what you need to know..."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'zara');
        }, 1000);
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Quick Actions
continueTraining.addEventListener('click', () => {
    showAchievement('Training Module', 'You have continued your cybersecurity training!');
});

viewCertificates.addEventListener('click', () => {
    alert('Opening Certificate Gallery...');
});

teamProgress.addEventListener('click', () => {
    // Switch to progress tab
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector('.tab[data-tab="progress"]').classList.add('active');
    
    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === 'progress-tab') {
            content.classList.add('active');
        }
    });
});

securityTips.addEventListener('click', () => {
    addMessage("Here's a security tip: Always enable multi-factor authentication (MFA) on your accounts for an extra layer of protection.", 'zara');
});

// Charts
function initializeCharts() {
    // Completion Rate Chart
    const completionCtx = document.getElementById('completionChart').getContext('2d');
    new Chart(completionCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            datasets: [{
                label: 'Module Completion Rate',
                data: [30, 45, 60, 65, 75, 80],
                borderColor: '#2a9d8f',
                backgroundColor: 'rgba(42, 157, 143, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#f8f9fa'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: '#6c757d'
                    },
                    grid: {
                        color: 'rgba(108, 117, 125, 0.2)'
                    }
                },
                x: {
                    ticks: {
                        color: '#6c757d'
                    },
                    grid: {
                        color: 'rgba(108, 117, 125, 0.2)'
                    }
                }
            }
        }
    });

    // Knowledge Areas Chart
    const knowledgeCtx = document.getElementById('knowledgeChart').getContext('2d');
    new Chart(knowledgeCtx, {
        type: 'doughnut',
        data: {
            labels: ['Network Security', 'Phishing', 'Password Security', 'Social Engineering', 'Data Protection'],
            datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: [
                    '#2a9d8f',
                    '#e9c46a',
                    '#e76f51',
                    '#4cc9f0',
                    '#9d4edd'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#f8f9fa',
                        padding: 15
                    }
                }
            }
        }
    });
}

// Initialize charts if analytics tab is active
if (document.querySelector('.tab[data-tab="analytics"]') && document.querySelector('.tab[data-tab="analytics"]').classList.contains('active')) {
    initializeCharts();
}

// Achievement System
function showAchievement(title, description) {
    // Update popup content
    document.querySelector('.achievement-content h4').textContent = title;
    document.querySelector('.achievement-content p').textContent = description;
    
    // Show popup
    achievementPopup.classList.add('show');
    
    // Create confetti effect
    createConfetti();
    
    // Hide popup after 5 seconds
    setTimeout(() => {
        achievementPopup.classList.remove('show');
    }, 5000);
}

function createConfetti() {
    const colors = ['#e9c46a', '#2a9d8f', '#e76f51', '#4cc9f0'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Simulate earning an achievement after 3 seconds
setTimeout(() => {
    showAchievement('Network Defender', 'You\'ve earned the "Network Defender" badge for completing the Network Security module!');
}, 3000);

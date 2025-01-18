function findSkills() {
    const niche = document.getElementById('niche').value;
    const skills = {
        programming: ['JavaScript', 'Python', 'Data Structures', 'Web Development', 'Algorithms'],
        design: ['UI/UX Design', 'Adobe XD', 'Figma', 'Photoshop', 'Typography'],
        marketing: ['SEO', 'Content Creation', 'Social Media Strategy', 'Email Marketing', 'Analytics'],
        finance: ['Financial Analysis', 'Investment Strategies', 'Accounting', 'Risk Management'],
        dataScience: ['Machine Learning', 'Data Visualization', 'SQL', 'Big Data', 'Statistical Analysis']
    };

    const skillsList = document.getElementById('skills-list');
    const resultsSection = document.getElementById('results');
    skillsList.innerHTML = '';  // Clear previous results

    if (!niche) {
        displayMessage('⚠️ Please select a niche to find relevant skills.', 'error');
        return;
    }

    // Clear progress bar container if it exists
    const existingProgressBar = document.getElementById('progress-bar-container');
    if (existingProgressBar) {
        existingProgressBar.remove();
    }

    // Create and display progress bar
    const progressBarContainer = createProgressBar();
    skillsList.appendChild(createLoadingMessage());
    skillsList.appendChild(progressBarContainer);

    // Simulate progress
    simulateProgress(progressBarContainer.querySelector('#progress-bar'), () => {
        displaySkills(niche, skills[niche] || []);
    });

    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function createProgressBar() {
    const container = document.createElement('div');
    container.id = 'progress-bar-container';
    container.style.cssText = 'width: 100%; background-color: #ccc; border-radius: 8px; margin: 1em 0;';

    const progressBar = document.createElement('div');
    progressBar.id = 'progress-bar';
    progressBar.style.cssText = 'width: 0%; height: 10px; background-color: #0073e6; border-radius: 8px;';
    container.appendChild(progressBar);

    return container;
}

function createLoadingMessage() {
    const loadingMessage = document.createElement('li');
    loadingMessage.textContent = '🔄 Loading skills, please wait...';
    loadingMessage.style.fontWeight = 'bold';
    loadingMessage.style.color = '#555';
    return loadingMessage;
}

function displayMessage(message, type) {
    const messageItem = document.createElement('li');
    messageItem.textContent = message;
    if (type === 'error') {
        messageItem.style.color = '#ff3333';
        messageItem.style.fontWeight = 'bold';
    }
    document.getElementById('skills-list').appendChild(messageItem);
}

function displaySkills(niche, skills) {
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';  // Clear loading message

    if (skills.length > 0) {
        skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = `⭐ ${skill}`;
            li.style.color = '#0073e6';
            li.style.fontWeight = 'bold';
            skillsList.appendChild(li);
        });
    } else {
        displayMessage('❌ No skills found for this niche.', 'error');
    }
}

function simulateProgress(progressBar, onComplete) {
    let progress = 0;
    const interval = setInterval(() => {
        progress += 20;
        progressBar.style.width = `${progress}%`;
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(onComplete, 300);  // Minor delay for smoother experience
        }
    }, 200);
}
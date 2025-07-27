// Main page functionality for loading and displaying resume list
async function loadResumeList() {
    try {
        const response = await fetch('data/resumes.json');
        const data = await response.json();
        displayResumeList(data.resumes);
    } catch (error) {
        console.error('Error loading resume list:', error);
        displayErrorMessage();
    }
}

function displayResumeList(resumes) {
    const resumeGrid = document.querySelector('.resume-grid');
    if (!resumeGrid) return;

    resumeGrid.innerHTML = '';

    resumes.forEach(resume => {
        const resumeCard = createResumeCard(resume);
        resumeGrid.appendChild(resumeCard);
    });
}

function createResumeCard(resume) {
    const article = document.createElement('article');
    article.className = 'resume-card';

    article.innerHTML = `
        <div class="resume-preview">
            <h3 class="resume-name">${resume.name}</h3>
            <p class="resume-title">${resume.title}</p>
            <p class="resume-location">${resume.location}</p>
            <p class="resume-summary">${resume.summary}</p>
            <div class="resume-skills">
                ${resume.featured_skills.map(skill => 
                    `<span class="skill-tag">${skill}</span>`
                ).join('')}
            </div>
        </div>
        <div class="resume-actions">
            <a href="${resume.url}" class="btn btn-primary">View Resume</a>
            <a href="${resume.url}" class="btn btn-secondary" target="_blank">Open in New Tab</a>
        </div>
    `;

    return article;
}

function displayErrorMessage() {
    const resumeGrid = document.querySelector('.resume-grid');
    if (!resumeGrid) return;

    resumeGrid.innerHTML = `
        <div class="error-message">
            <p>Sorry, there was an error loading the resume list. Please try again later.</p>
        </div>
    `;
}

// Load resume list when page loads
document.addEventListener('DOMContentLoaded', loadResumeList);
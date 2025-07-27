// Individual resume page functionality
async function loadResume() {
    // Extract resume ID from URL path
    const pathParts = window.location.pathname.split('/');
    const resumeId = pathParts[pathParts.length - 2] || pathParts[pathParts.length - 1];
    
    if (!resumeId) {
        displayErrorMessage();
        return;
    }

    try {
        const response = await fetch(`../../data/${resumeId}.json`);
        if (!response.ok) {
            throw new Error('Resume not found');
        }
        const resumeData = await response.json();
        displayResume(resumeData);
    } catch (error) {
        console.error('Error loading resume:', error);
        displayErrorMessage();
    }
}

function displayResume(resume) {
    // Update page title
    document.title = `${resume.name} - ${resume.title.split('|')[0].trim()} Resume`;

    // Update header information
    updateHeader(resume);
    
    // Update profile summary
    updateProfileSummary(resume);
    
    // Update experience section
    updateExperience(resume);
    
    // Update skills section
    updateSkills(resume);
    
    // Update education section
    updateEducation(resume);
    
    // Update certifications section
    updateCertifications(resume);
    
    // Update projects section
    updateProjects(resume);
    
    // Update languages section
    updateLanguages(resume);
    
    // Update sidebar sections
    updateSidebarEducation(resume);
    updateSidebarLanguages(resume);
    updatePersonalSkills(resume);
}

function updateHeader(resume) {
    // Update original header elements (for backward compatibility)
    const nameEl = document.querySelector('.name');
    const titleEl = document.querySelector('.title');
    const locationEl = document.querySelector('.location');
    
    if (nameEl) nameEl.textContent = resume.name;
    if (titleEl) titleEl.textContent = resume.title;
    if (locationEl) locationEl.textContent = resume.location;

    // Update new content header elements
    const contentNameEl = document.querySelector('.content-name');
    const contentTitleEl = document.querySelector('.content-title');
    
    if (contentNameEl) contentNameEl.textContent = resume.name;
    if (contentTitleEl) contentTitleEl.textContent = resume.title;

    // Update profile section in sidebar
    const profilePhotoEl = document.getElementById('profile-photo');
    const profileNameEl = document.getElementById('profile-name');
    const profileTitleEl = document.getElementById('profile-title');
    
    if (profilePhotoEl) {
        // Create initials from name
        const initials = resume.name.split(' ').map(word => word.charAt(0)).join('');
        profilePhotoEl.textContent = initials;
    }
    if (profileNameEl) profileNameEl.textContent = resume.name;
    if (profileTitleEl) profileTitleEl.textContent = resume.title;

    // Update contact information in header
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo && resume.contact) {
        contactInfo.innerHTML = `
            <div class="contact-item">
                <span class="contact-label">Email:</span>
                <a href="mailto:${resume.contact.email}">${resume.contact.email}</a>
            </div>
            <div class="contact-item">
                <span class="contact-label">Phone:</span>
                <span>${resume.contact.phone}</span>
            </div>
            <div class="contact-item">
                <span class="contact-label">LinkedIn:</span>
                <a href="${resume.contact.linkedin}" target="_blank">${resume.contact.linkedin.replace('https://', '').replace('www.', '')}</a>
            </div>
            <div class="contact-item">
                <span class="contact-label">Portfolio:</span>
                <a href="${resume.contact.portfolio}" target="_blank">${resume.contact.portfolio.replace('https://', '')}</a>
            </div>
        `;
    }

    // Update sidebar contact information
    const sidebarContactInfo = document.querySelector('.contact-info-sidebar');
    if (sidebarContactInfo && resume.contact) {
        sidebarContactInfo.innerHTML = `
            <div class="sidebar-contact-item">
                <span class="contact-icon">📧</span>
                <a href="mailto:${resume.contact.email}">${resume.contact.email}</a>
            </div>
            <div class="sidebar-contact-item">
                <span class="contact-icon">📱</span>
                <span>${resume.contact.phone}</span>
            </div>
            <div class="sidebar-contact-item">
                <span class="contact-icon">💼</span>
                <a href="${resume.contact.linkedin}" target="_blank">LinkedIn Profile</a>
            </div>
            <div class="sidebar-contact-item">
                <span class="contact-icon">🌐</span>
                <a href="${resume.contact.portfolio}" target="_blank">Portfolio</a>
            </div>
            ${resume.location ? `<div class="sidebar-contact-item">
                <span class="contact-icon">📍</span>
                <span>${resume.location}</span>
            </div>` : ''}
        `;
    }
}

function updateProfileSummary(resume) {
    const profileSection = document.querySelector('.profile-summary p');
    if (profileSection) {
        profileSection.textContent = resume.profile_summary;
    }
}

function updateExperience(resume) {
    const experienceSection = document.querySelector('.experience');
    if (!experienceSection || !resume.experience) return;

    // Clear existing content except the heading
    const heading = experienceSection.querySelector('h3');
    experienceSection.innerHTML = '';
    experienceSection.appendChild(heading);

    resume.experience.forEach(job => {
        const jobArticle = document.createElement('article');
        jobArticle.className = 'job';
        
        jobArticle.innerHTML = `
            <div class="job-header">
                <div class="job-title-company">
                    <h4 class="job-title">${job.role}</h4>
                    <p class="company">${job.company}</p>
                </div>
                <div class="job-details">
                    <p class="job-location">${job.location}</p>
                    <p class="job-dates">${job.dates}</p>
                </div>
            </div>
            <div class="job-content">
                <div class="responsibilities">
                    <h5>Key Responsibilities:</h5>
                    <ul>
                        ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    </ul>
                </div>
                <div class="achievements">
                    <h5>Key Achievements:</h5>
                    <ul>
                        ${job.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        experienceSection.appendChild(jobArticle);
    });
}

function updateSkills(resume) {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid || !resume.skills) return;

    // Define skill levels for better visual variety
    const skillLevels = ['Expert', 'Advanced', 'Proficient', 'Intermediate', 'Advanced', 'Expert', 'Proficient'];

    function createSkillHTML(skills, categoryIndex = 0) {
        return skills.map((skill, index) => {
            const levelIndex = (categoryIndex * 10 + index) % skillLevels.length;
            const level = skillLevels[levelIndex];
            return `<div class="skill-tag">
                <div class="skill-name">
                    <span>${skill}</span>
                    <span class="skill-level">${level}</span>
                </div>
                <div class="skill-progress">
                    <div class="skill-progress-bar"></div>
                </div>
            </div>`;
        }).join('');
    }

    skillsGrid.innerHTML = `
        <div class="skill-category">
            <h4>Languages & Frameworks</h4>
            <div class="skill-tags">
                ${createSkillHTML(resume.skills.languages_frameworks, 0)}
            </div>
        </div>
        <div class="skill-category">
            <h4>Backend & Databases</h4>
            <div class="skill-tags">
                ${createSkillHTML(resume.skills.backend_databases, 1)}
            </div>
        </div>
        <div class="skill-category">
            <h4>DevOps & Tools</h4>
            <div class="skill-tags">
                ${createSkillHTML(resume.skills.devops_tools, 2)}
            </div>
        </div>
        <div class="skill-category">
            <h4>Approach & Methodology</h4>
            <div class="skill-tags">
                ${createSkillHTML(resume.skills.approach, 3)}
            </div>
        </div>
    `;
}

function updateEducation(resume) {
    const educationItems = document.querySelector('.education-items');
    if (!educationItems || !resume.education) return;

    educationItems.innerHTML = '';

    resume.education.forEach(edu => {
        const eduArticle = document.createElement('article');
        eduArticle.className = 'education-item';
        
        eduArticle.innerHTML = `
            <div class="degree-info">
                <h4>${edu.degree}</h4>
                ${edu.specialization ? `<p class="specialization">${edu.specialization}</p>` : ''}
                <p class="institution">${edu.institution}</p>
                <p class="location">${edu.location}</p>
            </div>
            <div class="year">${edu.year_completed}</div>
        `;
        
        educationItems.appendChild(eduArticle);
    });
}

function updateCertifications(resume) {
    const certificationItems = document.querySelector('.certification-items');
    if (!certificationItems || !resume.certifications) return;

    certificationItems.innerHTML = '';

    resume.certifications.forEach(cert => {
        const certArticle = document.createElement('article');
        certArticle.className = 'certification-item';
        
        certArticle.innerHTML = `
            <h4>${cert.name}</h4>
            <p class="year">${cert.year_completed}</p>
        `;
        
        certificationItems.appendChild(certArticle);
    });
}

function updateProjects(resume) {
    const projectsSection = document.querySelector('.projects');
    if (!projectsSection || !resume.projects) return;

    // Clear existing content except the heading
    const heading = projectsSection.querySelector('h3');
    projectsSection.innerHTML = '';
    projectsSection.appendChild(heading);

    resume.projects.forEach(project => {
        const projectArticle = document.createElement('article');
        projectArticle.className = 'project';
        
        projectArticle.innerHTML = `
            <h4>${project.name}</h4>
            <p class="project-description">${project.description}</p>
            <div class="tech-stack">
                ${project.tech_stack.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('')}
            </div>
        `;
        
        projectsSection.appendChild(projectArticle);
    });
}

function updateLanguages(resume) {
    const languageList = document.querySelector('.language-list');
    if (!languageList || !resume.languages) return;

    languageList.innerHTML = resume.languages.map(lang => 
        `<span class="language">${lang}</span>`
    ).join('');
}

function displayErrorMessage() {
    const container = document.querySelector('.resume-main .container');
    if (!container) return;

    container.innerHTML = `
        <div class="error-message">
            <h3>Resume Not Found</h3>
            <p>Sorry, the requested resume could not be found. Please check the URL or return to the resume list.</p>
            <a href="../../" class="btn btn-primary">← Back to Resume List</a>
        </div>
    `;
}

function updateSidebarEducation(resume) {
    const sidebarEducationItems = document.querySelector('.education-section .education-items');
    if (!sidebarEducationItems || !resume.education) return;

    sidebarEducationItems.innerHTML = '';

    resume.education.forEach(edu => {
        const eduDiv = document.createElement('div');
        eduDiv.className = 'sidebar-education-item';
        
        eduDiv.innerHTML = `
            <div class="sidebar-degree">${edu.degree}</div>
            ${edu.specialization ? `<div class="sidebar-specialization">${edu.specialization}</div>` : ''}
            <div class="sidebar-institution">${edu.institution}</div>
            <div class="sidebar-year">${edu.year_completed}</div>
        `;
        
        sidebarEducationItems.appendChild(eduDiv);
    });
}

function updateSidebarLanguages(resume) {
    const sidebarLanguageList = document.querySelector('.languages-section .language-list');
    if (!sidebarLanguageList || !resume.languages) return;

    sidebarLanguageList.innerHTML = resume.languages.map(lang => 
        `<div class="sidebar-language">${lang}</div>`
    ).join('');
}

function updatePersonalSkills(resume) {
    const personalSkillsList = document.querySelector('.personal-skills-list');
    if (!personalSkillsList || !resume.skills) return;

    // Create a list of personal/soft skills combining approach skills with additional ones
    const personalSkills = [
        'TEAMWORK', 
        'CREATIVE', 
        'INNOVATIVE', 
        'COMMUNICATION',
        ...(resume.skills.approach || [])
    ];
    
    personalSkillsList.innerHTML = personalSkills.map(skill => 
        `<div class="sidebar-skill">${skill.toUpperCase()}</div>`
    ).join('');
}

// Load resume when page loads
document.addEventListener('DOMContentLoaded', loadResume);
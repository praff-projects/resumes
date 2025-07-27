/**
 * Resume Page Functionality
 * Handles loading and displaying individual resume data from JSON files
 */

/**
 * Loads resume data from JSON file based on current URL path
 * Extracts resume ID from URL and fetches corresponding JSON data
 * Displays resume content or error message if loading fails
 * @async
 * @function loadResume
 * @returns {Promise<void>} Promise that resolves when resume is loaded and displayed
 */
async function loadResume() {
    // Extract resume ID from URL path (e.g., /resumes/john-doe/ -> john-doe)
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

/**
 * Main function to display resume data by updating all page sections
 * Coordinates the rendering of all resume sections and components
 * @param {Object} resume - Resume data object containing all sections
 * @param {string} resume.name - Full name of the person
 * @param {string} resume.title - Job title/professional title
 * @param {string} resume.location - Geographic location
 * @param {Object} resume.contact - Contact information
 * @param {string} resume.profile_summary - Professional summary text
 * @param {Array} resume.experience - Array of work experience objects
 * @param {Object} resume.skills - Skills organized by category
 * @param {Array} resume.education - Educational background
 * @param {Array} resume.certifications - Professional certifications
 * @param {Array} resume.projects - Notable projects
 * @param {Array} resume.languages - Spoken languages
 */
function displayResume(resume) {
    // Update page title for SEO and browser tab
    document.title = `${resume.name} - ${resume.title.split('|')[0].trim()} Resume`;

    // Update all page sections with resume data
    updateHeader(resume);
    updateProfileSummary(resume);
    updateExperience(resume);
    updateSkills(resume);
    updateEducation(resume);
    updateCertifications(resume);
    updateProjects(resume);
    updateLanguages(resume);
    
    // Update sidebar sections for modern two-column layout
    updateSidebarEducation(resume);
    updateSidebarLanguages(resume);
    updatePersonalSkills(resume);
}

/**
 * Updates header sections with personal information and contact details
 * Handles both the traditional header and the modern two-column layout headers
 * @param {Object} resume - Resume data object
 * @param {string} resume.name - Full name
 * @param {string} resume.title - Professional title
 * @param {string} resume.location - Geographic location
 * @param {Object} resume.contact - Contact information object
 * @param {string} resume.contact.email - Email address
 * @param {string} resume.contact.phone - Phone number
 * @param {string} resume.contact.linkedin - LinkedIn profile URL
 * @param {string} resume.contact.portfolio - Portfolio website URL
 */
function updateHeader(resume) {
    // Update original header elements for backward compatibility
    const nameEl = document.querySelector('.name');
    const titleEl = document.querySelector('.title');
    const locationEl = document.querySelector('.location');
    
    if (nameEl) nameEl.textContent = resume.name;
    if (titleEl) titleEl.textContent = resume.title;
    if (locationEl) locationEl.textContent = resume.location;

    // Update modern two-column layout header elements
    const contentNameEl = document.querySelector('.content-name');
    const contentTitleEl = document.querySelector('.content-title');
    
    if (contentNameEl) contentNameEl.textContent = resume.name;
    if (contentTitleEl) contentTitleEl.textContent = resume.title;

    // Update sidebar profile section with basic info
    const profileNameEl = document.getElementById('profile-name');
    const profileTitleEl = document.getElementById('profile-title');
    
    if (profileNameEl) profileNameEl.textContent = resume.name;
    if (profileTitleEl) profileTitleEl.textContent = resume.title;

    // Update main header contact information
    updateMainHeaderContact(resume);
    
    // Update sidebar contact information with enhanced styling
    updateSidebarContact(resume);
}
/**
 * Updates main header contact information section
 * @param {Object} resume - Resume data with contact information
 */
function updateMainHeaderContact(resume) {
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
}

/**
 * Updates sidebar contact information with emoji icons and styling
 * @param {Object} resume - Resume data with contact information
 */
function updateSidebarContact(resume) {
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

/**
 * Updates the profile summary section with professional summary text
 * @param {Object} resume - Resume data object
 * @param {string} resume.profile_summary - Professional summary text
 */
function updateProfileSummary(resume) {
    const profileSection = document.querySelector('.profile-summary p');
    if (profileSection) {
        profileSection.textContent = resume.profile_summary;
    }
}

/**
 * Updates the professional experience section with job history
 * Creates timeline-connected job entries with responsibilities and achievements
 * @param {Object} resume - Resume data object
 * @param {Array} resume.experience - Array of job experience objects
 * @param {string} resume.experience[].role - Job title/role
 * @param {string} resume.experience[].company - Company name
 * @param {string} resume.experience[].location - Job location
 * @param {string} resume.experience[].dates - Employment dates
 * @param {Array} resume.experience[].responsibilities - List of key responsibilities
 * @param {Array} resume.experience[].achievements - List of key achievements
 */
function updateExperience(resume) {
    const experienceSection = document.querySelector('.experience');
    if (!experienceSection || !resume.experience) return;

    // Preserve the section heading and clear existing job entries
    const heading = experienceSection.querySelector('h3');
    experienceSection.innerHTML = '';
    experienceSection.appendChild(heading);

    // Create job entries with timeline integration
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

/**
 * Updates the technical skills section with progress bars and categorized skills
 * Creates skill categories with visual progress indicators for skill levels
 * @param {Object} resume - Resume data object
 * @param {Object} resume.skills - Skills object organized by categories
 * @param {Array} resume.skills.languages_frameworks - Programming languages and frameworks
 * @param {Array} resume.skills.backend_databases - Backend technologies and databases
 * @param {Array} resume.skills.devops_tools - DevOps and development tools
 * @param {Array} resume.skills.approach - Methodologies and approaches
 */
function updateSkills(resume) {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid || !resume.skills) return;

    // Define skill proficiency levels for visual variety and realism
    const skillLevels = ['Expert', 'Advanced', 'Proficient', 'Intermediate', 'Advanced', 'Expert', 'Proficient'];

    /**
     * Helper function to create skill HTML with progress bars
     * @param {Array} skills - Array of skill names
     * @param {number} categoryIndex - Category index for level variation
     * @returns {string} HTML string for skill tags with progress bars
     */
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

    // Render skills grid with categorized skill sections
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

/**
 * Updates the education section with academic background information
 * @param {Object} resume - Resume data object
 * @param {Array} resume.education - Array of education objects
 * @param {string} resume.education[].degree - Degree name
 * @param {string} resume.education[].specialization - Field of specialization (optional)
 * @param {string} resume.education[].institution - Educational institution name
 * @param {string} resume.education[].location - Institution location
 * @param {string} resume.education[].year_completed - Year of completion
 */
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

/**
 * Updates the certifications section with professional credentials
 * @param {Object} resume - Resume data object
 * @param {Array} resume.certifications - Array of certification objects
 * @param {string} resume.certifications[].name - Certification name
 * @param {string} resume.certifications[].year_completed - Year obtained
 */
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

/**
 * Updates the projects section with notable work and personal projects
 * @param {Object} resume - Resume data object
 * @param {Array} resume.projects - Array of project objects
 * @param {string} resume.projects[].name - Project name
 * @param {string} resume.projects[].description - Project description
 * @param {Array} resume.projects[].tech_stack - Technologies used in the project
 */
function updateProjects(resume) {
    const projectsSection = document.querySelector('.projects');
    if (!projectsSection || !resume.projects) return;

    // Preserve the section heading and clear existing project entries
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

/**
 * Updates the languages section with spoken languages
 * @param {Object} resume - Resume data object
 * @param {Array} resume.languages - Array of language strings
 */
function updateLanguages(resume) {
    const languageList = document.querySelector('.language-list');
    if (!languageList || !resume.languages) return;

    languageList.innerHTML = resume.languages.map(lang => 
        `<span class="language">${lang}</span>`
    ).join('');
}

/**
 * Displays error message when resume data cannot be loaded
 * Shows user-friendly error message with navigation back to resume list
 */
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

/**
 * Updates the sidebar education section with compact education display
 * @param {Object} resume - Resume data object
 * @param {Array} resume.education - Array of education objects
 */
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

/**
 * Updates the sidebar languages section with compact language tags
 * @param {Object} resume - Resume data object
 * @param {Array} resume.languages - Array of language strings
 */
function updateSidebarLanguages(resume) {
    const sidebarLanguageList = document.querySelector('.languages-section .language-list');
    if (!sidebarLanguageList || !resume.languages) return;

    sidebarLanguageList.innerHTML = resume.languages.map(lang => 
        `<div class="sidebar-language">${lang}</div>`
    ).join('');
}

/**
 * Updates the personal skills section in sidebar with soft skills and methodologies
 * Combines predefined personal skills with approach skills from resume data
 * @param {Object} resume - Resume data object
 * @param {Object} resume.skills - Skills object
 * @param {Array} resume.skills.approach - Array of methodology/approach skills
 */
function updatePersonalSkills(resume) {
    const personalSkillsList = document.querySelector('.personal-skills-list');
    if (!personalSkillsList || !resume.skills) return;

    // Combine predefined personal/soft skills with approach skills from resume data
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

/**
 * Initialize resume loading when DOM is fully loaded
 * Entry point for the resume page functionality
 */
document.addEventListener('DOMContentLoaded', loadResume);
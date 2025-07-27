# Professional Resumes Website

A clean, professional website for hosting resumes with GitHub Pages deployment. Built with semantic HTML5, responsive CSS, and automated deployment workflows.

## 🌐 Live Website

Visit the live website at: [https://praff-projects.github.io/resumes](https://praff-projects.github.io/resumes)

## 📋 Current Resumes

- **Prafful Jagtap** - Senior Software Engineer | Full‑Stack & Product Engineer
  - URL: `/resumes/prafful-jagtap/`
  - Location: Sydney, Australia
  - Specialties: TypeScript, React Native, Node.js, Event-driven Architecture

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Print-Friendly**: Professional print styling for PDF generation and physical printing
- **Semantic HTML5**: Proper document structure and accessibility
- **Professional Styling**: Clean, modern design suitable for job applications
- **GitHub Pages Deployment**: Automated deployment on every push to main
- **Preview on PRs**: Preview builds on pull requests
- **Clean URLs**: SEO-friendly routes like `/resumes/name/`
- **JSON-Based Data**: Separated content from presentation for easy maintenance
- **Dynamic Loading**: JavaScript-powered content loading from JSON files
- **Template-Based**: Reusable HTML templates with data population
- **Error Handling**: Graceful handling of missing or malformed data files

## 📁 File Structure

```
/
├── index.html                    # Main landing page listing all resumes
├── css/
│   ├── styles.css               # Main responsive stylesheet
│   └── print.css                # Print-specific styles
├── js/
│   ├── main.js                  # JavaScript for main page data loading
│   └── resume.js                # JavaScript for individual resume pages
├── data/
│   ├── resumes.json             # Index of all available resumes
│   └── [resume-id].json         # Individual resume data files
├── resumes/
│   └── [resume-id]/
│       └── index.html           # Individual resume page template
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions deployment workflow
└── README.md                    # This file
```

## ➕ Adding a New Resume

The website now uses a JSON-based data structure that separates content from presentation. To add a new resume, follow these steps:

### 1. Create Resume Data File

Create a new JSON file in the `/data/` directory with the resume ID as the filename:

```bash
# Example: for John Doe, create data/john-doe.json
```

Use the following structure (based on `/data/prafful-jagtap.json`):

```json
{
  "id": "john-doe",
  "name": "John Doe",
  "title": "Job Title | Specialization",
  "contact": {
    "email": "john.doe@email.com",
    "phone": "+1-XXX-XXX-XXXX",
    "linkedin": "https://www.linkedin.com/in/john-doe",
    "portfolio": "https://github.com/johndoe"
  },
  "location": "City, Country",
  "profile_summary": "Professional summary...",
  "experience": [
    {
      "role": "Job Title",
      "company": "Company Name",
      "location": "City, State",
      "dates": "Start Date – End Date",
      "responsibilities": [
        "Responsibility 1",
        "Responsibility 2"
      ],
      "achievements": [
        "Achievement 1",
        "Achievement 2"
      ]
    }
  ],
  "skills": {
    "languages_frameworks": ["Skill1", "Skill2"],
    "backend_databases": ["Skill1", "Skill2"],
    "devops_tools": ["Skill1", "Skill2"],
    "approach": ["Approach1", "Approach2"]
  },
  "education": [
    {
      "degree": "Degree Name",
      "specialization": "Specialization (optional)",
      "institution": "Institution Name",
      "location": "City, Country",
      "year_completed": 2023
    }
  ],
  "certifications": [
    {
      "name": "Certification Name",
      "year_completed": 2023
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Project description",
      "tech_stack": ["Tech1", "Tech2"]
    }
  ],
  "languages": ["Language1", "Language2"]
}
```

### 2. Update Resume Index

Add the new resume to `/data/resumes.json`:

```json
{
  "resumes": [
    {
      "id": "john-doe",
      "name": "John Doe",
      "title": "Job Title | Specialization",
      "location": "City, Country",
      "summary": "Brief summary for the main page...",
      "featured_skills": ["Skill1", "Skill2", "Skill3", "Skill4"],
      "url": "resumes/john-doe/"
    }
  ]
}
```

### 3. Create Resume Directory and Page

Create the directory structure and copy the resume template:

```bash
mkdir resumes/john-doe
cp resumes/prafful-jagtap/index.html resumes/john-doe/index.html
```

The HTML template will automatically load the data from the JSON file based on the URL path.

### 4. Test Locally

Test your changes locally by serving the files through a web server (required for JSON loading):

```bash
# Navigate to the project directory
cd /path/to/resumes

# Start a local web server (Python 3)
python3 -m http.server 8000

# Or using Node.js (if available)
npx http-server -p 8000

# Or using PHP (if available)
php -S localhost:8000
```

Then open http://localhost:8000 in your browser and verify:

- The main page loads and displays all resumes from the JSON data
- Individual resume pages load correctly with data populated from JSON
- Navigation works between pages
- Responsive design looks good on different screen sizes
- Print preview shows professional formatting
- All links work correctly
- Error handling works if JSON files are missing or malformed

### 5. Commit and Deploy

```bash
git add .
git commit -m "Add resume for John Doe"
git push origin main
```

The GitHub Actions workflow will automatically deploy your changes to GitHub Pages.

## 🎨 Customization

### Styling

The website uses two main CSS files:

- `css/styles.css` - Main responsive styles for screen viewing
- `css/print.css` - Print-specific styles for PDF generation

### Colors

The main color scheme uses:

- Primary: #3498db (blue)
- Secondary: #2c3e50 (dark blue)
- Success: #27ae60 (green)
- Accent: #e74c3c (red)

### Typography

The site uses the Segoe UI font family with appropriate fallbacks for cross-platform compatibility.

## 🔧 Development

### Prerequisites

- Git
- A modern web browser
- Basic knowledge of HTML and CSS

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/praff-projects/resumes.git
   cd resumes
   ```

2. Open `index.html` in your browser to view the main page

3. Navigate to any resume page by clicking the links or directly opening the HTML files

### Testing Print Styles

To test print styles:

1. Open any resume page in your browser
2. Press `Ctrl+P` (or `Cmd+P` on Mac) to open print preview
3. Verify the layout looks professional and print-friendly

## 🚀 Deployment

The site is automatically deployed to GitHub Pages using GitHub Actions:

- **Main Branch**: Automatic deployment to production
- **Pull Requests**: Preview builds with status comments
- **Manual**: Can be triggered manually from the Actions tab

### GitHub Pages Configuration

Make sure GitHub Pages is configured in repository settings:

1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The site will be available at `https://praff-projects.github.io/resumes`

## 📱 Browser Support

The website supports all modern browsers:

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-resume`
3. Make your changes following the guidelines above
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For questions or support, please:

1. Check this README for common tasks
2. Open an issue on GitHub
3. Follow the file structure and naming conventions shown in existing resumes
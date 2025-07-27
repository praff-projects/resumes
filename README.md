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

## 📁 File Structure

```
/
├── index.html                    # Main landing page listing all resumes
├── css/
│   ├── styles.css               # Main responsive stylesheet
│   └── print.css                # Print-specific styles
├── resumes/
│   └── prafful-jagtap/
│       └── index.html           # Individual resume page
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions deployment workflow
└── README.md                    # This file
```

## ➕ Adding a New Resume

To add a new resume to the website, follow these steps:

### 1. Create Resume Directory

Create a new directory under `/resumes/` with the person's name in lowercase with hyphens:

```bash
mkdir resumes/john-doe
```

### 2. Create Resume HTML File

Create an `index.html` file in the new directory. Use `/resumes/prafful-jagtap/index.html` as a template:

```bash
cp resumes/prafful-jagtap/index.html resumes/john-doe/index.html
```

### 3. Update Resume Content

Edit the new `index.html` file and update:

- `<title>` tag with the person's name
- `<meta name="description">` with relevant description
- All personal information in the header section
- Experience, skills, education, and other sections
- Update the back navigation links to point to `../../`

### 4. Add to Main Index Page

Edit `/index.html` and add a new resume card in the `.resume-grid` section:

```html
<article class="resume-card">
    <div class="resume-preview">
        <h3 class="resume-name">John Doe</h3>
        <p class="resume-title">Job Title</p>
        <p class="resume-location">Location</p>
        <p class="resume-summary">Brief summary...</p>
        <div class="resume-skills">
            <span class="skill-tag">Skill 1</span>
            <span class="skill-tag">Skill 2</span>
            <!-- Add more skills -->
        </div>
    </div>
    <div class="resume-actions">
        <a href="resumes/john-doe/" class="btn btn-primary">View Resume</a>
        <a href="resumes/john-doe/" class="btn btn-secondary" target="_blank">Open in New Tab</a>
    </div>
</article>
```

### 5. Test Locally

Test your changes locally by opening the HTML files in a web browser. Verify:

- Navigation works between pages
- Responsive design looks good on different screen sizes
- Print preview shows professional formatting
- All links work correctly

### 6. Commit and Deploy

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
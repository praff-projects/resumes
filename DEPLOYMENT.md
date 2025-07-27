# Multi-Branch Deployment Documentation

## Overview

This repository now supports multi-branch deployment to GitHub Pages, allowing live previews of changes on any branch while maintaining production stability on the main branch.

## Deployment Strategy

### Production Deployment
- **Trigger**: Push to `main` branch or manual deployment with "production" target
- **URL**: `https://praff-projects.github.io/resumes/`
- **Behavior**: Completely replaces the GitHub Pages site content

### Preview Deployment
- **Trigger**: Push to any non-main branch or manual deployment with "preview" target
- **URL**: `https://praff-projects.github.io/resumes/preview/{branch-name}/`
- **Behavior**: Preserves existing content and adds preview in subdirectory

## Workflow Features

### 1. Automatic Branch Detection
- Main branch → Production deployment
- Feature branches → Preview deployment
- Branch names are sanitized for URL safety (special characters become hyphens)

### 2. Content Preservation
- Preview deployments download existing site content before deploying
- New preview content is added without overwriting existing previews
- Production deployments reset the entire site

### 3. Manual Deployment Options
- **Auto**: Default behavior (main→production, others→preview)
- **Production**: Force production deployment from any branch
- **Preview**: Force preview deployment from any branch

### 4. Enhanced PR Comments
- Pull requests receive comments with actual preview URLs
- Comments include branch name and deployment status

## Usage Examples

### Feature Branch Development
1. Create feature branch: `git checkout -b feature/new-resume`
2. Make changes and push: `git push origin feature/new-resume`
3. Workflow automatically deploys to: `https://praff-projects.github.io/resumes/preview/feature-new-resume/`
4. Preview URL is available immediately for testing

### Manual Production Reset
1. Go to Actions tab in GitHub
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Choose "production" as deployment target
5. Select main branch and run

### Emergency Preview Deploy
1. Use manual workflow dispatch
2. Choose "preview" as deployment target
3. Select any branch to create a preview

## File Structure After Deployment

```
https://praff-projects.github.io/resumes/
├── index.html                    # Production site (main branch)
├── css/                         # Production assets
├── js/                          # Production assets
├── data/                        # Production data
├── resumes/                     # Production resumes
└── preview/                     # Preview environment
    ├── index.html              # Preview directory listing
    ├── feature-branch-1/       # Preview from feature-branch-1
    │   ├── index.html
    │   ├── css/
    │   └── ...
    └── feature-branch-2/       # Preview from feature-branch-2
        ├── index.html
        ├── css/
        └── ...
```

## Technical Implementation

### Jekyll Configuration
- Dynamic baseurl configuration for subdirectory support
- Config overrides generated per deployment
- Proper URL handling for both production and preview

### GitHub Actions Workflow
- **Config Job**: Determines deployment target and paths
- **Build Job**: Creates Jekyll site with appropriate configuration
- **Deploy Job**: Handles unified GitHub Pages deployment
- **Notification Job**: Updates PR comments with preview URLs

### Content Merging
- Uses `wget` to download existing site content
- Merges new content with preserved existing content
- Handles failures gracefully (deploys standalone if download fails)

## Benefits

1. **Live Testing**: Every branch gets a live preview URL
2. **No Conflicts**: Multiple feature branches can coexist
3. **Production Safety**: Main branch deployments reset everything
4. **Easy Collaboration**: Share preview URLs with team members
5. **Manual Control**: Override automatic behavior when needed

## Troubleshooting

### Preview Not Accessible
- Check if GitHub Pages is enabled in repository settings
- Verify the branch was pushed after workflow changes
- Check GitHub Actions logs for deployment errors

### Broken Links in Preview
- Ensure all links use relative paths or Jekyll URL helpers
- Check that assets are properly referenced
- Verify Jekyll configuration is correct

### Production Site Issues
- Deploy main branch manually to reset
- Check if any preview deployments modified root content
- Verify main branch has latest changes

## Configuration Files

- `.github/workflows/deploy.yml`: Main workflow definition
- `_config.yml`: Jekyll configuration with baseurl support
- `.gitignore`: Excludes build artifacts and config overrides
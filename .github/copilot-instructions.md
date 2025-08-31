# HR Repository Development Instructions

**ALWAYS follow these instructions first and fallback to additional search and context gathering only if the information in these instructions is incomplete or found to be in error.**

## Current Repository State

This repository is currently in a minimal state with only a basic README.md file. There is no application code, build system, dependencies, or tests implemented yet.

## Working Effectively

### Initial Development Setup
When beginning development on this HR management system:

- Determine the technology stack for the HR application (e.g., Node.js, Python, Java, .NET, etc.)
- Set up appropriate project structure and configuration files
- Initialize package management (package.json for Node.js, requirements.txt for Python, etc.)
- Establish coding standards and linting configuration
- Set up testing framework
- Create CI/CD pipeline in .github/workflows/

### Current Available Commands
Since no build system exists yet, only basic git commands are available:

- `git status` - Check repository status
- `git log --oneline` - View commit history
- `ls -la` - List repository contents

### Repository Structure
```
.
├── .git/           # Git repository metadata
├── .github/        # GitHub configuration (created for these instructions)
│   └── copilot-instructions.md
└── README.md       # Basic repository description
```

## Validation

### Current Validation Steps
- Verify README.md exists and contains basic project information
- Confirm repository is properly initialized with git
- Check that .github/copilot-instructions.md exists and is readable

### Future Validation Requirements
When application code is added, always:
- Run all build commands with appropriate timeouts (60+ minutes for builds, 30+ minutes for tests)
- **NEVER CANCEL long-running builds or tests** - document expected completion times
- Test complete user scenarios, not just application startup
- Run linting and formatting tools before committing
- Execute end-to-end workflows that users would perform

## Getting Started with Development

Since this repository contains no application code yet, developers should:

1. **Define the HR system requirements** - What features will this HR system provide?
2. **Choose technology stack** - Select appropriate languages, frameworks, and tools
3. **Initialize project structure** - Create source code directories, configuration files
4. **Set up dependency management** - Add package.json, requirements.txt, or equivalent
5. **Configure development tools** - Set up linting, formatting, testing frameworks
6. **Create build system** - Add scripts for building, testing, and running the application
7. **Establish CI/CD** - Create GitHub Actions workflows for automated testing and deployment
8. **Add comprehensive tests** - Unit tests, integration tests, and end-to-end tests
9. **Update these instructions** - Modify this file to reflect the actual development workflow

## Common Tasks

### Repository Information
- **Repository size**: ~20KB (minimal - only README and git metadata)
- **Current files**: 2 (README.md and this instructions file)
- **Dependencies**: None currently defined
- **Build system**: Not implemented
- **Test framework**: Not implemented

### Expected File Locations (To Be Created)
Based on common HR system patterns, expect these directories when development begins:
- `src/` or `app/` - Application source code
- `tests/` or `__tests__/` - Test files
- `docs/` - Documentation
- `config/` - Configuration files
- `migrations/` or `database/` - Database setup and migrations
- `public/` or `static/` - Static assets (if web application)

## Important Notes

- **This repository is not yet a functional application** - it requires initial development setup
- **No build or test commands exist** - these need to be implemented when choosing a technology stack
- **No dependencies are defined** - package management files need to be created
- **No CI/CD exists** - GitHub Actions workflows need to be established
- Always update these instructions when the technology stack and development workflow are established
- When functional code exists, add specific timeout values and "NEVER CANCEL" warnings for time-consuming operations

## Troubleshooting

### Common Issues
- If looking for build commands: None exist yet - implement based on chosen technology stack
- If looking for test commands: No test framework configured - needs initial setup
- If looking for dependencies: No package management files exist - create based on technology choice
- If looking for application entry point: No application code exists - requires development

### Next Steps for Contributors
1. Review and update README.md with project vision and goals
2. Choose appropriate technology stack for HR management system
3. Set up project structure and development environment
4. Update these instructions with specific build, test, and run commands
5. Implement basic application functionality
6. Add comprehensive testing
7. Set up CI/CD pipeline
# Educate

A comprehensive React-based education platform with AI-powered learning features.

## Features

- AI-powered tutoring and content generation
- Interactive education modules
- Team collaboration tools
- Job search and career features
- Community forums

## Setup

### Prerequisites

- Node.js 16+
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SESHASHAYANAN/educate.git
   cd educate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your environment file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and add your API keys (see [Environment Variables](#environment-variables))

5. Start the development server:
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable | Description | Get Key From |
|----------|-------------|--------------|
| `REACT_APP_GROQ_API_KEY` | Groq AI API key for LLM features | [console.groq.com](https://console.groq.com) |
| `REACT_APP_GEMINI_API_KEY` | Google Gemini API key | [aistudio.google.com](https://aistudio.google.com) |
| `REACT_APP_PEXELS_API_KEY` | Pexels API for images | [pexels.com/api](https://www.pexels.com/api/) |
| `REACT_APP_FOURSQUARE_API_KEY` | Foursquare API for location data | [developer.foursquare.com](https://developer.foursquare.com) |
| `REACT_APP_GITHUB_API_KEY` | GitHub Personal Access Token | [github.com/settings/tokens](https://github.com/settings/tokens) |
| `REACT_APP_ORCA_API_KEY` | ORCA AI features (Groq endpoint) | [console.groq.com](https://console.groq.com) |
| `REACT_APP_XAI_GROK_API_KEY` | xAI Grok API key | [x.ai](https://x.ai) |
| `REACT_APP_WAN25_API_KEY` | Kie.ai WAN 2.5 video API | Contact provider |

> ⚠️ **Important**: Never commit your `.env` file. The `.gitignore` is configured to exclude it.

## Available Scripts

- `npm start` - Run development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run deploy` - Deploy to GitHub Pages

## Deployment

This project is configured for GitHub Pages deployment. The deployment is automated via GitHub Actions on push to the `main` branch.

## License

MIT

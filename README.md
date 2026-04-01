# Linux-like Portfolio Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/9818157c-d810-4ad6-b218-038707143a3c/deploy-status?style=flat-square)](https://app.netlify.com/sites/prasadkjose/deploys)
[![License](https://img.shields.io/github/license/prasadkjose/Kali-Linux-Portfolio?style=flat-square)](LICENSE)
[![Repo Size](https://img.shields.io/github/repo-size/prasadkjose/Kali-Linux-Portfolio?style=flat-square)](https://github.com/prasadkjose/Kali-Linux-Portfolio)
[![Top Language](https://img.shields.io/github/languages/top/prasadkjose/Kali-Linux-Portfolio?style=flat-square)](https://github.com/prasadkjose/Kali-Linux-Portfolio)

[![Live Demo](https://img.shields.io/badge/View%20Live%20Demo-prasadkjose.com-17BB98?style=for-the-badge)](https://prasadkjose.com)

My developer portfolio website themed after Linux, built with React & TypeScript, simulating a Linux desktop environment to showcase projects, resume, and contact information.

## 🚀 Features

- **Linux Desktop Experience**: With Linux themes and colours. Choose between Ubuntu, Kali and Fedora distros at any time and see the UI change. 
- **Interactive Terminal**: Built-in Linux Terminal for you command line junkies with autocomplete (TAB/Ctrl+i) and command history (Up/Down)
- **Rich Command Set**: Navigate through `about`, `help`, `projects`, `resume`, `socials`, `email`, `education`, and more
- **Keyboard-First Design**: Type commands, open windows, toggle fullscreen for optimal developer experience
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Dynamic Resume**: Choose between Ubuntu, Kali, and Fedora themes to view different professional resumes - Ubuntu shows Consultant resume, Kali shows Information Security resume, and Fedora shows SDE resume
- __Resource Preloading__: Critical assets are preloaded after the splash screen for faster subsequent renders.
- __Serverless Function__: A backend function proxies GraphQL API calls (GitHub fetching pinned repos for now) to keep the token server-side. Look at [serverless/readme](src/serverless/README.md)
- __Docker Support__: Dockerfile included for containerized deployment.

## 🛠️ Tech Stack

[![TypeScript](https://img.shields.io/badge/TypeScript-3.9%2B-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-17%2B-%2361DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-%40vitejs-%23646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Styled Components](https://img.shields.io/badge/Styled--Components-102029?style=flat-square&logo=styled-components&logoColor=white)](https://styled-components.com/)

## 📦 Installation & Setup

### Prerequisites

- Node.js (version 16 or higher)
- pnpm (recommended) or npm

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/prasadkjose/Linux-Portfolio.git
   cd Linux-Portfolio
   ```
2. **Install dependencies:**
   ```bash
   # Using pnpm (recommended)
   pnpm install
   
   # Or using npm
   npm install
   ```

3. **Start development server:**
   ```bash
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the portfolio

### Docker Setup

For containerized development:

```bash
# Build the Docker image
docker build -t prasad-portfolio .

# Run the container
docker run -p 127.0.0.1:3000:3000 prasad-portfolio
```

## 🎯 Usage

Once the application is running, you'll be greeted with a Linux-style desktop interface. Here are some commands you can try:

- `help` - Display available commands
- `about` - Learn about the developer
- `projects` - View featured projects
- `resume` - Access the professional resume
- `socials` - View social media links
- `email` - Get contact information
- `education` - View educational background
- `clear` - Clear the terminal output

### Keyboard Shortcuts

- **TAB** or **Ctrl+i** - Autocomplete commands
- **Up/Down Arrow** - Navigate command history
- **F11** - Toggle fullscreen mode

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a feature branch** with a descriptive name
4. **Make your changes** following our coding standards
5. **Test your changes** thoroughly
6. **Submit a pull request** with a clear description

### Development Guidelines

- Use TypeScript for type safety
- Follow the existing code style and patterns
- Add appropriate comments for complex logic
- Ensure responsive design across all screen sizes
- Test in multiple browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

**Prasad Koshy Jose**

[![Website](https://img.shields.io/badge/Website-prasadkjose.com-17BB98?style=for-the-badge)](https://prasadkjose.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/prasadkjose)
[![X / Twitter](https://img.shields.io/badge/X-%231DA1F2?style=for-the-badge&logo=x&logoColor=white)](https://x.com/prasadkjose)

## 🙏 Acknowledgements

This project is based on a fork of [Kali-Linux-Hacker-Portfolio](https://github.com/jihedkdiss/Kali-Linux-Hacker-Portfolio). I would like to thank the original authors and contributors for their excellent work and for making the project open source.

This fork builds upon their work with additional modifications and improvements to better showcase my professional portfolio.

## 📊 Project Statistics

- **Languages**: TypeScript, React, CSS-in-JS with styled components.
- **Framework**: React 17+
- **Build Tool**: Vite
- **Package Manager**: pnpm (recommended)
- **License**: MIT

## 🔗 Quick Links

- [Live Demo](https://prasadkjose.com)
- [GitHub Repository](https://github.com/prasadkjose/Linux-Portfolio)
- [Issues](https://github.com/prasadkjose/Linux-Portfolio/issues)
- [Pull Requests](https://github.com/prasadkjose/Linux-Portfolio/pulls)

---

**Built with ❤️ using React & TypeScript**
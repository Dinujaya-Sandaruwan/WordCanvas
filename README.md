# Word Canvas - Web-Based Text Editor

> **Student Name:** A.M.D.S.Bandara  
> **Student Number:** 2023t01849

## About Word Canvas

Word Canvas is a sleek, modern web-based text editing application designed to provide essential formatting features for quick note-taking and document creation. Built with vanilla HTML, CSS, and JavaScript, this application demonstrates the power of modern web technologies in creating intuitive user interfaces.

This project was developed as part of an **Individual Assignment** for the **IC 1203 - Web Application Development** module, showcasing the implementation of core text editing functionalities in a web environment.

## Key Features

### Core Formatting Tools

- **Bold Text** - Apply bold formatting to selected text (Ctrl+B)
- **Italic Text** - Add italic styling to selected content (Ctrl+I)
- **Underline Text** - Underline important text segments (Ctrl+U)
- **Font Color** - Change text color with an intuitive color picker
- **Text Alignment** - Support for Left, Right, Center, and Justify alignment

### Advanced Functionality

- **Undo/Redo System** - Navigate through editing history (Ctrl+Z/Ctrl+Y)
- **Auto-Save** - Automatic content preservation using local storage
- **Word & Character Count** - Real-time document statistics
- **Keyboard Shortcuts** - Efficient editing with common shortcuts
- **Responsive Design** - Optimized for desktop and mobile devices

## Application Preview

<img width="1822" alt="74568" src="https://github.com/user-attachments/assets/dbbeeaac-8b92-41ed-bda8-d1a524dfc430" />

## Live Demo

Experience Word Canvas in action: [**WordCanvas.live**](http://wordcanvas.live/)

## Technology Stack

- **HTML5** - Semantic markup and content structure
- **CSS3** - Modern styling with gradients, glassmorphism effects, and animations
- **Vanilla JavaScript** - Dynamic functionality and DOM manipulation
- **Font Awesome** - Professional icon library
- **Local Storage API** - Client-side data persistence

## Assignment Objectives Met

This project successfully implements all required features as specified in the assignment:

| Feature              | Status | Implementation                               |
| -------------------- | ------ | -------------------------------------------- |
| Bold Formatting      | ✅     | `document.execCommand('bold')`               |
| Underline Formatting | ✅     | `document.execCommand('underline')`          |
| Italic Formatting    | ✅     | `document.execCommand('italic')`             |
| Font Color           | ✅     | Color picker with `execCommand('foreColor')` |
| Text Alignment       | ✅     | Left, Right, Center, Justify alignment       |
| Undo/Redo            | ✅     | Custom history stack implementation          |
| GitHub Hosting       | ✅     | Deployed via GitHub Pages                    |

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Dinujaya-Sandaruwan/WordCanvas.git
   ```
2. Navigate to the project directory:
   ```bash
   cd WordCanvas
   ```
3. Open `index.html` in your web browser

## How to Contribute

We welcome contributions to improve Word Canvas! Here's how you can help:

1. **Fork the Repository**

   ```bash
   git fork https://github.com/Dinujaya-Sandaruwan/WordCanvas.git
   ```

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**

   - Add new features
   - Fix bugs
   - Improve documentation
   - Enhance UI/UX

4. **Commit Your Changes**

   ```bash
   git commit -m "Add: your descriptive commit message"
   ```

5. **Push to Your Branch**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Open a PR with a clear description of your changes
   - Include screenshots for UI changes
   - Ensure your code follows the existing style

### Contribution Guidelines

- Follow consistent coding style
- Test your changes thoroughly
- Update documentation if needed
- Be respectful in discussions

## Project Structure

```
WordCanvas/
├── img/
│   └── favicon.png         # Application favicon
├── index.html              # Main application entry point
├── LICENSE                 # MIT license file
├── README.md               # Comprehensive project documentation
├── script.js               # Core application logic and functionality
└── style.css               # Cascading style sheets and responsive design
```

## Academic Context

This project was developed as part of the curriculum for:

- **Module:** IC 1203 - Web Application Development
- **Assignment Type:** Individual Assignment
- **Focus Areas:** DOM Manipulation, Event Handling, CSS Styling, Web APIs

## Acknowledgments

Special thanks to **Mr. Navod Neranjan Thilakarathne**, the lecturer for IC 1203 - Web Application Development, for inspiring this project and providing guidance throughout the development process. His insights into modern web development practices made this implementation possible.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions, suggestions, or collaboration opportunities:

- **GitHub:** [@Dinujaya-Sandaruwan](https://github.com/Dinujaya-Sandaruwan)
- **Repository:** [WordCanvas](https://github.com/Dinujaya-Sandaruwan/WordCanvas)

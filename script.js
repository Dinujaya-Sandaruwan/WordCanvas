class TextEditor {
  constructor() {
    this.editor = document.getElementById("editor");
    this.boldBtn = document.getElementById("boldBtn");
    this.italicBtn = document.getElementById("italicBtn");
    this.underlineBtn = document.getElementById("underlineBtn");
    this.alignLeftBtn = document.getElementById("alignLeftBtn");
    this.alignCenterBtn = document.getElementById("alignCenterBtn");
    this.alignRightBtn = document.getElementById("alignRightBtn");
    this.alignJustifyBtn = document.getElementById("alignJustifyBtn");
    this.colorPreview = document.getElementById("colorPreview");

    this.colorBtn = document.getElementById("colorBtn");
    this.colorPicker = document.getElementById("colorPicker");

    this.undoBtn = document.getElementById("undoBtn");
    this.redoBtn = document.getElementById("redoBtn");
    this.undoStack = [];
    this.redoStack = [];
    this.maxHistorySize = 50;
    this.lastSaveTime = 0;
    this.isUpdatingHistory = false;
    this.saveState();

    this.wordCount = document.getElementById("wordCount");
    this.updateWordCount();

    this.clearBtn = document.getElementById("clearBtn");

    this.initializeEventListeners();

    this.saveKey = "wordCanvas_content";
    this.loadContent();
    this.setupAutoSave();

    this.saveIndicator = document.getElementById("saveIndicator");

    this.currentColor = "#000000";
    this.savedSelection = null;
  }

  initializeEventListeners() {
    this.boldBtn.addEventListener("click", () => this.toggleFormat("bold"));
    this.italicBtn.addEventListener("click", () => this.toggleFormat("italic"));
    this.underlineBtn.addEventListener("click", () =>
      this.toggleFormat("underline")
    );
    this.alignLeftBtn.addEventListener("click", () =>
      this.setAlignment("left")
    );
    this.alignCenterBtn.addEventListener("click", () =>
      this.setAlignment("center")
    );
    this.alignRightBtn.addEventListener("click", () =>
      this.setAlignment("right")
    );
    this.alignJustifyBtn.addEventListener("click", () =>
      this.setAlignment("justify")
    );

    this.editor.addEventListener("mouseup", () => this.updateButtonStates());
    this.editor.addEventListener("keyup", () => this.updateButtonStates());

    this.colorBtn.addEventListener("click", () => this.colorPicker.click());
    this.colorPicker.addEventListener("change", (e) =>
      this.changeColor(e.target.value)
    );

    this.undoBtn.addEventListener("click", () => this.undo());
    this.redoBtn.addEventListener("click", () => this.redo());
    this.editor.addEventListener("input", () => this.handleInput());

    this.editor.addEventListener("keydown", (e) => this.handleKeydown(e));

    this.clearBtn.addEventListener("click", () => this.clearContent());

    this.editor.addEventListener("mouseup", () => {
      this.updateButtonStates();
      this.saveSelection();
    });
    this.editor.addEventListener("keyup", () => {
      this.updateButtonStates();
      this.saveSelection();
    });
  }

  updateButtonStates() {
    this.boldBtn.classList.toggle("active", document.queryCommandState("bold"));
    this.underlineBtn.classList.toggle(
      "active",
      document.queryCommandState("underline")
    );
    this.italicBtn.classList.toggle(
      "active",
      document.queryCommandState("italic")
    );

    const isLeft = document.queryCommandState("justifyLeft");
    const isCenter = document.queryCommandState("justifyCenter");
    const isRight = document.queryCommandState("justifyRight");
    const isJustify = document.queryCommandState("justifyFull");

    [
      this.alignLeftBtn,
      this.alignCenterBtn,
      this.alignRightBtn,
      this.alignJustifyBtn,
    ].forEach((btn) => btn.classList.remove("active"));

    if (isLeft) this.alignLeftBtn.classList.add("active");
    else if (isCenter) this.alignCenterBtn.classList.add("active");
    else if (isRight) this.alignRightBtn.classList.add("active");
    else if (isJustify) this.alignJustifyBtn.classList.add("active");
    else this.alignLeftBtn.classList.add("active");
  }

  toggleFormat(command) {
    document.execCommand(command, false, null);
    this.updateButtonStates();
    this.editor.focus();
  }

  setAlignment(alignment) {
    let command;
    switch (alignment) {
      case "left":
        command = "justifyLeft";
        break;
      case "center":
        command = "justifyCenter";
        break;
      case "right":
        command = "justifyRight";
        break;
      case "justify":
        command = "justifyFull";
        break;
    }

    document.execCommand(command, false, null);
    this.updateAlignmentButtons(alignment);
    this.editor.focus();
  }

  updateAlignmentButtons(activeAlignment) {
    [
      this.alignLeftBtn,
      this.alignCenterBtn,
      this.alignRightBtn,
      this.alignJustifyBtn,
    ].forEach((btn) => btn.classList.remove("active"));

    switch (activeAlignment) {
      case "left":
        this.alignLeftBtn.classList.add("active");
        break;
      case "center":
        this.alignCenterBtn.classList.add("active");
        break;
      case "right":
        this.alignRightBtn.classList.add("active");
        break;
      case "justify":
        this.alignJustifyBtn.classList.add("active");
        break;
    }
  }

  saveSelection() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      this.savedSelection = selection.getRangeAt(0).cloneRange();
    }
  }

  restoreSelection() {
    if (this.savedSelection) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(this.savedSelection);
      return true;
    }
    return false;
  }

  changeColor(color) {
    this.currentColor = color;
    this.colorPreview.style.background = color;

    document.execCommand("styleWithCSS", false, true);

    if (this.savedSelection && !this.savedSelection.collapsed) {
      this.restoreSelection();
      document.execCommand("foreColor", false, color);
      this.saveState();
      this.saveContent();

      window.getSelection().removeAllRanges();
      this.savedSelection = null;
    }

    this.editor.focus();
    document.execCommand("foreColor", false, color);
  }

  handleInput() {
    if (!this.isUpdatingHistory) {
      this.saveStateDelayed();
    }
  }

  saveState() {
    const currentState = this.editor.innerHTML;

    if (
      this.undoStack.length > 0 &&
      this.undoStack[this.undoStack.length - 1] === currentState
    ) {
      return;
    }

    this.undoStack.push(currentState);

    if (this.undoStack.length > this.maxHistorySize) {
      this.undoStack.shift();
    }

    this.redoStack = [];
    this.updateHistoryButtons();
  }

  saveStateDelayed() {
    clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => {
      this.saveState();
    }, 500);
  }

  undo() {
    if (this.undoStack.length > 1) {
      const currentState = this.undoStack.pop();
      this.redoStack.push(currentState);

      const previousState = this.undoStack[this.undoStack.length - 1];
      this.isUpdatingHistory = true;
      this.editor.innerHTML = previousState;
      this.isUpdatingHistory = false;

      this.updateHistoryButtons();
      this.updateWordCount();
      this.editor.focus();
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      const nextState = this.redoStack.pop();
      this.undoStack.push(nextState);

      this.isUpdatingHistory = true;
      this.editor.innerHTML = nextState;
      this.isUpdatingHistory = false;

      this.updateHistoryButtons();
      this.updateWordCount();
      this.editor.focus();
    }
  }

  updateHistoryButtons() {
    this.undoBtn.style.opacity = this.undoStack.length > 1 ? "1" : "0.5";
    this.redoBtn.style.opacity = this.redoStack.length > 0 ? "1" : "0.5";
  }

  handleInput() {
    if (!this.isUpdatingHistory) {
      this.saveStateDelayed();
    }
    this.updateWordCount();
  }

  updateWordCount() {
    const text = this.editor.innerText || this.editor.textContent || "";
    const cleanText = text.replace(/\s+/g, " ").trim();

    const words = cleanText === "" ? 0 : cleanText.split(/\s+/).length;
    const characters = cleanText.length;

    this.wordCount.textContent = `Words: ${words} | Characters: ${characters}`;
  }

  handleKeydown(e) {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case "b":
          e.preventDefault();
          this.toggleFormat("bold");
          break;
        case "i":
          e.preventDefault();
          this.toggleFormat("italic");
          break;
        case "u":
          e.preventDefault();
          this.toggleFormat("underline");
          break;
        case "z":
          if (!e.shiftKey) {
            e.preventDefault();
            this.undo();
          }
          break;
        case "y":
          e.preventDefault();
          this.redo();
          break;
        case "s":
          e.preventDefault();
          this.saveContent();
          break;
      }
    }
  }

  clearContent() {
    if (
      confirm(
        "Are you sure you want to clear all content? This action cannot be undone."
      )
    ) {
      this.editor.innerHTML = "<p></p>";
      this.saveContent();
      this.saveState();
      this.updateWordCount();
      this.editor.focus();
    }
  }

  loadContent() {
    try {
      const savedContent = localStorage.getItem(this.saveKey);
      if (savedContent && savedContent.trim() !== "") {
        this.editor.innerHTML = savedContent;
        this.updateWordCount();
        // console.log("Content loaded from localStorage");
      }
    } catch (error) {
      console.warn("Could not load from localStorage:", error);
    }
  }

  saveContent() {
    try {
      const content = this.editor.innerHTML;
      localStorage.setItem(this.saveKey, content);
      //   console.log("Content saved to localStorage");
    } catch (error) {
      console.error("Could not save to localStorage:", error);
    }
  }

  setupAutoSave() {
    this.editor.addEventListener("blur", () => {
      if (this.hasUnsavedChanges()) {
        this.saveContent();
      }
    });

    window.addEventListener("beforeunload", () => this.saveContent());
    window.addEventListener("unload", () => this.saveContent());
  }

  hasUnsavedChanges() {
    try {
      const currentContent = this.editor.innerHTML;
      const savedContent = localStorage.getItem(this.saveKey) || "";
      return currentContent !== savedContent;
    } catch (error) {
      return false;
    }
  }

  saveContent() {
    try {
      const content = this.editor.innerHTML;
      localStorage.setItem(this.saveKey, content);
      this.lastSaveTime = Date.now();
      this.showSaveIndicator();
      //   console.log("Content saved to localStorage");
    } catch (error) {
      console.error("Could not save to localStorage:", error);
    }
  }

  showSaveIndicator() {
    this.saveIndicator.classList.add("show");
    setTimeout(() => {
      this.saveIndicator.classList.remove("show");
    }, 2000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TextEditor();
});

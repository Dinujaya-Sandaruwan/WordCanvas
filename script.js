class TextEditor {
  constructor() {
    this.editor = document.getElementById("editor");
    this.boldBtn = document.getElementById("boldBtn");
    this.italicBtn = document.getElementById("italicBtn");
    this.underlineBtn = document.getElementById("underlineBtn");
    this.alignLeftBtn = document.getElementById("alignLeftBtn");
    this.alignCenterBtn = document.getElementById("alignCenterBtn");
    this.alignRightBtn = document.getElementById("alignRightBtn");

    this.colorBtn = document.getElementById("colorBtn");
    this.colorPicker = document.getElementById("colorPicker");

    this.undoBtn = document.getElementById("undoBtn");
    this.redoBtn = document.getElementById("redoBtn");
    this.undoStack = [];
    this.redoStack = [];

    this.initializeEventListeners();
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

    this.editor.addEventListener("mouseup", () => this.updateButtonStates());
    this.editor.addEventListener("keyup", () => this.updateButtonStates());

    this.colorBtn.addEventListener("click", () => this.colorPicker.click());
    this.colorPicker.addEventListener("change", (e) =>
      this.changeColor(e.target.value)
    );

    this.undoBtn.addEventListener("click", () => this.undo());
    this.redoBtn.addEventListener("click", () => this.redo());
    this.editor.addEventListener("input", () => this.handleInput());
  }

  updateButtonStates() {
    this.boldBtn.classList.toggle("active", document.queryCommandState("bold"));
    this.italicBtn.classList.toggle(
      "active",
      document.queryCommandState("italic")
    );
    this.underlineBtn.classList.toggle(
      "active",
      document.queryCommandState("underline")
    );
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
    }
    document.execCommand(command, false, null);
    this.editor.focus();
  }

  changeColor(color) {
    document.execCommand("foreColor", false, color);
    this.editor.focus();
  }

  handleInput() {
    this.saveState();
  }

  saveState() {
    const currentState = this.editor.innerHTML;
    this.undoStack.push(currentState);
    if (this.undoStack.length > 50) {
      this.undoStack.shift();
    }
    this.redoStack = [];
  }

  undo() {
    if (this.undoStack.length > 1) {
      const currentState = this.undoStack.pop();
      this.redoStack.push(currentState);
      this.editor.innerHTML = this.undoStack[this.undoStack.length - 1];
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      const nextState = this.redoStack.pop();
      this.undoStack.push(nextState);
      this.editor.innerHTML = nextState;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TextEditor();
});

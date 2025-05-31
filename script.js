class TextEditor {
  constructor() {
    this.editor = document.getElementById("editor");
    this.boldBtn = document.getElementById("boldBtn");
    this.italicBtn = document.getElementById("italicBtn");
    this.underlineBtn = document.getElementById("underlineBtn");

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.boldBtn.addEventListener("click", () => this.toggleFormat("bold"));
    this.italicBtn.addEventListener("click", () => this.toggleFormat("italic"));
    this.underlineBtn.addEventListener("click", () =>
      this.toggleFormat("underline")
    );
  }

  toggleFormat(command) {
    document.execCommand(command, false, null);
    this.editor.focus();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TextEditor();
});

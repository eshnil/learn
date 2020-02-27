import SimpleMDE from "simplemde";

import { markdownToHtml } from "./markdown_to_html";

const defaultEditorConfig = {
  hideIcons: ["guide"],
  showIcons: ["code", "table"],
  status: false,
  spellChecker: false,
  previewRender: markdownToHtml,
  // Async method
  previewRender: function(markdownText, preview) {
    setTimeout(function() {
      preview.innerHTML = markdownToHtml(markdownText);
    }, 250);

    return "Loading...";
  }
};

$(() => {
  if (!document.getElementById("flash_card_form")) return;

  const flashcardQuestionEditor = new SimpleMDE({
    ...defaultEditorConfig,
    element: document.getElementById("flash_card_question")
  });

  const flashcardAnswerEditor = new SimpleMDE({
    ...defaultEditorConfig,
    element: document.getElementById("flash_card_answer")
  });
});

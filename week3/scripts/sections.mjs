export function setSectionSelection(sections) {
  const sectionSelectionElement = document.querySelector("#sectionNumber");
  sectionSelectionElement.innerHTML = sections
    .map(
      (section) => `<option value="${section.sectionNum}">${section.sectionNum}</option>`
    )
    .join("");
}
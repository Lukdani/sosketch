export const createElement = (type, classes, id) => {
  const element = document.createElement(type);
  if (classes != null && classes.length > 0) {
    classes.forEach((classElement) => {
      element.classList.add(classElement);
      console.log(element.classList);
    });
  }
  if (id != null) {
    element.setAttribute("id", id);
  }
  return element;
};

const loadlessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((res) => res.json()) // promise of json data
    .then((json) => displayLesson(json.data));
};
const displayLesson = (lessons) => {
  // 1: Get the container and empty it
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // 2: Get into every lessons
  for (const lesson of lessons) {
    // 3: Create element
    const btnDIV = document.createElement("div");
    btnDIV.innerHTML = `
        <button class="btn btn-outline btn-primary ">
        <i class="fa-solid fa-book-open"></i>
         Lesson - ${lesson.level_no}
        </button>
    `;
    // 4: Append into container
    levelContainer.append(btnDIV);
  }
};
loadlessons();

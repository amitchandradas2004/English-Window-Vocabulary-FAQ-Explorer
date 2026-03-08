const loadlessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((res) => res.json()) // promise of json data
    .then((json) => displayLesson(json.data));
};
const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
  // console.log(lessonButtons);
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); // remove all active class
      const clickbtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(clickbtn);
      clickbtn.classList.add("active"); // add active class
      displayLevelWords(data.data);
    });
};

const displayLevelWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
      <div
        class="text-center bg-sky-50 col-span-full bangla rounded-xl py-10 space-y-5"
      >
        <img src="./assets/alert-error.png" alt="" class="mx-auto" />
        <p class="text-2xl text-gray-700 font-semibold">
          This lesson does not include any vocabulary yet.
        </p>
        <p class="text-2xl text-gray-800">Please go to the next lesson.</p>
      </div>
      `;
    return;
  }
  // {
  // "id": 4,
  // "level": 5,
  // "word": "Diligent",
  // "meaning": "পরিশ্রমী",
  // "pronunciation": "ডিলিজেন্ট"
  // }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
       <div
        class="bg-white rounded-xl shadow-xl text-center py-10 px-5 space-y-4"
      >
        <h2 class="text-2xl font-bold">${word.word ? word.word : "Word Not Found"}</h2>
        <p class="font-semibold">meaning / pronunciation</p>
        <div class="bangla text-2xl font-semibold">"${word.meaning ? word.meaning : "Meaning Not Found"} / ${word.pronunciation ? word.pronunciation : "Pronunciation Not Found"}"</div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]">
            <i
              class="fa-solid fa-circle-info"
              style="color: rgb(42, 45, 46)"
            ></i>
          </button>
          <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]">
            <i
              class="fa-solid fa-volume-high"
              style="color: rgb(42, 45, 46)"
            ></i>
          </button>
        </div>
      </div>    `;
    wordContainer.append(card);
  });
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
        <button  id="lesson-btn-${lesson.level_no}"
         onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i>
         Lesson - ${lesson.level_no}
        </button>
    `;
    // 4: Append into container
    levelContainer.append(btnDIV);
  }
};
loadlessons();

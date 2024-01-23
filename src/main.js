const { invoke } = window.__TAURI__.tauri;

let greetInputEl;
let greetMsgEl;

async function greet() {
  const val = note.value;
  let name = "";
  if (val.startsWith("http")) {
    name = "/ " + val;
  } else {
    name = bullet.textContent + " " + val;
  }
  note.value = await invoke("greet", {
    name,
  });
}

window.addEventListener("DOMContentLoaded", () => {
  note = document.querySelector("#note");
  bullet = document.querySelector("#bullet");
  wrapper = document.querySelector("#wrapper");
  window.bullets = [".", "=", ">", "!", "@", "#"];
  window.pos = 0;

  note.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      greet();
    }
  });
  wrapper.addEventListener("keydown", (event) => {
    if (event.ctrlKey) {
      bullet.textContent = window.bullets[window.pos];
      window.pos = (window.pos + 1) % window.bullets.length;
    }
  });
});

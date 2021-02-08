import "./styles.css";

const btn = document.querySelector(".btn");

const stats = [
  { percents: 50, name: "income", color: "#ffc7ec" },
  { percents: 10, name: "expense", color: "#86cfa3" },
  { percents: 45, name: "others", color: "#a2c6e0" }
];
const newStats = [
  { percents: 10, name: "income", color: "#ffc7ec" },
  { percents: 35, name: "expense", color: "#86cfa3" },
  { percents: 22, name: "others", color: "#a2c6e0" }
];

const diagramm = {
  init(container = ".diagramm-container", stats) {
    const sum = stats.reduce((acc, cur) => {
      return acc + cur.percents;
    }, 0);
    const $container = document.querySelector(container);
    let offset = 0;
    stats.forEach((element) => {
      let percent = (element.percents * 100) / sum;
      let unit = `<circle 
    style="stroke-dasharray: ${percent} 100;
    stroke-dashoffset: ${-offset || 0};
    stroke:${element.color};
    "
    
    r="15.9" cx="50%" cy="50%"
    class="unit" 
    
    id='${element.name}'
  >
  </circle>`;
      $container
        .querySelector(".diagramm")
        .insertAdjacentHTML("beforeend", unit);
      offset += percent;
    });
    this.units = $container.querySelectorAll(".unit");
  },
  changeHandler(state) {
    let offset = 0;

    const sum = state.reduce((acc, cur) => {
      return acc + cur.percents;
    }, 0);
    state.forEach((el) => {
      let percent = (el.percents * 100) / sum;
      let curEl = document.getElementById(el.name);
      curEl.style.strokeDasharray = percent && " " + 100;
      curEl.style.strokeDashoffset = offset;
      offset += percent;
    });
  }
};

diagramm.init(".diagramm-container", stats);
btn.addEventListener("click", () => {
  diagramm.changeHandler(newStats);
});

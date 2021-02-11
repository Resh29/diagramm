import "./styles.css";

const stats = [
  { percents: 50, name: "income", color: "#ffc7ec" },
  { percents: 10, name: "expense", color: "#86cfa3" },
  { percents: 45, name: "others", color: "#a2c6e0" }
];

class Diagramm {
  constructor(container, stats) {
    this.container = document.querySelector(container);
    this.stats = stats;
  }
  init() {
    this.wrapped = this.stats.map((el) => {
      return new Proxy(el, {
        set: (target, prop, value) => {
          target[prop] = parseInt(value.replace(/\D/g, ""), 0) || 0;
          this.reRender(this.wrapped);
          return true;
        }
      });
    });
    this.render();
  }

  render() {
    const sum = this.wrapped.reduce((acc, cur) => {
      return acc + cur.percents;
    }, 0);
    let offset = 0;
    this.wrapped.forEach((element) => {
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
      this.container
        .querySelector(".diagramm")
        .insertAdjacentHTML("beforeend", unit);
      offset += percent;
    });
  }
  setValue(name, value) {
    this.wrapped.find((el) => el.name === name).percents = value;
  }
  reRender(items) {
    const sum = items.reduce((acc, cur) => {
      return acc + cur.percents;
    }, 0);

    let offset = 0;
    for (let i = 0; i < items.length; i++) {
      let percent = (items[i].percents * 100) / sum;
      let el = this.container.querySelector(`#${items[i].name}`);
      el.style.strokeDasharray = percent && " " + 100;
      el.style.strokeDashoffset = offset;
      offset += percent;
    }
  }
}

const d = new Diagramm(".diagramm-container", stats);
d.init();

function setInputs(arr) {
  for (let i = 0; i < arr.length; i++) {
    let input = document.createElement("input");
    input.setAttribute("name", arr[i].name);
    input.type = "range";
    input.value = arr[i].percents;
    input.classList.add("range-input");
    input.min = 1;
    input.max = 99999;
    input.addEventListener("input", (e) => {
      d.setValue(e.target.name, e.target.value);
    });
    document.querySelector("#app").append(input);
  }
}

setInputs(stats);

// const diagramm = {
//   init(container = ".diagramm-container", stats) {
//     const sum = stats.reduce((acc, cur) => {
//       return acc + cur.percents;
//     }, 0);
//     const $container = document.querySelector(container);
//     let offset = 0;
//     stats.forEach((element) => {
//       let percent = (element.percents * 100) / sum;
//       let unit = `<circle
//     style="stroke-dasharray: ${percent} 100;
//     stroke-dashoffset: ${-offset || 0};
//     stroke:${element.color};
//     "

//     r="15.9" cx="50%" cy="50%"
//     class="unit"

//     id='${element.name}'
//   >
//   </circle>`;
//       $container
//         .querySelector(".diagramm")
//         .insertAdjacentHTML("beforeend", unit);
//       offset += percent;
//     });
//     this.units = $container.querySelectorAll(".unit");
//   },
//   changeHandler(state) {
//     let offset = 0;

//     const sum = state.reduce((acc, cur) => {
//       return acc + cur.percents;
//     }, 0);
//     state.forEach((el) => {
//       let percent = (el.percents * 100) / sum;
//       let curEl = document.getElementById(el.name);
//       curEl.style.strokeDasharray = percent && " " + 100;
//       curEl.style.strokeDashoffset = offset;
//       offset += percent;
//     });
//   }
// };

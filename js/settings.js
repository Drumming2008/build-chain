id("settings-button").onclick = () => {
  openPanel("settings")
}

let settings = [
  {
    type: "radio",
    label: "Theme",
    function: "setTheme",
    buttons: [
      {
        label: "Dark",
        value: "dark"
      },
      {
        label: "Auto",
        value: "auto",
        default: true
      },
      {
        label: "Light",
        value: "light"
      }
    ]
  }
]

for (let i of settings) {
  let settingWrapper = document.createElement("div")
  settingWrapper.classList.add("setting-wrapper")
  id("settings-content").append(settingWrapper)

  let label = document.createElement("label")
  label.innerHTML = `<h3>${i.label}</h3>`
  settingWrapper.append(label)

  if (i.type == "radio") {
    settingWrapper.classList.add("setting-wrapper-radio")
    for (let b of i.buttons) {
      let label = document.createElement("label")
      label.innerText = b.label
      label.classList.add("settings-radio-label")
      label.classList.add("secondary")
      let button = document.createElement("input")
      button.type = "radio"
      button.value = b.value
      button.name = i.label.toLowerCase()

      button.onclick = () => {
        window[i.function](b.value)
        localStorage.setItem(i.label.toLowerCase(), b.value)
      }

      if (localStorage.getItem(i.label.toLowerCase())) {
        if (localStorage.getItem(i.label.toLowerCase()) == b.value) button.click()
      } else if (b.default) {
        button.click()
      }
      
      label.append(button)
      settingWrapper.append(label)
    }
  }
}

function setTheme(value) {
  if (value == "light") document.documentElement.id = "light"
  else if (value == "dark") document.documentElement.id = "dark"
  else if (value == "auto") document.documentElement.id = (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
}

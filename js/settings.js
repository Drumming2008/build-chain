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
  },
  {
    type: "radio",
    label: "Article Font",
    function: "setArticleFont",
    vertical: true,
    buttons: [
      {
        label: "Times New Roman",
        labelStyle: "font-family: serif;",
        value: "serif",
        default: true
      },
      {
        label: "Arial",
        labelStyle: "font-family: Arial, sans-serif;",
        value: "Arial, sans-serif"
      },
      {
        label: "Open Dyslexic",
        labelStyle: "font-family: dyslexic-font, sans-serif;",
        value: "dyslexic-font, sans-serif"
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

  let innerWrapper = document.createElement("div")
  innerWrapper.classList.add("settings-inner-wrapper")
  if (i.vertical) {
    innerWrapper.style.flexDirection = "column"
    innerWrapper.classList.add("vertical")
  }
  settingWrapper.append(innerWrapper)

  if (i.type == "radio") {
    settingWrapper.classList.add("setting-wrapper-radio")
    for (let b of i.buttons) {
      let label = document.createElement("label")
      label.innerText = b.label
      label.classList.add("settings-radio-label")
      label.classList.add("secondary")
      if (b.labelStyle) label.style.cssText = b.labelStyle
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
      innerWrapper.append(label)
    }
  }
}

function setTheme(value) {
  if (value == "light") document.documentElement.id = "light"
  else if (value == "dark") document.documentElement.id = "dark"
  else if (value == "auto") document.documentElement.id = (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
}

function setArticleFont(font) {
  id("article").style.fontFamily = font
}

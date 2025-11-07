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
      },
      {
        type: "button",
        label: "More Fonts…",
        click: () => {
          openPanel("more-fonts")
        }
      }
    ]
  }
]

// queryLocalFonts().then(fonts => {
//   console.log("fonts", fonts)
//   for (let f of fonts) {
//     if (f.style != "Plain" && f.style != "Regular") continue
//     settings[1].buttons.push({
//       label: f.family,
//       labelStyle: `font-family: ${f.family};`,
//       value: f.family
//     })
//   }
//   loadSettings()
// })

// maybe for another day when this has a better solution



function loadSettings() {
  id("settings-content").innerHTML = ""
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
        if (b.type == "button") {
          let button = document.createElement("button")
          button.innerText = b.label
          button.className = "secondary pill"
          innerWrapper.append(button)
          button.onclick = b.click
          continue
        }

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

        let savedValue = localStorage.getItem(i.label.toLowerCase())
        if (savedValue == b.value || b.default) {
          button.click()
        }

        label.append(button)
        innerWrapper.append(label)
      }
    }
  }
}

loadSettings()

function setTheme(value) {
  if (value == "auto") {
    document.documentElement.id = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  } else {
    document.documentElement.id = value
  }
}

function setArticleFont(font) {
  articleElem.style.fontFamily = font
}

const articleElem = id("article"), panelElem = id("panel")

let panelOpen = false

function closePanel() {
  panelOpen = false

  panelElem.style.right = "calc(var(--panel-width) * -1 - 8px)"
  articleElem.style.right = ""
  setTimeout(() => {
    panelElem.style.display = "none"
    hideAllPanels()
  }, 400)
}

closePanel()

id("close-panel").onclick = closePanel

function togglePanel(name) {
  if (panelOpen) closePanel()
  else openPanel(name)
}

function hideAllPanels(instant = false) {
    for (let i of document.querySelectorAll("#panel > [data-panel]")) {
        i.style.transform = ""
        i.style.display = "none"
        setTimeout(() => {

        }, instant ? 0 : 400)
    }
}

function openPanel(name) {
  panelOpen = true

  hideAllPanels(true)

  panelElem.style.display = ""
  setTimeout(() => {
    panelElem.style.right = "8px"
  }, 0)
  let panelContent = document.querySelector(`#panel > [data-panel="${name}"]`)
  panelContent.style.display = ""
  panelContent.style.transform = "translateX(0)"
  articleElem.style.right = "max((100vw - var(--article-width)) / 2, calc(var(--panel-width) + 16px))"

  if (name === "more-fonts") moreFonts()

  if (name === "settings") addExtraFontButton()
}

let extraFontButton = null

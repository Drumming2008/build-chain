function closePanel() {
  id("panel").style.right = "calc(var(--panel-width) * -1 - 8px)"
  id("article").style.right = ""
  setTimeout(() => {
    id("panel").style.display = "none"
    for (let i of document.querySelectorAll("#panel > [data-panel]")) {
      i.style.display = "none"
    }
  }, 400)
}

closePanel()

id("close-panel").onclick = () => {
  closePanel()
}

function openPanel(name, data = null) {
  for (let i of document.querySelectorAll("#panel > [data-panel]")) {
    i.style.display = "none"
  }

  id("panel").style.display = ""
  setTimeout(() => {
    id("panel").style.right = "8px"
  }, 0)
  let panelContent = document.querySelector(`#panel > [data-panel="${name}"]`)
  panelContent.style.display = ""
  id("article").style.right = "max((100vw - var(--article-width)) / 2, calc(var(--panel-width) + 16px))"


  if (name == "dictionary") {
    updateDictionaryContent(data)
  }
}

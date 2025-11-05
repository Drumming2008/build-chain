let dictionaryTooltip = document.createElement("div")
dictionaryTooltip.id = "dictionary-tooltip"
document.body.append(dictionaryTooltip)

function showDictionaryToolTip() {
  dictionaryTooltip.style.display = "block"
}

function hideDictionaryToolTip() {
  dictionaryTooltip.style.display = "none"
}

document.addEventListener("mouseup", () => {
  let selection = document.getSelection()
  console.log("selection", selection)
  if (selection.baseOffset == selection.extentOffset) return

  showDictionaryToolTip()

  let text = selection.anchorNode.nodeValue.substring(selection.baseOffset, selection.extentOffset)
  dictionaryTooltip.innerText = text
  
  let range = document.createRange()
  range.selectNode(selection.anchorNode)
  let coords = range.getBoundingClientRect()
  console.log("coords", coords)
  dictionaryTooltip.style.left = coords.left + "px"
  dictionaryTooltip.style.top = coords.top + "px"
})

document.addEventListener("mousedown", e => {
  if (e.target != dictionaryTooltip) {
    hideDictionaryToolTip()
  }
})

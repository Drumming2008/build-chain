let dictionaryTooltip = document.createElement("span")
dictionaryTooltip.id = "dictionary-tooltip"
document.body.append(dictionaryTooltip)

function showDictionaryToolTip() {
  dictionaryTooltip.style.display = "block"
}

function hideDictionaryToolTip() {
  dictionaryTooltip.style.display = "none"
}

// Source - https://stackoverflow.com/questions/1589721/get-selected-text-position-and-place-an-element-next-to-it/1589912#1589912
// Posted by Alex Sexton
// Retrieved 11/5/2025, License - CC-BY-SA 4.0

// function insertButtonAtSelection() {
//   let selection = window.getSelection()
//   if (!selection.rangeCount) return

//   let selectionButton = document.createElement("span")
//   selectionButton.className = "nytd_selection_button"
//   selectionButton.id = "nytd_selection_button"
//   selectionButton.title = "Lookup Word"
//   selectionButton.style.cssText = "margin:-20px 0 0 -20px; position:absolute; background:url(http://graphics8.nytimes.com/images/global/word_reference/ref_bubble.png);width:25px;height:29px;cursor:pointer;_background-image: none;filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://graphics8.nytimes.com/images/global/word_reference/ref_bubble.png', sizingMethod='image');"

//   let range = selection.getRangeAt(0)
//   let newRange = document.createRange()
//   newRange.setStart(selection.focusNode, range.endOffset)
//   newRange.insertNode(selectionButton)
// }


document.addEventListener("mouseup", () => {
  // let selection = window.getSelection()
  // if (!selection.rangeCount) return

  // showDictionaryToolTip()

  // let text = selection.toString()
  // dictionaryTooltip.innerText = text

  // let range = selection.getRangeAt(0).cloneRange()
  // range.collapse(false) // move to the end of the selection
  // range.insertNode(dictionaryTooltip)

  // insertButtonAtSelection()

  let selection = window.getSelection()
  if (!selection.rangeCount) return
  if (selection.baseOffset == selection.extentOffset) return

  let range = selection.getRangeAt(0)
  let rect = range.getBoundingClientRect()

  let selectionButton = document.createElement("button")
  selectionButton.innerText = selection.anchorNode.textContent.substring(selection.baseOffset, selection.extentOffset)
  selectionButton.className = "dictionary-button secondary"
  selectionButton.style.position = "absolute"
  selectionButton.style.left = rect.left + window.scrollX + "px"
  selectionButton.style.top = rect.top + window.scrollY + "px"
  selectionButton.style.width = rect.width + 8 + "px"
  selectionButton.style.height = rect.height + 8 + "px"
  selectionButton.style.pointerEvents = "auto"
  selectionButton.style.zIndex = 9999

  document.body.appendChild(selectionButton)

  document.addEventListener("mousedown", e => {
    if (e.target == selectionButton) return
    selectionButton.remove()
  })

  document.querySelector("article").addEventListener("scroll", () => {
    selectionButton.remove()
  })

})

document.onmouseup = e => {
  if (e.target.closest(".dictionary-button")) return

  let selection = window.getSelection()
  if (selection.rangeCount !== 1 || selection.isCollapsed) return

  // in older safari, the range can apparently get retroactively modified after it is queried, so need to clone it
  let range = selection.getRangeAt(0).cloneRange()
  if (!range.toString().trim() || !articleElem.contains(range.commonAncestorContainer)) return

  // truly terrible code to get the surrounding text of the user's selection by extending the dom selection
  selection.modify("extend", "forward", "character")
  // swap the selection direction so that it can extend the other way
  selection.setBaseAndExtent(selection.focusNode, selection.focusOffset, selection.anchorNode, selection.anchorOffset)
  selection.modify("extend", "backward", "character")

  let extendedText = selection.toString()

  // put the user's selection back to how it was
  selection.removeAllRanges()
  selection.addRange(range)

  let word = extendedText.match(/^.?\s*[^a-zà-öø-ýÿ]([a-zà-öø-ýÿ'‘’-]+)[^a-zà-öø-ýÿ]\s*.?$/i)?.[1]
  if (!word) return

  // there can be multiple rects but it seems like only one ever has a width, so just take the widest one
  let rect = [...range.getClientRects()].sort((a, b) => b.width - a.width)[0]

  let selectionButton = document.createElement("button")
  selectionButton.innerHTML = "<i class='ph ph-book-open-text'></i>"
  selectionButton.className = "dictionary-button secondary"
  selectionButton.style.position = "absolute"

  function updatePosition() {
    selectionButton.style.left = rect.left + rect.width / 2 + "px"
    selectionButton.style.top = rect.top + rect.height + 4 + "px"
  }

  updatePosition()

  document.addEventListener("resize", updatePosition)
  document.addEventListener("wheel", updatePosition)

  selectionButton.style.zIndex = 9999

  selectionButton.onclick = () => {
    openDictionary(word.toLowerCase())
    for (let i of document.querySelectorAll(".dictionary-button")) {
      i.remove()
    }
  }

  document.body.appendChild(selectionButton)

  document.addEventListener("mousedown", e => {
    if (e.target === selectionButton || e.target.parentElement.classList.contains("dictionary-button")) return
    selectionButton.remove()
  })
}

async function openDictionary(word) {
  openPanel("dictionary")

  let wrapper = id("dictionary-entries")
  wrapper.innerHTML = ""

  let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  let failed = false, json
  if (response.ok) {
    json = await response.json()
    if (json[0].message) failed = true
  } else {
    failed = true
  }

  if (failed) {
    wrapper.innerHTML = `
      <h3>${capitalize(word)}</h3>
      <div id="word-not-found">Word not found</div>
    `
    return
  }

  for (let entry of json) {
    let entryElem = document.createElement("div")
    entryElem.style.display = "flex"
    entryElem.style.flexDirection = "column"
    entryElem.style.gap = "8px"
    wrapper.append(entryElem)

    let html = `
      <h3>${capitalize(entry.word)} <span>${entry.phonetic || ""}</span></h3>
    `

    for (let meaning of entry.meanings || []) {
      html += `
        <h4 style="border-bottom: 1px solid var(--bg-5);">${capitalize(meaning.partOfSpeech)}</h4>
      `
      if (meaning.definitions?.length) {
        html += "<ul>"
        for (let defn of meaning.definitions) {
          html += `<li>${defn.definition}</li>` // i love html injection
        }
        html += "</ul>"
      }
    }

    entryElem.innerHTML = html

    for (let phonetic of entry.phonetics || []) {
      if (!phonetic.audio) continue

      let audioButton = document.createElement("button")
      audioButton.classList.add("dictionary-audio")
      audioButton.classList.add("secondary")
      let audioIcon = document.createElement("i")
      audioIcon.className = "ph ph-speaker-high"
      audioButton.append(audioIcon)
      entryElem.querySelector("h3").append(audioButton)

      let audio = new Audio(phonetic.audio)

      audio.onended = () => {
        audioIcon.classList.remove("ph-fill")
        audioIcon.classList.add("ph")
      }

      audioButton.onclick = () => {
        audio.currentTime = 0
        audio.play()
        audioIcon.classList.add("ph-fill")
        audioIcon.classList.remove("ph")
      }
    }
  }
}

let dictionaryTooltip = document.createElement("span")
dictionaryTooltip.id = "dictionary-tooltip"
document.body.append(dictionaryTooltip)

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


document.addEventListener("mouseup", e => {
  if (e.target.classList.contains("dictionary-button") && !id("article").contains(e.target) && !e.target.classList.contains("dictionary-button")) return
  let selection = window.getSelection()
  if (!selection.rangeCount) return
  if (selection.baseOffset == selection.extentOffset) return

  let text = selection.toString().trim()
  if (!/^[A-Za-zÀ-ÿ'’-]+$/.test(text)) return

  let range = selection.getRangeAt(0)
  let rect = range.getBoundingClientRect()

  let selectionButton = document.createElement("button")
  selectionButton.innerHTML = "<i class='ph ph-book-open-text'></i>"
  selectionButton.className = "dictionary-button secondary"
  selectionButton.style.position = "absolute"

  function updatePosition() {
    selectionButton.style.left = rect.left + rect.width / 2 + 4 + "px"
    selectionButton.style.top = rect.top + rect.height + 8 + "px"
    // selectionButton.style.width = rect.width + 8 + "px"
    // selectionButton.style.height = rect.height + 8 + "px"
  }

  updatePosition()

  document.addEventListener("resize", updatePosition)
  document.addEventListener("wheel", updatePosition)

  selectionButton.style.zIndex = 9999

  selectionButton.onclick = () => {
    openPanel("dictionary", text.toLowerCase())
    for (let i of document.querySelectorAll(".dictionary-button")) {
      i.remove()
    }
  }

  document.body.appendChild(selectionButton)

  document.addEventListener("mousedown", e => {
    if (e.target == selectionButton || e.target.parentElement.classList.contains("dictionary-button")) return
    selectionButton.remove()
  })
})

async function updateDictionaryContent(data) {
  let wrapper = id("dictionary-entries")
  wrapper.innerHTML = ""

  let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${data}`)

  /*
  [
    {
      "word": "really",
      "phonetic": "/ˈɹɪəli/",
      "phonetics": [
        {
          "text": "/ˈɹɪəli/",
          "audio": ""
        },
        {
          "text": "/ˈɹi.əli/",
          "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/really-1-us.mp3",
          "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=1217915",
          "license": {
            "name": "BY-SA 3.0",
            "url": "https://creativecommons.org/licenses/by-sa/3.0"
          }
        }
      ],
      "meanings": [
        {
          "partOfSpeech": "adverb",
          "definitions": [
            {
              "definition": "In a way or manner that is real, not unreal.",
              "synonyms": [],
              "antonyms": []
            },
            ...
          ],
          "synonyms": [
            "actually",
            "in fact",
            "indeed",
            "truly",
            "so"
          ],
          "antonyms": []
        },
        {
          "partOfSpeech": "interjection",
          "definitions": [
            {
              "definition": "Indicating surprise at, or requesting confirmation of, some new information; to express skepticism.",
              "synonyms": [],
              "antonyms": [],
              "example": "A: He won the Nobel Prize yesterday."
            },
            ...
          ],
          "synonyms": [
            "no kidding",
            "no really",
            "oh really",
            "you don't say"
          ],
          "antonyms": []
        }
      ],
      "license": {
        "name": "CC BY-SA 3.0",
        "url": "https://creativecommons.org/licenses/by-sa/3.0"
      },
      "sourceUrls": [
        "https://en.wiktionary.org/wiki/really"
      ]
    },
    {
      "word": "really",
      "phonetics": [],
      "meanings": [
        {
          "partOfSpeech": "verb",
          "definitions": [
            {
              "definition": "To bring together again.",
              "synonyms": [],
              "antonyms": []
            },
            ...
          ],
          "synonyms": [],
          "antonyms": []
        }
      ],
      "license": {
        "name": "CC BY-SA 3.0",
        "url": "https://creativecommons.org/licenses/by-sa/3.0"
      },
      "sourceUrls": [
        "https://en.wiktionary.org/wiki/re-ally",
        "https://en.wiktionary.org/wiki/really"
      ]
    }
  ]
  */

  if (!response.ok) return // TODO: show error

  let json = await response.json()
  console.log(json)

  for (let entry of json) {
    let entryElem = document.createElement("div")
    entryElem.style.display = "flex"
    entryElem.style.flexDirection = "column"
    entryElem.style.gap = "8px"
    wrapper.append(entryElem)

    if (json[0].message) {
      entryElem.innerHTML = `
        <h3>No Word Found</h3>
      `
    }

    entryElem.innerHTML = `
      <h3>${capitalizeFirstLetter(entry.word)} <span style="opacity: 0.5;">${entry.phonetic || ""}</span></h3>
    `

    if (entry.meanings) {
      for (let meaning of entry.meanings) {
        entryElem.innerHTML += `
          <h4 style="border-bottom: 1px solid var(--bg-5);">${capitalizeFirstLetter(meaning.partOfSpeech)}</h4>
        `
        for (let defn of meaning.definitions) {
          entryElem.innerHTML += defn.definition
        }
      }
    }

    if (entry.phonetics) {
      for (let phonetic of entry.phonetics) {
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
}

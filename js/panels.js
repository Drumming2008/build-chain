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

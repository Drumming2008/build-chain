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
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${data}`).then(r => {

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
                    {
                        "definition": "(modal) Actually; in fact; in reality.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "\"He really is a true friend.\" / \"Really? What makes you so sure?\""
                    },
                    {
                        "definition": "(as an intensifier) Very (modifying an adjective); very much (modifying a verb).",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "But ma, I really, really want to go to the show!"
                    }
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
                    {
                        "definition": "(sarcastic, typically exaggerated question.) Indicating that what was just said was obvious and unnecessary; contrived incredulity",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "A: I've just been reading Shakespeare - he's one of the best authors like, ever!"
                    },
                    {
                        "definition": "Indicating affirmation, agreement.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "A: That girl talks about herself way too much."
                    },
                    {
                        "definition": "Indicating displeasure at another person's behaviour or statement.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "Well, really! How rude."
                    }
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
                    {
                        "definition": "To ally anew; to re-form an alliance.",
                        "synonyms": [],
                        "antonyms": []
                    }
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

            let wrapper = panelContent.children[1]
            wrapper.innerHTML = ""

            if (r.ok) r.json().then(json => {
                console.log(json)
                for (let i of json) {
                    let entry = document.createElement("div")
                    entry.style.display = "flex"
                    entry.style.flexDirection = "column"
                    entry.style.gap = "8px"
                    wrapper.append(entry)

                    if (json[0].message) entry.innerHTML = `
                        <h3>No Word Found</h3>
                    `

                    entry.innerHTML = `
                        <h3>${capitalizeFirstLetter(i.word)} <span style="opacity: 0.5;">${i.phonetic || ""}</span></h3>
                    `

                    if (i.meanings) for (let j of i.meanings) {
                        entry.innerHTML += `
                            <h4 style="border-bottom: 1px solid var(--bg-5);">${capitalizeFirstLetter(j.partOfSpeech)}</h4>
                        `
                        for (let k of j.definitions) {
                            entry.innerHTML += `
                                ${k.definition}
                            `
                        }
                    }


                    if (i.phonetics) for (let p of i.phonetics) {
                        if (p.audio) {
                            let audioButton = document.createElement("button")
                            audioButton.classList.add("dictionary-audio")
                            audioButton.classList.add("secondary")
                            let audioIcon = document.createElement("i")
                            audioIcon.className = "ph ph-speaker-high"
                            audioButton.append(audioIcon)
                            entry.querySelector("h3").append(audioButton)
                            
                            let audio = new Audio(p.audio)

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
            })
        })
    }
}

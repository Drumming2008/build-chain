const GEMINI_API_KEY = "AIzaSyBSFL5tm-T2eSWqP0ziq54B-mdMX-zU_qE"

function setStatus(message, isError = false) {
  let status = id("regenerate-status")
  status.textContent = message
  status.style.color = isError ? "var(--error)" : "var(--fg)"
}

id("regenerate-button").onclick = () => {
  let controls = id("regenerate-controls")
  controls.style.display = controls.style.display == "none" ? "flex" : "none"
}

id("regenerate-go").onclick = async () => {
  let style = id("style-select").value
  let length = id("length-select").value
  let technicalness = id("technicalness-select").value

  let articleContent = articleElem.innerText

  setStatus("generating...")
  id("regenerate-go").disabled = true

  let prompt = `Rewrite the following text with these attributes:
- Style: ${style}
- Length: ${length}
- Technicalness: ${technicalness}

Text to rewrite:
${articleContent}

Only return the rewritten text, nothing else.`

  try {
    let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        contents: [{
          parts: [{text: prompt}]
        }]
      })
    })

    if (!response.ok) {
      throw new Error(`api error: ${response.status}`)
    }

    articleElem.innerHTML = ""

    let reader = response.body.getReader()
    let decoder = new TextDecoder()
    let buffer = ""

    while (true) {
      let { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      let lines = buffer.split("\n")
      buffer = lines.pop()

      for (let line of lines) {
        if (line.startsWith("data: ")) {
          try {
            let json = JSON.parse(line.slice(6))
            if (json.candidates && json.candidates[0].content) {
              let text = json.candidates[0].content.parts[0].text
              articleElem.innerHTML += text
            }
          } catch (e) {}
        }
      }
    }

    setStatus("done")
    setTimeout(() => {
      id("regenerate-controls").style.display = "none"
      setStatus("")
    }, 1000)
  } catch (error) {
    setStatus(`error: ${error.message}`, true)
  } finally {
    id("regenerate-go").disabled = false
  }
}

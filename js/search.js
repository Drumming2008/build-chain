let searchResultList = []

function searchSites(text) {
  searchResultList = []
  /*
  
  {
    article - the element in the search that wraps all the other info
    title - the title of the article within the wrapper
    desc - the description of the article
    link - the element that has an href to the article
  }

  */
  id("search-button").style.display = "none"
  id("search-x-button").style.display = "flex"


  search(text, {
    article: ".css-1l4w6pd",
    title: "h4",
    desc: ".css-16nhkrn",
    link: ".css-e1lvw9 > a"
  }, "https://www.nytimes.com", "https://www.nytimes.com/search?query=", "New York Times")

  search(text, {
    article: ".gs_r.gs_or.gs_scl",
    title: ".gs_ri a",
    desc: ".gs_rs",
    link: ".gs_ri a"
  }, "", "https://scholar.google.com/scholar?q=", "Google Scholar")

  id("article").innerHTML = `<div id="search-results"><h2>Results for "${text}" <span class="search-results-from">${searchResultList.join(", ")}</span></h2></div>`
}

function search(text, elems, baseURL, searchURL, siteName) {
  searchResultList.push(siteName)
  fetch(`http://shnebir.com/proxy?url=${searchURL}${text}`).then(r => {
    if (r.ok) {
      r.text().then(t => {
        let parser = new DOMParser().parseFromString(t, "text/html")
        let articles = parser.querySelectorAll(elems.article)
        for (let i of articles) {
          let wrapper = document.createElement("div")
          wrapper.classList.add("search-result")
          /* when you click the link instead of going to site it should actually use the proxy again to fetch the data,
          but we prolly need a big object so it knows what element(s) has/have the content of the article for each different domain.
          that would be a big pain, maybe there's a better way? */
          wrapper.innerHTML = `
            <h3><a href="${baseURL}${i.querySelector(elems.link).href.replace(location.origin, "")}">${i.querySelector(elems.title).innerText}</a></h3>
            <span>${i.querySelector(elems.desc).innerText}</span>
            <div class="search-result-site">${siteName}</div>
          `
          id("search-results").append(wrapper)
          wrapper.onclick = e => {
            if (e.target.nodeName != "A" && !e.shiftKey) wrapper.querySelector("a").click()
          }
        }
      })
    }
  })
}

id("search").onkeydown = e => {
  if (e.code == "Enter") {
    searchSites(id("search").value)
  }
}

id("search").oninput = () => {
  id("search-button").style.display = "flex"
  id("search-x-button").style.display = "none"
}

id("search-button").onclick = () => {
  searchSites(id("search").value)
}

id("search-x-button").onclick = () => {
  id("search").value = ""
  id("article").innerHTML = ""
  id("search-button").style.display = "flex"
  id("search-x-button").style.display = "none"
}

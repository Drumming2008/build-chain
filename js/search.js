let searchResultList = []

function searchSites(text) {
  
  /*
  
  {
    article - the element in the search that wraps all the other info
    title - the title of the article within the wrapper
    desc - the description of the article
    link - the element that has an href to the article
  }

  */


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

  id("article").innerHTML = `<div id="search-results"><h2>Results from ${searchResultList.join(", ")}</h2></div>`
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
          wrapper.innerHTML = `
            <h3><a href="${baseURL}${i.querySelector(elems.link).href.replace(location.origin, "")}">${i.querySelector(elems.title).innerText}</a></h3>
            <span>${i.querySelector(elems.desc).innerText}</span>
            <div class="search-result-site">${siteName}</div>
          `
          id("search-results").append(wrapper)
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

id("search-button").onclick = () => {
  searchSites(id("search").value)
}

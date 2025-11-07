// "thin", "light", "bold", "duotone"
for (let weight of ["regular", "fill"]) {
  let link = document.createElement("link")
  link.rel = "stylesheet"
  link.type = "text/css"
  link.href = "https://unpkg.com/@phosphor-icons/web@2.1.1/src/" + weight + "/style.css"
  link.crossOrigin = "anonymous"
  document.head.appendChild(link)
}

/*

go to https://phosphoricons.com/#toolbar to see all the icon names

to use an icon in html use the <i> tag, ex: <i class="ph ph-[name-of-icon]"></i>
the ph class tells it to use phosphor icons and the second ph-* class is how it determines which icon to use

to change the type of icon change the first class to add "-fill" or any of the other icon styles listed above
generally, we should probably only use regular (class "ph") or filled (use this for when something is selected, class "ph-fill")

*/

let fontList = [
  {
    label: "Article Font",
    noLabel: true,
    function: "setArticleFont",
    type: "radio",
    vertical: true,
    buttons: [
    {
      label: "Roboto",
      labelStyle: "font-family: 'Roboto', sans-serif;",
      value: "'Roboto', sans-serif"
    },
    {
      label: "Open Sans",
      labelStyle: "font-family: 'Open Sans', sans-serif;",
      value: "'Open Sans', sans-serif"
    },
    {
      label: "Lato",
      labelStyle: "font-family: 'Lato', sans-serif;",
      value: "'Lato', sans-serif"
    },
    {
      label: "Poppins",
      labelStyle: "font-family: 'Poppins', sans-serif;",
      value: "'Poppins', sans-serif"
    },
    {
      label: "Montserrat",
      labelStyle: "font-family: 'Montserrat', sans-serif;",
      value: "'Montserrat', sans-serif"
    },
    {
      label: "Nunito",
      labelStyle: "font-family: 'Nunito', sans-serif;",
      value: "'Nunito', sans-serif"
    },
    {
      label: "Quicksand",
      labelStyle: "font-family: 'Quicksand', sans-serif;",
      value: "'Quicksand', sans-serif"
    },
    {
      label: "DM Sans",
      labelStyle: "font-family: 'DM Sans', sans-serif;",
      value: "'DM Sans', sans-serif"
    },
    {
      label: "Manrope",
      labelStyle: "font-family: 'Manrope', sans-serif;",
      value: "'Manrope', sans-serif"
    },
    {
      label: "Inter",
      labelStyle: "font-family: 'Inter', sans-serif;",
      value: "'Inter', sans-serif"
    },
    {
      label: "Source Sans 3",
      labelStyle: "font-family: 'Source Sans 3', sans-serif;",
      value: "'Source Sans 3', sans-serif"
    },
    {
      label: "Work Sans",
      labelStyle: "font-family: 'Work Sans', sans-serif;",
      value: "'Work Sans', sans-serif"
    },
    {
      label: "Raleway",
      labelStyle: "font-family: 'Raleway', sans-serif;",
      value: "'Raleway', sans-serif"
    },
    {
      label: "IBM Plex Sans",
      labelStyle: "font-family: 'IBM Plex Sans', sans-serif;",
      value: "'IBM Plex Sans', sans-serif"
    },
    {
      label: "Public Sans",
      labelStyle: "font-family: 'Public Sans', sans-serif;",
      value: "'Public Sans', sans-serif"
    },
    {
      label: "Karla",
      labelStyle: "font-family: 'Karla', sans-serif;",
      value: "'Karla', sans-serif"
    },
    {
      label: "PT Sans",
      labelStyle: "font-family: 'PT Sans', sans-serif;",
      value: "'PT Sans', sans-serif"
    },
    {
      label: "Noto Sans",
      labelStyle: "font-family: 'Noto Sans', sans-serif;",
      value: "'Noto Sans', sans-serif"
    },
    {
      label: "Noto Serif",
      labelStyle: "font-family: 'Noto Serif', serif;",
      value: "'Noto Serif', serif"
    },
    {
      label: "Playfair Display",
      labelStyle: "font-family: 'Playfair Display', serif;",
      value: "'Playfair Display', serif"
    },
    {
      label: "Lora",
      labelStyle: "font-family: 'Lora', serif;",
      value: "'Lora', serif"
    },
    {
      label: "Merriweather",
      labelStyle: "font-family: 'Merriweather', serif;",
      value: "'Merriweather', serif"
    },
    {
      label: "Crimson Pro",
      labelStyle: "font-family: 'Crimson Pro', serif;",
      value: "'Crimson Pro', serif"
    },
    {
      label: "Spectral",
      labelStyle: "font-family: 'Spectral', serif;",
      value: "'Spectral', serif"
    },
    {
      label: "Source Serif 4",
      labelStyle: "font-family: 'Source Serif 4', serif;",
      value: "'Source Serif 4', serif"
    },
    {
      label: "PT Serif",
      labelStyle: "font-family: 'PT Serif', serif;",
      value: "'PT Serif', serif"
    },
    {
      label: "Libre Baskerville",
      labelStyle: "font-family: 'Libre Baskerville', serif;",
      value: "'Libre Baskerville', serif"
    },
    {
      label: "Cormorant Garamond",
      labelStyle: "font-family: 'Cormorant Garamond', serif;",
      value: "'Cormorant Garamond', serif"
    },
    {
      label: "DM Serif Text",
      labelStyle: "font-family: 'DM Serif Text', serif;",
      value: "'DM Serif Text', serif"
    },
    {
      label: "Vollkorn",
      labelStyle: "font-family: 'Vollkorn', serif;",
      value: "'Vollkorn', serif"
    },
    {
      label: "Fira Code",
      labelStyle: "font-family: 'Fira Code', monospace;",
      value: "'Fira Code', monospace"
    },
    {
      label: "JetBrains Mono",
      labelStyle: "font-family: 'JetBrains Mono', monospace;",
      value: "'JetBrains Mono', monospace"
    },
    {
      label: "Inconsolata",
      labelStyle: "font-family: 'Inconsolata', monospace;",
      value: "'Inconsolata', monospace"
    },
    {
      label: "Source Code Pro",
      labelStyle: "font-family: 'Source Code Pro', monospace;",
      value: "'Source Code Pro', monospace"
    },
    {
      label: "Roboto Mono",
      labelStyle: "font-family: 'Roboto Mono', monospace;",
      value: "'Roboto Mono', monospace"
    },
    {
      label: "IBM Plex Mono",
      labelStyle: "font-family: 'IBM Plex Mono', monospace;",
      value: "'IBM Plex Mono', monospace"
    },
    {
      label: "Space Mono",
      labelStyle: "font-family: 'Space Mono', monospace;",
      value: "'Space Mono', monospace"
    },
    {
      label: "Ubuntu Mono",
      labelStyle: "font-family: 'Ubuntu Mono', monospace;",
      value: "'Ubuntu Mono', monospace"
    },
    {
      label: "PT Mono",
      labelStyle: "font-family: 'PT Mono', monospace;",
      value: "'PT Mono', monospace"
    },
    {
      label: "Cousine",
      labelStyle: "font-family: 'Cousine', monospace;",
      value: "'Cousine', monospace"
    },
    {
      label: "Hack",
      labelStyle: "font-family: 'Hack', monospace;",
      value: "'Hack', monospace"
    },
    {
      label: "Overpass Mono",
      labelStyle: "font-family: 'Overpass Mono', monospace;",
      value: "'Overpass Mono', monospace"
    },
    {
      label: "Pacifico",
      labelStyle: "font-family: 'Pacifico', cursive;",
      value: "'Pacifico', cursive"
    },
    {
      label: "Dancing Script",
      labelStyle: "font-family: 'Dancing Script', cursive;",
      value: "'Dancing Script', cursive"
    },
    {
      label: "Great Vibes",
      labelStyle: "font-family: 'Great Vibes', cursive;",
      value: "'Great Vibes', cursive"
    },
    {
      label: "Lobster",
      labelStyle: "font-family: 'Lobster', cursive;",
      value: "'Lobster', cursive"
    },
    {
      label: "Sacramento",
      labelStyle: "font-family: 'Sacramento', cursive;",
      value: "'Sacramento', cursive"
    },
    {
      label: "Satisfy",
      labelStyle: "font-family: 'Satisfy', cursive;",
      value: "'Satisfy', cursive"
    },
    {
      label: "Allura",
      labelStyle: "font-family: 'Allura', cursive;",
      value: "'Allura', cursive"
    },
    {
      label: "Alex Brush",
      labelStyle: "font-family: 'Alex Brush', cursive;",
      value: "'Alex Brush', cursive"
    },
    {
      label: "Amatic SC",
      labelStyle: "font-family: 'Amatic SC', cursive;",
      value: "'Amatic SC', cursive"
    },
    {
      label: "Indie Flower",
      labelStyle: "font-family: 'Indie Flower', cursive;",
      value: "'Indie Flower', cursive"
    },
    {
      label: "Caveat",
      labelStyle: "font-family: 'Caveat', cursive;",
      value: "'Caveat', cursive"
    },
    {
      label: "Parisienne",
      labelStyle: "font-family: 'Parisienne', cursive;",
      value: "'Parisienne', cursive"
    },
    {
      label: "Shadows Into Light",
      labelStyle: "font-family: 'Shadows Into Light', cursive;",
      value: "'Shadows Into Light', cursive"
    },
    {
      label: "Yellowtail",
      labelStyle: "font-family: 'Yellowtail', cursive;",
      value: "'Yellowtail', cursive"
    },
    {
      label: "Cookie",
      labelStyle: "font-family: 'Cookie', cursive;",
      value: "'Cookie', cursive"
    },
    {
      label: "Arizonia",
      labelStyle: "font-family: 'Arizonia', cursive;",
      value: "'Arizonia', cursive"
    },
    {
      label: "Patrick Hand",
      labelStyle: "font-family: 'Patrick Hand', cursive;",
      value: "'Patrick Hand', cursive"
    },
    {
      label: "Reenie Beanie",
      labelStyle: "font-family: 'Reenie Beanie', cursive;",
      value: "'Reenie Beanie', cursive"
    },
    {
      label: "Bebas Neue",
      labelStyle: "font-family: 'Bebas Neue', sans-serif;",
      value: "'Bebas Neue', sans-serif"
    },
    {
      label: "Oswald",
      labelStyle: "font-family: 'Oswald', sans-serif;",
      value: "'Oswald', sans-serif"
    },
    {
      label: "Anton",
      labelStyle: "font-family: 'Anton', sans-serif;",
      value: "'Anton', sans-serif"
    },
    {
      label: "Abril Fatface",
      labelStyle: "font-family: 'Abril Fatface', serif;",
      value: "'Abril Fatface', serif"
    },
    {
      label: "Black Ops One",
      labelStyle: "font-family: 'Black Ops One', cursive;",
      value: "'Black Ops One', cursive"
    },
    {
      label: "Bungee",
      labelStyle: "font-family: 'Bungee', display;",
      value: "'Bungee', display"
    },
    {
      label: "Alfa Slab One",
      labelStyle: "font-family: 'Alfa Slab One', display;",
      value: "'Alfa Slab One', display"
    },
    {
      label: "Fredoka One",
      labelStyle: "font-family: 'Fredoka One', display;",
      value: "'Fredoka One', display"
    },
    {
      label: "Luckiest Guy",
      labelStyle: "font-family: 'Luckiest Guy', display;",
      value: "'Luckiest Guy', display"
    },
    {
      label: "Righteous",
      labelStyle: "font-family: 'Righteous', display;",
      value: "'Righteous', display"
    },
    {
      label: "Russo One",
      labelStyle: "font-family: 'Russo One', display;",
      value: "'Russo One', display"
    },
    {
      label: "Orbitron",
      labelStyle: "font-family: 'Orbitron', display;",
      value: "'Orbitron', display"
    },
    {
      label: "Cinzel",
      labelStyle: "font-family: 'Cinzel', serif;",
      value: "'Cinzel', serif"
    },
    {
      label: "Audiowide",
      labelStyle: "font-family: 'Audiowide', display;",
      value: "'Audiowide', display"
    },
    {
      label: "Unica One",
      labelStyle: "font-family: 'Unica One', display;",
      value: "'Unica One', display"
    },
    {
      label: "Press Start 2P",
      labelStyle: "font-family: 'Press Start 2P', monospace;",
      value: "'Press Start 2P', monospace"
    },
    {
      label: "VT323",
      labelStyle: "font-family: 'VT323', monospace;",
      value: "'VT323', monospace"
    },
    {
      label: "Exo",
      labelStyle: "font-family: 'Exo', display;",
      value: "'Exo', display"
    },
    {
      label: "Baloo 2",
      labelStyle: "font-family: 'Baloo 2', display;",
      value: "'Baloo 2', display"
    },
    {
      label: "Nunito Sans",
      labelStyle: "font-family: 'Nunito Sans', sans-serif;",
      value: "'Nunito Sans', sans-serif"
    },
    {
      label: "Noto Sans JP",
      labelStyle: "font-family: 'Noto Sans JP', sans-serif;",
      value: "'Noto Sans JP', sans-serif"
    },
    {
      label: "Noto Sans KR",
      labelStyle: "font-family: 'Noto Sans KR', sans-serif;",
      value: "'Noto Sans KR', sans-serif"
    },
    {
      label: "Noto Sans TC",
      labelStyle: "font-family: 'Noto Sans TC', sans-serif;",
      value: "'Noto Sans TC', sans-serif"
    },
    {
      label: "Noto Sans SC",
      labelStyle: "font-family: 'Noto Sans SC', sans-serif;",
      value: "'Noto Sans SC', sans-serif"
    }
    ]
  }
]

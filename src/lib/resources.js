export const RESOURCE_CATEGORIES = [
  'All',
  'Books',
  'Toys & Games',
  'Movies & TV',
  'Music',
  'Food & Entertaining',
  'Collectibles',
]

// creditLabel: "Author" | "By" | "Manufacturer" | "Publisher" | "Director" | etc.
// buyLabel: label for the buy button
// image: URL to cover/product image
// review: Gerry's thoughts — leave null until Gerry adds one

export const resources = [
  {
    id: 'a-christmas-story-book',
    title: 'A Christmas Story: The Book That Inspired the Hilarious Classic Film',
    credit: 'Jean Shepherd',
    creditLabel: 'Author',
    category: 'Books',
    year: 1983,
    image: 'https://covers.openlibrary.org/b/isbn/0385512082-L.jpg',
    description:
      "Jean Shepherd's semi-autobiographical stories that became the foundation for the beloved 1983 film. Laugh-out-loud funny and deeply nostalgic — essential '80s Christmas reading.",
    review: null,
    buyUrl: 'https://www.amazon.com/Christmas-Story-Inspired-Hilarious-Classic/dp/0385512082',
    buyLabel: 'Buy on Amazon',
  },
  {
    id: 'autobiography-of-santa-claus',
    title: 'The Autobiography of Santa Claus',
    credit: 'Jeff Guinn',
    creditLabel: 'Author',
    category: 'Books',
    year: 1994,
    image: 'https://covers.openlibrary.org/b/isbn/1585423874-L.jpg',
    description:
      "Santa Claus tells his own story — from fourth-century bishop to modern-day icon — weaving together real history with charming fiction. A great read for anyone who loves the mythology of the big guy.",
    review: null,
    buyUrl: 'https://www.amazon.com/Autobiography-Santa-Claus-Jeff-Guinn/dp/1585423874',
    buyLabel: 'Buy on Amazon',
  },
  {
    id: 'christmas-in-the-crosshairs',
    title: 'Christmas in the Crosshairs',
    credit: 'Gerry Bowler',
    creditLabel: 'Author',
    category: 'Books',
    year: 2016,
    image: 'https://covers.openlibrary.org/b/isbn/0190233117-L.jpg',
    description:
      "A fascinating deep-dive into the two-thousand-year war over Christmas — who celebrates it, who opposes it, and why the holiday has always been contested. Perfect background reading for any serious Christmas enthusiast.",
    review: null,
    buyUrl: 'https://www.amazon.com/Christmas-Crosshairs-Thousand-Denouncing-Defending/dp/0190233117',
    buyLabel: 'Buy on Amazon',
  },
  {
    id: 'encyclopedia-of-christmas',
    title: "Encyclopedia of Christmas and New Year's Celebrations",
    credit: 'Tanya Gulevich',
    creditLabel: 'Author',
    category: 'Books',
    year: 2003,
    image: 'https://covers.openlibrary.org/b/isbn/0780803752-L.jpg',
    description:
      "Over 240 entries covering every aspect of Christmas and New Year's traditions, symbols, legends, and lore from around the world. The ultimate reference for the obsessive holiday enthusiast.",
    review: null,
    buyUrl: 'https://www.amazon.com/Encyclopedia-Christmas-New-Years-Celebrations/dp/0780803752',
    buyLabel: 'Buy on Amazon',
  },
  {
    id: 'drunken-botanist',
    title: 'The Drunken Botanist',
    credit: 'Amy Stewart',
    creditLabel: 'Author',
    category: 'Food & Entertaining',
    year: 2013,
    image: 'https://covers.openlibrary.org/b/isbn/1616200464-L.jpg',
    description:
      "For those holiday party drinks — a beautifully written exploration of the botanical origins of spirits and cocktails. A great gift for the drink-curious Christmas entertainer.",
    review: null,
    buyUrl: 'https://www.amazon.com/Drunken-Botanist-Plants-Create-Worlds/dp/1616200464',
    buyLabel: 'Buy on Amazon',
  },
  {
    id: 'totally-tubular-80s-toys',
    title: "Totally Tubular '80s Toys",
    credit: 'Bill Bruegman',
    creditLabel: 'Author',
    category: 'Toys & Games',
    year: 2005,
    image: 'https://covers.openlibrary.org/b/isbn/9781440231100-L.jpg',
    description:
      "A comprehensive visual guide to the toys that defined the decade. From G.I. Joe to Cabbage Patch Kids, this is the reference book every child of the '80s wishes they had. Full of catalog photos and nostalgia.",
    review: null,
    buyUrl: 'https://www.amazon.com/s?k=totally+tubular+80s+toys+bruegman',
    buyLabel: 'Find on Amazon',
  },
]

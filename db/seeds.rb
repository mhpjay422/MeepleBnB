User.delete_all
Listing.delete_all

demoUser = User.create({username: "demoUser", email: "demoUser@gmail.com", password: "starwars"})
d2 = User.create({username: "Craig", email: "craig@gmail.com", password: "starwars"})
d3 = User.create({username: "Molly", email: "molly@gmail.com", password: "starwars"})

l1 = Listing.create({
  lat: 40.805132,
  lng: -73.966390,
  title: "A Gamer's Paradise",
  description: "A complete collection of games to choose from with all the amenities of a luxury hotel",
  address: "2871 Broadway, New York, NY 10025",
  price: 279,
  picture_url: "http://surface-tension.net/wp-content/uploads/2017/02/board-game-room-red-baize.jpg",
  owner_id: demoUser.id
  })

l2 = Listing.create({
  lat: 40.729314,
  lng: -73.998772,
  title: "Hippest location in town with a hip collection",
  description: "Loads of games to choose from and enjoy the nightlife in one of the hippest areas in NYC",
  address: "230 Thompson St, New York, NY 10012",
  price: 129,
  picture_url: "http://surface-tension.net/wp-content/uploads/2017/02/board-game-room-red-baize.jpg",
  owner_id: d2.id
  })

l3 = Listing.create({
  lat: 40.747512,
  lng: -73.984221,
  title: "In the Heart of Manhattan ",
  description: "Enjoy playing games from my personal collections and be just minutes walk from all the great restaurants in New York City",
  address: "11 E 33rd St, New York, NY 10016",
  price: 199,
  picture_url: "http://surface-tension.net/wp-content/uploads/2017/02/board-game-room-red-baize.jpg",
  owner_id: d3.id
  })

l4 = Listing.create({
  lat: 40.750506,
  lng: 73.980730,
  title: "Cozy spot with a great location",
  description: "Play games from my collection with a large number of grail games.",
  address: "261 Madison Ave 9th Floor, New York, NY 10016",
  price: 159,
  picture_url: "http://surface-tension.net/wp-content/uploads/2017/02/board-game-room-red-baize.jpg",
  owner_id: d2.id
  })

l5 = Listing.create({
  lat: 40.758137,
  lng: -73.916884,
  title: "The Lux space of Queens",
  description: "Enjoy playing games in style. Handcrafted furniture to make your gaming experience unique",
  address: "42-11 Broadway, Astoria, NY 11103",
  price: 259,
  picture_url: "http://surface-tension.net/wp-content/uploads/2017/02/board-game-room-red-baize.jpg",
  owner_id: d3.id
  })

l6 = Listing.create({
  lat: 40.747512,
  lng: -73.984221,
  title: "Brooklyn's finest",
  description: "The most unique gaming space this side of Brooklyn",
  address: "362 Grand St, Brooklyn, NY 11211",
  price: 179,
  picture_url: "http://surface-tension.net/wp-content/uploads/2017/02/board-game-room-red-baize.jpg",
  owner_id: demoUser.id
  })

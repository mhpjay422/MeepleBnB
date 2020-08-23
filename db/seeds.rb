User.delete_all
Listing.delete_all
Review.delete_all

demoUser = User.create({username: "demoUser", email: "demoUser@gmail.com", password: "starwars"})
d2 = User.create({username: "Harry", email: "harry@gmail.com", password: "starwars"})
d3 = User.create({username: "Hermoine", email: "hermoine@gmail.com", password: "starwars"})
d4 = User.create({username: "Han", email: "han@gmail.com", password: "starwars"})
d5 = User.create({username: "Chewy", email: "chewy@gmail.com", password: "starwars"})
d6 = User.create({username: "Mario", email: "mario@gmail.com", password: "starwars"})
d7 = User.create({username: "Luigi", email: "luigi@gmail.com", password: "starwars"})

l1 = Listing.create({
  lat: 40.805248,
  lng: -73.966090,
  title: "A Gamer's Paradise",
  description: "A complete collection of games to choose from with all the amenities of a luxury hotel",
  address: "2871 Broadway, New York, NY 10025",
  price: 279,
  picture_url: "./images (4).jpeg",
  owner_id: demoUser.id
  })

r1 = Review.create({
  body: "A Great stay! Staff was super helpful and accommodating. 10 out of 10 stay for sure. The house is very nice and comfortable! Location is very convenient. Jason was very helpful and friendly, he’s a super host!", 
  rating: 5, 
  listing_id: l1.id,
  author_id: d2.id
})

r2 = Review.create({
  body: "An awesome stay! Staff was super helpful and accommodating. 10 out of 10 stay for sure. The house is very nice and comfortable! Location is very convenient. Jason was very helpful and friendly, he’s a super host!", 
  rating: 5, 
  listing_id: l1.id,
  author_id: d3.id
})

r3 = Review.create({
  body: "A stupendous stay! Staff was super helpful and accommodating. 10 out of 10 stay for sure. The house is very nice and comfortable! Location is very convenient. Jason was very helpful and friendly, he’s a super host!", 
  rating: 5, 
  listing_id: l1.id,
  author_id: d4.id
})

r4 = Review.create({
  body: "A fantastic stay! Staff was super helpful and accommodating. 10 out of 10 stay for sure. The house is very nice and comfortable! Location is very convenient. Jason was very helpful and friendly, he’s a super host!", 
  rating: 5, 
  listing_id: l1.id,
  author_id: d5.id
})

r5 = Review.create({
  body: "An amazing stay! Staff was super helpful and accommodating. 10 out of 10 stay for sure. The house is very nice and comfortable! Location is very convenient. Jason was very helpful and friendly, he’s a super host!", 
  rating: 5, 
  listing_id: l1.id,
  author_id: d6.id
})

r6 = Review.create({
  body: "A glorious stay! Staff was super helpful and accommodating. 10 out of 10 stay for sure. The house is very nice and comfortable! Location is very convenient. Jason was very helpful and friendly, he’s a super host!", 
  rating: 4, 
  listing_id: l1.id,
  author_id: d7.id
})

l11 = Listing.create({
  lat: 40.767724,
  lng: -73.935290,
  title: "The Prime space of Queens",
  description: "Enjoy playing games in style. Handcrafted furniture to make your gaming experience unique",
  address: "11-11 Broadway, Astoria, NY 11103",
  price: 259,
  picture_url: "boardgameroom.jpeg",
  owner_id: d3.id
  })

l2 = Listing.create({
  lat: 40.729397,
  lng: -73.998859,
  title: "Hippest location in town with a hip collection",
  description: "Loads of games to choose from and enjoy the nightlife in one of the hippest areas in NYC",
  address: "230 Thompson St, New York, NY 10012",
  price: 129,
  picture_url: "./download (1).jpeg",
  owner_id: d2.id
  })

l3 = Listing.create({
  lat: 40.747442,
  lng: -73.984265,
  title: "In the Heart of Manhattan ",
  description: "Enjoy playing games from my personal collections and be just minutes walk from all the great restaurants in New York City",
  address: "11 E 33rd St, New York, NY 10016",
  price: 199,
  picture_url: "./images.jpeg",
  owner_id: d3.id
  })

l4 = Listing.create({
  lat: 40.750629,
  lng: -73.980883,
  title: "Cozy spot with a great location",
  description: "Play games from my collection with a large number of grail games.",
  address: "261 Madison Ave 9th Floor, New York, NY 10016",
  price: 159,
  picture_url: "./images (6).jpeg",
  owner_id: d2.id
  })

l5 = Listing.create({
  lat: 40.758167,
  lng: -73.916855,
  title: "The Lux space of Queens",
  description: "Enjoy playing games in style. Handcrafted furniture to make your gaming experience unique",
  address: "42-11 Broadway, Astoria, NY 11103",
  price: 259,
  picture_url: "./download (8).jpeg",
  owner_id: d3.id
  })

l6 = Listing.create({
  lat: 40.711964,
  lng: -73.940689,
  title: "Brooklyn's finest",
  description: "The most unique gaming space this side of Brooklyn",
  address: "1562 Grand St, Brooklyn, NY 11211",
  price: 179,
  picture_url: "./images (2).jpeg",
  owner_id: demoUser.id
  })

l7 = Listing.create({
  lat: 40.798508,
  lng: -73.969116,
  title: "A Gamer's Heaven",
  description: "A complete collection of games to choose from with all the amenities of a luxury hotel",
  address: "7128 Broadway, New York, NY 10025",
  price: 279,
  picture_url: "./download.jpeg",
  owner_id: demoUser.id
  })

l8 = Listing.create({
  lat: 40.714863,
  lng: -73.998956,
  title: "Greatest location in town with a great collection",
  description: "Loads of games to choose from and enjoy the nightlife in one of the hippest areas in NYC",
  address: "37 Mott St, New York, NY 10013",
  price: 129,
  picture_url: "./download (10).jpeg",
  owner_id: d2.id
  })

l9 = Listing.create({
  lat: 40.765804,
  lng: -73.985274,
  title: "In the Center of Manhattan ",
  description: "Enjoy playing games from my personal collections and be just minutes walk from all the great restaurants in New York City",
  address: "330 W 55th St New York, NY 10019",
  price: 199,
  picture_url: "./download (9).jpeg",
  owner_id: d3.id
  })

l10 = Listing.create({
  lat: 40.766174,
  lng: -73.962982,
  title: "Awesome spot with a even more awesome location",
  description: "Play games from my collection with a large number of grail games.",
  address: "1131 3rd Ave, New York, NY 10065",
  price: 159,
  picture_url: "./download (7).jpeg",
  owner_id: d2.id
  })

l17 = Listing.create({
  lat: 40.743283,
  lng: -73.951683,
  title: "The posh space of Queens",
  description: "Enjoy playing games in style. Handcrafted furniture to make your gaming experience unique",
  address: "10-93 Jackson Ave, Long Island City, NY 11101",
  price: 259,
  picture_url: "./images (5).jpeg",
  owner_id: d3.id
  })

l12 = Listing.create({
  lat: 40.704312,
  lng: -73.986568,
  title: "Brooklyn's grand",
  description: "The most unique gaming space this side of Brooklyn",
  address: "25 Jay St, Brooklyn, NY 11201",
  price: 179,
  picture_url: "./download (4).jpeg",
  owner_id: demoUser.id
  })

l13 = Listing.create({
  lat: 40.741902,
  lng: -73.989365,
  title: "A Gamer's Utopia",
  description: "A complete collection of games to choose from with all the amenities of a luxury hotel",
  address: "200 5th Ave, New York, NY 10010",
  price: 279,
  picture_url: "./download (2).jpeg",
  owner_id: demoUser.id
  })

l14 = Listing.create({
  lat: 40.742107,
  lng: -74.004602,
  title: "Hottest location in town with a hot collection",
  description: "Loads of games to choose from and enjoy the nightlife in one of the hippest areas in NYC",
  address: "75 9th Ave, New York, NY 10011",
  price: 129,
  picture_url: "./download (11).jpeg",
  owner_id: d2.id
  })

l15 = Listing.create({
  lat: 40.707211,
  lng: -74.011169,
  title: "In the Epicenter of Manhattan ",
  description: "Enjoy playing games from my personal collections and be just minutes walk from all the great restaurants in New York City",
  address: "11 Wall St, New York, NY 10005",
  price: 199,
  picture_url: "./download (3).jpeg",
  owner_id: d3.id
  })

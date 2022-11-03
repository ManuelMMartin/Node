"POKEMON"
1
db.samples_pokemon.find({ num: "132" })
2
db.samples_pokemon.find({ type: "Poison" })
3
db.samples_pokemon.find({ avg_spawns: { $eq: 4.2 } })
4
db.samples_pokemon.find({ $and: [{ candy_count: { $gte: 20 } }, { candy_count: { $lte: 50 } }] })
5
db.samples_pokemon.find({ spawn_chance: { $gt: 0.088 } })
6
db.samples_pokemon.find().sort({ weight: -1 }).limit(10)
7
db.samples_pokemon.find({ next_evolution: { $elemMatch: { num: "002" } } })
8
db.samples_pokemon.find({ $and: [{ candy_count: { $gte: 25 } }, { avg_spawns: { $gt: 5 } }] })
9
db.samples_pokemon.find({ $and: [{ weaknesses: "Ground" }, { multipliers: null }] })
10
db.samples_pokemon.find().sort({ avg_spawns: -1 })
11
db.samples_pokemon.find({ candy_count: { $lt: 100 } }).sort({ candy_count: -1 })
12
db.samples_pokemon.find({ egg: "Not in Eggs" })
13
db.samples_pokemon.find({ $or: [{ multipliers: null }, { candy_count: { $gte: 100 } }] })
14
db.samples_pokemon.find({ $and: [{ candy_count: { $gt: 25 } }, { spawn_time: { $lt: 15 } }, { avg_spawns: { $gt: 40 } }] })
15
db.samples_pokemon.find({ candy_count: { $gt: 50 } }).limit(3)
16
db.samples_pokemon.find({ $and: [{ type: "Ground" }, { weaknesses: { $ne: "Grass" } }] })
17
db.samples_pokemon.find().sort({ candy_count: -1 })
18
db.samples_pokemon.find().sort({ spawn_chance: 1 })
19
db.samples_pokemon.find({ name: "Mewtwo" })

"F.R.I.E.N.D.S."
1
db.samples_friends.find({ season: 1 })
2
db.samples_friends.find({ airtime: "20:00" })
3
db.samples_friends.find({ name: /w/ })
4
db.samples_friends.find({ $and: [{ season: 2 }, { number: 1 }] })
5
db.samples_friends.find({ season: 1 }).limit(5)
6
db.samples_friends.find({ name: /^The One/ })
7
db.samples_friends.find({ name: /Chandler/ })
8
db.samples_friends.find({ $and: [{ season: 3 }, { name: /Ross/ }] })

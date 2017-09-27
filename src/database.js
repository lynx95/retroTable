import sqlite from 'sqlite3';

let sqlite3 = sqlite.verbose();

let db = new sqlite3.Database('retroDB');

db.serialize(() => {
	//db.run("CREATE TABLE user (id INT, dt TEXT)");


	db.each("SELECT * FROM user", (err, row) => {
		console.log("User id : "+row.id, row.dt);
	});
});

db.close();
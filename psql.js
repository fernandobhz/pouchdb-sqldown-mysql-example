var express = require('express');
var router = express.Router();

var fernando = {
	_id: 'fernando',
	idade: 31
}

router.get('/', async function(req, res) {
	//SELECT ID, CONVERT(`key` USING utf8), CONVERT(value USING utf8) FROM msch.sqldown order by 1 desc
	var myconn = 'mysql://root:Abc741963.@localhost/msch';
	
	var PouchDB = require('pouchdb');
	var sqldown = require('sqldown');
	var SqlDownDB = PouchDB.defaults({db: function() {
		return new sqldown(myconn);
	}});
	
	var db = new SqlDownDB('');

	try { var existing = await db.get('fernando'); } catch(err) { var existing; }
	
	if ( existing ) {
		console.log(existing);
		await db.remove(existing);
	}

	await db.put(fernando);

	res.json(await db.get('fernando'));
});

module.exports = router;
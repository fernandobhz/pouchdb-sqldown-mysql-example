# pouchdb-sqldown-mysql-example
How to use pouchdb with sqldown mysql

	var express = require('express');
	var router = express.Router();

	var fernando = {
		_id: 'fernando',
		idade: 31,
		site: 'https://fernandobhz.github.io'
	}

	router.get('/', async function(req, res) {
		//SELECT ID, CONVERT(`key` USING utf8), CONVERT(value USING utf8) FROM msch.sqldown order by 1 desc
		var myconn = 'mysql://root:Abc741963.@localhost/msch';
		
		var PouchDB = require('pouchdb').plugin(require('pouchdb-find'));
		var sqldown = require('sqldown');
		var SqlDownDB = PouchDB.defaults({db: function(location) {
			return new sqldown(myconn + '?table=' + location);
		}});
		
		var db = new SqlDownDB('abc');

		try { var existing = await db.get('fernando'); } catch(err) { var existing; }
		
		if ( existing ) {
			console.log(existing);
			await db.remove(existing);
		}

		await db.put(fernando);

		res.json(await db.get('fernando'));
		
		
		db.createIndex({
		  index: {
			fields: ['foo']
		  }
		}).then(function (result) {
		  console.log(result);
		}).catch(function (err) {
		  console.log(err);
		});
		
	});

	module.exports = router;

[http://fernandobhz.com.br](http://fernandobhz.com.br)  
[http://fernandobhz.com](http://fernandobhz.com)  
[http://fernandobhz.github.io](http://fernandobhz.github.io)  

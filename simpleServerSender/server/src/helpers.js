
//maps keys & values together && assigns to socket '.on' handling
const mapEventsAndHandlers = (e, s) => {
		let thisKey = Object.keys(e)[0]
		let thisHandler = e[thisKey]
		s.on(thisKey, thisHandler);
}

module.exports = {
	mapEventsAndHandlers
}
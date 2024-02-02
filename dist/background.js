console.log("Wow I'm running");

browser.runtime.onMessage.addListener(
	(req, sender) => {
		console.log(`Message recieved ${req.es.length}`)

		req.es.forEach(e => {
			console.log(e)
		})
	}
)

console.log("READ everythinh")
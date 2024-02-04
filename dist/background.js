const objectIsInArray = (object, array) => {
	for (let i = 0; i < array.length; i += 1) {
		if (JSON.stringify(array[i]) === JSON.stringify(object)) {
			return true;
		}
	}

	return false;
};

browser.runtime.onMessage.addListener(async (req, sender) => {
	let content = await browser.storage.local.get("tweets");

	if (!content.tweets.length) {
		content.tweets = req.es;
	} else {
		req.es.forEach((e) => {
			if (
				!objectIsInArray(e, content.tweets) &&
				content.tweets.length <= 100
			) {
				content.tweets.push(e);
			}
		});
	}

	browser.storage.local.set({ tweets: content.tweets });
});

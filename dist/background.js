browser.browserAction.setBadgeBackgroundColor({
	color: "gray",
});

browser.browserAction.setBadgeText({
	text: "0",
});

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

	if (!content.tweets || content.tweets.length < 1) {
		content = {
			tweets: req.es,
		};
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

	if (content.tweets.length < 300) {
		browser.browserAction.setBadgeBackgroundColor({
			color: "green",
		});
	} else if (content.tweets.length < 400) {
		browser.browserAction.setBadgeBackgroundColor({
			color: "yellow",
		});
	} else if (content.tweets.length < 300) {
		browser.browserAction.setBadgeBackgroundColor({
			color: "orange",
		});
	} else {
		browser.browserAction.setBadgeBackgroundColor({
			color: "red",
		});
	}
	browser.browserAction.setBadgeText({
		text: JSON.stringify(content.tweets.length),
	});

	browser.storage.local.set({ tweets: content.tweets });
});

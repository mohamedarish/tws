chrome.action.setBadgeBackgroundColor({
	color: "#808080",
});

chrome.action.setBadgeText({
	text: "0",
});

const objectIsInArray = (obj, array) => {
	for (let i = 0; i < array.length; i += 1) {
		let same = true;

		for (let key in obj) {
			if (obj[key] != array[i][key]) {
				same = false;
			}
		}

		if (same) {
			return true;
		}
	}

	return false;
};

chrome.runtime.onMessage.addListener(async (req, sender) => {
	let content = await chrome.storage.local.get(["tweets"]);

	if (!content.tweets || content.tweets.length < 1) {
		content = {
			tweets: req.es,
		};
	} else {
		req.es.forEach((e) => {
			if (
				!objectIsInArray(e, content.tweets) &&
				content.tweets.length <= 500
			) {
				content.tweets.push(e);
			}
		});
	}

	if (content.tweets.length < 300) {
		chrome.action.setBadgeBackgroundColor({
			color: "#00ff00",
		});
	} else if (content.tweets.length < 400) {
		chrome.action.setBadgeBackgroundColor({
			color: "#ffff00",
		});
	} else if (content.tweets.length < 500) {
		chrome.action.setBadgeBackgroundColor({
			color: "#ff7700",
		});
	} else {
		chrome.action.setBadgeBackgroundColor({
			color: "#ff0000",
		});
	}
	chrome.action.setBadgeText({
		text: JSON.stringify(content.tweets.length),
	});

	chrome.storage.local.set({
		tweets: content.tweets,
		searchKey: req.searchKey,
	});
});

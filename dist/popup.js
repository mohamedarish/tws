let current_content = '"datetimee", "usertag", "username", "content"\n';

document.addEventListener("DOMContentLoaded", async () => {
	const tweets = await browser.storage.local.get("tweets");

	if (tweets.tweets && tweets.tweets.length > 0) {
		tweets.tweets.forEach((tweet) => {
			const tableRow = document.createElement("tr");
			current_content += `${JSON.stringify(tweet.time)}, ${JSON.stringify(
				tweet.tag
			)}, ${JSON.stringify(tweet.name)}, ${JSON.stringify(
				tweet.content.replaceAll(",", ";")
			)}\n`;

			const time = document.createElement("td");
			time.innerText += String.raw`${tweet.time}`;

			const tag = document.createElement("td");
			tag.innerText += String.raw`${tweet.tag}`;

			const name = document.createElement("td");
			name.innerText += String.raw`${tweet.name}`;

			const content = document.createElement("td");
			content.innerText += String.raw`${tweet.content.replace(",", ";")}`;

			tableRow.appendChild(time);
			tableRow.appendChild(tag);
			tableRow.appendChild(name);
			tableRow.appendChild(content);
			document.getElementById("tweetStore").appendChild(tableRow);
		});
	}
});

document.getElementById("clear-button").addEventListener("click", () => {
	browser.storage.local.set({ tweets: [] });
	const tweetDiv = document.getElementById("tweetStore");

	while (tweetDiv.firstChild) {
		tweetDiv.removeChild(tweetDiv.firstChild);
	}
});

document.getElementById("download-button").addEventListener("click", () => {
	const blob = new Blob([current_content], { type: "text/html" });

	const filename = document.getElementById("filename").value;

	const blobUrl = URL.createObjectURL(blob);

	const link = document.createElement("a");

	link.setAttribute("href", blobUrl);
	link.setAttribute(
		"download",
		filename ? `${filename}.csv` : "some_data.csv"
	);
	document.body.appendChild(link);

	link.dispatchEvent(
		new MouseEvent("click", {
			bubbles: true,
			cancelable: true,
			view: window,
		})
	);

	document.body.removeChild(link);

	URL.revokeObjectURL(blobUrl);
});

document.getElementById("pause-play").addEventListener("click", async () => {
	const pause = await browser.storage.local.get("pause");

	if (!pause || !pause.pause) {
		document.getElementById("pause-play").innerText = "▶️ Start";
		browser.browserAction.setBadgeBackgroundColor({
			color: "rgba(0, 0, 0, 0)",
		});

		browser.browserAction.setBadgeText({
			text: "🛑",
		});
	} else {
		document.getElementById("pause-play").innerText = "⏸️ Stop";
		browser.browserAction.setBadgeBackgroundColor({
			color: "gray",
		});

		browser.browserAction.setBadgeText({
			text: "0",
		});
	}
	browser.storage.local.set({ pause: pause.pause ? !pause.pause : true });
});

document.addEventListener("DOMContentLoaded", async () => {
	const pause = await browser.storage.local.get("pause");

	if (pause && pause.pause) {
		document.getElementById("pause-play").innerText = "▶️ Start";
		browser.browserAction.setBadgeBackgroundColor({
			color: "rgba(0, 0, 0, 0)",
		});

		browser.browserAction.setBadgeText({
			text: "🛑",
		});
	} else {
		browser.browserAction.setBadgeBackgroundColor({
			color: "gray",
		});

		browser.browserAction.setBadgeText({
			text: "0",
		});
	}
});
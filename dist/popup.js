let current_content = '"datetimee", "usertag", "username", "content"\n';

document.addEventListener("DOMContentLoaded", async () => {
	const tweets = await chrome.storage.local.get(["tweets"]);

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
	chrome.storage.local.set({ tweets: [] });
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

const pauseColor = "#e07b15";
const playColor = "#6c2d6f";

document.getElementById("pause-play").addEventListener("click", async () => {
	const pause = await chrome.storage.local.get(["pause"]);
	const tweets = await chrome.storage.local.get(["tweets"]);

	if (!pause.pause) {
		document.getElementById("pause-play").innerText = "▶️ Start";
		document
			.getElementById("pause-play")
			.style.setProperty("background", pauseColor);

		chrome.action.setBadgeBackgroundColor({
			color: "rgba(0, 0, 0, 0)",
		});

		chrome.action.setBadgeText({
			text: "🛑",
		});
	} else {
		document.getElementById("pause-play").innerText = "⏸️ Stop";
		document
			.getElementById("pause-play")
			.style.setProperty("background", playColor);

		chrome.action.setBadgeBackgroundColor({
			color:
				!tweets.tweets || tweets.tweets.length < 1
					? "#808080"
					: tweets.tweets.length < 300
					? "#00ff00"
					: tweets.tweets.length < 400
					? "#ffff00"
					: tweets.tweets.length < 500
					? "#ff7700"
					: "#ff0000",
		});

		chrome.action.setBadgeText({
			text: tweets.tweets ? JSON.stringify(tweets.tweets.length) : "0",
		});
	}
	chrome.storage.local.set({ pause: pause.pause ? !pause.pause : true });
});

document.addEventListener("DOMContentLoaded", async () => {
	const pause = await chrome.storage.local.get(["pause"]);
	const tweets = await chrome.storage.local.get(["tweets"]);

	if (pause.pause) {
		document.getElementById("pause-play").innerText = "▶️ Start";
		document
			.getElementById("pause-play")
			.style.setProperty("background", pauseColor);

		chrome.action.setBadgeBackgroundColor({
			color: "rgba(0, 0, 0, 0)",
		});

		chrome.action.setBadgeText({
			text: "🛑",
		});
	} else {
		chrome.action.setBadgeBackgroundColor({
			color:
				!tweets.tweets || tweets.tweets.length < 1
					? "#808080"
					: tweets.tweets.length < 300
					? "#00ff00"
					: tweets.tweets.length < 400
					? "#ffff00"
					: tweets.tweets.length < 500
					? "#ff7700"
					: "#ff0000",
		});

		chrome.action.setBadgeText({
			text: tweets.tweets ? JSON.stringify(tweets.tweets.length) : "0",
		});
	}

	const searchKey = await chrome.storage.local.get(["searchKey"]);

	if (searchKey.searchKey) {
		document
			.getElementById("filename")
			.setAttribute("value", searchKey.searchKey);
	}
});

document.getElementById("filename").addEventListener("keyup", (event) => {
	if (event.key === "Enter") {
		event.preventDefault();
		document.getElementById("download-button").dispatchEvent(
			new MouseEvent("click", {
				bubbles: true,
				cancelable: true,
				view: window,
			})
		);
	}
});
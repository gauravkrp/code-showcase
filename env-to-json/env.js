const _fs = require("fs");
const readline = require("readline");

function replaceAll(str, find, replace) {
	var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
	return str.replace(new RegExp(escapedFind, "g"), replace)
};

// Check if string is number
function isNumeric(str) {
	if (typeof str != "string") return false // we only process strings!
	return (
		!isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		!isNaN(parseFloat(str))
	) // ...and ensure strings of whitespace fail
};

async function processLineByLine() {
	const fileStream = _fs.createReadStream(".env");

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});

	const object = {};

	for await (const line of rl) {
		// Each line in `input` will be successively available here as `line`.
		if (line.startsWith("#") || line.length === 0) {
			console.log(`Skipped line : ${line}`);
		} else {
			const spiltVariable = line.split("=")
			// console.log(myArray[0], myArray[1]);
			let key = spiltVariable[0]
			let value = replaceAll(spiltVariable[1], '"', "")
			if (value === "true") {
				object[key] = true
			} else if (value === "false") {
				object[key] = false
			} else if (isNumeric(value)) {
				object[key] = parseFloat(value)
			} else {
				object[key] = value
			}
		}
	}

	console.log(object);

	_fs.writeFileSync("env.json", JSON.stringify(object));
}
processLineByLine();

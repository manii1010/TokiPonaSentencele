// DOM要素
const $ = id => document.getElementById(id);
const $$ = className => document.getElementsByClassName(className);
const DOM = {
	buttonResetGame: $("button-reset-game"),
	tableShowSentences: $("table-show-sentences"),
	inputEnterSentence: $("input-enter-sentence"),
	buttonDecideSentence: $("button-decide-sentence")
};

// 解答を作る
const TokiPonaWords = ["a", "akesi", "anu", "ala", "alasa", "ale", "ali", "ante", "anpa", "awen", "ijo", "ike", "ilo", "insa", "uta", "utala", "unpa", "e", "esun", "en", "o", "ona", "open", "olin", "kasi", "kama", "kala", "kalama", "kili", "kiwen", "kute", "kulupu", "kule", "kepeken", "ken", "ko", "kon", "sama", "sike", "sitelen", "sina", "sijelo", "sin", "sinpin", "suno", "supa", "suli", "suwi", "seme", "seli", "selo", "sewi", "sona", "soweli", "taso", "tawa", "tan", "tu", "telo", "tenpo", "toki", "tomo", "nasa", "nasin", "nanpa", "ni", "nimi", "nena", "noka", "pakala", "pana", "pali", "palisa", "pan", "pi", "pini", "pipi", "pimeja", "pilin", "pu", "poka", "poki", "pona", "ma", "mani", "mama", "mi", "mije", "mu", "musi", "mute", "mun", "meli", "moku", "moli", "monsi", "jaki", "jan", "jelo", "jo", "la", "laso", "lape", "lawa", "li", "lipu", "lili", "linja", "luka", "lukin", "lupa", "lete", "len", "loje", "lon", "waso", "walo", "wawa", "wan", "wile", "weka"];
function makeAnswerSentence() {
	const TokiPonaWordList = {
		personalPronoun: ["mi", "sina"],
		noun: ["mani", "ni", "open", "tu", "olin", "ike", "pimeja", "len", "ante", "wan", "sike", "weka", "jaki", "kalama", "anpa", "ijo", "ken", "tomo", "seli", "sitelen", "pali", "lete", "sinpin", "kon", "pilin", "tan", "noka", "kala", "lupa", "mun", "monsi", "uta", "pan", "moli", "lukin", "lon", "tenpo", "kute", "pakala", "luka", "alasa", "pini", "kulupu", "nena", "meli", "sewi", "kasi", "kule", "moku", "mama", "jan", "telo", "nanpa", "unpa", "kiwen", "loje", "pona", "ale", "ali", "poka", "suno", "sijelo", "supa", "suli", "nimi", "mije", "sona", "pipi", "palisa", "linja", "waso", "esun", "ma", "lawa", "soweli", "nasin", "ilo", "insa", "poki", "walo", "lipu", "ko", "ona", "selo", "lape", "ala", "kili", "musi", "wile", "mute", "wawa", "toki", "akesi"],
		verb: ["ken", "unpa", "kule", "telo", "toki", "nasa", "pali", "olin", "ike", "wan", "len", "jaki", "seli", "kalama", "anpa", "pakala", "open", "musi", "lete", "pilin", "wawa", "poka", "lukin", "pu", "moli", "kepeken", "jo", "esun", "alasa", "pini", "noka", "lili", "luka", "moku", "loje", "utala", "mute", "lon", "awen", "suli", "sona", "tawa", "tu", "walo", "sitelen", "kute", "ante", "lape", "pana", "wile", "kama", "weka", "lawa", "pona"],
		auxiliaryVerb: ["wile", "kama", "alasa", "open", "pini", "awen", "ken", "lukin"],
		adjective: ["ala", "taso", "seli", "kule", "ni", "weka", "sike", "ike", "ante", "len", "jaki", "jelo", "pakala", "musi", "lete", "suwi", "wawa", "pimeja", "moli", "lukin", "pini", "lili", "sewi", "sin", "unpa", "laso", "loje", "ale", "ali", "lon", "mute", "awen", "suli", "anpa", "sama", "walo", "nasa", "lape", "pona", "poka"]
	};

	const personalPronoun = TokiPonaWordList.personalPronoun;
	const noun = TokiPonaWordList.noun;
	const verb = TokiPonaWordList.verb;
	const auxiliaryVerb = TokiPonaWordList.auxiliaryVerb;
	const adjective = TokiPonaWordList.adjective;

	// 文法
	const GrammarList = [
		// 名詞 li 形容詞 形容詞 形容詞
		[noun, ["li"], adjective, adjective, adjective],
		// 名詞 li 名詞 形容詞 形容詞
		[noun, ["li"], noun, adjective, adjective],
		// 名詞 li 動詞 e 名詞
		[noun, ["li"], verb, ["e"], noun],
		// 名詞 en 名詞 li 名詞
		[noun, ["en"], noun, ["li"], noun],
		// 名詞 en 名詞 li 形容詞
		[noun, ["en"], noun, ["li"], adjective],
		// 名詞 en 名詞 li 動詞
		[noun, ["en"], noun, ["li"], verb],
		// 人称代名詞 動詞 e 名詞 形容詞
		[personalPronoun, verb, ["e"], noun, adjective],
		// 人称代名詞 助動詞 動詞 e 名詞
		[personalPronoun, auxiliaryVerb, verb, ["e"], noun]
	];
	let answerSentence = "";
	GrammarList[Math.floor(Math.random() * GrammarList.length)].forEach((words, i) => {
		answerSentence += i ? " " : "" + words[Math.floor(Math.random() * words.length)];
	});
	return answerSentence;
}
let answerSentence = makeAnswerSentence();

// フィールドの作成
const fieldHeight = 15;
function makeField() {
	let sentence = "<tbody>";
	for (let i = 0; i < fieldHeight; i++){
		sentence += '<tr class="sentence">';
		for (let j = 0; j < answerSentence.split(" ").length; j++) {
			sentence += '<td class="word-block"></td>';
		}
		sentence += "</tr>";
	}
	sentence += "</tbody>";
	DOM.tableShowSentences.innerHTML += sentence;
}
makeField();

// 判定
let sentenceCount = 0;
let isGameOver = false;
function checkSentence() {
	const EnteredWords = DOM.inputEnterSentence.value.split(" ");
	if (!isGameOver && DOM.inputEnterSentence.value) {
		if (!EnteredWords.includes("") && EnteredWords.length === answerSentence.split(" ").length) {

			// トキポナの単語かどうか
			let areWordsTokiPona = false;
			EnteredWords.forEach(word => {
				if (!TokiPonaWords.includes(word)) {
					areWordsTokiPona = true;
				}
			});
			if (areWordsTokiPona) {
				alert("トキポナの単語を使用してください");
				return;
			}

			// 入力した単語を調べる
			EnteredWords.forEach((word, i) => {
				let wordBlock = $$("word-block")[sentenceCount * answerSentence.split(" ").length + i];
				if (word) {
					if (word === answerSentence.split(" ")[i]) {
						wordBlock.classList.add("word-correct-position");
					} else if (answerSentence.split(" ").includes(word)) {
						wordBlock.classList.add("word-include");
					} else {
						wordBlock.classList.add("word-not-include");
					}
					wordBlock.textContent = word;
				}
			});
			sentenceCount++;

			// ゲームが終わっているかどうか
			if (DOM.inputEnterSentence.value === answerSentence) {
				isGameOver = true;
				alert("正解");
			} else if (sentenceCount >= fieldHeight) {
				isGameOver = true;
				alert("ゲームオーバー");
			}
			DOM.inputEnterSentence.value = "";
		} else {
			alert("単語数が合いません");
		}
	}
}

// ゲームをリセットする
function resetGame() {
	DOM.tableShowSentences.textContent = "";
	answerSentence = makeAnswerSentence();
	makeField();
	sentenceCount = 0;
	isGameOver = false;
}

// イベントハンドラー
addEventListener("click", e => {
	if (e.target === DOM.buttonDecideSentence) {
		checkSentence();
	} else if (e.target === DOM.buttonResetGame) {
		resetGame();
	}
});

addEventListener("keydown", e => {
	if (e.target === DOM.inputEnterSentence && e.key === "Enter") {
		checkSentence();
	}
});

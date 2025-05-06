/**
 * TokiPonaWordle - トキポナ言語のためのWordleライクゲーム
 */
class SentenceleGame {
  constructor() {
    // DOM要素
    this.DOM = {
      spanTips: document.getElementById("span-tips"),
      answerSection: document.getElementById("answer-section"),
      spanDisplayAnswer: document.getElementById("span-display-answer"),
      buttonResetGame: document.getElementById("button-reset-game"),
      tableShowSentences: document.getElementById("table-show-sentences"),
      inputEnterSentence: document.getElementById("input-enter-sentence"),
      buttonDecideSentence: document.getElementById("button-decide-sentence"),
      tbodyWordCandidates: document.getElementById("tbody-word-candidates")
    };

    // ゲーム設定
    this.fieldHeight = 5;
    this.sentenceCount = 0;
    this.isGameOver = false;
    this.hintCharacters = [];
    
    // 辞書と単語リスト
    this.initDictionaries();
    
    // ゲームの初期化
    this.init();
    
    // イベントハンドラをバインド
    this.bindEvents();
  }

  /**
   * 辞書と単語リストを初期化
   */
  initDictionaries() {
    // トキポナの単語とその意味の辞書
    this.wordsAndMeanings = {
      a: "【感動詞】（文末や単独で用いて、強調や感動、確認の意などを表す）［慣用句］a a a：ははは（笑い声を表す）", 
      akesi: "爬虫類、両生類", 
      ala: "無、〜のない、〜ではない、〜しない", 
      alasa: "狩り、狩る、集める、探求する、【助動詞】〜してみる", 
      ale: "全て、全体；宇宙、人生、森羅万象、全ての、毎〜", 
      ali: "全て、全体；宇宙、人生、森羅万象、全ての、毎〜", 
      anpa: "下、低いところ ⇔ sewi、下げる、負かす、低い、下の、身分の低い、従属している", 
      ante: "違い、変える⇔ awen、異なる ⇔ sama", 
      anu: "【接続詞】〜か〜、〜または〜 ⇔ en, taso", 
      awen: "待たす、保つ、残す、守る ⇔ ante、待っている、残っている、守られた、【助動詞】〜し続ける、〜であり続ける", 
      e: "【小辞】（直接目的語の前に置く）", 
      en: "【接続詞】〜かつ〜 ⇔ anu, taso", 
      esun: "店、市場、取引する、買う、売る", 
      ijo: "何か、もの、こと、事物", 
      ike: "悪、悪くする、悪い ⇔ pona", 
      ilo: "道具、用具、装置、機械、マシン、アプリ", 
      insa: "内側、内、中；腹、内臓", 
      jaki: "汚れ、ゴミ、汚くする、汚す、汚い、穢れた", 
      jan: "人、誰か", 
      jelo: "黄色い ⇔ laso, loje", 
      jo: "持つ、含む、所有する", 
      kala: "魚、水生動物", 
      kalama: "音、音をたてる", 
      kama: "来る、起こる、現れる、【助動詞】〜している状態になる、〜になる", 
      kasi: "植物；草、葉っぱ", 
      ken: "可能性、（何かすることを）［（人、動物、もの）を］できるようにする、許す、【助動詞】〜することができる、〜であれる", 
      kepeken: "使う、用いる、【前置詞】を使って、を用いて", 
      kili: "野菜、果物", 
      kiwen: "石、岩、岩石", 
      ko: "半固体の物、ゲル、砂状の物", 
      kon: "気、精神、空気", 
      kule: "色、［に］色をつける、［に］色をぬる、カラフルな", 
      kulupu: "集まり、集団、グループ、コミュニティー", 
      kute: "耳、聞く、聴く、［の］言うことを聞く、［に］従う", 
      la: "【小辞】(条件節と主文の間におく)", 
      lape: "眠り、眠らせる、眠っている", 
      laso: "青い、緑の ⇔ jelo, loje", 
      lawa: "頭、考え、率いる、管理する、操作する", 
      len: "衣服、布、隠す、隠された、服を着た", 
      lete: "寒さ、寒くする、冷たくする、寒い、冷たい ⇔ seli", 
      li: "【小辞】（主語と述語の間におく；同じ主語に対して別の述語を並立する）", 
      lili: "小さくする、短くする、小さい、短い ⇔ suli、 少ない ⇔ mute", 
      linja: "長くて柔軟なもの；紐、糸、毛、線", 
      lipu: "薄っぺらい物；紙、本、ページ、ウェブサイト", 
      loje: "赤、赤くする、赤い ⇔ jelo, laso", 
      lon: "事実、真実、存在させる、存在している、本当の、【前置詞】（～）で、（～）にいて、（～）において", 
      luka: "手、腕、触る、【数詞】5つの", 
      lukin: "視界、景色、見る、見える、視覚的に、【助動詞】（し）てみる", 
      lupa: "穴；出入口、ドア、窓", 
      ma: "土地、国、地域、地方、場所；土；屋外", 
      mama: "親、母親、父親、両親", 
      mani: "お金、富", 
      meli: "女、妻 ⇔ mije", 
      meso: "中ぐらいの、普通の", 
      mi: "私 ⇔ ona, sina", 
      mije: "男、夫 ⇔ meli", 
      moku: "食事、食べ物、食べる、飲む", 
      moli: "死、殺す、死んだ", 
      monsi: "後ろ；背中、おしり ⇔ sinpin", 
      mu: "【感動詞】（動物の鳴き声を表す）", 
      mun: "月、星", 
      musi: "遊び、ゲーム、芸術作品、楽しむ、楽しい、愉快な、芸術的な", 
      mute: "量、増やす、多くする、多い、たくさんの ⇔ lili", 
      nanpa: "数、【前置詞】（〜）番目の", 
      nasa: "おかしくする、狂わす、変な、おかしい、狂った、奇妙な、酔っ払っている", 
      nasin: "道；方法、習慣、主義", 
      nena: "出っ張り、山、鼻、ボタン", 
      ni: "これ、それ、あれ、この、その、あの", 
      nimi: "単語、名前", 
      noka: "脚、足、蹴る", 
      o: "【感動詞】ねえ！、おい！ 【小辞】（命令文・意志文で、「li」の代わりに置く）", 
      olin: "愛、愛する", 
      ona: "彼、彼女、それ ⇔ sina, mi", 
      open: "はじめ、開ける、始める、点ける、【助動詞】〜し始める", 
      pakala: "失敗、損害、傷、壊す、壊れた、【感動詞】クソ！、畜生！", 
      pali: "活動、仕事、創作、作品、する、作る、働く", 
      palisa: "長くて硬いもの、棒", 
      pan: "穀物；パン、米、麺", 
      pana: "与える、置く", 
      pi: "【小辞】（直前の名詞(句)と、それを修飾する名詞句との区切りを示す）", 
      pilin: "気持ち、感情；心臓、感じる", 
      pimeja: "闇、影 ⇔ suno、黒い、暗い ⇔ walo", 
      pini: "終わり、終える、閉じる ⇔ open、終えている、閉まっている、【助動詞】〜し終える", 
      pipi: "虫、昆虫", 
      poka: "側面、腰；隣、そば、近く、近づける、隣の、そばの、近くの、【前置詞】と一緒に、のそばで", 
      poki: "入れ物、容器", 
      pona: "善、良くする、修理する、改善する、良い、単純な、仲がいい ⇔ ike", 
      pu: "公式トキポナ本（The Language of Good）に通じている", 
      sama: "同じ、似た ⇔ ante、【前置詞】のような", 
      seli: "火、熱、温たかくする、熱くする、焼く、あたたかい、あつい ⇔ lete", 
      selo: "皮膚、外側、表面、皮、殻 ⇔ insa", 
      seme: "【疑問詞】何、どれ", 
      sewi: "上、神 ⇔ anpa、上の、高い、高貴な、神聖な", 
      sijelo: "体", 
      sike: "円、輪、球；循環、まるの", 
      sin: "新しい", 
      sina: "あなた ⇔ mi, ona", 
      sinpin: "顔、正面 ⇔ monsi 、壁、垂直面があるもの ⇔ supa", 
      sitelen: "絵、画像、記号、描く、書く", 
      sona: "知識、知る", 
      soweli: "動物、獣、陸生哺乳類", 
      suli: "大きさ、大きくする、長くする、大きい、長い、重要な ⇔ lili", 
      suno: "太陽；光 ⇔ mun", 
      supa: "台、机、椅子、水平面があるもの ⇔ sinpin", 
      suwi: "甘い；可愛い", 
      tan: "起源、原因、【前置詞】〜から、〜によって、〜ゆえに", 
      taso: "（〜）だけ、【接続詞】だが、しかし ⇔ anu, en", 
      tawa: "動く、【前置詞】〜へ（行く）、〜のために、〜にとって", 
      telo: "水、液体、［に］水をかける", 
      tenpo: "時、時間、期間、瞬間", 
      toki: "話、会話、発言；言語、［について／（言語）で］話す、［ということを］言う、【感動詞】やあ、こんにちは", 
      tomo: "家、建物、建造物、部屋", 
      tu: "ペア、二つにする、【数詞】2つの", 
      unpa: "性行為、［と］性行為する、［と］性的な関係を持つ、性的な", 
      uta: "口、口腔", 
      utala: "戦う、競う、攻撃する", 
      walo: "白、白くする、明るくする、白い、明るい ⇔ pimeja", 
      wan: "一、一つにする、【数詞】1つの", 
      waso: "鳥", 
      wawa: "力、強さ、強くする、強い ⇔ lili", 
      weka: "遠いところ、離す、除く、なくなった、遠くの ⇔ poka", 
      wile: "欲求、願望、必要、欲しい、願う、必要とする、【助動詞】〜したい、〜になりたい、〜する必要がある、〜しなければならない"
    };

    // 品詞別の単語リスト
    this.tokiPonaWordList = {
      personalPronoun: ["mi", "sina"],
      noun: ["mani", "ni", "open", "tu", "olin", "ike", "pimeja", "len", "ante", "wan", "sike", "weka", "jaki", "kalama", "anpa", "ijo", "ken", "tomo", "seli", "sitelen", "pali", "lete", "sinpin", "kon", "pilin", "tan", "noka", "kala", "lupa", "mun", "monsi", "uta", "pan", "moli", "lukin", "lon", "tenpo", "kute", "pakala", "luka", "alasa", "pini", "kulupu", "nena", "meli", "sewi", "kasi", "kule", "moku", "mama", "jan", "telo", "nanpa", "unpa", "kiwen", "loje", "pona", "ale", "ali", "poka", "suno", "sijelo", "supa", "suli", "nimi", "mije", "sona", "pipi", "palisa", "linja", "waso", "esun", "ma", "lawa", "soweli", "nasin", "ilo", "insa", "poki", "walo", "lipu", "ko", "ona", "selo", "lape", "ala", "kili", "musi", "wile", "mute", "wawa", "toki", "akesi"],
      verb: ["ken", "unpa", "kule", "telo", "toki", "nasa", "pali", "olin", "ike", "wan", "len", "jaki", "seli", "kalama", "anpa", "pakala", "open", "musi", "lete", "pilin", "wawa", "poka", "lukin", "pu", "moli", "kepeken", "jo", "esun", "alasa", "pini", "noka", "lili", "luka", "moku", "loje", "utala", "mute", "lon", "awen", "suli", "sona", "tawa", "tu", "walo", "sitelen", "kute", "ante", "lape", "pana", "wile", "kama", "weka", "lawa", "pona"],
      auxiliaryVerb: ["wile", "kama", "alasa", "open", "pini", "awen", "ken", "lukin"],
      adjective: ["ala", "taso", "seli", "kule", "ni", "weka", "sike", "ike", "ante", "len", "jaki", "jelo", "pakala", "musi", "lete", "suwi", "wawa", "pimeja", "moli", "lukin", "pini", "lili", "sewi", "sin", "unpa", "laso", "loje", "ale", "ali", "lon", "mute", "awen", "suli", "anpa", "sama", "walo", "nasa", "lape", "pona", "poka"]
    };

    // ヒントに含めない単語
    this.wordNotIncludedInHint = [
      ...this.tokiPonaWordList.personalPronoun, 
      "anu", "pi", "la", "li", "en", "e", "o", "mu"
    ];

    // 文生成のための文法パターン
    this.grammarList = [
      // 名詞 li 形容詞 形容詞 形容詞
      [this.tokiPonaWordList.noun, ["li"], this.tokiPonaWordList.adjective, this.tokiPonaWordList.adjective, [...this.tokiPonaWordList.adjective, ...this.tokiPonaWordList.personalPronoun]],
      // 名詞 li 名詞 形容詞 形容詞
      [this.tokiPonaWordList.noun, ["li"], this.tokiPonaWordList.noun, this.tokiPonaWordList.adjective, [...this.tokiPonaWordList.adjective, ...this.tokiPonaWordList.personalPronoun]],
      // 名詞 形容詞 li 名詞 形容詞
      [this.tokiPonaWordList.noun, [...this.tokiPonaWordList.adjective, ...this.tokiPonaWordList.personalPronoun], ["li"], this.tokiPonaWordList.noun, [...this.tokiPonaWordList.adjective, ...this.tokiPonaWordList.personalPronoun]],
      // 名詞 形容詞 形容詞 li 名詞
      [this.tokiPonaWordList.noun, this.tokiPonaWordList.adjective, [...this.tokiPonaWordList.adjective, ...this.tokiPonaWordList.personalPronoun], ["li"], this.tokiPonaWordList.noun],
      // 名詞 形容詞 形容詞 li 形容詞
      [this.tokiPonaWordList.noun, this.tokiPonaWordList.adjective, [...this.tokiPonaWordList.adjective, ...this.tokiPonaWordList.personalPronoun], ["li"], this.tokiPonaWordList.adjective],
      // 名詞 形容詞 形容詞 li 動詞
      [this.tokiPonaWordList.noun, this.tokiPonaWordList.adjective, [...this.tokiPonaWordList.adjective, ...this.tokiPonaWordList.personalPronoun], ["li"], this.tokiPonaWordList.verb],
      // 名詞 形容詞 li 助動詞 動詞
      [this.tokiPonaWordList.noun, [...this.tokiPonaWordList.adjective, ...this.tokiPonaWordList.personalPronoun], ["li"], this.tokiPonaWordList.auxiliaryVerb, this.tokiPonaWordList.verb],
      // 名詞 li 動詞 e 名詞
      [this.tokiPonaWordList.noun, ["li"], this.tokiPonaWordList.verb, ["e"], this.tokiPonaWordList.noun],
      // 名詞 en 名詞 li 名詞
      [[...this.tokiPonaWordList.personalPronoun, ...this.tokiPonaWordList.noun], ["en"], [...this.tokiPonaWordList.personalPronoun, ...this.tokiPonaWordList.noun], ["li"], this.tokiPonaWordList.noun],
      // 名詞 en 名詞 li 形容詞
      [[...this.tokiPonaWordList.personalPronoun, ...this.tokiPonaWordList.noun], ["en"], [...this.tokiPonaWordList.personalPronoun, ...this.tokiPonaWordList.noun], ["li"], this.tokiPonaWordList.adjective],
      // 名詞 en 名詞 li 動詞
      [[...this.tokiPonaWordList.personalPronoun, ...this.tokiPonaWordList.noun], ["en"], [...this.tokiPonaWordList.personalPronoun, ...this.tokiPonaWordList.noun], ["li"], this.tokiPonaWordList.verb],
      // 人称代名詞 動詞 e 名詞 形容詞
      [this.tokiPonaWordList.personalPronoun, this.tokiPonaWordList.verb, ["e"], this.tokiPonaWordList.noun, [...this.tokiPonaWordList.adjective, ...this.tokiPonaWordList.personalPronoun]],
      // 人称代名詞 助動詞 動詞 e 名詞
      [this.tokiPonaWordList.personalPronoun, this.tokiPonaWordList.auxiliaryVerb, this.tokiPonaWordList.verb, ["e"], this.tokiPonaWordList.noun]
    ];
  }

  /**
   * ゲームを初期化する
   */
  init() {
    this.clearBoard();
    this.answerSentence = this.generateAnswerSentence();
    this.showTips();
    this.makeField();
  }

  /**
   * ゲームボードをクリアして変数をリセットする
   */
  clearBoard() {
    this.DOM.tableShowSentences.textContent = "";
    this.hintCharacters = [];
    this.DOM.spanTips.innerText = "";
    this.DOM.answerSection.hidden = true;
    this.DOM.spanDisplayAnswer.innerText = "";
    this.DOM.tbodyWordCandidates.innerText = "";
    this.DOM.inputEnterSentence.value = "";
    this.sentenceCount = 0;
    this.isGameOver = false;
  }

  /**
   * 文法パターンに基づいてランダムな文を生成する
   * @returns {string} 生成された文
   */
  generateAnswerSentence() {
    let answerSentence = "";
    const randomGrammar = this.grammarList[Math.floor(Math.random() * this.grammarList.length)];
    
    randomGrammar.forEach((wordList, i) => {
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
      answerSentence += (i ? " " : "") + randomWord;
      
      // 除外されていない場合はヒントに追加
      if (!this.wordNotIncludedInHint.includes(randomWord)) {
        this.DOM.spanTips.innerText += (this.DOM.spanTips.innerText ? ", " : "") + randomWord.slice(0, 2);
        this.hintCharacters.push(randomWord.slice(0, 2));
      }
    });
    
    return answerSentence;
  }

  /**
   * ヒントとして単語候補を表示する
   */
  showTips() {
    let candidates = [];
    let tableCandidates = "";
    
    // ヒント文字に基づいて候補単語を見つける
    this.hintCharacters.forEach(char => {
      Object.keys(this.wordsAndMeanings).forEach(word => {
        if (!candidates.includes(word) &&
            !this.wordNotIncludedInHint.includes(word) &&
            word.startsWith(char)) {
          candidates.push(word);
        }
      });
    });
    
    // 候補テーブルのHTMLを生成
    const wordCount = this.answerSentence.split(" ").length;
    candidates.forEach((word, i) => {
      if (!(i % wordCount)) {
        tableCandidates += "<tr>";
      }
      tableCandidates += `<td class="candidate-block">
                            <span class="candidate">${word}</span>
                            <span class="candidate-balloon">${this.wordsAndMeanings[word]}</span>
                          </td>`;
      if (!((i + 1) % wordCount)) {
        tableCandidates += "</tr>";
      }
    });
    
    this.DOM.tbodyWordCandidates.innerHTML = tableCandidates;
  }

  /**
   * ゲームフィールドを作成する
   */
  makeField() {
    const wordCount = this.answerSentence.split(" ").length;
    let sentence = "<tbody>";
    
    for (let i = 0; i < this.fieldHeight; i++) {
      sentence += '<tr class="sentence">';
      for (let j = 0; j < wordCount; j++) {
        sentence += '<td class="word-block"><span class="word"></span></td>';
      }
      sentence += "</tr>";
    }
    
    sentence += "</tbody>";
    this.DOM.tableShowSentences.innerHTML += sentence;
  }

  /**
   * ユーザーが入力した文をチェックする
   */
  checkSentence() {
    if (this.isGameOver || !this.DOM.inputEnterSentence.value) {
      return;
    }
    
    const enteredWords = this.DOM.inputEnterSentence.value.split(" ");
    const answerWords = this.answerSentence.split(" ");
    
    // 単語数が一致するかチェック
    if (enteredWords.includes("") || enteredWords.length !== answerWords.length) {
      alert("単語数が合いません");
      return;
    }
    
    // 入力された単語がすべて有効なトキポナの単語かチェック
    for (const word of enteredWords) {
      if (!Object.keys(this.wordsAndMeanings).includes(word)) {
        alert("トキポナの単語を使用してください");
        return;
      }
    }
    
    // 入力された単語を処理してUIを更新
    enteredWords.forEach((word, i) => {
      const spanWord = document.getElementsByClassName("word")[this.sentenceCount * answerWords.length + i];
      const wordBlock = document.getElementsByClassName("word-block")[this.sentenceCount * answerWords.length + i];
      
      if (word && spanWord) {
        if (word === answerWords[i]) {
          wordBlock.classList.add("word-correct-position");
        } else if (answerWords.includes(word)) {
          wordBlock.classList.add("word-include");
        } else {
          wordBlock.classList.add("word-not-include");
        }
        
        spanWord.innerHTML = word;
        wordBlock.innerHTML += `<span class="word-balloon">${this.wordsAndMeanings[word]}</span>`;
      }
    });
    
    // 入力された単語に基づいて候補の色を更新
    this.updateCandidateColors();
    
    this.sentenceCount++;
    
    // ゲームが終了したかチェック
    if (this.DOM.inputEnterSentence.value === this.answerSentence) {
      this.isGameOver = true;
      alert("正解");
      this.showAnswer();
    } else if (this.sentenceCount >= this.fieldHeight) {
      this.isGameOver = true;
      alert(`ゲームオーバー\n答えは${this.answerSentence}`);
      this.showAnswer();
    }
    
    this.DOM.inputEnterSentence.value = "";
  }

  /**
   * 候補単語の色を更新する
   */
  updateCandidateColors() {
    const wordElements = document.getElementsByClassName("word");
    const candidateElements = document.getElementsByClassName("candidate");
    const candidateBlockElements = document.getElementsByClassName("candidate-block");
    
    for (let i = 0; i < wordElements.length; i++) {
      const word = wordElements[i].innerText;
      if (!word) continue;
      
      for (let j = 0; j < candidateElements.length; j++) {
        if (word === candidateElements[j].innerText) {
          const wordBlockClass = document.getElementsByClassName("word-block")[i].className;
          candidateBlockElements[j].className = `candidate-block ${wordBlockClass}`;
        }
      }
    }
  }

  /**
   * 解答を表示する
   */
  showAnswer() {
    this.DOM.answerSection.hidden = false;
    this.DOM.spanDisplayAnswer.innerText = this.answerSentence;
  }

  /**
   * ゲームをリセットする
   */
  resetGame() {
    this.init();
  }

  /**
   * イベントハンドラをバインドする
   */
  bindEvents() {
    this.DOM.buttonDecideSentence.addEventListener("click", () => this.checkSentence());
    this.DOM.buttonResetGame.addEventListener("click", () => this.resetGame());
    this.DOM.inputEnterSentence.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.checkSentence();
      }
    });
  }
}

// DOMが完全にロードされたら、ゲームを初期化する
document.addEventListener("DOMContentLoaded", () => {
  const game = new SentenceleGame();
});

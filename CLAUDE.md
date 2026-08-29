# library ディレクトリ共通ルール

このディレクトリは個人サイト(GitHub Pages, `morihrkz.github.io/library/`)用の記事 HTML 群。
新規作成・既存編集を問わず、記事本文に関わる作業では以下を守る。

## 日付の数字表記

- 年月日など暦上の日付は、漢数字ではなく半角の Arabic 数字で書く。
  - 例:「二〇二六年七月一一日」ではなく「 2026 年 7 月 11 日 」。
  - 年号のみの表記(例:「一九八一年」)も対象。「年」「月」「日」という単位が続く暦日付・年号はすべて半角数字にする。
- 対象外: 暦上の特定の日付ではなく、期間・継続年数を表す表現は漢数字のままでよい。
  - 例:「六十年以上」「千年以上」「二十世紀」「四年制大学」「一日中」。
  - 判断基準: その数字が「特定のいつ」を指すか(→半角数字)、「どれくらいの長さ」を指すか(→漢数字のままでよい)。
- 変換後は全角文字(漢字・句読点など)と半角数字が接する箇所に半角スペースを 1 つ入れる(和欧間アキ、[[グローバル CLAUDE.md]] のルールに準拠)。手作業より常設スクリプトを使う。

      python $HOME\.claude\scripts\wa_o_spacing.py convert doc.html --in-place

## 「N つ」の数字表記

- 「1つ」「2つ」のように、半角数字 1 桁 (1〜9) に平仮名の「つ」が続く表記は、「一つ」「二つ」のように漢数字表記にする。
  - 例:「互酬性のスタイルを 3 つに分類する」ではなく「互酬性のスタイルを三つに分類する」。
- 対象外: 「10つ」「12つ」のような 2 桁以上の数字。数字の直前・直後がさらに数字である場合は、その数字列全体をひとまとまりとして扱い、変換しない。
- 対象外(変換しない範囲): HTML タグの属性値、HTML コメント、`<script>` `<style>` `<code>` `<pre>` `<kbd>` `<samp>` `<var>` の内側の文字列。読者に表示される本文テキストのみが対象。
- 変換後、その箇所がハイフン( ` - `、上記「ダッシュ表記」ルール)の直後だった場合、ハイフンとの間の半角スペースが変換で失われていないか確認する(例:「読み終えたあなたへ - 3 つの問い」→「読み終えたあなたへ -三つの問い」という欠落が起きやすい)。欠落していれば手動で半角スペースを補う。
- 変換には常設スクリプト `~/.claude/scripts/digit_tsu_kanji.py` を使う(手作業より確実)。使い方と制限は `~/.claude/scripts/README.md` を参照。

      python $HOME\.claude\scripts\digit_tsu_kanji.py scan *.html
      python $HOME\.claude\scripts\digit_tsu_kanji.py apply --backup-dir <スクラッチパッド> *.html

- 新規作成する記事は最初からこの形式で書く。既存記事を編集する際に気づいたら合わせて直す。ディレクトリ全体への一括適用は、依頼されたときにまとめて行う。

## ダッシュ表記

- 日本語の地の文・見出し・図注・注記で、文の切れ目や副題を区切るために使うダッシュは、 em-dash( `—` U+2014 )ではなく前後に半角スペースを挟んだハイフン( ` - ` )で書く。 `——` のような em-dash の連続も同じく ` - ` にまとめる。
  - 例:「最後に残るもの — 宇宙論の強さ」ではなく「最後に残るもの - 宇宙論の強さ」。
  - 例:「藁人形論法——相手の見解を歪めてから叩く手口——を」ではなく「藁人形論法 - 相手の見解を歪めてから叩く手口 - を」。
  - `<title>` の主題・副題の区切りも同じ形にする。
  - 理由: em-dash は環境によって字幅と前後アキの見え方が大きく変わり、和文中では前後の空きが詰まって読みにくくなる。ハイフンに半角スペースを添える形なら、和欧間アキのルールともそのまま整合する。
- 対象外(そのまま残す):
  - 欧文の固有表記に含まれる en-dash( `–` U+2013 )。例: `Borde–Guth–Vilenkin の定理` 。
  - 数値・ページ範囲の en-dash。例: `6811–6826` 、`2607–2610` 。
  - 表のセルで「該当なし」を表す記号として単独で置かれた `—` 。区切り記号ではないので置換しない。
- 置換したあとは、ハイフンの前後に半角スペースが 1 つずつあることを確認する(全角文字と `-` が直接接しない)。和欧間アキの検証と同じく `wa_o_spacing.py` を通しておくとよい。
- 新規作成する記事は最初からこの形式で書く。既存記事を編集する際に気づいたら合わせて直す。ディレクトリ全体への一括適用は依頼されたときにまとめて行う。

## 本文フォント

- フォントの種類は `"Zen Kaku Gothic New"` を第一候補とし、`<head>` で Google Fonts から読み込む。フォールバックも含め、ディレクトリ全体で次のスタックに統一する(新しいスタックを増やさない)。

      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap" rel="stylesheet">

      font-family: "Zen Kaku Gothic New", -apple-system, BlinkMacSystemFont, "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic UI", "Yu Gothic", "Noto Sans JP", "Meiryo", sans-serif;

  - セリフ体は使わない。`.serif` のような部分的な意匠クラスも含め、既存記事に残っていれば削除してサンセリフに統一する。
  - `body` に一度設定すれば継承されるので、見出し・注記・カード等の個別セレクタで `font-family` を重ねて指定する必要はない。ただし SVG 内の `<text>` はフォントを継承しないため、SVG 内の `<style>` でも同じスタックを明示する。
- 文字サイズ(フォントサイズ)は `html` を `16px`、本文を含む SVG 以外のほぼ全要素を `1rem` に統一する。見出し・キャプション・注記・カードなど、記事ごとに個別の `font-size` を設定していても、次の 2 つの `<style>` ブロックを他の `<style>` より後、`</head>` の直前に置くことで一括して上書きする(`body, body :not(svg):not(svg *)` という複合セレクタが個別セレクタより詳細度で勝つため、`!important` なしのブロックも機能する)。

      <style>
        /* 2026-08-26: 本文フォントを一段階拡大し、本文以外の文字サイズも本文と統一 */
        html { font-size: 16px !important; }
        body, body :not(svg):not(svg *) { font-size: 1rem !important; }
      </style>
      <style>
        /* フォント統一設定 */
        html { font-size: 16px; }
        body, body :not(svg):not(svg *) { font-family: "Zen Kaku Gothic New", -apple-system, BlinkMacSystemFont, "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic UI", "Yu Gothic", "Noto Sans JP", "Meiryo", sans-serif; font-size: 1rem; }
      </style>

  - 対象外: SVG 内の `<text>`(`:not(svg):not(svg *)` により自動的に除外される)。ヒーロー図などの SVG ラベルは独自の `font-size` を保ってよい。
  - `html` の `16px` は記事ごとに変えない。ここを `17px` 等にすると、`1rem` を基準にした題名・図注・バッジまで一斉にずれ、記事間で文字の大きさが揃わなくなる。
  - 見出しや注記ボックスなど個別に文字サイズを持つ要素も本文と同じ 1 rem に揃え、記事間の見た目のばらつきをなくす。新規記事もこの 2 ブロックを最初から含める。
- 唯一の例外は記事題名(`header.hero h1`)。ここだけは本文の約 3 倍のサイズに拡大し、セリフ体にする。上の 2 つの `<style>` ブロックより後に、次を追記する(数値は既存記事間で多少ぶれるが、下記が標準)。

      <style>
        /* 記事題名(h1)を本文の3倍程度に拡大し、セリフ体にする */
        header.hero h1 { font-size: clamp(2.4rem, 6vw, 3.4rem) !important; line-height: 1.4 !important; font-family: "Yu Mincho", "Hiragino Mincho ProN", "Noto Serif JP", serif !important; }
        /* 題名内のインライン要素(.grad 等)にも題名のサイズ・書体を継承させる */
        header.hero h1 * { font-size: inherit !important; font-family: inherit !important; }
      </style>

  - 2 行目(`header.hero h1 *`)を省かない。統一ブロックの `body :not(svg):not(svg *)` は「 svg 以外の全要素」に当たるため、題名を `<span class="grad">` などで部分的に包むと、**その部分だけが本文サイズ・サンセリフに引き戻される**。1 行目は `h1` 要素だけを狙っており、子要素には届かない(子に直接当たった `!important` 宣言は、親からの継承値より強い)。グラデーション見出しを足してよいという後述の許可は、この 2 行目があって初めて成り立つ。
  - 対象はヒーロー帯の `h1`(記事題名)のみ。`.sub`(リード文)・見出し・本文・注記など他の要素は上記のとおりサンセリフ・1rem のまま変えない。
  - タイトル文字列が長い記事では、この `h1` がブラウザ幅に応じて折り返され、視覚上「一行目(`.eyebrow` )の下に大きなセリフ体の行が続く」ように見えるが、`::first-line` 等で行を狙い撃ちしているわけではなく、`h1` 要素全体への指定である。
  - 新規記事もヒーローの `h1` にはこの上書きを最初から含める。

## 段落の字下げ(読みやすさのための整形)

- 本文段落(`p` 要素)の先頭は全角 1 字下げにする(`text-indent: 1em`)。
  - 対象外: 章冒頭のリード文・要約(`.lead` 相当のクラスを当てた callout 的な段落)、出典リストの `li`、注記ボックスなど、通常の地の文でない要素。これらは `text-indent: 0` を明示する。
  - `<br>` で改行した 2 行目以降には字下げは効かない(CSS の仕様どおりで正しい挙動。段落の先頭のみ字下げというのが本来の目的)。
- 読点(、)の位置に `<br>` を挿入して段落内で強制改行しない。
  - 理由: レイアウトを読者のウィンドウ幅に委ねず、本文中に手動で改行を埋め込む手法そのものが不適切なため。

## 本文コンテナの横幅

- 本文(記事の地の文を包む `.wrap` / `main.wrap` など)に、`960px` や `60rem` のような固定の `max-width` を設けない。閲覧中のブラウザ幅を常に十分に活用する(実質 `max-width: none` )。
  - ただし、画面の端に文字が接すると読みにくいため、左右の余白(`padding`)は必ず確保する。目安は `padding: 0 clamp(1.5rem, 3vw, 3rem)` のように、画面幅に応じてゆるやかに変化する指定を使う(固定 px の余白でもよいが、極端に狭くしない)。
- 対象外: ヒーロー見出し(`header.hero` 内の `h1` ・リード文・`.hero-figure` など)や、検索ボックス・カードグリッドの列定義といった個々の UI 部品の幅。これらは可読性・意匠上の理由で意図的に幅を絞ってよい。ここで撤廃するのは、記事本文(地の文)を包む外側コンテナの幅制限に限る。
- 新規作成する記事は最初からこの形式(本文コンテナに `max-width` を設けない)で書く。既存記事を編集する際に気づいたら合わせて直す。

## 配色(色の変数名と標準値)

- 色は必ず `:root` の CSS カスタムプロパティにまとめ、個々のセレクタに生の色値を書かない。後述の夜間モード対応はこの前提の上に成り立っている。
- 変数名はディレクトリ共通の次の語彙を使う。同じ役割に別名を与えない(`--text` `--card-bg` のような同義の新設をしない)。

  | 変数 | 役割 |
  | --- | --- |
  | `--bg` | ページ全体の地 |
  | `--paper` | 地の上に載る面(アコーディオン項目・注記の枠など) |
  | `--card` | `--paper` の上にさらに載せる二層目の面。面を一層しか使わない記事では設けない |
  | `--ink` | 本文の文字色 |
  | `--sub` | 本文よりやや弱い文字(注記・引用の中) |
  | `--muted` | さらに弱い文字(出典・図注・キャプション) |
  | `--line` | 罫線・ボーダー |
  | `--accent` | リンク・小見出し・バッジなど記事の基調色 |
  | `--accent-2` | 補助の基調色(図版で二系統を対比させるとき。無くてよい) |
  | `--note-bg` | 注記ボックスと、開いているアコーディオン見出しの淡い背景 |
  | `--hero-1` `--hero-2` | ヒーロー帯のグラデーションの両端 |
  | `--hero-ink` | ヒーロー帯の文字 |
  | `--hero-dim` | ヒーロー帯の弱い文字(eyebrow ・リード・`.meta` ・図注) |

- 標準値。色相は記事の主題に合わせて変えてよいが、明度・彩度の関係(地と面の差、本文と弱い文字の段階)はこの比率を保つ。

      :root{
        --bg:#fafaf8; --paper:#ffffff; --ink:#1a1c20; --sub:#454a52; --muted:#6d727b;
        --accent:#0052cc; --accent-2:#a97f28; --line:#e2e0da; --note-bg:#e8effa;
        --hero-1:#003366; --hero-2:#004499; --hero-ink:#f4f7fb; --hero-dim:#b9cde4;
      }
      @media (prefers-color-scheme: dark){
        :root{
          --bg:#15171b; --paper:#1d2026; --ink:#e8e6e1; --sub:#b6b8be; --muted:#878b94;
          --accent:#6fb3ff; --accent-2:#c9a24a; --line:#31353d; --note-bg:#1b2634;
        }
      }

  - ダーク側で `--hero-*` を上書きしないのは意図的。ヒーロー帯はもともと濃色のグラデーションで、暗い環境でもそのまま成立する。
  - 2026-08-29 に全記事を点検し、本文文字色は `--ink` 、一層目の面は `--paper` 、罫線は `--line` に統一済み。この節の CSS 断片や、アコーディオンの CSS をどの記事へ貼っても変数名が解決する状態になっている。
  - 記事固有の役割には名前を足してよい(`--warn` `--mono-bg` 、 OS 比較記事の `--mac` `--win` など)。上の語彙と役割が重ならないものに限る。
  - `--border` を「半透明の縁取り」、`--line` を「実線の罫線」として使い分けている記事が 1 件ある(`give_and_take_essay.html`)。役割が違うので統合しない。

## ヒーロー(記事冒頭の見出し帯)

- 記事冒頭のヒーローは `<header class="hero">` の帯とし、その中に内容を縦に並べる。全画面(`min-height:100svh` 等)にはしない。ディレクトリ内の全記事がこの形をとっている。
- 中身の並び(次のクラス名を使う):

      <header class="hero">
        <div class="wrap">
          <span class="eyebrow">分野 / CATEGORY</span>
          <h1>主題 - 副題</h1>
          <p class="sub">記事の内容を 1 〜 3 文で要約したリード</p>
          <div class="meta">
            <span>全 8 章</span>
            <span>約 20 分</span>
            <span>2026 年 8 月</span>
          </div>
          <figure class="hero-figure">
            <svg viewBox="0 0 720 300" role="img" aria-labelledby="xxTitle xxDesc"> … </svg>
            <figcaption>図の読み方と、図が何を表していないかの断り</figcaption>
          </figure>
        </div>
      </header>

- `.eyebrow` は分野・カテゴリを字間を空けた小さな文字で置く。`.meta` は「全 N 章」「約 N 分」「公開年月」を横並びで置く(章立てのない記事では章数を省く)。どちらも `--hero-dim` の弱い文字にして、`h1` と `.sub` を前に出す。
- 図版は**静的なインライン SVG** 1 枚とし、`<figure class="hero-figure">` で包む。
  - `role="img"` と `aria-labelledby` を付け、SVG 内に `<title id>`(図の一行タイトル)と `<desc id>`(図の内容の言葉による説明)を置く。読み上げ環境ではこれが図の代替になるので省略しない。
  - 文字色・線色の指定は SVG 内の `<style>` にクラスとしてまとめる。フォントは本文と同じサンセリフ・スタックを指定する。
  - `<figcaption>` には、図の読み方に加えて「これは概念図であり縮尺は正確でない」「観測データそのものではない」といった留保を書く。
- **アニメーション・動的描画は持ち込まない。** `<canvas>` 、`requestAnimationFrame` 、手続き的な模様生成、ヒーロー専用の `<script>` はいずれも使わない。
  - 理由: 静的 SVG なら図の内容がマークアップとして残り、読み上げ・印刷・差分レビューのいずれでも同じものが見える。装飾のために JS を動かす必要もない。
- CSS の目安(記事ごとの色に置き換えて使う。数値は既存記事間でも多少ぶれており、下記はその中央値):

      header.hero{background:linear-gradient(140deg,var(--hero-1) 0%,var(--hero-2) 100%);
       color:var(--hero-ink);padding:3.6rem 0 2.8rem;margin-bottom:2.8rem}
      header.hero .wrap{max-width:960px;margin:0 auto;padding:0 clamp(1.5rem,3vw,3rem)}
      header.hero .eyebrow{display:block;font-size:0.78rem;letter-spacing:0.24em;
       color:var(--hero-dim);margin-bottom:0.9rem}
      header.hero p.sub{margin:0;color:var(--hero-dim);line-height:1.85;text-indent:0}
      header.hero .meta{margin:1.1rem 0 0;font-size:0.82rem;color:var(--hero-dim);
       display:flex;flex-wrap:wrap;gap:0.4rem 1.1rem}
      .hero-figure{max-width:960px;margin:2.2rem 0 0;overflow-x:auto}
      .hero-figure svg{display:block;width:100%;height:auto}
      .hero-figure figcaption{margin-top:0.9rem;font-size:0.85rem;
       color:var(--hero-dim);line-height:1.75}

  - 狭い画面では図を縮小せず、`.hero-figure` の `overflow-x:auto` の中で横スクロールさせる(`@media` で `.hero-figure svg{min-width:560px}` 前後を指定)。
  - ヒーローの `margin-bottom` が本文との間隔を作るので、`main.wrap` 側に上パディングを重ねない。両方効かせると余白が二重になる。
- ヒーロー内の要素は「本文コンテナの横幅」ルールの対象外で、`max-width: 960px` 程度に絞ってよい。絞るのはヒーローの中だけで、本文(`main.wrap`)には広げない。
- グラデーション見出し(`h1 .grad`)のような部分的な意匠は、上の構造を保っている限り記事ごとに足してよい。

## 長文記事のアコーディオン機構

- 複数の章(`第 N 章` 等の見出し単位)を持つ長文記事は、本文をアコーディオン(開閉式)にする。これはディレクトリ内の大半の記事がすでに採用している標準仕様であり、新規作成時は最初から適用する。単一の短い記事(章立てのないエッセイ等)には適用しなくてよい。
- 実装(次の構造・クラス名を用いる):
  - 本文冒頭(ヒーローの直後)に開閉トグル用ツールバーを置く: `<div class="toolbar-container"><div class="toolbar"><button id="expandAll" type="button">すべて開く</button><button id="collapseAll" type="button">すべて閉じる</button></div></div>` 。導入・前書きにあたる文章も裸で置かず、`序` などの章にしてアコーディオンに入れる(ツールバーより前に本文を置かない)。
  - 続けて `<div id="accordion">` の中に、章ごとの `<section class="acc-item" id="secN" data-acc>` を並べる。出典・付録の章も同様にアコーディオン項目にする。
  - 各項目の内部は `<button class="acc-header" data-acc-toggle><span class="num">N</span><span class="title">見出し文</span><svg class="chev">…</svg></button>` + `<div class="acc-panel"><div class="acc-panel-inner">…本文…</div></div>` 。見出し文からは「第 N 章」などの接頭辞を外し、`.num` バッジ側だけに短く表示する(例: `0` 、`1` 、`終` 、`付録` )。
  - 開閉状態は `.acc-item` に付け外しする **`open` クラス**で表す。`<details>` 要素や `open` 属性は使わない。
  - シェブロンは `<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>` (下向き `▾` )とし、開いている項目で 180 度回転させる。
- CSS は次のとおり。`--accent` 等の変数は「配色」の語彙に従う。

      .toolbar-container{position:sticky;top:8px;z-index:100;
       background:var(--bg);background:color-mix(in srgb,var(--bg) 94%,transparent);
       backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
       padding:9px 0;border-radius:999px;margin:0 0 2.4rem;
       border:1px solid var(--line);box-shadow:0 4px 14px rgba(0,0,0,.10)}
      .toolbar{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin:0}
      .toolbar button{font-weight:700;color:var(--accent);background:var(--paper);
       border:1.5px solid var(--accent);border-radius:999px;padding:8px 20px;
       cursor:pointer;transition:all .2s ease;font-family:inherit}
      .toolbar button:hover{background:var(--accent);color:#fff}
      #accordion{margin-bottom:2.6rem}
      .acc-item{background:var(--paper);border:1px solid var(--line);border-radius:10px;
       margin-bottom:16px;overflow:hidden;overflow-anchor:none}
      .acc-item:last-child{margin-bottom:0}
      .acc-header{width:100%;display:flex;align-items:center;gap:14px;
       background:none;border:none;padding:18px 22px;cursor:pointer;
       text-align:left;font-family:inherit;color:var(--ink);
       -webkit-tap-highlight-color:transparent}
      .acc-header .num{flex:0 0 auto;color:var(--accent);font-weight:700;
       background:var(--note-bg);padding:4px 11px;border-radius:999px;white-space:nowrap}
      .acc-header .title{flex:1 1 auto;font-weight:700;line-height:1.5}
      .acc-header .chev{flex:0 0 auto;width:20px;height:20px;color:var(--accent);
       transition:transform .3s cubic-bezier(.4,0,.2,1)}
      .acc-item.open > .acc-header .chev{transform:rotate(180deg)}
      .acc-item.open > .acc-header{background:var(--note-bg);
       border-bottom:1px solid var(--line)}
      .acc-panel{display:grid;grid-template-rows:0fr;
       transition:grid-template-rows .35s cubic-bezier(.4,0,.2,1);overflow-anchor:none}
      .acc-item.open > .acc-panel{grid-template-rows:1fr}
      .acc-panel-inner{overflow:hidden;min-height:0;padding:0 22px;opacity:0;
       transition:opacity .3s ease .08s}
      .acc-item.open > .acc-panel > .acc-panel-inner{padding:6px 22px 26px;opacity:1}
      @media (max-width:600px){
        .acc-header{padding:15px 16px;gap:10px}
        .acc-item.open > .acc-panel > .acc-panel-inner{padding:4px 16px 22px}
      }

  - パネルの開閉は `grid-template-rows` の `0fr` ↔ `1fr` で行う。`max-height` に大きな固定値を置く方式は使わない。
    - 理由: `max-height:10000px` 方式では、実際の高さが指定値に届かない短い章ほど閉じ始めが遅れて見え、章ごとに開閉の速さが変わる。`0fr` ↔ `1fr` なら中身の長さに依らず同じ速度で、閉じたときは必ず高さ 0 になる。
  - ツールバーは丸ピル型で、スクロール中も画面上端に留まる(`position:sticky`)。どの章を読んでいても「すべて閉じる」に戻れるようにするため。
- JS は次の自己完結したスクリプトをそのまま使う。挙動は「単一開閉」「開いたら該当セクションへ滑らかにスクロール」「ページ内 `#id` リンクの飛び先が閉じた項目の中にあれば自動で開いてからスクロール」「`#id` 付き URL で直接開いたときも自動展開」の四つ。

      <script>
      (function(){
        var OPEN_SCROLL_DELAY = 400;

        function closeSiblings(item){
          Array.prototype.forEach.call(item.parentElement.children, function(sibling){
            if(sibling !== item && sibling.matches && sibling.matches("[data-acc]")){
              sibling.classList.remove("open");
            }
          });
        }

        document.querySelectorAll("[data-acc]").forEach(function(item){
          var toggle = item.querySelector("[data-acc-toggle]");
          if(!toggle) return;
          toggle.addEventListener("click", function(){
            var willOpen = !item.classList.contains("open");
            if(willOpen) closeSiblings(item);
            item.classList.toggle("open", willOpen);
            if(willOpen){
              setTimeout(function(){
                item.scrollIntoView({behavior:"smooth", block:"start"});
              }, OPEN_SCROLL_DELAY);
            }
          });
        });

        document.getElementById("expandAll").addEventListener("click", function(){
          document.querySelectorAll("[data-acc]").forEach(function(item){
            item.classList.add("open");
          });
        });

        document.getElementById("collapseAll").addEventListener("click", function(){
          document.querySelectorAll("[data-acc]").forEach(function(item){
            item.classList.remove("open");
          });
        });

        function openTarget(hash){
          if(!hash) return null;
          var target = document.getElementById(hash.replace(/^#/, ""));
          if(!target) return null;
          var accItem = target.closest("[data-acc]");
          if(!accItem) return target;
          if(!accItem.classList.contains("open")){
            closeSiblings(accItem);
            accItem.classList.add("open");
          }
          return target;
        }

        document.addEventListener("click", function(e){
          var a = e.target.closest('a[href^="#"]');
          if(!a) return;
          var target = document.getElementById(a.getAttribute("href").slice(1));
          if(!target) return;
          var accItem = target.closest("[data-acc]");
          if(!accItem) return;
          e.preventDefault();
          var wasOpen = accItem.classList.contains("open");
          openTarget(a.getAttribute("href"));
          setTimeout(function(){
            target.scrollIntoView({behavior:"smooth", block:"start"});
          }, wasOpen ? 0 : OPEN_SCROLL_DELAY);
        });

        window.addEventListener("hashchange", function(){
          var target = openTarget(location.hash);
          if(target){
            setTimeout(function(){
              target.scrollIntoView({behavior:"smooth", block:"start"});
            }, OPEN_SCROLL_DELAY);
          }
        });

        if(location.hash) openTarget(location.hash);
      })();
      </script>

  - `OPEN_SCROLL_DELAY` はパネルの開き切り(`.35s`)より少し長く取る。開き切る前にスクロールすると、移動先の位置が途中でずれる。
  - 脚注リンクは `document` 上の一つのリスナーで拾う(個々の `a` に付けない)。閉じたパネル内のリンクにも同じ処理が効く。
- 対象外: 「本文コンテナの横幅」のルールと同様、この機構は記事本文の章構成に関するものであり、独立した短い記事(手順書・単発コラム等)にまで強制しない。

## 句点位置での改行(意味のまとまりごとの区切り)

- 本文中の句点(。)の後に、段落内の意味のまとまりの区切りとして `<br>` を挿入する。
  - すべての句点の後に入れるのではない。段落をいくつかの小さなまとまり(話題・論点の単位)に分け、そのまとまりとまとまりの境目にあたる句点の後にだけ入れる。
  - 目安: 1 段落あたり 1 〜 3 箇所程度。文が 1 〜 2 文しかない短い段落には入れない。
  - どこが区切りかは意味で判断する。機械的な一括置換(全句点への挿入、n 文ごとの挿入など)はしない。
- 読点ルールとの関係: 読点(、)の位置への `<br>` 挿入は引き続き禁止(上記の禁止ルール)。ここで認めるのは句点の後の、意味の区切りに限った挿入のみ。
- 字下げとの関係: `<br>` による 2 行目以降には `text-indent` が効かない。まとまりの先頭を字下げしたい場合は `<br>` ではなく段落(`p`)を分ける。

## 夜間モード（ダークモード）対応

- 全記事で `prefers-color-scheme: dark` に対応する。読者のブラウザ・ OS 設定に応じて夜間は暗い配色になることをディレクトリの標準方針とする。
- 新規記事は「配色」節の変数語彙と標準値をそのまま使えばよい。以下は、その形になっていない既存記事を直すときの手順。
- 実装パターン(次の方式に従う):
  - 記事が色を CSS カスタムプロパティ(`:root{ --bg: ...; --ink: ...; }` 等)で管理している場合、その `:root{...}` ブロックの直後に `@media (prefers-color-scheme: dark){ :root{ ...同じ変数名をダーク値で上書き... } }` を追記する。
  - 上書きは `--bg` (地)だけでは足りない。`--paper` (カード・アコーディオン項目の面)・`--line` ・`--note-bg` まで含めないと、暗い地の上に明るいカードが浮いたままになる。地の文を載せる面の変数を一式で反転させる。ヒーロー帯(`header.hero`)はもともと濃い色のグラデーションで設計されているため、ライト/ダークどちらでも据え置きでよい。
  - アクセントカラー(リンク色・強調色)がライト値のまま暗い背景でコントラスト不足になる場合は、その変数も明るめの値に調整してよい。
  - `body` の背景を変数ではなく `background: radial-gradient(...), linear-gradient(...)` のように直接指定している記事では、`@media (prefers-color-scheme: dark){ body{ background: ...ダーク相当のグラデーション... } }` を別途追加する。
  - CSS カスタムプロパティを使わず色を直書きしている記事(例外的な構成)では、`@media (prefers-color-scheme: dark){ }` の中に該当セレクタを列挙してダーク値を直接上書きする。
- 変数を足しただけで済ませず、**実際に描画して確かめる**(手順は「作業時の注意」)。目安は本文で 7:1 以上、`--muted` の弱い文字でも 4.5:1 以上のコントラスト比。
- 新規作成する記事は最初からこの形式で書く。既存記事を編集する際に気づいたら合わせて直す。ディレクトリ全体への一括適用は依頼されたときにまとめて行う。

## 作業時の注意

- ファイル検索は Glob ツールを使い、Bash の `find` でルートディレクトリ全体(`/` や `C:\`)を対象にした検索は行わない([[グローバル CLAUDE.md]] のファイル検索ルールに準拠)。
- 既存ファイルを編集する際は、[[グローバル CLAUDE.md]] の非破壊ルール(バックアップ→作業→報告)に従う。
- バックアップは作業ディレクトリ内に置かず、セッションのスクラッチパッドディレクトリへ退避する。
  - 理由: このディレクトリは GitHub Pages で全ファイルがそのまま公開されるため、リポジトリ内に残したバックアップは公開事故に直結する。
  - `wa_o_spacing.py --in-place` のようにスクリプトが自動生成するバックアップも、生成後にスクラッチパッドへ移し、commit 前に作業ディレクトリから取り除く。
  - 従来の `old/` 配下への世代バックアップ方式は使わない。
- 上記(日付の半角数字化・本文サンセリフ化・段落の字下げ・句点位置での改行)は、新規記事作成時は最初から適用し、既存記事を編集する際に気づいたら合わせて直す。ディレクトリ全体への一括適用は、依頼されたときにまとめて行う。

### 意匠を変えたときの描画確認

- 記事の見た目に関わる変更をしたら、ブラウザで実際に描画して確かめる。ブラウザ拡張は `file://` を開けないので、簡易サーバを立てて `http://127.0.0.1:<port>/<ファイル名>` を開く。確認が済んだらサーバは止める。

      python -m http.server 8765 --bind 127.0.0.1

- 見るのは次の四点。
  - ライト・ダーク両方での本文コントラスト(数値は `getComputedStyle` で色を取り、相対輝度から比を計算して確認する)。
  - アコーディオンの単一開閉と、開いた章へのスクロール。
  - `#secN` を付けた URL で直接開いたときの自動展開。
  - ヒーロー SVG の文字が枠からはみ出していないか。
- OS がライトモードのままダークを確かめるには、ダーク値だけを `:root` に流し込む `<style>` を一時的に注入して描画を見る。変数が定義されているかを読むだけでは不十分で、面の色が反転しきっていない不具合はそれでは見つからない。

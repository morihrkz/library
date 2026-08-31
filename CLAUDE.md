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
- 唯一の例外は記事題名(`.page-head h1` 。ヒーローから本文側へ移設したタイトルブロック内の h1)。ここだけは本文より一回り大きくし、セリフ体にする。上の 2 つの `<style>` ブロックより後に、次を追記する(数値は既存記事間で多少ぶれるが、下記が標準)。

      <style>
        /* 記事題名(h1)を本文より拡大し、セリフ体にする */
        .page-head h1 { font-size: clamp(1.7rem, 3.5vw, 2.4rem) !important; line-height: 1.4 !important; font-family: "Yu Mincho", "Hiragino Mincho ProN", "Noto Serif JP", serif !important; }
        /* 題名内のインライン要素にも題名のサイズ・書体を継承させる */
        .page-head h1 * { font-size: inherit !important; font-family: inherit !important; }
      </style>

  - 2 行目(`.page-head h1 *`)を省かない。統一ブロックの `body :not(svg):not(svg *)` は「 svg 以外の全要素」に当たるため、題名を `<span>` などで部分的に包むと、**その部分だけが本文サイズ・サンセリフに引き戻される**。1 行目は `h1` 要素だけを狙っており、子要素には届かない(子に直接当たった `!important` 宣言は、親からの継承値より強い)。
  - かつてはヒーロー帯内の `header.hero h1` を本文の約 3 倍(`clamp(2.4rem,6vw,3.4rem)`)にしていたが、2026-09-01 のヒーロー簡素化(タイトルの本文側移設)に伴い、対象セレクタとサイズを上記へ変更した。
  - 対象は `.page-head` の `h1`(記事題名)のみ。`.sub`(リード文)・見出し・本文・注記など他の要素は上記のとおりサンセリフ・1rem のまま変えない。
  - 新規記事も `.page-head h1` にはこの上書きを最初から含める。

## 段落の字下げ(読みやすさのための整形)

- 本文段落(`p` 要素)の先頭は全角 1 字下げにする(`text-indent: 1em`)。
  - 対象外: 章冒頭のリード文・要約(`.lead` 相当のクラスを当てた callout 的な段落)、出典リストの `li`、注記ボックスなど、通常の地の文でない要素。これらは `text-indent: 0` を明示する。
  - `<br>` で改行した 2 行目以降には字下げは効かない(CSS の仕様どおりで正しい挙動。段落の先頭のみ字下げというのが本来の目的)。
- 読点(、)の位置に `<br>` を挿入して段落内で強制改行しない。
  - 理由: レイアウトを読者のウィンドウ幅に委ねず、本文中に手動で改行を埋め込む手法そのものが不適切なため。

## 本文コンテナの横幅

- 本文(記事の地の文を包む `.wrap` / `main.wrap` など)に、`960px` や `60rem` のような固定の `max-width` を設けない。閲覧中のブラウザ幅を常に十分に活用する(実質 `max-width: none` )。
  - ただし、画面の端に文字が接すると読みにくいため、左右の余白(`padding`)は必ず確保する。目安は `padding: 0 clamp(1.5rem, 3vw, 3rem)` のように、画面幅に応じてゆるやかに変化する指定を使う(固定 px の余白でもよいが、極端に狭くしない)。
- 対象外: ヒーローの図(`.hero-figure`)・タイトルブロック(`.page-head`)や、検索ボックス・カードグリッドの列定義といった個々の UI 部品の幅。これらは可読性・意匠上の理由で意図的に幅を絞ってよい。ここで撤廃するのは、記事本文(地の文)を包む外側コンテナの幅制限に限る。
- 新規作成する記事は最初からこの形式(本文コンテナに `max-width` を設けない)で書く。既存記事を編集する際に気づいたら合わせて直す。

## 配色(色の変数名と標準値)

- 配色の正(基準)は別プロジェクト `~/Documents/GitHub/drone-flight-plan` の `theme.css` が定義する色遣いとする(2026-09-01 に全記事を統一)。`theme.css` を `<link>` で読み込むのではなく、各記事の `<style>` 内 `:root` に値を書き写して使う(このディレクトリは各ページ自己完結の方針)。
- 色は必ず `:root` の CSS カスタムプロパティにまとめ、個々のセレクタに生の色値を書かない。
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
  | `--hero-1` `--hero-2` | ヒーロー帯の地色。現行は両方同値で無地(グラデーションにしない) |
  | `--hero-ink` | ヒーロー帯上の SVG の明るい文字・線 |
  | `--hero-dim` | ヒーロー帯上の SVG の弱い文字・線 |

- 標準値。**色相を記事ごとに変えることはしない**(かつては記事の主題に合わせて色相を変えていたが、2026-09-01 の統一でディレクトリ全体を単一パレットに揃えた)。

      :root{
        --bg:#F5F3EC; --paper:#fff; --card:#F5F3EC; --ink:#2D3325; --sub:#3A4032; --muted:#72786B;
        --accent:#25364A; --accent-2:#3E5226; --line:#C8CEC0; --note-bg:#EEF2E4;
        --hero-1:#25364A; --hero-2:#25364A; --hero-ink:#F5F3EC; --hero-dim:#C8CEC0;
      }

  - `theme.css` との対応: `--bg` `--line`(=`--border`)`--ink`(=`--text`)`--muted` `--accent` はそのまま。`--sub` には `--label:#3A4032` を充てる(弱い文字の 2 段階を保つため。theme.css の `--muted` 一本に潰さない)。`--note-bg` は `--accent-light:#EEF2E4` 。`--accent-2` は `--ok-text:#3E5226` 。
  - 記事固有の役割には名前を足してよい(`--warn` `--mono-bg` 、 OS 比較記事の `--mac` `--win` など)。ただし値は次の 4 族から選ぶ(明度は用途に合わせて動かしてよいが、色相・彩度はこの族に収める)。
    - 濃紺族(基調): `#25364A` とその明暗(色相 213° 前後、彩度 0.35 以下)
    - オリーブ緑族(良好・肯定系): `#9DB87C` / `#F2F7EA` / `#3E5226`(色相 95° 前後)
    - 弱い赤族(警告・否定系): `#b03a3a` / `#8a2f2f` と淡背景(色相 3° 前後、彩度 0.40 以下)
    - カーキ・生成り族(中間・強調の淡色): `#F5F3EC` 系の濃淡(色相 50° 前後)
    - 鮮やかな青・紫・橙・金などこの範囲外の色相は使わない。
  - `--border` を「半透明の縁取り」、`--line` を「実線の罫線」として使い分けている記事が 1 件ある(`give_and_take_essay.html`)。役割が違うので統合しない。

## ライト配色固定(ダークモード非対応)

- 全記事とも配色は常にライト固定とする。`@media (prefers-color-scheme: dark)` ブロック、ダーク切り替え JS(`matchMedia` 判定・`data-theme` 付け替え等)は**書かない**。既存記事に見つけたら削除する(2026-09-01 に全記事から削除済み)。
- かつては全記事で夜間モード対応を標準としていたが、`drone-flight-plan` の色遣いへの統一に伴い廃止した。復活させるときはこの節ごと書き換えること。

## ヒーロー(記事冒頭の図案帯)とタイトルブロック

- 記事冒頭のヒーローは `<header class="hero">` の**無地の濃紺帯(`--hero-1`)に SVG 図案 1 枚だけ**を置く構成とする(2026-09-01 の統一。指示書 202609010100)。全画面(`min-height:100svh` 等)にはしない。
- **ヒーローの中に文字要素を置かない。** 見出し・eyebrow・リード・`.meta`・`<figcaption>`・カウンター・検索導線はすべてヒーローの外。SVG 図案の内部のラベル文字(チップ名・軸ラベル等)は図案の一部なので置いてよい。
- タイトル類はヒーロー直後の `<div class="page-head">` に置く。構造は次のとおり:

      <header class="hero">
        <div class="wrap">
          <figure class="hero-figure">
            <svg viewBox="0 0 720 300" role="img" aria-labelledby="xxTitle xxDesc"> … </svg>
          </figure>
        </div>
      </header>

      <div class="page-head">
        <span class="eyebrow">分野 / CATEGORY</span>
        <h1>主題 - 副題</h1>
        <p class="sub">記事の内容を 1 〜 3 文で要約したリード</p>
        <div class="meta">
          <span>全 8 章</span>
          <span>約 20 分</span>
          <span>2026 年 8 月</span>
        </div>
      </div>

- `.eyebrow` は分野・カテゴリを字間を空けた小さな文字で置く。`.meta` は「全 N 章」「約 N 分」「公開年月」を横並びで置く(章立てのない記事では章数を省く)。どちらも `--muted` の弱い文字にして、`h1` と `.sub` を前に出す。
- 図案は**静的なインライン SVG** 1 枚とし、`<figure class="hero-figure">` で包む。
  - 記事の主題・論旨を抽象化した個別の構図とする(論証構造の図式、対比の二極、時系列の軸、分類の樹形など)。写実的なイラスト・人物・実在組織の描写はしない。テンプレートの機械的流用もしない。
  - 色は「配色」節のパレット範囲内。濃紺帯の上に載るので、文字・線は `--hero-ink` / `--hero-dim` 相当の明色を基本とし、暗い文字を使うときは図案内の明るい面の上に限る(帯地に対して 4.5:1 以上を目安)。
  - `role="img"` と `aria-labelledby` を付け、SVG 内に `<title id>`(図の一行タイトル)と `<desc id>`(図の内容の言葉による説明)を置く。`<figcaption>` は使わない方針になったため、「概念図であり縮尺は正確でない」といった留保も `<desc>` に書く。読み上げ環境ではこれが図の唯一の代替になるので省略しない。
  - 文字色・線色の指定は SVG 内の `<style>` にクラスとしてまとめる。フォントは本文と同じサンセリフ・スタックを指定する。
- **アニメーション・動的描画・装飾を持ち込まない。** `<canvas>` 、`requestAnimationFrame` 、手続き的な模様生成、ヒーロー専用の `<script>` に加え、帯背景のグラデーション・波形の縁取り(`.wave`)・罫線パターン・`::before`/`::after` のオーバーレイも使わない。帯は無地、装飾は図案そのものだけ。
- CSS の目安(数値は既存記事間でも多少ぶれており、下記はその中央値):

      header.hero{background:var(--hero-1);color:var(--hero-ink);
       padding:3.6rem 0 2.8rem;margin-bottom:2.8rem}
      header.hero .wrap{max-width:960px;margin:0 auto;padding:0 clamp(1.5rem,3vw,3rem)}
      .hero-figure{max-width:960px;margin:0;overflow-x:auto}
      .hero-figure svg{display:block;width:100%;height:auto}
      .page-head{max-width:960px;margin:0 auto 2.4rem;padding:0 clamp(1.5rem,3vw,3rem)}
      .page-head .eyebrow{display:block;font-size:0.78rem;letter-spacing:0.24em;
       color:var(--muted);margin-bottom:0.6rem}
      .page-head h1{margin:0;color:var(--accent)}
      .page-head p.sub{margin:0.6rem 0 0;color:var(--sub,var(--muted));line-height:1.85;text-indent:0}
      .page-head .meta{margin:0.9rem 0 0;font-size:0.82rem;color:var(--muted);
       display:flex;flex-wrap:wrap;gap:0.4rem 1.1rem}

  - 狭い画面では図を縮小せず、`.hero-figure` の `overflow-x:auto` の中で横スクロールさせる(`@media` で `.hero-figure svg{min-width:560px}` 前後を指定)。
  - ヒーローの `margin-bottom` と `.page-head` の `margin-bottom` が本文との間隔を作るので、`main.wrap` 側に上パディングを重ねない。
- ヒーロー・`.page-head` 内の要素は「本文コンテナの横幅」ルールの対象外で、`max-width: 960px` 程度に絞ってよい。絞るのはこの二つの中だけで、本文(`main.wrap`)には広げない。
- 部分的な意匠スパン(`h1 .grad` 等)は、タイトルが本文側に移った現行構成では原則使わない。使う場合もグラデーション文字にはせず、`--accent` の単色に留める。

## 長文記事のアコーディオン機構

- 複数の章(`第 N 章` 等の見出し単位)を持つ長文記事は、本文をアコーディオン(開閉式)にする。これはディレクトリ内の大半の記事がすでに採用している標準仕様であり、新規作成時は最初から適用する。単一の短い記事(章立てのないエッセイ等)には適用しなくてよい。
- 実装(次の構造・クラス名を用いる):
  - 本文冒頭(ヒーロー直後の `.page-head` の後)に開閉トグル用ツールバーを置く: `<div class="toolbar-container"><div class="toolbar"><button id="expandAll" type="button">すべて開く</button><button id="collapseAll" type="button">すべて閉じる</button></div></div>` 。導入・前書きにあたる文章も裸で置かず、`序` などの章にしてアコーディオンに入れる(ツールバーより前に本文を置かない)。例外は、タイトルブロックの `.page-head`(本文ではなく記事題名)と、「注記・補足のボックス」の `.caveat` ・`.toc-note` だけで、これらはツールバーより前に置く。
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

## 注記・補足のボックス

本文とは別の階層で読者に語りかける短い囲みは、次の三つに限る。役割が違うので、同じ見た目に別名を与えない。三つのどれにも当てはまらない文章は、囲みではなく章の本文として書く。

| クラス | 役割 | 置く場所 | 見た目 |
| --- | --- | --- | --- |
| `.pause` | 章の途中でいったん本文の流れを止め、読者に問いかける。脇道の補足にも使う | 章のパネル内(`.acc-panel-inner` の中)、段落の合間。1 章に 1 〜 2 個まで | 破線の角丸枠。枠線に食い込む位置に小さなラベル |
| `.caveat` | 記事全体の前提・方法・限界の断り書き。`【…】` で始める | ツールバーの直前。記事に 1 つだけ | 実線の枠 + 左端にアクセント色の太罫 |
| `.toc-note` | 読み方の一行案内(開閉操作の説明、続編である旨など) | ツールバーの直前。記事に 1 つだけ | 枠なし・中央寄せの弱い文字 |

- 「長文記事のアコーディオン機構」の「ツールバーより前に本文を置かない」に対する例外が、タイトルブロックの `.page-head` とこの `.caveat` ・`.toc-note` である。`.caveat` と `.toc-note` はどちらも本文ではなく記事の読み方に関する断り書きなので、章に入れずツールバーの直前に置く。両方を置く記事では `.caveat` を先にする。
- `.pause` は章の中身なので、必ずアコーディオンのパネル内に置く。ツールバーより前には置かない。
- 導入・前書きにあたる文章をこれらの囲みで代用しない。前書きは `序` などの章にしてアコーディオンに入れる。

### マークアップ

      <p class="toc-note">気になる章をタップするとそこが開く。</p>
      <div class="caveat"><p>【方法と限界】本稿では…を区別する。</p></div>

      <!-- 章のパネル内 -->
      <div class="pause"><p>最後に自分自身に驚いたのは、いつだっただろうか。</p></div>

- `.pause` と `.caveat` は `<div>` で包み、中に `<p>` を置く。字下げと行間をこの `<p>` に対して個別に指定するため、囲み自体に本文を直接書かない。
- `.toc-note` は一行なので `<p>` 単体に付ける。

### CSS

      .pause{
        margin:2em 0 0;
        padding:24px;
        background:var(--pause-bg);
        border:2px dashed var(--pause-border);
        border-radius:16px;
        position:relative;
        box-shadow:0 4px 12px color-mix(in srgb, var(--pause-border) 16%, transparent);
      }
      .pause::before{
        content:"ひと休み";
        position:absolute;
        top:-10px;
        left:20px;
        background:var(--pause-bg);
        padding:0 8px;
        font-weight:700;
        letter-spacing:.05em;
        color:var(--pause-ink);
      }
      .pause p{
        margin:0;
        text-indent:0;
        color:var(--pause-ink);
        font-weight:600;
        line-height:1.6;
      }

      .caveat{
        margin:0 0 26px;
        padding:16px 20px;
        background:var(--note-bg);
        border:1px solid var(--line);
        border-left:3px solid var(--accent);
        border-radius:8px;
      }
      .caveat p{
        margin:0;
        text-indent:0;
        color:var(--sub);
        line-height:1.85;
      }

      .toc-note{
        margin:0 0 26px;
        text-align:center;
        color:var(--sub);
        line-height:1.85;
        text-indent:0;
      }

      @media (max-width:600px){
        .pause{padding:20px 16px}
      }

- 三つとも `font-size` を書かない。「本文フォント」の統一ブロックがすべて 1rem に上書きするため、ここでの指定は効かない。
- `.pause` の `::before` のラベル文字列は記事に合わせて決める(「ひと休み」「メモ」など)。同じ記事の中では 1 種類に統一する。

### 変数

- `.caveat` と `.toc-note` は「配色」の標準語彙だけで足りる(`--note-bg` `--line` `--accent` `--sub`)。新しい変数を足さない。
- `.pause` にだけ専用の三つを `:root` に足す。標準値は次のとおり(オリーブ緑族。「配色」節のパレット範囲内で運用する)。

      :root{ --pause-bg:#F2F7EA; --pause-border:#9DB87C; --pause-ink:#3E5226; }

  - ラベルと本文はどちらも `--pause-ink` を使う。枠線色 `--pause-border` を文字色に流用しない。枠線として成立する明るさの色は、同系の淡い背景の上ではコントラストが 1.5:1 程度まで落ち、ラベルがほとんど読めなくなる。
- 新規作成する記事は最初からこの形式で書く。既存記事を編集する際に気づいたら合わせて直す。

## 句点位置での改行(意味のまとまりごとの区切り)

- 本文中の句点(。)の後に、段落内の意味のまとまりの区切りとして `<br>` を挿入する。
  - すべての句点の後に入れるのではない。段落をいくつかの小さなまとまり(話題・論点の単位)に分け、そのまとまりとまとまりの境目にあたる句点の後にだけ入れる。
  - 目安: 1 段落あたり 1 〜 3 箇所程度。文が 1 〜 2 文しかない短い段落には入れない。
  - どこが区切りかは意味で判断する。機械的な一括置換(全句点への挿入、n 文ごとの挿入など)はしない。
- 読点ルールとの関係: 読点(、)の位置への `<br>` 挿入は引き続き禁止(上記の禁止ルール)。ここで認めるのは句点の後の、意味の区切りに限った挿入のみ。
- 字下げとの関係: `<br>` による 2 行目以降には `text-indent` が効かない。まとまりの先頭を字下げしたい場合は `<br>` ではなく段落(`p`)を分ける。

## コントラストの目安

- 配色はライト固定(「ライト配色固定」節)。コントラスト比の目安は、本文(`--ink` on `--bg`/`--paper`)で 7:1 以上。
- 弱い文字は 4.5:1 以上が望ましいが、`--muted:#72786B` は `--bg:#F5F3EC` 上で **4.1:1** であり、`theme.css` の値を優先してこのまま使う(theme.css 側が変わったら追随する)。`--muted` を長文に使わず、出典・図注などの短い注記に限ることでこの妥協を吸収する。長めの注記には `--sub:#3A4032` を使う。
- ヒーロー帯(濃紺 `#25364A`)上の SVG 文字は 4.5:1 以上を目安にする。`--hero-ink:#F5F3EC` と `--hero-dim:#C8CEC0` は十分。彩度のある色(弱い赤族など)を帯上の文字に使うときは、明度を上げた淡色(例: `#d9a29e`)にする。

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
  - 本文と弱い文字のコントラスト(数値は `getComputedStyle` で色を取り、相対輝度から比を計算して確認する。目安は「コントラストの目安」節)。
  - アコーディオンの単一開閉と、開いた章へのスクロール。
  - `#secN` を付けた URL で直接開いたときの自動展開。
  - ヒーロー SVG の文字が枠からはみ出していないか、濃紺帯の上で読めているか。

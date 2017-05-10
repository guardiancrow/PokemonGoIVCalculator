var requireStardust = [ // x4
	200,	400,	600,	800,	1000,
	1300,	1600,	1900,	2200,	2500,
	3000,	3500,	4000,	4500,	5000,
	6000,	7000,	8000,	9000,	10000
];

var requireCandy = [ // x2
	1,1,1,1,1,1,1,1,1,1,
	2,2,2,2,2,2,2,2,2,2,
	3,3,3,3,3,4,4,4,4,4,
	6,6,8,8,10,10,12,12,15,15
];

var pokedex = [
	{name: 'フシギダネ', base: { stamina: 90, attack: 118, defense: 118 }, hira: 'ふしぎだね', evo: [{ name: 'フシギソウ', candy: 25 }] },
	{name: 'フシギソウ', base: { stamina: 120, attack: 151, defense: 151 }, hira: 'ふしぎそう', evo: [{ name: 'フシギバナ', candy: 100 }] },
	{name: 'フシギバナ', base: { stamina: 160, attack: 198, defense: 198 }, hira: 'ふしぎばな' },
	{name: 'ヒトカゲ', base: { stamina: 78, attack: 116, defense: 96 }, hira: 'ひとかげ', evo: [{ name: 'リザード', candy: 25 }] },
	{name: 'リザード', base: { stamina: 116, attack: 158, defense: 129 }, hira: 'りざーど', evo: [{ name: 'リザードン', candy: 100 }] },
	{name: 'リザードン', base: { stamina: 156, attack: 223, defense: 176 }, hira: 'りざーどん' },
	{name: 'ゼニガメ', base: { stamina: 88, attack: 94, defense: 122 }, hira: 'ぜにがめ', evo: [{ name: 'カメール', candy: 25 }] },
	{name: 'カメール', base: { stamina: 118, attack: 126, defense: 155 }, hira: 'かめーる', evo: [{ name: 'カメックス', candy: 100 }] },
	{name: 'カメックス', base: { stamina: 158, attack: 171, defense: 210 }, hira: 'かめっくす' },
	{name: 'キャタピー', base: { stamina: 90, attack: 55, defense: 62 }, hira: 'きゃたぴー', evo: [{ name: 'トランセル', candy: 12 }] },
	{name: 'トランセル', base: { stamina: 100, attack: 45, defense: 94 }, hira: 'とらんせる', evo: [{ name: 'バタフリー', candy: 50 }] },
	{name: 'バタフリー', base: { stamina: 120, attack: 167, defense: 151 }, hira: 'ばたふりー' },
	{name: 'ビードル', base: { stamina: 80, attack: 63, defense: 55 }, hira: 'びーどる', evo: [{ name: 'コクーン', candy: 12 }] },
	{name: 'コクーン', base: { stamina: 90, attack: 46, defense: 86 }, hira: 'こくーん', evo: [{ name: 'スピアー', candy: 50 }] },
	{name: 'スピアー', base: { stamina: 130, attack: 169, defense: 150 }, hira: 'すぴあー' },
	{name: 'ポッポ', base: { stamina: 80, attack: 85, defense: 76 }, hira: 'ぽっぽ', evo: [{ name: 'ピジョン', candy: 12 }] },
	{name: 'ピジョン', base: { stamina: 126, attack: 117, defense: 108 }, hira: 'ぴじょん', evo: [{ name: 'ピジョット', candy: 50 }] },
	{name: 'ピジョット', base: { stamina: 166, attack: 166, defense: 157 }, hira: 'ぴじょっと' },
	{name: 'コラッタ', base: { stamina: 60, attack: 103, defense: 70 }, hira: 'こらった', evo: [{ name: 'ラッタ', candy: 25 }] },
	{name: 'ラッタ', base: { stamina: 110, attack: 161, defense: 144 }, hira: 'らった' },
	{name: 'オニスズメ', base: { stamina: 80, attack: 112, defense: 61 }, hira: 'おにすずめ', evo: [{ name: 'オニドリル', candy: 50 }] },
	{name: 'オニドリル', base: { stamina: 130, attack: 182, defense: 135 }, hira: 'おにどりる' },
	{name: 'アーボ', base: { stamina: 70, attack: 110, defense: 102 }, hira: 'あーぼ', evo: [{ name: 'アーボック', candy: 50 }] },
	{name: 'アーボック', base: { stamina: 120, attack: 167, defense: 158 }, hira: 'あーぼっく' },
	{name: 'ピカチュウ', base: { stamina: 70, attack: 112, defense: 101 }, hira: 'ぴかちゅう', evo: [{ name: 'ライチュウ', candy: 50 }] },
	{name: 'ライチュウ', base: { stamina: 120, attack: 193, defense: 165 }, hira: 'らいちゅう' },
	{name: 'サンド', base: { stamina: 100, attack: 126, defense: 145 }, hira: 'さんど', evo: [{ name: 'サンドパン', candy: 50 }] },
	{name: 'サンドパン', base: { stamina: 150, attack: 182, defense: 202 }, hira: 'さんどぱん' },
	{name: 'ニドラン♀', base: { stamina: 110, attack: 86, defense: 94 }, hira: 'にどらん♀', evo: [{ name: 'ニドリーナ', candy: 25 }] },
	{name: 'ニドリーナ', base: { stamina: 140, attack: 117, defense: 126 }, hira: 'にどりーな', evo: [{ name: 'ニドクイン', candy: 100 }] },
	{name: 'ニドクイン', base: { stamina: 180, attack: 180, defense: 174 }, hira: 'にどくいん' },
	{name: 'ニドラン♂', base: { stamina: 92, attack: 105, defense: 76 }, hira: 'にどらん♂', evo: [{ name: 'ニドリーノ', candy: 25 }] },
	{name: 'ニドリーノ', base: { stamina: 122, attack: 137, defense: 112 }, hira: 'にどりーの', evo: [{ name: 'ニドキング', candy: 100 }] },
	{name: 'ニドキング', base: { stamina: 162, attack: 204, defense: 157 }, hira: 'にどきんぐ' },
	{name: 'ピッピ', base: { stamina: 140, attack: 107, defense: 116 }, hira: 'ぴっぴ', evo: [{ name: 'ピクシー', candy: 50 }] },
	{name: 'ピクシー', base: { stamina: 190, attack: 178, defense: 171 }, hira: 'ぴくしー' },
	{name: 'ロコン', base: { stamina: 76, attack: 96, defense: 122 }, hira: 'ろこん', evo: [{ name: 'キュウコン', candy: 50 }] },
	{name: 'キュウコン', base: { stamina: 146, attack: 169, defense: 204 }, hira: 'きゅうこん' },
	{name: 'プリン', base: { stamina: 230, attack: 80, defense: 44 }, hira: 'ぷりん', evo: [{ name: 'プクリン', candy: 50 }] },
	{name: 'プクリン', base: { stamina: 280, attack: 156, defense: 93 }, hira: 'ぷくりん' },
	{name: 'ズバット', base: { stamina: 80, attack: 83, defense: 76 }, hira: 'ずばっと', evo: [{ name: 'ゴルバット', candy: 50 }] },
	{name: 'ゴルバット', base: { stamina: 150, attack: 161, defense: 153 }, hira: 'ごるばっと', evo: [{ name: 'クロバット', candy: 100 }] },
	{name: 'ナゾノクサ', base: { stamina: 90, attack: 131, defense: 116 }, hira: 'なぞのくさ', evo: [{ name: 'クサイハナ', candy: 25 }] },
	{name: 'クサイハナ', base: { stamina: 120, attack: 153, defense: 139 }, hira: 'くさいはな', evo: [{ name: 'ラフレシア', candy: 100 }, { name: 'キレイハナ', candy: 100, item: 'たいようのいし' }] },
	{name: 'ラフレシア', base: { stamina: 150, attack: 202, defense: 170 }, hira: 'らふれしあ' },
	{name: 'パラス', base: { stamina: 70, attack: 121, defense: 99 }, hira: 'ぱらす', evo: [{ name: 'パラセクト', candy: 50 }] },
	{name: 'パラセクト', base: { stamina: 120, attack: 165, defense: 146 }, hira: 'ぱらせくと' },
	{name: 'コンパン', base: { stamina: 120, attack: 100, defense: 102 }, hira: 'こんぱん', evo: [{ name: 'モルフォン', candy: 50 }] },
	{name: 'モルフォン', base: { stamina: 140, attack: 179, defense: 150 }, hira: 'もるふぉん' },
	{name: 'ディグダ', base: { stamina: 20, attack: 109, defense: 88 }, hira: 'でぃぐだ', evo: [{ name: 'ダグトリオ', candy: 50 }] },
	{name: 'ダグトリオ', base: { stamina: 70, attack: 167, defense: 147 }, hira: 'だぐとりお' },
	{name: 'ニャース', base: { stamina: 80, attack: 92, defense: 81 }, hira: 'にゃーす', evo: [{ name: 'ペルシアン', candy: 50 }] },
	{name: 'ペルシアン', base: { stamina: 130, attack: 150, defense: 139 }, hira: 'ぺるしあん' },
	{name: 'コダック', base: { stamina: 100, attack: 122, defense: 96 }, hira: 'こだっく', evo: [{ name: 'ゴルダック', candy: 50 }] },
	{name: 'ゴルダック', base: { stamina: 160, attack: 191, defense: 163 }, hira: 'ごるだっく' },
	{name: 'マンキー', base: { stamina: 80, attack: 148, defense: 87 }, hira: 'まんきー', evo: [{ name: 'オコリザル', candy: 50 }] },
	{name: 'オコリザル', base: { stamina: 130, attack: 207, defense: 144 }, hira: 'おこりざる' },
	{name: 'ガーディ', base: { stamina: 110, attack: 136, defense: 96 }, hira: 'がーでぃ', evo: [{ name: 'ウインディ', candy: 50 }] },
	{name: 'ウインディ', base: { stamina: 180, attack: 227, defense: 166 }, hira: 'ういんでぃ' },
	{name: 'ニョロモ', base: { stamina: 80, attack: 101, defense: 82 }, hira: 'にょろも', evo: [{ name: 'ニョロゾ', candy: 25 }] },
	{name: 'ニョロゾ', base: { stamina: 130, attack: 130, defense: 130 }, hira: 'にょろぞ', evo: [{ name: 'ニョロボン', candy: 100 }, { name: 'ニョロトノ', candy: 100, item: 'おうじゃのしるし' }] },
	{name: 'ニョロボン', base: { stamina: 180, attack: 182, defense: 187 }, hira: 'にょとぼん' },
	{name: 'ケーシィ', base: { stamina: 50, attack: 195, defense: 103 }, hira: 'けーしぃ', evo: [{ name: 'ユンゲラー', candy: 25 }] },
	{name: 'ユンゲラー', base: { stamina: 80, attack: 232, defense: 138 }, hira: 'ゆんげらー', evo: [{ name: 'フーディン', candy: 100 }] },
	{name: 'フーディン', base: { stamina: 110, attack: 271, defense: 194 }, hira: 'ふーでぃん' },
	{name: 'ワンリキー', base: { stamina: 140, attack: 137, defense: 88 }, hira: 'わんりきー', evo: [{ name: 'ゴーリキー', candy: 25 }] },
	{name: 'ゴーリキー', base: { stamina: 160, attack: 177, defense: 130 }, hira: 'ごーりきー', evo: [{ name: 'カイリキー', candy: 100 }] },
	{name: 'カイリキー', base: { stamina: 180, attack: 234, defense: 162 }, hira: 'かいりきー' },
	{name: 'マダツボミ', base: { stamina: 100, attack: 139, defense: 64 }, hira: 'まだつぼみ', evo: [{ name: 'ウツドン', candy: 25 }] },
	{name: 'ウツドン', base: { stamina: 130, attack: 172, defense: 95 }, hira: 'うつどん', evo: [{ name: 'ウツボット', candy: 100 }] },
	{name: 'ウツボット', base: { stamina: 160, attack: 207, defense: 138 }, hira: 'うつぼっと' },
	{name: 'メノクラゲ', base: { stamina: 80, attack: 97, defense: 182 }, hira: 'めのくらげ', evo: [{ name: 'ドククラゲ', candy: 50 }] },
	{name: 'ドククラゲ', base: { stamina: 160, attack: 166, defense: 237 }, hira: 'どくくらげ' },
	{name: 'イシツブテ', base: { stamina: 80, attack: 132, defense: 163 }, hira: 'いしつぶて', evo: [{ name: 'ゴローン', candy: 25 }] },
	{name: 'ゴローン', base: { stamina: 110, attack: 164, defense: 196 }, hira: 'ごろーん', evo: [{ name: 'ゴローニャ', candy: 100 }] },
	{name: 'ゴローニャ', base: { stamina: 160, attack: 211, defense: 229 }, hira: 'ごろーにゃ' },
	{name: 'ポニータ', base: { stamina: 100, attack: 170, defense: 132 }, hira: 'ぽにーた', evo: [{ name: 'ギャロップ', candy: 50 }] },
	{name: 'ギャロップ', base: { stamina: 130, attack: 207, defense: 167 }, hira: 'ぎゃろっぷ' },
	{name: 'ヤドン', base: { stamina: 180, attack: 109, defense: 109 }, hira: 'やどん', evo: [{ name: 'ヤドラン', candy: 50 }, { name: 'ヤドキング', candy: 50, item: 'おうじゃのしるし' }] },
	{name: 'ヤドラン', base: { stamina: 190, attack: 177, defense: 194 }, hira: 'やどらん' },
	{name: 'コイル', base: { stamina: 50, attack: 165, defense: 128 }, hira: 'こいる', evo: [{ name: 'レアコイル', candy: 50 }] },
	{name: 'レアコイル', base: { stamina: 100, attack: 223, defense: 182 }, hira: 'れあこいる' },
	{name: 'カモネギ', base: { stamina: 104, attack: 124, defense: 118 }, hira: 'かもねぎ' },
	{name: 'ドードー', base: { stamina: 70, attack: 158, defense: 88 }, hira: 'どーどー', evo: [{ name: 'ドードリオ', candy: 50 }] },
	{name: 'ドードリオ', base: { stamina: 120, attack: 218, defense: 145 }, hira: 'どーどりお' },
	{name: 'パウワウ', base: { stamina: 130, attack: 85, defense: 128 }, hira: 'ぱうわう', evo: [{ name: 'ジュゴン', candy: 50 }] },
	{name: 'ジュゴン', base: { stamina: 180, attack: 139, defense: 184 }, hira: 'じゅごん' },
	{name: 'ベトベター', base: { stamina: 160, attack: 135, defense: 90 }, hira: 'べとべたー', evo: [{ name: 'ベトベトン', candy: 50 }] },
	{name: 'ベトベトン', base: { stamina: 210, attack: 190, defense: 184 }, hira: 'べとべとん' },
	{name: 'シェルダー', base: { stamina: 60, attack: 116, defense: 168 }, hira: 'しぇるだー', evo: [{ name: 'パルシェン', candy: 50 }] },
	{name: 'パルシェン', base: { stamina: 100, attack: 186, defense: 323 }, hira: 'ぱるしぇん' },
	{name: 'ゴース', base: { stamina: 60, attack: 186, defense: 70 }, hira: 'ごーす', evo: [{ name: 'ゴースト', candy: 25 }] },
	{name: 'ゴースト', base: { stamina: 90, attack: 223, defense: 112 }, hira: 'ごーすと', evo: [{ name: 'ゲンガー', candy: 100 }] },
	{name: 'ゲンガー', base: { stamina: 120, attack: 261, defense: 156 }, hira: 'げんがー' },
	{name: 'イワーク', base: { stamina: 70, attack: 85, defense: 288 }, hira: 'いわーく', evo: [{ name: 'ハガネール', candy: 50, item: 'メタルコート' }] },
	{name: 'スリープ', base: { stamina: 120, attack: 89, defense: 158 }, hira: 'すりーぷ', evo: [{ name: 'スリーパー', candy: 50 }] },
	{name: 'スリーパー', base: { stamina: 170, attack: 144, defense: 215 }, hira: 'すりーぱー' },
	{name: 'クラブ', base: { stamina: 60, attack: 181, defense: 156 }, hira: 'くらぶ', evo: [{ name: 'キングラー', candy: 50 }] },
	{name: 'キングラー', base: { stamina: 110, attack: 240, defense: 214 }, hira: 'きんぐらー' },
	{name: 'ビリリダマ', base: { stamina: 80, attack: 109, defense: 114 }, hira: 'びりりだま', evo: [{ name: 'マルマイン', candy: 50 }] },
	{name: 'マルマイン', base: { stamina: 120, attack: 173, defense: 179 }, hira: 'まるまいん' },
	{name: 'タマタマ', base: { stamina: 120, attack: 107, defense: 140 }, hira: 'たまたま', evo: [{ name: 'ナッシー', candy: 50 }] },
	{name: 'ナッシー', base: { stamina: 190, attack: 233, defense: 158 }, hira: 'なっしー' },
	{name: 'カラカラ', base: { stamina: 100, attack: 90, defense: 165 }, hira: 'からから', evo: [{ name: 'ガラガラ', candy: 50 }] },
	{name: 'ガラガラ', base: { stamina: 120, attack: 144, defense: 200 }, hira: 'がらがら' },
	{name: 'サワムラー', base: { stamina: 100, attack: 224, defense: 211 }, hira: 'さわむらー' },
	{name: 'エビワラー', base: { stamina: 100, attack: 193, defense: 212 }, hira: 'えびわらー' },
	{name: 'ベロリンガ', base: { stamina: 180, attack: 108, defense: 137 }, hira: 'べろりんが' },
	{name: 'ドガース', base: { stamina: 80, attack: 119, defense: 164 }, hira: 'どがーす', evo: [{ name: 'マタドガス', candy: 50 }] },
	{name: 'マタドガス', base: { stamina: 130, attack: 174, defense: 221 }, hira: 'またどがす' },
	{name: 'サイホーン', base: { stamina: 160, attack: 140, defense: 157 }, hira: 'さいほーん', evo: [{ name: 'サイドン', candy: 50 }] },
	{name: 'サイドン', base: { stamina: 210, attack: 222, defense: 206 }, hira: 'さいどん' },
	{name: 'ラッキー', base: { stamina: 500, attack: 60, defense: 176 }, hira: 'らっきー',evo: [{ name: 'ハピナス', candy: 50 }] },
	{name: 'モンジャラ', base: { stamina: 130, attack: 183, defense: 205 }, hira: 'もんじゃら' },
	{name: 'ガルーラ', base: { stamina: 210, attack: 181, defense: 165 }, hira: 'がるーら' },
	{name: 'タッツー', base: { stamina: 60, attack: 129, defense: 125 }, hira: 'たっつー', evo: [{ name: 'シードラ', candy: 25 }] },
	{name: 'シードラ', base: { stamina: 110, attack: 187, defense: 182 }, hira: 'しーどら', evo: [{ name: 'キングドラ', candy: 100, item: 'りゅうのウロコ' }] },
	{name: 'トサキント', base: { stamina: 90, attack: 123, defense: 115 }, hira: 'とさきんと', evo: [{ name: 'アズマオウ', candy: 50 }] },
	{name: 'アズマオウ', base: { stamina: 160, attack: 175, defense: 154 }, hira: 'あずまおう' },
	{name: 'ヒトデマン', base: { stamina: 60, attack: 137, defense: 112 }, hira: 'ひとでまん', evo: [{ name: 'スターミー', candy: 50 }] },
	{name: 'スターミー', base: { stamina: 120, attack: 210, defense: 184 }, hira: 'すたーみー' },
	{name: 'バリヤード', base: { stamina: 80, attack: 192, defense: 233 }, hira: 'ばりやーど' },
	{name: 'ストライク', base: { stamina: 140, attack: 218, defense: 170 }, hira: 'すとらいく', evo: [{ name: 'ハッサム', candy: 50, item: 'メタルコート' }] },
	{name: 'ルージュラ', base: { stamina: 130, attack: 223, defense: 182 }, hira: 'るーじゅら' },
	{name: 'エレブー', base: { stamina: 130, attack: 198, defense: 173 }, hira: 'えれぶー' },
	{name: 'ブーバー', base: { stamina: 130, attack: 206, defense: 169 }, hira: 'ぶーばー' },
	{name: 'カイロス', base: { stamina: 130, attack: 238, defense: 197 }, hira: 'かいろす' },
	{name: 'ケンタロス', base: { stamina: 150, attack: 198, defense: 197 }, hira: 'けんたろす' },
	{name: 'コイキング', base: { stamina: 40, attack: 29, defense: 102 }, hira: 'こいきんぐ', evo: [{ name: 'ギャラドス', candy: 400 }] },
	{name: 'ギャラドス', base: { stamina: 190, attack: 237, defense: 197 }, hira: 'ぎゃらどす' },
	{name: 'ラプラス', base: { stamina: 260, attack: 165, defense: 180 }, hira: 'らぷらす' },
	{name: 'メタモン', base: { stamina: 96, attack: 91, defense: 91 }, hira: 'めたもん' },
	{name: 'イーブイ', base: { stamina: 110, attack: 104, defense: 121 }, hira: 'いーぶい', evo: [{ name: 'シャワーズ', candy: 25 }, { name: 'サンダース', candy: 25 }, { name: 'ブースター', candy: 25 }, { name: 'エーフィ', candy: 25 }, { name: 'ブラッキー', candy: 25 }] },
	{name: 'シャワーズ', base: { stamina: 260, attack: 205, defense: 177 }, hira: 'しゃわーず' },
	{name: 'サンダース', base: { stamina: 130, attack: 232, defense: 201 }, hira: 'さんだーす' },
	{name: 'ブースター', base: { stamina: 130, attack: 246, defense: 204 }, hira: 'ぶーすたー' },
	{name: 'ポリゴン', base: { stamina: 130, attack: 153, defense: 139 }, hira: 'ぽりごん', evo: [{ name: 'ポリゴン２', candy: 50, item: 'アップグレード' }] },
	{name: 'オムナイト', base: { stamina: 70, attack: 155, defense: 174 }, hira: 'おむないと', evo: [{ name: 'オムスター', candy: 50 }] },
	{name: 'オムスター', base: { stamina: 140, attack: 207, defense: 227 }, hira: 'おむすたー' },
	{name: 'カブト', base: { stamina: 60, attack: 148, defense: 162 }, hira: 'かぶと', evo: [{ name: 'カブトプス', candy: 50 }] },
	{name: 'カブトプス', base: { stamina: 120, attack: 220, defense: 203 }, hira: 'かぶとぷす' },
	{name: 'プテラ', base: { stamina: 160, attack: 221, defense: 164 }, hira: 'ぷてら' },
	{name: 'カビゴン', base: { stamina: 320, attack: 190, defense: 190 }, hira: 'かびごん' },
	{name: 'フリーザー', base: { stamina: 180, attack: 192, defense: 249 }, hira: 'ふりーざー' },
	{name: 'サンダー', base: { stamina: 180, attack: 253, defense: 188 }, hira: 'さんだー' },
	{name: 'ファイヤー', base: { stamina: 180, attack: 251, defense: 184 }, hira: 'ふぁいやー' },
	{name: 'ミニリュウ', base: { stamina: 82, attack: 119, defense: 94 }, hira: 'みにりゅう', evo: [{ name: 'ハクリュー', candy: 25 }] },
	{name: 'ハクリュー', base: { stamina: 122, attack: 163, defense: 138 }, hira: 'はくりゅー', evo: [{ name: 'カイリュー', candy: 100 }] },
	{name: 'カイリュー', base: { stamina: 182, attack: 263, defense: 201 }, hira: 'かいりゅー' },
	{name: 'ミュウツー', base: { stamina: 212, attack: 330, defense: 200 }, hira: 'みゅうつー' },
	{name: 'ミュウ', base: { stamina: 200, attack: 210, defense: 209 }, hira: 'みゅう' },

	//ジョウト
	{name: 'チコリータ', base: { stamina: 90, attack: 92, defense: 122}, hira: 'ちこりーた', evo: [{ name: 'ベイリーフ', candy: 25 }] },
	{name: 'ベイリーフ', base: { stamina: 120, attack: 122, defense: 155}, hira: 'べいりーふ', evo: [{ name: 'メガニウム', candy: 100 }] },
	{name: 'メガニウム', base: { stamina: 160, attack: 168, defense: 202}, hira: 'めがにうむ' },
	{name: 'ヒノアラシ', base: { stamina: 78, attack: 116, defense: 96}, hira: 'ひのあらし', evo: [{ name: 'マグマラシ', candy: 25 }] },
	{name: 'マグマラシ', base: { stamina: 116, attack: 158, defense: 129}, hira: 'まぐまらし', evo: [{ name: 'バクフーン', candy: 100 }] },
	{name: 'バクフーン', base: { stamina: 156, attack: 223, defense: 176}, hira: 'ばくふーん' },
	{name: 'ワニノコ', base: { stamina: 100, attack: 117, defense: 116}, hira: 'わにのこ', evo: [{ name: 'アリゲイツ', candy: 25 }] },
	{name: 'アリゲイツ', base: { stamina: 130, attack: 150, defense: 151}, hira: 'ありげいつ', evo: [{ name: 'オーダイル', candy: 100 }] },
	{name: 'オーダイル', base: { stamina: 170, attack: 205, defense: 197}, hira: 'おーだいる' },
	{name: 'オタチ', base: { stamina: 70, attack: 79, defense: 77}, hira: 'おたち', evo: [{ name: 'オオタチ', candy: 25 }] },
	{name: 'オオタチ', base: { stamina: 170, attack: 148, defense: 130}, hira: 'おおたち' },
	{name: 'ホーホー', base: { stamina: 120, attack: 67, defense: 101}, hira: 'ほーほー', evo: [{ name: 'ヨルノズク', candy: 50 }] },
	{name: 'ヨルノズク', base: { stamina: 200, attack: 145, defense: 179}, hira: 'よるのずく' },
	{name: 'レディバ', base: { stamina: 80, attack: 72, defense: 142}, hira: 'れでぃば', evo: [{ name: 'レディアン', candy: 25 }] },
	{name: 'レディアン', base: { stamina: 110, attack: 107, defense: 209}, hira: 'れでぃあん' },
	{name: 'イトマル', base: { stamina: 80, attack: 105, defense: 73}, hira: 'いとまる', evo: [{ name: 'アリアドス', candy: 50 }] },
	{name: 'アリアドス', base: { stamina: 140, attack: 161, defense: 128}, hira: 'ありあどす' },
	{name: 'クロバット', base: { stamina: 170, attack: 194, defense: 178}, hira: 'くろばっと' },
	{name: 'チョンチー', base: { stamina: 150, attack: 106, defense: 106}, hira: 'ちょんちー', evo: [{ name: 'ランターン', candy: 50 }] },
	{name: 'ランターン', base: { stamina: 250, attack: 146, defense: 146}, hira: 'らんたーん' },

	{name: 'ピチュー', base: { stamina: 40, attack: 77, defense: 63 }, hira: 'ぴちゅー', evo: [{ name: 'ピカチュウ', candy: 25 }] },
	{name: 'ピィ', base: { stamina: 100, attack: 75, defense: 91 }, hira: 'ぴぃ', evo: [{ name: 'ピッピ', candy: 25 }] },
	{name: 'ププリン', base: { stamina: 180, attack: 69, defense: 34 }, hira: 'ぷぷりん', evo: [{ name: 'プリン', candy: 25 }] },
	{name: 'トゲピー', base: { stamina: 70, attack: 67, defense: 116 }, hira: 'とげぴー', evo: [{ name: 'トゲチック', candy: 50 }] },
	{name: 'トゲチック', base: { stamina: 110, attack: 140, defense: 191 }, hira: 'とげちっく' },

	{name: 'ネイティ', base: { stamina: 80, attack: 134, defense: 89}, hira: 'ねいてぃ', evo: [{ name: 'ネイティオ', candy: 50 }] },
	{name: 'ネイティオ', base: { stamina: 130, attack: 192, defense: 146}, hira: 'ねいてぃ' },
	{name: 'メリープ', base: { stamina: 110, attack: 114, defense: 82}, hira: 'めりーぷ', evo: [{ name: 'モココ', candy: 25 }] },
	{name: 'モココ', base: { stamina: 140, attack: 145, defense: 112}, hira: 'もここ', evo: [{ name: 'デンリュウ', candy: 100 }] },
	{name: 'デンリュウ', base: { stamina: 180, attack: 211, defense: 172}, hira: 'でんりゅう' },
	{name: 'キレイハナ', base: { stamina: 150, attack: 169, defense: 189}, hira: 'きれいはな' },
	{name: 'マリル', base: { stamina: 140, attack: 37, defense: 93}, hira: 'まりる', evo: [{ name: 'マリルリ', candy: 25 }] },
	{name: 'マリルリ', base: { stamina: 200, attack: 112, defense: 152}, hira: 'まりるり' },
	{name: 'ウソッキー', base: { stamina: 140, attack: 167, defense: 198}, hira: 'うそっきー' },
	{name: 'ニョロトノ', base: { stamina: 180, attack: 174, defense: 192}, hira: 'にょろとの' },
	{name: 'ハネッコ', base: { stamina: 70, attack: 67, defense: 101}, hira: 'はねっこ', evo: [{ name: 'ポポッコ', candy: 25 }] },
	{name: 'ポポッコ', base: { stamina: 110, attack: 91, defense: 127}, hira: 'ぽぽっこ', evo: [{ name: 'ワタッコ', candy: 100 }] },
	{name: 'ワタッコ', base: { stamina: 150, attack: 118, defense: 197}, hira: 'わたっこ' },
	{name: 'エイパム', base: { stamina: 110, attack: 136, defense: 112}, hira: 'えいぱむ'},
	{name: 'ヒマナッツ', base: { stamina: 60, attack: 55, defense: 55}, hira: 'ひまなっつ', evo: [{ name: 'キマワリ', candy: 50, item: 'たいようのいし' }] },
	{name: 'キマワリ', base: { stamina: 150, attack: 185, defense: 148}, hira: 'きまわり' },
	{name: 'ヤンヤンマ', base: { stamina: 130, attack: 154, defense: 94}, hira: 'やんやんま' },
	{name: 'ウパー', base: { stamina: 110, attack: 75, defense: 75}, hira: 'うぱー', evo: [{ name: 'ヌオー', candy: 50 }] },
	{name: 'ヌオー', base: { stamina: 190, attack: 152, defense: 152}, hira: 'ぬおー' },
	{name: 'エーフィ', base: { stamina: 130, attack: 261, defense: 194}, hira: 'えーふぃ' },
	{name: 'ブラッキー', base: { stamina: 190, attack: 126, defense: 250}, hira: 'ぶらっきー' },
	{name: 'ヤミカラス', base: { stamina: 120, attack: 175, defense: 87}, hira: 'やみからす' },
	{name: 'ヤドキング', base: { stamina: 190, attack: 177, defense: 194}, hira: 'やどきんぐ' },
	{name: 'ムウマ', base: { stamina: 120, attack: 167, defense: 167}, hira: 'むうま' },
	{name: 'アンノーン', base: { stamina: 96, attack: 136, defense: 91}, hira: 'あんのーん' },
	{name: 'ソーナンス', base: { stamina: 380, attack: 60, defense: 106}, hira: 'そーなんす' },
	{name: 'キリンリキ', base: { stamina: 140, attack: 182, defense: 133}, hira: 'きりんりき' },
	{name: 'クヌギダマ', base: { stamina: 100, attack: 108, defense: 146}, hira: 'くぬぎぬま', evo: [{ name: 'フォレトス', candy: 50 }] },
	{name: 'フォレトス', base: { stamina: 150, attack: 161, defense: 242}, hira: 'ふぉれとす' },
	{name: 'ノコッチ', base: { stamina: 200, attack: 131, defense: 131}, hira: 'のこっち' },
	{name: 'グライガー', base: { stamina: 130, attack: 143, defense: 204}, hira: 'ぐらいがー' },
	{name: 'ハガネール', base: { stamina: 150, attack: 148, defense: 333}, hira: 'はがねーる' },
	{name: 'ブルー', base: { stamina: 120, attack: 137, defense: 89}, hira: 'ぶるー', evo: [{ name: 'グランブル', candy: 50 }] },
	{name: 'グランブル', base: { stamina: 180, attack: 212, defense: 137}, hira: 'ぐらんぶる' },
	{name: 'ハリーセン', base: { stamina: 130, attack: 184, defense: 148}, hira: 'はりーせん' },
	{name: 'ハッサム', base: { stamina: 140, attack: 236, defense: 191}, hira: 'はっさむ' },
	{name: 'ツボツボ', base: { stamina: 40, attack: 17, defense: 396}, hira: 'つぼつぼ' },
	{name: 'ヘラクロス', base: { stamina: 160, attack: 251, defense: 189}, hira: 'へらくろす' },
	{name: 'ニューラ', base: { stamina: 110, attack: 189, defense: 157}, hira: 'にゅーら' },
	{name: 'ヒメグマ', base: { stamina: 120, attack: 142, defense: 93}, hira: 'ひめぐま', evo: [{ name: 'リングマ', candy: 50 }] },
	{name: 'リングマ', base: { stamina: 180, attack: 236, defense: 144}, hira: 'りんぐま' },
	{name: 'マグマッグ', base: { stamina: 80, attack: 118, defense: 71}, hira: 'まぐまっぐ', evo: [{ name: 'マグカルゴ', candy: 50 }] },
	{name: 'マグカルゴ', base: { stamina: 100, attack: 139, defense: 209}, hira: 'まぐかるご' },
	{name: 'ウリムー', base: { stamina: 100, attack: 90, defense: 74}, hira: 'うりむー', evo: [{ name: 'イノムー', candy: 50 }] },
	{name: 'イノムー', base: { stamina: 200, attack: 163, defense: 133}, hira: 'いのむー' },
	{name: 'サニーゴ', base: { stamina: 110, attack: 118, defense: 156}, hira: 'さにーご' },
	{name: 'テッポウオ', base: { stamina: 70, attack: 127, defense: 69}, hira: 'てっぽうお', evo: [{ name: 'オクタン', candy: 50 }] },
	{name: 'オクタン', base: { stamina: 150, attack: 197, defense: 141}, hira: 'おくたん' },
	{name: 'デリバード', base: { stamina: 90, attack: 128, defense: 90}, hira: 'でりばーど' },
	{name: 'マンタイン', base: { stamina: 130, attack: 148, defense: 260}, hira: 'まんたいん' },
	{name: 'エアームド', base: { stamina: 130, attack: 148, defense: 260}, hira: 'えあーむど' },
	{name: 'デルビル', base: { stamina: 90, attack: 152, defense: 93}, hira: 'でるびる', evo: [{ name: 'ヘルガー', candy: 50 }] },
	{name: 'ヘルガー', base: { stamina: 150, attack: 224, defense: 159}, hira: 'へるがー' },
	{name: 'キングドラ', base: { stamina: 150, attack: 194, defense: 194}, hira: 'きんぐどら' },
	{name: 'ゴマゾウ', base: { stamina: 180, attack: 107, defense: 107}, hira: 'ごまぞう', evo: [{ name: 'ドンファン', candy: 50 }] },
	{name: 'ドンファン', base: { stamina: 180, attack: 214, defense: 214}, hira: 'どんふぁん' },
	{name: 'ポリゴン２', base: { stamina: 170, attack: 198, defense: 174}, hira: 'ぽりごん２' },
	{name: 'オドシシ', base: { stamina: 146, attack: 192, defense: 132}, hira: 'おどしし' },
	{name: 'ドーブル', base: { stamina: 110, attack: 40, defense: 80}, hira: 'どーぶる' },
	{name: 'バルキー', base: { stamina: 70, attack: 64, defense: 64}, hira: 'ばるきー', evo: [{ name: 'サワムラー', candy: 25 }, { name: 'エビワラー', candy: 25 }, { name: 'カポエラー', candy: 25 }] },
	{name: 'カポエラー', base: { stamina: 100, attack: 173, defense: 214}, hira: 'かぽえらー' },

	{name: 'ムチュール', base: { stamina: 90, attack: 153, defense: 116 }, hira: 'むちゅーる', evo: [{ name: 'ルージュラ', candy: 25 }] },
	{name: 'エレキッド', base: { stamina: 90, attack: 135, defense: 110 }, hira: 'えれきっど', evo: [{ name: 'エレブー', candy: 25 }] },
	{name: 'ブビィ', base: { stamina: 90, attack: 151, defense: 108 }, hira: 'ぶびぃ', evo: [{ name: 'ブーバー', candy: 25 }] },

	{name: 'ミルタンク', base: { stamina: 190, attack: 157, defense: 211}, hira: 'みるたんく' },
	{name: 'ハピナス', base: { stamina: 510, attack: 129, defense: 229}, hira: 'はぴなす' },
	{name: 'ライコウ', base: { stamina: 180, attack: 241, defense: 210}, hira: 'らいこう' },
	{name: 'エンテイ', base: { stamina: 230, attack: 235, defense: 176}, hira: 'えんてい' },
	{name: 'スイクン', base: { stamina: 200, attack: 180, defense: 235}, hira: 'すいくん' },
	{name: 'ヨーギラス', base: { stamina: 100, attack: 115, defense: 93}, hira: 'よーぎらす', evo: [{ name: 'サナギラス', candy: 25 }] },
	{name: 'サナギラス', base: { stamina: 140, attack: 155, defense: 133}, hira: 'さなぎらす', evo: [{ name: 'バンギラス', candy: 100 }] },
	{name: 'バンギラス', base: { stamina: 200, attack: 251, defense: 212}, hira: 'ばんぎらす' },
	{name: 'ルギア', base: { stamina: 212, attack: 193, defense: 323}, hira: 'るぎあ' },
	{name: 'ホウオウ', base: { stamina: 212, attack: 263, defense: 301}, hira: 'ほうおう' },
	{name: 'セレビィ', base: { stamina: 200, attack: 210, defense: 210}, hira: 'せれびぃ' }
]

var CPM = [
	0.094, 0.1351374, 0.1663979, 0.1926509, 0.2157325,
	0.2365727, 0.2557201, 0.2735304, 0.2902499, 0.3060574,
	0.3210876, 0.335445, 0.3492127, 0.3624578, 0.3752356,
	0.3875924, 0.3995673, 0.4111936, 0.4225, 0.4329264,
	0.4431076, 0.45306, 0.4627984, 0.4723361, 0.481685,
	0.4908558, 0.4998584, 0.5087018, 0.517394, 0.5259425,
	0.5343543, 0.5426358, 0.5507927, 0.5588306, 0.5667545,
	0.5745692, 0.5822789, 0.5898879, 0.5974, 0.6048188,
	0.6121573, 0.6194041, 0.6265671, 0.6336492, 0.640653,
	0.647581, 0.6544356, 0.6612193, 0.667934, 0.6745819,
	0.6811649, 0.6876849, 0.6941437, 0.7005429, 0.7068842,
	0.7131691, 0.7193991, 0.7255756, 0.7317, 0.734741,
	0.7377695, 0.7407856, 0.7437894, 0.7467812, 0.749761,
	0.7527291, 0.7556855, 0.7586304, 0.7615638, 0.7644861,
	0.7673972, 0.7702973, 0.7731865, 0.776065, 0.7789328,
	0.7817901, 0.784637, 0.7874736, 0.7903/*, 0.7931164*/
]

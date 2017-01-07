$(document).ready(function(){
    var requireStardust = [
        200,	400,	600,	800,	1000,
		1300,	1600,	1900,	2200,	2500,
		3000,	3500,	4000,	4500,	5000,
		6000,	7000,	8000,	9000,	10000
    ];

    var pokedex = [
        {name: 'フシギダネ', base: { stamina: 90, attack: 118, defense: 118 }, hira: 'ふしぎだね' },
        {name: 'フシギソウ', base: { stamina: 120, attack: 151, defense: 151 }, hira: 'ふしぎそう' },
        {name: 'フシギバナ', base: { stamina: 160, attack: 198, defense: 198 }, hira: 'ふしぎばな' },
        {name: 'ヒトカゲ', base: { stamina: 78, attack: 116, defense: 96 }, hira: 'ひとかげ' },
        {name: 'リザード', base: { stamina: 116, attack: 158, defense: 129 }, hira: 'りざーど' },
        {name: 'リザードン', base: { stamina: 156, attack: 223, defense: 176 }, hira: 'りざーどん' },
        {name: 'ゼニガメ', base: { stamina: 88, attack: 94, defense: 122 }, hira: 'ぜにがめ' },
        {name: 'カメール', base: { stamina: 118, attack: 126, defense: 155 }, hira: 'かめーる' },
        {name: 'カメックス', base: { stamina: 158, attack: 171, defense: 210 }, hira: 'かめっくす' },
        {name: 'キャタピー', base: { stamina: 90, attack: 55, defense: 62 }, hira: 'きゃたぴー' },
        {name: 'トランセル', base: { stamina: 100, attack: 45, defense: 94 }, hira: 'とらんせる' },
        {name: 'バタフリー', base: { stamina: 120, attack: 167, defense: 151 }, hira: 'ばたふりー' },
        {name: 'ビードル', base: { stamina: 80, attack: 63, defense: 55 }, hira: 'びーどる' },
        {name: 'コクーン', base: { stamina: 90, attack: 46, defense: 86 }, hira: 'こくーん' },
        {name: 'スピアー', base: { stamina: 130, attack: 169, defense: 150 }, hira: 'すぴあー' },
        {name: 'ポッポ', base: { stamina: 80, attack: 85, defense: 76 }, hira: 'ぽっぽ' },
        {name: 'ピジョン', base: { stamina: 126, attack: 117, defense: 108 }, hira: 'ぴじょん' },
        {name: 'ピジョット', base: { stamina: 166, attack: 166, defense: 157 }, hira: 'ぴじょっと' },
        {name: 'コラッタ', base: { stamina: 60, attack: 103, defense: 70 }, hira: 'こらった' },
        {name: 'ラッタ', base: { stamina: 110, attack: 161, defense: 144 }, hira: 'らった' },
        {name: 'オニスズメ', base: { stamina: 80, attack: 112, defense: 61 }, hira: 'おにすずめ' },
        {name: 'オニドリル', base: { stamina: 130, attack: 182, defense: 135 }, hira: 'おにどりる' },
        {name: 'アーボ', base: { stamina: 70, attack: 110, defense: 102 }, hira: 'あーぼ' },
        {name: 'アーボック', base: { stamina: 120, attack: 167, defense: 158 }, hira: 'あーぼっく' },
        {name: 'ピカチュウ', base: { stamina: 70, attack: 112, defense: 101 }, hira: 'ぴかちゅう' },
        {name: 'ライチュウ', base: { stamina: 120, attack: 193, defense: 165 }, hira: 'らいちゅう' },
        {name: 'サンド', base: { stamina: 100, attack: 126, defense: 145 }, hira: 'さんど' },
        {name: 'サンドパン', base: { stamina: 150, attack: 182, defense: 202 }, hira: 'さんどぱん' },
        {name: 'ニドラン♀', base: { stamina: 110, attack: 86, defense: 94 }, hira: 'にどらん♀' },
        {name: 'ニドリーナ', base: { stamina: 140, attack: 117, defense: 126 }, hira: 'にどりーな' },
        {name: 'ニドクイン', base: { stamina: 180, attack: 180, defense: 174 }, hira: 'にどくいん' },
        {name: 'ニドラン♂', base: { stamina: 92, attack: 105, defense: 76 }, hira: 'にどらん♂' },
        {name: 'ニドリーノ', base: { stamina: 122, attack: 137, defense: 112 }, hira: 'にどりーの' },
        {name: 'ニドキング', base: { stamina: 162, attack: 204, defense: 157 }, hira: 'にどきんぐ' },
        {name: 'ピッピ', base: { stamina: 140, attack: 107, defense: 116 }, hira: 'ぴっぴ' },
        {name: 'ピクシー', base: { stamina: 190, attack: 178, defense: 171 }, hira: 'ぴくしー' },
        {name: 'ロコン', base: { stamina: 76, attack: 96, defense: 122 }, hira: 'ろこん' },
        {name: 'キュウコン', base: { stamina: 146, attack: 169, defense: 204 }, hira: 'きゅうこん' },
        {name: 'プリン', base: { stamina: 230, attack: 80, defense: 44 }, hira: 'ぷりん' },
        {name: 'プクリン', base: { stamina: 280, attack: 156, defense: 93 }, hira: 'ぷくりん' },
        {name: 'ズバット', base: { stamina: 80, attack: 83, defense: 76 }, hira: 'ずばっと' },
        {name: 'ゴルバット', base: { stamina: 150, attack: 161, defense: 153 }, hira: 'ごるばっと' },
        {name: 'ナゾノクサ', base: { stamina: 90, attack: 131, defense: 116 }, hira: 'なぞのくさ' },
        {name: 'クサイハナ', base: { stamina: 120, attack: 153, defense: 139 }, hira: 'くさいはな' },
        {name: 'ラフレシア', base: { stamina: 150, attack: 202, defense: 170 }, hira: 'らふれしあ' },
        {name: 'パラス', base: { stamina: 70, attack: 121, defense: 99 }, hira: 'ぱらす' },
        {name: 'パラセクト', base: { stamina: 120, attack: 165, defense: 146 }, hira: 'ぱらせくと' },
        {name: 'コンパン', base: { stamina: 120, attack: 100, defense: 102 }, hira: 'こんぱん' },
        {name: 'モルフォン', base: { stamina: 140, attack: 179, defense: 150 }, hira: 'もるふぉん' },
        {name: 'ディグダ', base: { stamina: 20, attack: 109, defense: 88 }, hira: 'でぃぐだ' },
        {name: 'ダグトリオ', base: { stamina: 70, attack: 167, defense: 147 }, hira: 'だぐとりお' },
        {name: 'ニャース', base: { stamina: 80, attack: 92, defense: 81 }, hira: 'にゃーす' },
        {name: 'ペルシアン', base: { stamina: 130, attack: 150, defense: 139 }, hira: 'ぺるしあん' },
        {name: 'コダック', base: { stamina: 100, attack: 122, defense: 96 }, hira: 'こだっく' },
        {name: 'ゴルダック', base: { stamina: 160, attack: 191, defense: 163 }, hira: 'ごるだっく' },
        {name: 'マンキー', base: { stamina: 80, attack: 148, defense: 87 }, hira: 'まんきー' },
        {name: 'オコリザル', base: { stamina: 130, attack: 207, defense: 144 }, hira: 'おこりざる' },
        {name: 'ガーディ', base: { stamina: 110, attack: 136, defense: 96 }, hira: 'がーでぃ' },
        {name: 'ウインディ', base: { stamina: 180, attack: 227, defense: 166 }, hira: 'ういんでぃ' },
        {name: 'ニョロモ', base: { stamina: 80, attack: 101, defense: 82 }, hira: 'にょろも' },
        {name: 'ニョロゾ', base: { stamina: 130, attack: 130, defense: 130 }, hira: 'にょろぞ' },
        {name: 'ニョロボン', base: { stamina: 180, attack: 182, defense: 187 }, hira: 'にょとぼん' },
        {name: 'ケーシィ', base: { stamina: 50, attack: 195, defense: 103 }, hira: 'けーしぃ' },
        {name: 'ユンゲラー', base: { stamina: 80, attack: 232, defense: 138 }, hira: 'ゆんげらー' },
        {name: 'フーディン', base: { stamina: 110, attack: 271, defense: 194 }, hira: 'ふーでぃん' },
        {name: 'ワンリキー', base: { stamina: 140, attack: 137, defense: 88 }, hira: 'わんりきー' },
        {name: 'ゴーリキー', base: { stamina: 160, attack: 177, defense: 130 }, hira: 'ごーりきー' },
        {name: 'カイリキー', base: { stamina: 180, attack: 234, defense: 162 }, hira: 'かいりきー' },
        {name: 'マダツボミ', base: { stamina: 100, attack: 139, defense: 64 }, hira: 'まだつぼみ' },
        {name: 'ウツドン', base: { stamina: 130, attack: 172, defense: 95 }, hira: 'うつどん' },
        {name: 'ウツボット', base: { stamina: 160, attack: 207, defense: 138 }, hira: 'うつぼっと' },
        {name: 'メノクラゲ', base: { stamina: 80, attack: 97, defense: 182 }, hira: 'めのくらげ' },
        {name: 'ドククラゲ', base: { stamina: 160, attack: 166, defense: 237 }, hira: 'どくくらげ' },
        {name: 'イシツブテ', base: { stamina: 80, attack: 132, defense: 163 }, hira: 'いしつぶて' },
        {name: 'ゴローン', base: { stamina: 110, attack: 164, defense: 196 }, hira: 'ごろーん' },
        {name: 'ゴローニャ', base: { stamina: 160, attack: 211, defense: 229 }, hira: 'ごろーにゃ' },
        {name: 'ポニータ', base: { stamina: 100, attack: 170, defense: 132 }, hira: 'ぽにーた' },
        {name: 'ギャロップ', base: { stamina: 130, attack: 207, defense: 167 }, hira: 'ぎゃろっぷ' },
        {name: 'ヤドン', base: { stamina: 180, attack: 109, defense: 109 }, hira: 'やどん' },
        {name: 'ヤドラン', base: { stamina: 190, attack: 177, defense: 194 }, hira: 'やどらん' },
        {name: 'コイル', base: { stamina: 50, attack: 165, defense: 128 }, hira: 'こいる' },
        {name: 'レアコイル', base: { stamina: 100, attack: 223, defense: 182 }, hira: 'れあこいる' },
        {name: 'カモネギ', base: { stamina: 104, attack: 124, defense: 118 }, hira: 'かもねぎ' },
        {name: 'ドードー', base: { stamina: 70, attack: 158, defense: 88 }, hira: 'どーどー' },
        {name: 'ドードリオ', base: { stamina: 120, attack: 218, defense: 145 }, hira: 'どーどりお' },
        {name: 'パウワウ', base: { stamina: 130, attack: 85, defense: 128 }, hira: 'ぱうわう' },
        {name: 'ジュゴン', base: { stamina: 180, attack: 139, defense: 184 }, hira: 'じゅごん' },
        {name: 'ベトベター', base: { stamina: 160, attack: 135, defense: 90 }, hira: 'べとべたー' },
        {name: 'ベトベトン', base: { stamina: 210, attack: 190, defense: 184 }, hira: 'べとべとん' },
        {name: 'シェルダー', base: { stamina: 60, attack: 116, defense: 168 }, hira: 'しぇるだー' },
        {name: 'パルシェン', base: { stamina: 100, attack: 186, defense: 323 }, hira: 'ぱるしぇん' },
        {name: 'ゴース', base: { stamina: 60, attack: 186, defense: 70 }, hira: 'ごーす' },
        {name: 'ゴースト', base: { stamina: 90, attack: 223, defense: 112 }, hira: 'ごーすと' },
        {name: 'ゲンガー', base: { stamina: 120, attack: 261, defense: 156 }, hira: 'げんがー' },
        {name: 'イワーク', base: { stamina: 70, attack: 85, defense: 288 }, hira: 'いわーく' },
        {name: 'スリープ', base: { stamina: 120, attack: 89, defense: 158 }, hira: 'すりーぷ' },
        {name: 'スリーパー', base: { stamina: 170, attack: 144, defense: 215 }, hira: 'すりーぱー' },
        {name: 'クラブ', base: { stamina: 60, attack: 181, defense: 156 }, hira: 'くらぶ' },
        {name: 'キングラー', base: { stamina: 110, attack: 240, defense: 214 }, hira: 'きんぐらー' },
        {name: 'ビリリダマ', base: { stamina: 80, attack: 109, defense: 114 }, hira: 'びりりだま' },
        {name: 'マルマイン', base: { stamina: 120, attack: 173, defense: 179 }, hira: 'まるまいん' },
        {name: 'タマタマ', base: { stamina: 120, attack: 107, defense: 140 }, hira: 'たまたま' },
        {name: 'ナッシー', base: { stamina: 190, attack: 233, defense: 158 }, hira: 'なっしー' },
        {name: 'カラカラ', base: { stamina: 100, attack: 90, defense: 165 }, hira: 'からから' },
        {name: 'ガラガラ', base: { stamina: 120, attack: 144, defense: 200 }, hira: 'がらがら' },
        {name: 'サワムラー', base: { stamina: 100, attack: 224, defense: 211 }, hira: 'さわむらー' },
        {name: 'エビワラー', base: { stamina: 100, attack: 193, defense: 212 }, hira: 'えびわらー' },
        {name: 'ベロリンガ', base: { stamina: 180, attack: 108, defense: 137 }, hira: 'べろりんが' },
        {name: 'ドガース', base: { stamina: 80, attack: 119, defense: 164 }, hira: 'どがーす' },
        {name: 'マタドガス', base: { stamina: 130, attack: 174, defense: 221 }, hira: 'またどがす' },
        {name: 'サイホーン', base: { stamina: 160, attack: 140, defense: 157 }, hira: 'さいほーん' },
        {name: 'サイドン', base: { stamina: 210, attack: 222, defense: 206 }, hira: 'さいどん' },
        {name: 'ラッキー', base: { stamina: 500, attack: 60, defense: 176 }, hira: 'らっきー' },
        {name: 'モンジャラ', base: { stamina: 130, attack: 183, defense: 205 }, hira: 'もんじゃら' },
        {name: 'ガルーラ', base: { stamina: 210, attack: 181, defense: 165 }, hira: 'がるーら' },
        {name: 'タッツー', base: { stamina: 60, attack: 129, defense: 125 }, hira: 'たっつー' },
        {name: 'シードラ', base: { stamina: 110, attack: 187, defense: 182 }, hira: 'しーどら' },
        {name: 'トサキント', base: { stamina: 90, attack: 123, defense: 115 }, hira: 'とさきんと' },
        {name: 'アズマオウ', base: { stamina: 160, attack: 175, defense: 154 }, hira: 'あずまおう' },
        {name: 'ヒトデマン', base: { stamina: 60, attack: 137, defense: 112 }, hira: 'ひとでまん' },
        {name: 'スターミー', base: { stamina: 120, attack: 210, defense: 184 }, hira: 'すたーみー' },
        {name: 'バリヤード', base: { stamina: 80, attack: 192, defense: 233 }, hira: 'ばりやーど' },
        {name: 'ストライク', base: { stamina: 140, attack: 218, defense: 170 }, hira: 'すとらいく' },
        {name: 'ルージュラ', base: { stamina: 130, attack: 223, defense: 182 }, hira: 'るーじゅら' },
        {name: 'エレブー', base: { stamina: 130, attack: 198, defense: 173 }, hira: 'えれぶー' },
        {name: 'ブーバー', base: { stamina: 130, attack: 206, defense: 169 }, hira: 'ぶーばー' },
        {name: 'カイロス', base: { stamina: 130, attack: 238, defense: 197 }, hira: 'かいろす' },
        {name: 'ケンタロス', base: { stamina: 150, attack: 198, defense: 197 }, hira: 'けんたろす' },
        {name: 'コイキング', base: { stamina: 40, attack: 29, defense: 102 }, hira: 'こいきんぐ' },
        {name: 'ギャラドス', base: { stamina: 190, attack: 237, defense: 197 }, hira: 'ぎゃらどす' },
        {name: 'ラプラス', base: { stamina: 260, attack: 186, defense: 190 }, hira: 'らぷらす' },
        {name: 'メタモン', base: { stamina: 96, attack: 91, defense: 91 }, hira: 'めたもん' },
        {name: 'イーブイ', base: { stamina: 110, attack: 104, defense: 121 }, hira: 'いーぶい' },
        {name: 'シャワーズ', base: { stamina: 260, attack: 205, defense: 177 }, hira: 'しゃわーず' },
        {name: 'サンダース', base: { stamina: 130, attack: 232, defense: 201 }, hira: 'さんだーす' },
        {name: 'ブースター', base: { stamina: 130, attack: 246, defense: 204 }, hira: 'ぶーすたー' },
        {name: 'ポリゴン', base: { stamina: 130, attack: 153, defense: 139 }, hira: 'ぽりごん' },
        {name: 'オムナイト', base: { stamina: 70, attack: 155, defense: 174 }, hira: 'おむないと' },
        {name: 'オムスター', base: { stamina: 140, attack: 207, defense: 227 }, hira: 'おむすたー' },
        {name: 'カブト', base: { stamina: 60, attack: 148, defense: 162 }, hira: 'かぶと' },
        {name: 'カブトプス', base: { stamina: 120, attack: 220, defense: 203 }, hira: 'かぶとぷす' },
        {name: 'プテラ', base: { stamina: 160, attack: 221, defense: 164 }, hira: 'ぷてら' },
        {name: 'カビゴン', base: { stamina: 320, attack: 190, defense: 190 }, hira: 'かびごん' },
        {name: 'フリーザー', base: { stamina: 180, attack: 192, defense: 249 }, hira: 'ふりーざー' },
        {name: 'サンダー', base: { stamina: 180, attack: 253, defense: 188 }, hira: 'さんだー' },
        {name: 'ファイヤー', base: { stamina: 180, attack: 251, defense: 184 }, hira: 'ふぁいやー' },
        {name: 'ミニリュウ', base: { stamina: 82, attack: 119, defense: 94 }, hira: 'みにりゅう' },
        {name: 'ハクリュー', base: { stamina: 122, attack: 163, defense: 138 }, hira: 'はくりゅー' },
        {name: 'カイリュー', base: { stamina: 182, attack: 263, defense: 201 }, hira: 'かいりゅー' },
        {name: 'ミュウツー', base: { stamina: 212, attack: 330, defense: 200 }, hira: 'みゅうつー' },
        {name: 'ミュウ', base: { stamina: 200, attack: 210, defense: 209 }, hira: 'みゅう' },
        {name: 'ピチュー', base: { stamina: 40, attack: 77, defense: 63 }, hira: 'ぴちゅー' },
        {name: 'ピィ', base: { stamina: 100, attack: 75, defense: 91 }, hira: 'ぴぃ' },
        {name: 'ププリン', base: { stamina: 180, attack: 69, defense: 34 }, hira: 'ぷぷりん' },
        {name: 'トゲピー', base: { stamina: 70, attack: 67, defense: 116 }, hira: 'とげぴー' },
        {name: 'トゲチック', base: { stamina: 110, attack: 140, defense: 191 }, hira: 'とげちっく' },
        {name: 'ムチュール', base: { stamina: 90, attack: 153, defense: 116 }, hira: 'むちゅーる' },
        {name: 'エレキッド', base: { stamina: 90, attack: 135, defense: 110 }, hira: 'えれきっど' },
        {name: 'ブビィ', base: { stamina: 90, attack: 151, defense: 108 }, hira: 'ぶびぃ' }
    ]
    var CPM = [
        0.094, 0.1351374, 0.1663979, 0.1926509, 0.2157325,
        0.2365727, 0.2557201, 0.2735304, 0.2902499, 0.3060574,
        0.3210876, 0.335445, 0.3492127, 0.3624578, 0.3752356,
        0.3875924, 0.3995673, 0.4111936, 0.4225, 0.4335117,
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

    /*var makeNames = function() {
        var names = []
        $.each(pokedex, function(idx, data) {
            names.push(data['name'])
        })
        return names;
    }*/
    $('#name').autocomplete( {
        //source: makeNames(),
        source: function(request, response) {
            var names = [];
            var termed = new RegExp('^(' + request.term + ')');
            $.each(pokedex, function(idx, data) {
                if (data['name'].match(termed) || data['hira'].match(termed)) {
                    names.push(data['name']);
                }
            });
            response(names);
        },
        autoFocus: true,
        delay: 250,
        minLength: 1
    });
    var init = function() {
        var stardust = $('#stardust')
        for (var i = 0; i < requireStardust.length; i++) {
            stardust.append($("<option>").val(i).text(requireStardust[i]));
        }

        var selectName = $('#select-name');
        $.each(pokedex, function(idx, value) {
            var name = value['name'];
            selectName.append($("<option>").val(name).text(name));
        })
    }
    init();

    var getBaseStats = function(name) {
        var base = null
        $.each(pokedex, function(idx, data) {
            if (name == data['name'])
                base = data['base'];
        });
        return base
    }

    var getInput = function() {
        var nw = $('input[name="noteworthy"]:checked').map(function() {
            return +$(this).val();
        });
        return {
            name: $('input[name="name"]').val(),
            cp: +$('input[name="cp"]').val(),
            hp: +$('input[name="hp"]').val(),
            stardustIndex: +$('#stardust').val(),
            no_reinforced: +$('#no-reinforced').prop('checked'),
            cponly: +$('#cponly').prop('checked'),
            team: isNaN($('input[name="team"]:checked').val()) ? 0 : +$('input[name="team"]:checked').val(),
            eval: isNaN($('input[name="eval"]:checked').val()) ? 0 : +$('input[name="eval"]:checked').val(),
            noteworthy: nw,
            status: isNaN($('input[name="status"]:checked').val()) ? 0 : +$('input[name="status"]:checked').val()
        };
    }

    var sum = function(base, iv, type) {
        return base[type] + iv[type];
    }

    var getRangeText = function(ary) {
        if (ary == null) {
            return "";
        }
        var min = Math.min.apply(null, ary);
        var max = Math.max.apply(null, ary);
        if (min == Infinity || isNaN(min)) {
            min = 0;
        }
        if (max == -Infinity || isNaN(max)) {
            max = 0;
        }
        if (min == max) {
            return String(min);
        } else {
            return min + "〜" + max;
        }
    }

    var calcCP = function(base, iv, cpm) {
        /*var cp = sum(base, iv, 'attack') * Math.pow(sum(base, iv, 'defense'), 0.5) *
                    Math.pow(sum(base, iv, 'stamina'), 0.5) * Math.pow(cpm, 2) / 10*/
        var cp = sum(base, iv, 'attack') * Math.sqrt(sum(base, iv, 'defense')) *
                    Math.sqrt(sum(base, iv, 'stamina')) * cpm * cpm / 10.0;
        if (isNaN(cp)) {
            return 0;
        }
        return Math.max(10, Math.floor(cp));
    }

    var calcHP = function(base, iv, cpm) {
        return Math.max(10, Math.floor(sum(base, iv, 'stamina') * cpm));
    }

    var calcIV = function(result, level, input) {
        var base = getBaseStats(input.name);
        var curCP = input.cp;
        var curHP = input.hp;
        var minPercent = 0.0;
        var maxPercent = 100.0;

        switch (input.eval) {
            case 1:
                minPercent = 80.1;
                maxPercent = 100.0;
                break;
            case 2:
                minPercent = 64.5;
                maxPercent = 80.0;
                break;
            case 3:
                minPercent = 49.0;
                maxPercent = 64.4;
                break;
            case 4:
                minPercent = 0.0;
                maxPercent = 48.9;
                break;
        }

        var min = 0;
        var max = 15;
        var minStamina = 0;
        var maxStamina = 15;
        var minAttack = 0;
        var maxAttack = 15;
        var minDefense = 0;
        var maxDefense = 15;

        if ((input.status != 0 && input.noteworthy.length == 0) || (input.status == 0 && input.noteworthy.length != 0) ){
            return;
        }

        switch(input.status) {
            case 1:
                min = 15;
                max = 15;
                break;
            case 2:
                min = 13;
                max = 14;
                break;
            case 3:
                min = 8;
                max = 12;
                break;
            case 4:
                min = 0;
                max = 7;
                break;
        }
        maxStamina = maxAttack = maxDefense = max;

        var nw_flags = 0; //D A S
        $.map(input.noteworthy,
            function(value) {
                switch(value) {
                    case 1:
                        minStamina = min;
                        nw_flags |= 1;
                        break;
                    case 2:
                        minAttack = min;
                        nw_flags |= 2;
                        break;
                    case 3:
                        minDefense = min;
                        nw_flags |= 4;
                        break;
                }
            }
        );

        for(var s = minStamina; s <= maxStamina; s++) {
            var hp = calcHP(base, {stamina: s}, CPM[level]);
            if (!input.cponly && hp != curHP) continue;

            for(var a = minAttack; a <= maxAttack; a++) {
                for(var d = minDefense; d <= maxDefense; d++) {
                    var iv = {stamina: s, attack: a, defense: d};
                    var cp = calcCP(base, iv, CPM[level]);
                    if (cp == curCP) {
                        var percent = Math.round((a + d + s) * 1000 / 45) / 10;
                        if (percent < minPercent || percent > maxPercent) {
                            continue;
                        }

                        //最大値判定
                        if (input.status != 0 && input.noteworthy.length != 0) {
                            var calcMax = Math.max.apply(null, [s,a,d]);
                            var max_flags = 0; //D A S
                            if (s == calcMax) max_flags |= 1;
                            if (a == calcMax) max_flags |= 2;
                            if (d == calcMax) max_flags |= 4;
                            if (nw_flags != max_flags) {
                                continue;
                            }
                        }

                        //未強化判定
                        if (input.no_reinforced) {
                            if(Math.round(level / 2.0 + 1.0) == level / 2.0 + 1.0) {
                                result.push({level: level, attack: a, defense: d, stamina: s});
                            }
                        }
                        else {
                            result.push({level: level, attack: a, defense: d, stamina: s});
                        }
                    }
                }
            }
        }
    }

    var sameIVindexOf = function(ary, value) {
        var ret = -1;
        $.each(ary, function(idx, v) {
            if (v['attack'] == value['attack'] &&
                v['defense'] == value['defense'] &&
                v['stamina'] == value['stamina']) {
                    ret = idx;
                }
        })
        return ret;
    }

    var intersect = function(ary1, ary2) {
        var ret = [];
        $.each(ary1, function(idx, v) {
            if (sameIVindexOf(ary2, v) != -1) {
                ret.push(v);
            }
        })

        return ret;
    }

    var candIVs;

    var refineIV = function(input) {
        var level = input.stardustIndex * 4;
        var res = [];
        var i;

        if(input.cponly) {
            for(i = 0; i < 80; i++) {
                calcIV(res, i, input);
            }
        } else {
            for(i = 0; i < 4; i++) {
                calcIV(res, level + i, input);
            }
        }
        if (candIVs == null) {
            candIVs = res;
        }
        else {
            candIVs = intersect(candIVs, res);
        }

        candIVs.sort(function candIVCompare(a, b) {
            return (b['attack'] + b['defense'] + b['stamina']) - (a['attack'] + a['defense'] + a['stamina']);
        });
    }

    var clearInputHistory = function() {
        $("#input-history").empty();
    }

    var renderInputHistory = function(input) {
        var $inputHistory = $("#input-history");

        var row = $("<tr></tr>");
        row.append("<td>" + input.cp + "</td>");
        row.append("<td>" + input.hp + "</td>");
        row.append("<td>" + requireStardust[input.stardustIndex] + "</td>");
        $inputHistory.append(row);
    }

    var renderCandIV = function() {
        var result = $("#result");
        result.empty();

        for(var i = 0; i < candIVs.length; i++) {
            var row = $("<tr></tr>");
            row.append("<td>" + Math.round((candIVs[i]['attack'] + candIVs[i]['defense'] + candIVs[i]['stamina']) * 1000.0 / 45.0) / 10.0 + "&#37;</td>")
            row.append("<td>" + (candIVs[i]['level'] / 2 + 1) + "</td>")
            row.append("<td>" + candIVs[i]['attack'] + "</td>")
            row.append("<td>" + candIVs[i]['defense'] + "</td>")
            row.append("<td>" + candIVs[i]['stamina'] + "</td>")
            result.append(row);
        }

        if (candIVs.length == 0) {
            $('#attention').text('個体値を計算できませんでした。入力値が間違っていませんか？　ステータス言及とステータス評価はどちらか片方ではいけません。')
        }
        else {
            $('#attention').text('');
        }
    }

    var renderRangeIV = function() {
        var rangeResult = $("#rangeResult");

        rangeResult.empty();

        var result = {};
        var iter = {percent: 'パーセント', level: 'レベル', attack: '攻撃', defense: '防御', stamina: 'スタミナ'};

        $.each(iter, function(key, value) {
            result[key] = $.map(candIVs, function(v) {
                if (key == 'percent') {
                    return Math.round((v['attack'] + v['defense'] + v['stamina']) * 1000 / 45) / 10;
                }
                else if (key == 'level') {
                    return v['level'] / 2 + 1;
                }
                else {
                    return v[key];
                }
            });
            rangeResult.append(makeRow(value, result[key]));
        });

        var mod = function(ary) {
            var str = getRangeText(ary);

            if (str.indexOf('〜') == -1) {
                return str;
            }
            else {
                return "[" + str + "]";
            }
        }

        var textResult = "";
        textResult += $('input[name="name"]').val();
        textResult += "(" + getRangeText(result['percent']) + "%) | "
        textResult += "(Lv" + getRangeText(result['level']) + ") : ATK"
        textResult +=  mod(result['attack']) + " / DEF";
        textResult +=  mod(result['defense']) + " / STA";
        textResult +=  mod(result['stamina']);
        $("#text-result").val(textResult);
    }

    var requireCandy = [ // x2
        1,1,1,1,1,1,1,1,1,1,
        2,2,2,2,2,2,2,2,2,2,
        3,3,3,3,3,4,4,4,4,4,
        6,6,8,8,10,10,12,12,15,15
    ];

    var renderTrialCalculation = function(input) {
        var base = getBaseStats(input.name);
        var reinforce = $("#reinforcement");
        var singletable = null;
        reinforce.empty();

        if (candIVs.length > 5) {
            var text = $("<div><p>候補が多すぎます。試算は行いません。</p></div>");
            reinforce.append(text);
            return;
        }

        for (var i = 0; i < candIVs.length; i++) {
            var ary = [];
            var totalstardust = 0;
            var stardust = 0;
            var totalcandy = 0;
            var candy = 0;
            //for (var j = 0; j < CPM.length; j++, totalstardust += stardust, totalcandy += candy) {
            for (var j = candIVs[i]['level']; j < CPM.length; j++, totalstardust += stardust, totalcandy += candy) {
                stardust = requireStardust[Math.floor(j / 4)];
                candy = requireCandy[Math.floor(j / 2)];
                var cp = Math.max(10, Math.floor(sum(base, candIVs[i], 'attack') * Math.sqrt(sum(base, candIVs[i], 'defense')) * Math.sqrt(sum(base, candIVs[i], 'stamina')) * CPM[j] * CPM[j] / 10.0));
                var cpMax = Math.max(10, Math.floor((base['attack'] + 15) * Math.sqrt(base['defense'] + 15) * Math.sqrt(base['stamina'] + 15) * CPM[j] * CPM[j] / 10.0));
                ary.push({level: j / 2.0 + 1.0, cp: cp, cpmax: cpMax, totalstardust: totalstardust, totalcandy: totalcandy});
            }

            singletable = $("<div></div>");
            var title = $('<p class="lead"></p>');
            title.append(input.name + "(" + Math.round((candIVs[i]['attack'] + candIVs[i]['defense'] + candIVs[i]['stamina']) * 1000.0 / 45.0) / 10.0 + "&#37;) | (Lv" + (candIVs[i]['level'] / 2.0 + 1.0) + ") : ATK" + candIVs[i]['attack'] + " / DEF"+ candIVs[i]['defense'] + " / STA" + candIVs[i]['stamina']);
            var table = $('<table class="table table-bordered table-striped"></table>');
            var thead = $("<thead><tr><th>ポケモンのレベル</th><th>このポケモンのCP</th><th>個体値100%のCP</th><th>ほしのすな累計</th><th>アメ累計</th></tr></thead>");

            table.prepend(thead);
            var tbody = $("<tbody></tbody>");
            var row = $.map(ary, function(value) {
                var row = $("<tr></tr>");
                row.append("<td>" + value['level'] + "</td>")
                row.append("<td>" + value['cp'] + "</td>")
                row.append("<td>" + value['cpmax'] + "</td>")
                row.append("<td>" + value['totalstardust'] + "</td>")
                row.append("<td>" + value['totalcandy'] + "</td>")
                return row;
            });
            tbody.append(row);
            table.append(tbody);
            singletable.append(title);
            singletable.append(table);
            reinforce.append(singletable);
        }
    }

    $('#calcCP').on('click', function() {
        candIVs = null;
        var input = getInput();
        clearInputHistory();

        refineIV(input);

        renderInputHistory(input);
        renderRangeIV();
        renderCandIV();

        renderTrialCalculation(input);
    })

    /*$('#refine').on('click', function() {
        var input = getInput();

        refineIV(input);

        renderInputHistory(input);
        renderRangeIV();
        renderCandIV();
    })*/

    $('#select-name').change(function() {
        $('input[name="name"]').val($(this).val());
    })

    //ラジオボタン二度押しで初期化する仕組み
    //上位label.btnのclickイベントで行う
    $('input[type=radio]').parent('.btn').click(function() {
        var face = $(this);
        var radiobutton = $('input:radio', face);
        var flag = (radiobutton.is(':checked')) ? true : false;
        if (flag) {
            setTimeout(function () {
                face.removeClass('active');
                radiobutton.attr('checked', false);
            }, 0);
        }
    })

    $('input[name=team]').change(function() {
        var id = $(this).attr('id');

        switch(id){
            case 'btn-team-blue':
                $('#label-eval-best').html($('#btn-eval-best').prop('outerHTML') + '驚異的');
                $('#label-eval-good').html($('#btn-eval-good').prop('outerHTML') + '目を引く');
                $('#label-eval-average').html($('#btn-eval-average').prop('outerHTML') + '普通以上');
                $('#label-eval-bad').html($('#btn-eval-bad').prop('outerHTML') + '難しい');
                $('#label-status-best').html($('#btn-status-best').prop('outerHTML') + '測定できない');
                $('#label-status-good').html($('#btn-status-good').prop('outerHTML') + '素晴らしい');
                $('#label-status-average').html($('#btn-status-average').prop('outerHTML') + 'かなりの強さ');
                $('#label-status-bad').html($('#btn-status-bad').prop('outerHTML') + 'まあまあ');
                break;
            case 'btn-team-red':
                $('#label-eval-best').html($('#btn-eval-best').prop('outerHTML') + '言うことなし');
                $('#label-eval-good').html($('#btn-eval-good').prop('outerHTML') + 'とても強い');
                $('#label-eval-average').html($('#btn-eval-average').prop('outerHTML') + '普通に強い');
                $('#label-eval-bad').html($('#btn-eval-bad').prop('outerHTML') + 'バトル向きではない');
                $('#label-status-best').html($('#btn-status-best').prop('outerHTML') + '最高');
                $('#label-status-good').html($('#btn-status-good').prop('outerHTML') + '素晴らしい');
                $('#label-status-average').html($('#btn-status-average').prop('outerHTML') + 'かなりの強さ');
                $('#label-status-bad').html($('#btn-status-bad').prop('outerHTML') + 'まぁまぁ');
                break;
            case 'btn-team-yellow':
                $('#label-eval-best').html($('#btn-eval-best').prop('outerHTML') + 'トップレベル');
                $('#label-eval-good').html($('#btn-eval-good').prop('outerHTML') + 'とっても強い');
                $('#label-eval-average').html($('#btn-eval-average').prop('outerHTML') + '普通');
                $('#label-eval-bad').html($('#btn-eval-bad').prop('outerHTML') + 'まずまず');
                $('#label-status-best').html($('#btn-status-best').prop('outerHTML') + '最高の部類');
                $('#label-status-good').html($('#btn-status-good').prop('outerHTML') + '素晴らしい');
                $('#label-status-average').html($('#btn-status-average').prop('outerHTML') + 'かなりの強さ');
                $('#label-status-bad').html($('#btn-status-bad').prop('outerHTML') + 'まぁまぁ');
                break;
        }
    })

    $('#cponly').change(function() {
        if($(this).is(':checked')) {
            $('input[name=hp]').attr('disabled', 'disabled');
            $('#stardust').attr('disabled', 'disabled');
        } else {
            $('input[name=hp]').removeAttr('disabled').focus();
            $('#stardust').removeAttr('disabled').focus();
        }
    })

    var makeRow = function(label, cand) {
        var row = $("<tr></tr>");
        row.append("<td>" + label + "</td>");

        var min = Math.min.apply(null, cand);
        var max = Math.max.apply(null, cand);
        if (min == max) {
            row.append($("<td>" + getRangeText(cand) + "</td>"));
        } else {
            row.append($("<td>" + getRangeText(cand) + "</td>"));
        }
        return row;
    }
    var clipboard = new Clipboard('#copy-result');

    clipboard.on('success', function(e) {
        e.clearSelection();
    });
})

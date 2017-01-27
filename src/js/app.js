/*global requireStardust, requireCandy, pokedex, CPM */

$(document).ready(function(){
    $('#name').autocomplete( {
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

    var checkInput = function() {
        if (getBaseStats($('input[name="name"]').val()) == null ||
            !$.isNumeric($('input[name="cp"]').val()) ||
            !$.isNumeric($('input[name="hp"]').val())) {
            return false;
        }
        return true;
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

    /*var clearInputHistory = function() {
        $("#input-history").empty();
    }

    var renderInputHistory = function(input) {
        var $inputHistory = $("#input-history");

        var row = $("<tr></tr>");
        row.append("<td>" + input.cp + "</td>");
        row.append("<td>" + input.hp + "</td>");
        row.append("<td>" + requireStardust[input.stardustIndex] + "</td>");
        $inputHistory.append(row);
    }*/

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
        if (!checkInput()) {
            $('#attention').text('入力値に間違いはありませんか？空白文字などはエラーになります。')
            return;
        }
        var input = getInput();
        //clearInputHistory();

        refineIV(input);

        //renderInputHistory(input);
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

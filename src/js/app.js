$(document).ready(function(){
    var getBaseStats = function(name) {
        var base = null
        $.each(pokedex, function(idx, data) {
            if (name == data['name'])
                base = data['base'];
        });
        return base;
    }

    var checkInput = function() {
        if (getBaseStats($('input[name="name"]').val()) == null ||
            !$.isNumeric($('input[name="cp"]').val()) ||
            !$.isNumeric($('input[name="hp"]').val())) {
            return false;
        }
        $('input[name="cp"]').val(
            $('input[name="cp"]').val().replace(/[０-９]/g,function(s){
                return String.fromCharCode(s.charCodeAt(0)-0xFEE0)
            })
        );
        $('input[name="hp"]').val(
            $('input[name="hp"]').val().replace(/[０-９]/g,function(s){
                return String.fromCharCode(s.charCodeAt(0)-0xFEE0)
            })
        );
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

    var isWild = function(base) {
        if (base['attack'] < 10 || base['defense'] < 10 || base['stamina'] < 10) {
            return true;
        }
        return false;
    }

    var sum = function(base, iv, type) {
        return base[type] + iv[type];
    }

    var getRangeText = function(ary, fixed) {
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
            return min.toFixed(fixed);
        } else {
            return min.toFixed(fixed) + "〜" + max.toFixed(fixed);
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
                        var percent = Math.round((a + d + s) * 1000.0 / 45.0) / 10.0;
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

    var restoreInput = function(input) {
        $('input[name="name"]').val(input.name);
        $('#select-name').val(input.name);
        $('input[name="cp"]').val(input.cp);
        $('input[name="hp"]').val(input.hp);
        $('#stardust').val(input.stardustIndex);
        $('#no-reinforced').prop('checked', input.no_reinforced);
        $('#cponly').prop('checked', input.cponly);

        $('input[name="team"]').parent('.btn').removeClass('active');
        $('input[name="team"]').prop('checked', false);
        if (input.team >= 1 && input.team <= 3) {
            $('input[name="team"][value="'+input.team+'"]').parent('.btn').addClass('active');
            $('input[name="team"][value="'+input.team+'"]').prop('checked', true);
        }
        $('input[name="eval"]').parent('.btn').removeClass('active');
        $('input[name="eval"]').prop('checked', false);
        if (input.eval >= 1 && input.eval <= 4) {
            $('input[name="eval"][value="'+input.eval+'"]').parent('.btn').addClass('active');
            $('input[name="eval"][value="'+input.eval+'"]').prop('checked', true);
        }
        $('input[name="noteworthy"]').parent('.btn').removeClass('active');
        $('input[name="noteworthy"]').prop('checked', false);
        $.map(input.noteworthy, function(value) {
            $('input[name="noteworthy"][value="'+value+'"]').parent('.btn').addClass('active');
            $('input[name="noteworthy"][value="'+value+'"]').prop('checked', true);
        });
        $('input[name="status"]').parent('.btn').removeClass('active');
        $('input[name="status"]').prop('checked', false);
        if (input.status >= 1 && input.status <= 3) {
            $('input[name="status"][value="'+input.status+'"]').parent('.btn').addClass('active');
            $('input[name="status"][value="'+input.status+'"]').prop('checked', true);
        }
    }

    var restoreDisplay = function(value) {
        candIVs = null;
        initCalc();
        var input = JSON.parse(localStorage.getItem(value));
        restoreInput(input);
        refineIV(input);
        var uniqueIV = searcUniqueIV(input);

        renderRangeIV();
        renderCandIV(uniqueIV);
        renderStackedBar();
        renderTrialCalculation(input, uniqueIV);

        $('#attention').attr({class: 'alert alert-info'});
        $('#attention').text('履歴から計算結果を復元しました。')
        $('html,body').animate({
            scrollTop: $('#attention').offset().top - $('#navbar').height()
        },{
            queue: false
        })
    }

    var addHistory = function(input, candIVs) {
        if (!localStorage) {
            return;
        }
        var key = -1;
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.getItem(i) == null) {
                key = i;
            }
        }
        if (key == -1) {
            key = localStorage.length;
        }
        var appendeddata = {page: 'calcIV', percent: '', date: 0};
        var percent = $.map(candIVs, function(v) {
            return Math.round((v['attack'] + v['defense'] + v['stamina']) * 1000.0 / 45.0) / 10.0;
        })
        appendeddata['percent'] = getRangeText(percent, 1);
        appendeddata['date'] = Date.now();
        var ext = $('this').extend(input, appendeddata);
        localStorage.setItem(key.toString(), JSON.stringify(ext));
    }

    var searcUniqueIV = function(input) {
        if (candIVs == null) {
            return;
        }
        if (candIVs.length <= 1 || candIVs.length > 30) {
            return;
        }

        var base = getBaseStats(input.name);
        var uniqueIVLevel = [];
        var prev = 0;
        var i;
        for (i = 0; i < candIVs.length; i++) {
            uniqueIVLevel[i] = 0;
        }

        for (i = candIVs[0]['level']; i < CPM.length; i++) {
            var cpary = [];
            var counter = [];
            var count = 0;
            var j;
            for (j = 0; j < candIVs.length; j++) {
                if (uniqueIVLevel[j] > 0) {
                    cpary[j] = 0;
                    continue;
                }
                var cp = Math.max(10, Math.floor(sum(base, candIVs[j], 'attack') * Math.sqrt(sum(base, candIVs[j], 'defense')) * Math.sqrt(sum(base, candIVs[j], 'stamina')) * CPM[i] * CPM[i] / 10.0));
                cpary[j] = cp;
                var hp = Math.max(10, Math.floor(sum(base, candIVs[j], 'stamina') * CPM[i]));
                if (counter.length > 0) {
                    var flag = false;
                    for (var k = 0; k < counter.length; k++) {
                        if (counter[k]['cp'] == cp && counter[k]['hp'] == hp) {
                            counter[k]['count']++;
                            count++;
                            flag = true;
                        }
                    }
                    if (!flag) {
                        counter.push({key: j, cp: cp, hp: hp, count: 1});
                        count++;
                    }
                } else {
                    counter.push({key: j, cp: cp, hp: hp, count: 1});
                    count++;
                }
            }

            if (Math.max.apply(null, cpary) == 0) {
                break;
            }

            if (count == 1 && counter.length == 1) {
                uniqueIVLevel[counter[0]['key']] = prev;
            } else {
                for (j = 0; j < counter.length; j++) {
                    if (counter[j]['count'] == 1 && counter[j]['cp'] >= 10) {
                        uniqueIVLevel[counter[j]['key']] = i / 2.0 + 1.0;
                        prev = i / 2.0 + 1.0;
                    }
                }
            }
        }
        return uniqueIVLevel;
    }

    var initCalc = function () {
        $('#attention').removeAttr('class');
        $('#attention').empty();
        $('#reinforcement').empty();
    }

    //renderer

    var renderCandIV = function(uniqueIV) {
        var result = $("#result");
        result.empty();

        for(var i = 0; i < candIVs.length; i++) {
            var row = $("<tr></tr>");
            if (isWild(candIVs[i])) {
                row = $('<tr style="background-color: lightgreen;"></tr>');
            }
            row.append("<td>" + ((candIVs[i]['attack'] + candIVs[i]['defense'] + candIVs[i]['stamina']) * 100.0 / 45.0).toFixed(1) + "&#37;</td>")
            row.append("<td>" + (candIVs[i]['level'] / 2 + 1).toFixed(1) + "</td>")
            row.append("<td>" + candIVs[i]['attack'] + "</td>")
            row.append("<td>" + candIVs[i]['defense'] + "</td>")
            row.append("<td>" + candIVs[i]['stamina'] + "</td>")
            if (uniqueIV != null && uniqueIV.length > 1) {
                row.append('<td>' + uniqueIV[i].toFixed(1) + '</td>')
            } else {
                row.append('<td></td>')
            }
            row.append("<td><a href='evo_sim.html?atk=" + candIVs[i]['attack'] + "&def=" + candIVs[i]['defense'] + "&sta=" + candIVs[i]['stamina'] + "&level=" + (candIVs[i]['level'] / 2 + 1) + "&name=" + encodeURIComponent($('input[name="name"]').val()) + "'>&gt;&gt;進化シム</a></td>")
            result.append(row);
        }

        if (candIVs.length == 0) {
            $('#attention').attr({class: 'alert alert-warning'});
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
        var iter = {percent: '％', level: 'レベル', attack: '攻撃', defense: '防御', stamina: 'HP'};

        $.each(iter, function(key, value) {
            result[key] = $.map(candIVs, function(v) {
                if (key == 'percent') {
                    return Math.round((v['attack'] + v['defense'] + v['stamina']) * 1000.0 / 45.0) / 10.0;
                }
                else if (key == 'level') {
                    return v['level'] / 2 + 1;
                }
                else {
                    return v[key];
                }
            });
            rangeResult.append(makeRow(key, value, result[key]));
        });

        var toplist = $('#go_toplist');
        toplist.empty();

        if (candIVs.length == 1) {
            toplist.append('<p class="small"><a href="./cp_toplist.html?name='+ encodeURIComponent($('input[name="name"]').val()) + '&level=' + result['level'][0] +'&atk=' + result['attack'][0] + '&def=' + result['defense'][0] + '&sta=' + result['stamina'][0] + '">&gt;&gt;' + $('input[name="name"]').val() + '（レベル' + result['level'][0].toFixed(1) +'）のCPランキングへ</a></p>');
        } else {
            var ary = result['level'].filter(function (i, j, self) {
                return self.indexOf(i) === j;
            });
            $.map(ary, function(value) {
                toplist.append('<p class="small"><a href="./cp_toplist.html?name='+ encodeURIComponent($('input[name="name"]').val()) + '&level=' + value +'">&gt;&gt;' + $('input[name="name"]').val() + '（レベル' + value.toFixed(1) +'）のCPランキングへ</a></p>');
            });
        }
    }

    var renderTrialCalculation = function(input, uniqueIV) {
        var base = getBaseStats(input.name);
        var reinforce = $("#reinforcement");
        var singlesheet = null;
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
            var j = 0;
            var consumedstardust = 0;
            var consumedcandy = 0;
            for (j = 0; j < candIVs[i]['level']; j++, consumedstardust += stardust, consumedcandy += candy) {
                stardust = requireStardust[Math.floor(j / 4)];
                candy = requireCandy[Math.floor(j / 2)];
            }
            for (j = candIVs[i]['level']; j < CPM.length; j++, totalstardust += stardust, totalcandy += candy) {
                stardust = requireStardust[Math.floor(j / 4)];
                candy = requireCandy[Math.floor(j / 2)];
                var cp = Math.max(10, Math.floor(sum(base, candIVs[i], 'attack') * Math.sqrt(sum(base, candIVs[i], 'defense')) * Math.sqrt(sum(base, candIVs[i], 'stamina')) * CPM[j] * CPM[j] / 10.0));
                var hp = Math.max(10, Math.floor(sum(base, candIVs[i], 'stamina') * CPM[j]));
                var unique = false;
                if (uniqueIV != null && uniqueIV.length > 1 && uniqueIV[i] == j / 2.0 + 1.0) {
                    unique = true;
                }
                ary.push({tlevel: Math.floor((j - 1.0) / 2.0), plevel: j / 2.0 + 1.0, cp: cp, hp: hp, totalstardust: totalstardust, totalcandy: totalcandy, unique: unique});
            }

            singlesheet = $('<div class="reinforcesheet"></div>');
            var singletable = $('<div class="reinforcetable"></div>');
            var grid = $('<div class="row"></div>');
            var title = $('<p class="col-xs-11 lead"></p>');
            var toggle = $('<button class="slidebutton col-xs-1 btn btn-sm">閉じる</button>');
            title.append(input.name + "(" + ((candIVs[i]['attack'] + candIVs[i]['defense'] + candIVs[i]['stamina']) * 100.0 / 45.0).toFixed(1) + "&#37;) | (Lv" + (candIVs[i]['level'] / 2.0 + 1.0) + ") : 攻撃" + candIVs[i]['attack'] + " / 防御"+ candIVs[i]['defense'] + " / HP" + candIVs[i]['stamina'] + " (hex:" + candIVs[i]['attack'].toString(16).toUpperCase() + candIVs[i]['defense'].toString(16).toUpperCase() + candIVs[i]['stamina'].toString(16).toUpperCase() + ") | 最大CP : " + ary[ary.length-1]['cp']);
            var table = $('<table class="table table-bordered table-striped"></table>');
            var thead = $('<thead><tr><th><div class="text-center">トレーナーレベル</div></th><th><div class="text-center">ポケモンレベル</div></th><th><div class="text-center">ポケモンのCP</div></th><th><div class="text-center">ポケモンのHP</div></th><th><div class="text-center">ほしのすな累計</div></th><th><div class="text-center">アメ累計</div></th></tr></thead>');

            table.prepend(thead);
            var tbody = $("<tbody></tbody>");
            var row = $.map(ary, function(value) {
                var row = $("<tr></tr>");
                if (value['unique']) {
                    row = $('<tr style="background-color: lightcoral;"></tr>');
                }
                if (value['tlevel'] > 38) {
                    row.append('<td><div class="text-right">' + 38 + '</div></td>');
                } else {
                    row.append('<td><div class="text-right">' + value['tlevel'] + '</div></td>');
                }
                row.append('<td><div class="text-right">' + value['plevel'].toFixed(1) + '</div></td>');
                row.append('<td><div class="text-right">' + value['cp'] + '</div></td>');
                row.append('<td><div class="text-right">' + value['hp'] + '</div></td>');
                row.append('<td><div class="text-right">' + value['totalstardust'] + '</div></td>');
                row.append('<td><div class="text-right">' + value['totalcandy'] + '</div></td>');
                return row;
            });
            tbody.append(row);
            table.append(tbody);
            grid.append(title);
            grid.append(toggle);
            singlesheet.append(grid);
            singletable.append('<p class="text-right small">ポケモンレベル1から'+(candIVs[i]['level'] / 2.0 + 1.0)+'までに必要だった ほしのすな：'+consumedstardust+' / アメ：'+consumedcandy+'</p>');
            singletable.append(table);
            if (uniqueIV != null && uniqueIV.length > 1) {
                if (uniqueIV[i] == 0) {
                    singletable.append('<p class="text-right small">CPが他の候補と重複するため強化しても個体値が一意に定まらない可能性があります。</p>');
                } else {
                    singletable.append('<p class="text-right small">色付きの行は他候補とは異なるCPを示しています。<br/>つまりここまで強化してそのCPならば一意に定まり正確な個体値がわかります。</p>');
                }
            }
            singlesheet.append(singletable);
            singlesheet.append('<hr/>');
            reinforce.append(singlesheet);
        }
    }

    var renderStackedBar = function () {
        var stackedbar = $("#stackedbar");
        stackedbar.empty();
        if (candIVs == null || candIVs.length == 0) {
            return;
        }
        var minatk = Math.min.apply(null, candIVs.map(function (v) {return v.attack;})) * 100.0 / 45.0;
        var mindef = Math.min.apply(null, candIVs.map(function (v) {return v.defense;})) * 100.0 / 45.0;
        var minsta = Math.min.apply(null, candIVs.map(function (v) {return v.stamina;})) * 100.0 / 45.0;
        if (minatk + mindef + minsta == Infinity) {
            return;
        }
        var indeterminate = (Math.max.apply(null, candIVs.map(function (v) {return v.attack + v.defense + v.stamina;})) * 100.0 / 45.0) - (minatk + mindef + minsta);
        if (indeterminate < 2.22222) { // 1.0 * 100.0 / 45.0
            stackedbar.append('<h3>個体値イメージ</h3><div class="progress" style="background-color:dimgray !important;"><div class="progress-bar progress-bar-primary" style="width:'+minatk+'%">攻撃</div><div class="progress-bar progress-bar-danger" style="width:'+mindef+'%">防御</div><div class="progress-bar progress-bar-warning" style="width:'+minsta+'%">HP</div></div>');
        } else {
            stackedbar.append('<h3>個体値イメージ</h3><div class="progress" style="background-color:dimgray !important;"><div class="progress-bar progress-bar-primary" style="width:'+minatk+'%">攻撃</div><div class="progress-bar progress-bar-danger" style="width:'+mindef+'%">防御</div><div class="progress-bar progress-bar-warning" style="width:'+minsta+'%">HP</div><div class="progress-bar progress-bar-success progress-bar-striped active" style="width:'+indeterminate+'%">不定</div></div>');
        }

        minatk = Math.min.apply(null, candIVs.map(function (v) {return v.attack;}));
        mindef = Math.min.apply(null, candIVs.map(function (v) {return v.defense;}));
        minsta = Math.min.apply(null, candIVs.map(function (v) {return v.stamina;}));
        indeterminate = Math.max.apply(null, candIVs.map(function (v) {return v.attack + v.defense + v.stamina;})) - (minatk + mindef + minsta);

        var ctx = $("#chart-canvas");
        ctx.empty();
        if (window.dough_chart) {
            window.dough_chart.destroy();
        }
        window.dough_chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [
                        minatk,
                        mindef,
                        minsta,
                        indeterminate,
                        45 - (minatk + mindef + minsta + indeterminate)
                    ],
                    backgroundColor: [
                        'rgb(51, 122, 183)',
                        'rgb(217, 83, 79)',
                        'rgb(240, 173, 78)',
                        'rgb(92, 184, 92)',
                        'rgb(105, 105, 105)'
                    ]
                }],
                labels: [
                    "攻撃",
                    "防御",
                    "HP",
                    "不定",
                    ""
                ]
            },
            options: {
                tooltips: {
                    enabled: false
                },
                responsive: true,
                title: {
                    display: true,
                    text: '個体値イメージ'
                }
            }
        });
        window.dough_chart.update();
    }

    var renderHistory = function() {
        if (!localStorage) {
            return;
        }
        var history = $("#history");
        history.empty();

        if(localStorage.length == 0) {
            return;
        }

        var ary = [];
        var i;

        //ソートのために一度全て取得
        for (i = 0; i < localStorage.length; i++) {
            var appendeddata = {key: 0};
            appendeddata['key'] = localStorage.key(i);
            var storeddata = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if (storeddata['page'] != "calcIV") {
                continue;
            }
            ary.push($('this').extend(appendeddata, storeddata));
        }

        if(ary.length == 0) {
            return;
        }

        ary.sort(function localStorageCompare(a, b) {
            return (b['date']) - (a['date']);
        });

        var table = $('<table class="table table-bordered table-striped"></table>');
        var thead = $("<thead><tr><th>ポケモン名</th><th>CP</th><th>パーセント</th><th></th><th></th></tr></thead>");
        var tbody = $("<tbody></tbody>");

        for (i = 0; i < ary.length; i++) {
            var row = $("<tr></tr>");
            row.append("<td>" + ary[i]['name'] + "</td>");
            row.append("<td>" + ary[i]['cp'] + "</td>");
            row.append("<td>" + ary[i]['percent'] + "&#37;</td>");
            row.append('<td><button class="btn btn-primary btn-xs history-restore" value="' + ary[i]['key'] + '">復元</button></td>');
            row.append('<td><button class="btn btn-danger btn-xs history-remove" value="' + ary[i]['key'] + '">削除</button></td>');
            tbody.append(row);
        }

        table.append(thead);
        table.append(tbody);
        history.append(table);
    }

    //events

    $('#reinforcement').on('click', '.slidebutton', function() {
        var table = $(this).parent().parent().find('.reinforcetable');
        if (table.is(':visible')){
            table.hide();
            $(this).text('開く');
        } else {
            table.show();
            $(this).text('閉じる');
        }
    })

    $('#calcCP').on('click', function() {
        candIVs = null;
        initCalc();
        if (!checkInput()) {
            $('#attention').attr({class: 'alert alert-warning'});
            $('#attention').text('入力値に間違いはありませんか？空白文字などはエラーになります。')
            return;
        }
        var input = getInput();

        refineIV(input);
        var diffLevel = searcUniqueIV(input);

        renderRangeIV();
        renderCandIV(diffLevel);
        renderStackedBar();
        renderTrialCalculation(input, diffLevel);

        if (candIVs.length > 0) {
            addHistory(input, candIVs);
            renderHistory();
        }

        $('#attention').attr({class: 'alert alert-info'});
        $('#attention').text('計算が終了しました。結果を表示します。')
        $('html,body').animate({
            scrollTop: $('#attention').offset().top - $('#navbar').height()
        },{
            queue: false
        })
    })

    $('#select-name').change(function() {
        $('input[name="name"]').val($(this).val());
    })

    $('input[name="name"]').change(function() {
        $('#select-name').val($(this).val());
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

    $('#clearHistory').on('click', function() {
        if (!localStorage) {
            return;
        }
        localStorage.clear();
        renderHistory();
    })

    $('#history').on('click', 'button.history-restore', function() {
        if (!localStorage) {
            return;
        }
        restoreDisplay(parseInt($(this).attr('value')));
    })

    $('#history').on('click', 'button.history-remove', function() {
        if (!localStorage) {
            return;
        }
        localStorage.removeItem($(this).attr('value'));
        renderHistory();
    })

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
        //jsonを読み込みpokedexをオーバーライド
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'js/poke.json', true);
        xhr.send(null);
        xhr.onload = function() {
            console.log(xhr.statusText);
            if (xhr.readyState === 4 && xhr.status === 200){
                pokedex = JSON.parse(xhr.responseText);
                var selectName = $('#select-name');
                selectName.empty();
                $.each(pokedex, function(idx, value) {
                    var name = value['name'];
                    selectName.append($("<option>").val(name).text(name));
                })
            }
        }
        xhr.onerror = function (e) {
            console.error(xhr.statusText);
        }

        var stardust = $('#stardust');
        for (var i = 0; i < requireStardust.length; i++) {
            stardust.append($("<option>").val(i).text(requireStardust[i]));
        }

        $('#stardust option').filter(function(index){
            return $(this).text() === '2500';
        }).prop('selected', true);

        var selectName = $('#select-name');
        $.each(pokedex, function(idx, value) {
            var name = value['name'];
            selectName.append($("<option>").val(name).text(name));
        })

        renderHistory();
    }

    init();

    var makeRow = function(key, label, cand) {
        var row = $("<tr></tr>");
        row.append("<td>" + label + "</td>");

        var min = Math.min.apply(null, cand);
        var max = Math.max.apply(null, cand);
        var fixed = 0;
        if (key == 'percent' || key == 'level') {
            fixed = 1;
        }
        if (min == max) {
            row.append($("<td>" + getRangeText(cand, fixed) + "</td>"));
        } else {
            row.append($("<td>" + getRangeText(cand, fixed) + "</td>"));
        }
        return row;
    }
})

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

    var getQueries = function() {
        if (location.search.length == 0 || location.search.length > 256) {
            return null;
        }
        var queryhash = {};
        var queries = location.search.replace("?", "").split("&");
        $.each(queries, function(idx, value) {
            var ary = value.split("=");
            queryhash[ary[0]] = ary[1];
        })
        return queryhash;
    }

    var qAtk = -1;
    var qDef = -1;
    var qSta = -1;

    var applyQueries = function() {
        var queries = getQueries();
        if (queries) {
            if (queries["name"]) {
                var t = decodeURIComponent(queries["name"]);
                var found = false;
                $.each(pokedex, function(idx, value) {
                    if (value['name'] == t) {
                        found = true;
                    }
                })
                if (found) {
                    $('input[name="name"]').val(t);
                    $('#select-name').val(t);
                }
            }
            if (queries["level"] && queries["level"] >= 1 && queries["level"] < 41 && Math.round(queries["level"] * 2) == queries["level"] * 2) {
                $('#select-level').val((queries["level"] - 1) * 2);
            }
            if (queries["atk"] && queries["atk"] >= 0 && queries["atk"] <= 15) {
                qAtk = +queries["atk"];
            }
            if (queries["def"] && queries["def"] >= 0 && queries["def"] <= 15) {
                qDef = +queries["def"];
            }
            if (queries["sta"] && queries["sta"] >= 0 && queries["sta"] <= 15) {
                qSta = +queries["sta"];
            }
        }
    }

    var buildQueriesForEvoName = function(name) {
        var result = "name=" + name + "&level=" + (+$('#select-level').val() / 2.0 + 1.0);
        if (qAtk >= 0) {
            result += "&atk=" + qAtk;
        }
        if (qDef >= 0) {
            result += "&def=" + qDef;
        }
        if (qSta >= 0) {
            result += "&sta=" + qSta;
        }
        return result;
    }

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

                //クエリがある場合は再計算
                if(getQueries()) {
                    applyQueries();
                    $('#calcIt').click();
                }
            }
        }
        xhr.onerror = function (e) {
            console.error(xhr.statusText);
        }

        var i = 0;

        var level = $('#select-level');
        for (i = 0; i < 79; i++) {
            level.append($("<option>").val(i).text((i / 2.0 + 1.0).toFixed(1).toString()));
        }
        $('#select-level').val((20 - 1) * 2);

        var selectName = $('#select-name');
        $.each(pokedex, function(idx, value) {
            var name = value['name'];
            selectName.append($("<option>").val(name).text(name));
        })
    }

    var checkInput = function() {
        if (getBaseStats($('input[name="name"]').val()) == null) {
            return false;
        }
        return true;
    }

    var getInput = function() {
        return {
            name: $('input[name="name"]').val(),
            level_base: +$('#select-level').val(),
            level: +$('#select-level').val() / 2.0 + 1.0,
            inc_wild: +$('#inc-wild').prop('checked')
        };
    }

    var renderList = function(result, input) {
        var resultlist = $("#resultlist");
        resultlist.empty();

        var evo = $('<div id="evocase"></div>');
        var evolvednameary = getEvolutionData(input.name, 0);
        if (evolvednameary) {
            $.each(evolvednameary, function() {
                evo.append('<p class="text-right small">進化ポケモンがいます：<a href="cp_toplist.html?'+ buildQueriesForEvoName(this['name']) +'">'+ this['name'] +'のランキングを表示</a></p>');
            });
        }

        var title = $('<p class="lead"></p>');
        title.append(input.name + "(レベル" + input.level.toFixed(1) + ")");

        var table = $('<table class="table table-bordered table-striped"></table>');
        var thead = $('<thead><tr><th><div class="text-center">順位</div></th><th><div class="text-center">CP</div></th><th><div class="text-center">CPMax</div></th><th><div class="text-center">％</div></th><th><div class="text-center">HP</div></th><th><div class="text-center">攻撃</div></th><th><div class="text-center">防御</div></th><th><div class="text-center">体力</div></th></tr></thead>');
        table.prepend(thead);
        var rank = 0;
        var prevcpmax = 0;
        var equivalent = 1;
        var tbody = $("<tbody></tbody>");
        var row = $.map(result, function(value) {
            var row = $("<tr></tr>");
            if (qSta == value['stamina'] && qAtk == value['attack'] && qDef == value['defense']) {
                row = $('<tr style="background-color: lightcoral;"></tr>');
            }
            if (prevcpmax == value['cpmax']) {
                equivalent++;
            } else {
                rank += equivalent;
                equivalent = 1;
            }
            prevcpmax = value['cpmax'];
            row.append('<td><div class="text-right">' + rank + '</div></td>');
            row.append('<td><div class="text-right">' + value['cp'] + '</div></td>');
            row.append('<td><div class="text-right">' + value['cpmax'] + '</div></td>');
            row.append('<td><div class="text-right">' + value['percent'].toFixed(0) + '%</div></td>');
            row.append('<td><div class="text-right">' + value['hp'] + '</div></td>');
            row.append('<td><div class="text-right">' + value['attack'] + '</div></td>');
            row.append('<td><div class="text-right">' + value['defense'] + '</div></td>');
            row.append('<td><div class="text-right">' + value['stamina'] + '</div></td>');
            return row;
        });
        tbody.append(row);
        table.append(tbody);
        resultlist.append(title);
        resultlist.append(evo);
        resultlist.append(table);
    }

    var buildList = function(result, input) {
        var base = getBaseStats(input.name);
        for (var sta = 0; sta <= 15; sta++) {
            for (var atk = 0; atk <= 15; atk++) {
                for (var def = 0; def <= 15; def++) {
                    if (sta + atk + def <= 36) {
                        continue;
                    }
                    var cp = Math.max(10, Math.floor((base['attack'] + atk) * Math.sqrt(base['defense'] + def) * Math.sqrt(base['stamina'] + sta) * CPM[input.level_base] * CPM[input.level_base] / 10.0));
                    var cpmax = Math.max(10, Math.floor((base['attack'] + atk) * Math.sqrt(base['defense'] + def) * Math.sqrt(base['stamina'] + sta) * CPM[CPM.length-1] * CPM[CPM.length-1] / 10.0));
                    var hp = Math.max(10, Math.floor((base['stamina'] + sta) * CPM[input.level_base]));
                    var percent = Math.round((atk + def+ sta) * 1000.0 / 45.0) / 10.0;
                    result.push({name: input.name, level_base: input.level_base, plevel: input.level, stamina: sta, attack: atk, defense: def, cp: cp, hp: hp, percent: percent, cpmax: cpmax});
                }
            }
        }
        result.sort(function cpCompare(a, b) {
            if (b['cp'] - a['cp'] == 0) {
                if (b['cpmax'] - a['cpmax'] == 0) {
                    if(b['percent'] - a['percent'] == 0) {
                        return b['hp'] - a['hp'];
                    }
                    return b['percent'] - a['percent'];
                }
                return b['cpmax'] - a['cpmax'];
            }
            return b['cp'] - a['cp'];
        });
    }

    var buildListForRaid = function(result, input) {
        var base = getBaseStats(input.name);
        for (var sta = 10; sta <= 15; sta++) {
            for (var atk = 10; atk <= 15; atk++) {
                for (var def = 10; def <= 15; def++) {
                    var cp = Math.max(10, Math.floor((base['attack'] + atk) * Math.sqrt(base['defense'] + def) * Math.sqrt(base['stamina'] + sta) * CPM[input.level_base] * CPM[input.level_base] / 10.0));
                    var cpmax = Math.max(10, Math.floor((base['attack'] + atk) * Math.sqrt(base['defense'] + def) * Math.sqrt(base['stamina'] + sta) * CPM[CPM.length-1] * CPM[CPM.length-1] / 10.0));
                    var hp = Math.max(10, Math.floor((base['stamina'] + sta) * CPM[input.level_base]));
                    var percent = Math.round((atk + def+ sta) * 1000.0 / 45.0) / 10.0;
                    result.push({name: input.name, level_base: input.level_base, plevel: input.level, stamina: sta, attack: atk, defense: def, cp: cp, hp: hp, percent: percent, cpmax: cpmax});
                }
            }
        }
        result.sort(function cpCompare(a, b) {
            if (b['cp'] - a['cp'] == 0) {
                if (b['cpmax'] - a['cpmax'] == 0) {
                    if(b['percent'] - a['percent'] == 0) {
                        return b['hp'] - a['hp'];
                    }
                    return b['percent'] - a['percent'];
                }
                return b['cpmax'] - a['cpmax'];
            }
            return b['cp'] - a['cp'];
        });
    }

    var initCalc = function () {
        $('#attention').removeAttr('class');
        $('#attention').empty();
        $('#resultlist').empty();
    }

    $('#calcIt').on('click', function() {
        initCalc();
        if (!checkInput()) {
            $('#attention').attr({class: 'alert alert-warning'});
            $('#attention').text('計算に失敗しました。入力値に間違いはありませんか？空白文字などはエラーになります。')
            return;
        }
        var input = getInput();

        var res = [];
        if (input.inc_wild) {
            buildList(res, input);
        } else {
            buildListForRaid(res, input);
        }
        renderList(res, input);

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

    $(window).load(function(){
        init();

        if(getQueries()) {
            applyQueries();
            $('#calcIt').click();
        }
    });
})

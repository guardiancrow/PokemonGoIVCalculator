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
        }
    }

    var init = function() {
        var i = 0;

        var level = $('#select-level');
        for (i = 0; i < 77; i++) {
            level.append($("<option>").val(i).text((i / 2.0 + 1.0).toFixed(1).toString()));
        }
        $('#select-level').val((20 - 1) * 2);

        var selectName = $('#select-name');
        $.each(pokedex, function(idx, value) {
            var name = value['name'];
            selectName.append($("<option>").val(name).text(name));
        })
    }

    var getBaseStats = function(name) {
        var base = null;
        $.each(pokedex, function(idx, data) {
            if (name == data['name'])
                base = data['base'];
        });
        return base
    }

    //戻り値は複数の進化先がある場合（イーブイ）のためにArray型です。
    /*var getEvolutionName = function(name) {
        var res = null;
        $.each(pokedex, function(idx, data) {
            if (name == data['name']) {
                if (data['evo']) {
                    res = getEvolutionName(data['evo']);
                    if (!res) {
                        res = data['evo'];
                    }
                }
            }
        });
        return res;
    }

    var getEvolutionData = function(name, candy) {
        var res = null;
        $.each(pokedex, function(idx, data) {
            if (name == data['name']) {
                if (data['evo']) {
                    res = [];
                    for (var i = 0; i < data['evo'].length; i++) {
                        var returns = getEvolutionData(data['evo'][i]['name'], data['evo'][i]['candy']);
                        if (!returns) {
                            res = $.extend(true, {}, data['evo']);
                        } else {
                            res = returns;
                        }
                        if (candy > 0) {
                            $.each(res, function() {
                                this['candy'] += candy;
                            });
                        }
                    }
                }
            }
        });
        return res;
    }*/

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
            level: +$('#select-level').val() / 2.0 + 1.0
        };
    }

    var renderList = function(result, input) {
        var resultlist = $("#resultlist");
        resultlist.empty();

        var title = $('<p class="lead"></p>');
        title.append(input.name + "(レベル" + input.level.toFixed(1) + ")");

        var table = $('<table class="table table-bordered table-striped"></table>');
        var thead = $('<thead><tr><th><div class="text-center">順位</div></th><th><div class="text-center">CP</div></th><th><div class="text-center">CPMax</div></th><th><div class="text-center">％</div></th><th><div class="text-center">HP</div></th><th><div class="text-center">体力</div></th><th><div class="text-center">攻撃</div></th><th><div class="text-center">防御</div></th></tr></thead>');
        table.prepend(thead);
        var i = 1;
        var tbody = $("<tbody></tbody>");
        var row = $.map(result, function(value) {
            var row = $("<tr></tr>");
            row.append('<td><div class="text-right">' + i++ + '</div></td>');
            row.append('<td><div class="text-right">' + value['cp'] + '</div></td>');
            row.append('<td><div class="text-right">' + value['cpmax'] + '</div></td>');
            row.append('<td><div class="text-right">' + value['percent'].toFixed(1) + '\%</div></td>');
            row.append('<td><div class="text-right">' + value['hp'] + '</div></td>');
            row.append('<td><div class="text-right">' + value['stamina'] + '</div></td>');
            row.append('<td><div class="text-right">' + value['attack'] + '</div></td>');
            row.append('<td><div class="text-right">' + value['defense'] + '</div></td>');
            return row;
        });
        tbody.append(row);
        table.append(tbody);
        resultlist.append(title);
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
        buildList(res, input);
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

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
            if (queries["atk"] && queries["atk"] >= 0 && queries["atk"] <= 15) {
                $('#select-atk').val(queries["atk"]);
            }
            if (queries["def"] && queries["def"] >= 0 && queries["def"] <= 15) {
                $('#select-def').val(queries["def"]);
            }
            if (queries["sta"] && queries["sta"] >= 0 && queries["sta"] <= 15) {
                $('#select-sta').val(queries["sta"]);
            }
            if (queries["noevo"] == "true") {
                $('#no-evolution').prop('checked', true);
            }
        }
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

        var atk = $('#select-atk');
        var def = $('#select-def');
        var sta = $('#select-sta');
        for (var i = 0; i <= 15; i++) {
            atk.append($("<option>").val(i).text(i.toString()));
            def.append($("<option>").val(i).text(i.toString()));
            sta.append($("<option>").val(i).text(i.toString()));
        }

        var level = $('#select-level');
        for (i = 0; i < 79; i++) {
            level.append($("<option>").val(i).text((i / 2.0 + 1.0).toFixed(1).toString()));
        }
        $('#select-level').val((20 - 1) * 2);

        $('#select-atk option').filter(function(index){
            return $(this).text() === '15';
        }).prop('selected', true);
        $('#select-def option').filter(function(index){
            return $(this).text() === '15';
        }).prop('selected', true);
        $('#select-sta option').filter(function(index){
            return $(this).text() === '15';
        }).prop('selected', true);

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
            level: +$('#select-level').val() * 2.0 + 1.0,
            no_evolution: +$('#no-evolution').prop('checked'),
            atk: +$('#select-atk').val(),
            def: +$('#select-def').val(),
            sta: +$('#select-sta').val()
        };
    }

    var renderTrialCalculation = function(futurearray, input) {
        var evolvednameary = [];
        if (input.no_evolution) {
            evolvednameary.push({name: input.name, candy: 0});
        } else {
            var evoary = getEvolutionData(input.name, 0);
            if (evoary && evoary[0].candy > 0) {
                evolvednameary = evoary;
            } else {
                evolvednameary.push({name: input.name, candy: 0});
            }
        }

        var reinforce = $("#reinforcement");
        var singletable = null;
        reinforce.empty();

        for (var i = 0; i < Object.keys(evolvednameary).length; i++) {
            singletable = $("<div></div>");
            var title = $('<p class="lead"></p>');
            if (input.name == evolvednameary[i]['name']) {
                title.append(input.name + "(" + input.atk + "/" + input.def + "/" + input.sta + ":" + input.atk.toString(16).toUpperCase() + input.def.toString(16).toUpperCase() + input.sta.toString(16).toUpperCase() + ") | 最大CP:" + futurearray[i][futurearray[i].length-1]['cp']);
            } else if (evolvednameary[i]['item']) {
                title.append(input.name + " >> " + evolvednameary[i]['name'] + "(" + input.atk + "/" + input.def + "/" + input.sta + ":" + input.atk.toString(16).toUpperCase() + input.def.toString(16).toUpperCase() + input.sta.toString(16).toUpperCase() + ") | 最大CP:" + futurearray[i][futurearray[i].length-1]['cp'] + " 必要アイテム:" + evolvednameary[i]['item']);
            } else {
                title.append(input.name + " >> " + evolvednameary[i]['name'] + "(" + input.atk + "/" + input.def + "/" + input.sta + ":" + input.atk.toString(16).toUpperCase() + input.def.toString(16).toUpperCase() + input.sta.toString(16).toUpperCase() + ") | 最大CP:" + futurearray[i][futurearray[i].length-1]['cp']);
            }
            var table = $('<table class="table table-bordered table-striped"></table>');
            var thead = $('<thead><tr><th><div class="text-center">トレーナーレベル</div></th><th><div class="text-center">ポケモンレベル</div></th><th><div class="text-center">このポケモンのCP</div></th><th><div class="text-center">個体値100%のCP</div></th><th><div class="text-center">ほしのすな累計</div></th><th><div class="text-center">アメ累計</div></th></tr></thead>');

            table.prepend(thead);
            var tbody = $("<tbody></tbody>");
            var row = $.map(futurearray[i], function(value) {
                var row = $("<tr></tr>");
                if (Math.floor(value['level_base'] / 2.0) > 38) {
                    row.append('<td><div class="text-right">' + 38 + '</div></td>');
                } else {
                    row.append('<td><div class="text-right">' + Math.floor((value['level_base'] - 1.0) / 2.0) + '</div></td>');
                }
                row.append('<td><div class="text-right">' + value['plevel'].toFixed(1) + '</div></td>');
                row.append('<td><div class="text-right">' + value['cp'] + '</div></td>');
                row.append('<td><div class="text-right">' + value['cpmax'] + '</div></td>');
                row.append('<td><div class="text-right">' + value['totalstardust'] + '</div></td>');
                row.append('<td><div class="text-right">' + value['totalcandy'] + '</div></td>');
                return row;
            });
            tbody.append(row);
            table.append(tbody);
            singletable.append(title);
            singletable.append(table);
            reinforce.append(singletable);
        }

        var uristring = location.origin + location.pathname + '?name=' + input.name + '&level=' + (input.level_base / 2.0 + 1.0) + '&sta=' + input.sta + '&atk=' + input.atk + '&def=' + input.def + '&noevo=' + $('#no-evolution').prop('checked');

        var thisurl = $('<p class="text-right small">ブックマークは：<a href="' + encodeURI(uristring) + '">' + uristring + '</a><br>（ブックマークしておけば「' + input.name + '」「レベル' + (input.level_base / 2.0 + 1.0) + '」などと入力せずに表示できます）</p>');
        reinforce.append(thisurl);
    }

    var tellTheFuture = function(result, input) {
        var evolvednameary = [];
        if (input.no_evolution) {
            evolvednameary.push({name: input.name, candy: 0});
        } else {
            var evoary = getEvolutionData(input.name, 0);
            if (evoary && evoary[0].candy > 0) {
                evolvednameary = evoary;
            } else {
                evolvednameary.push({name: input.name, candy: 0});
            }
        }

        for (var i = 0; i < Object.keys(evolvednameary).length; i++){
            var ary = [];
            var base = getBaseStats(evolvednameary[i]['name']);
            for (var j = input.level_base, totalstardust = 0, stardust = 0, totalcandy = evolvednameary[i]['candy'], candy = 0; j < CPM.length; j++, totalstardust += stardust, totalcandy += candy) {
                stardust = requireStardust[Math.floor(j / 4.0)];
                candy = requireCandy[Math.floor(j / 2.0)];
                var cp = Math.max(10, Math.floor((base['attack'] + input.atk) * Math.sqrt(base['defense'] + input.def) * Math.sqrt(base['stamina'] + input.sta) * CPM[j] * CPM[j] / 10.0));
                var cpMax = Math.max(10, Math.floor((base['attack'] + 15) * Math.sqrt(base['defense'] + 15) * Math.sqrt(base['stamina'] + 15) * CPM[j] * CPM[j] / 10.0));
                ary.push({level_base: j, plevel: j / 2.0 + 1.0, cp: cp, cpmax: cpMax, totalstardust: totalstardust, totalcandy: totalcandy});
            }
            result.push(ary);
        }
    }

    var initCalc = function () {
        $('#attention').removeAttr('class');
        $('#attention').empty();
        $('#reinforcement').empty();
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
        tellTheFuture(res, input);
        renderTrialCalculation(res, input);
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

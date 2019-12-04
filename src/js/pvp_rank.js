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
            if (queries["league"] && queries["league"] >= 0 && queries["league"] <= 1) {
                $('#select-league').val(queries["league"]);
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
            if (queries["iv"] == "true") {
                $('#specify-iv').prop('checked', true);
                $('#select-atk').removeAttr('disabled').focus();
                $('#select-def').removeAttr('disabled').focus();
                $('#select-sta').removeAttr('disabled').focus();
            } else {
                $('#specify-iv').prop('checked', false);
                $('#select-atk').attr('disabled', 'disabled');
                $('#select-def').attr('disabled', 'disabled');
                $('#select-sta').attr('disabled', 'disabled');
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

        var i = 0;
        var atk = $('#select-atk');
        var def = $('#select-def');
        var sta = $('#select-sta');
        for (var i = 0; i <= 15; i++) {
            atk.append($("<option>").val(i).text(i.toString()));
            def.append($("<option>").val(i).text(i.toString()));
            sta.append($("<option>").val(i).text(i.toString()));
        }

        var level = $('#select-league');
        level.append($("<option>").val(0).text("スーパーリーグ（CP 1500以下)"));
        level.append($("<option>").val(1).text("ハイパーリーグ (CP 2500以下)"));
        //level.append($("<option>").val(2).text("マスターリーグ (CP 無制限)"));
        $('#select-league').val(0);

        $('#select-atk option').filter(function(index){
            return $(this).text() === '15';
        }).prop('selected', true);
        $('#select-def option').filter(function(index){
            return $(this).text() === '15';
        }).prop('selected', true);
        $('#select-sta option').filter(function(index){
            return $(this).text() === '15';
        }).prop('selected', true);

        $('#specify-iv').prop('checked', false);
        $('#select-atk').attr('disabled', 'disabled');
        $('#select-def').attr('disabled', 'disabled');
        $('#select-sta').attr('disabled', 'disabled');

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
            league: $('#select-league').val(),
            specify_iv: +$('#specify-iv').prop('checked'),
            atk: +$('#select-atk').val(),
            def: +$('#select-def').val(),
            sta: +$('#select-sta').val()
        };
    }

    var renderList = function(result, input) {
        var resultlist = $("#resultlist");
        resultlist.empty();

        var title = $('<p class="lead"></p>');
        if (input.league == 0) {
            title.append(input.name + "：（スーパーリーグのランキング）");
        } else if (input.league == 1) {
            title.append(input.name + "：（ハイパーリーグのランキング）");
        } else {
            title.append(input.name);
        }

        if(result.length == 0) {
            $('#attention').empty();
            $('#attention').attr({class: 'alert alert-warning'});
            $('#attention').text('候補がありませんでした。最大CPが低すぎる可能性があります。100%の個体をMAX強化してください。')
        }

        var tdomax = result[0]['tdobase'];

        if (input.specify_iv) {
            var resspe = [];
            calcSpecifiedIV(resspe,input);
            if(resspe.length > 0) {
                var titlespe = $('<p class="lead">' + input.name + '：（指定された個体値）</p>');
                var table = $('<table class="table table-bordered table-striped"></table>');
                var thead = $('<thead><tr><th><div class="text-center">順位</div></th><th><div class="text-center">CP</div></th><th><div class="text-center">PL</div></th><th><div class="text-center">攻撃</div></th><th><div class="text-center">防御</div></th><th><div class="text-center">HP</div></th><th><div class="text-center">評価値</div></th><th><div class="text-center">差（％）</div></th></tr></thead>');
                table.prepend(thead);
                var tbody = $("<tbody></tbody>");
                var row = $("<tr></tr>");
                row.append('<td><div class="text-right">-</div></td>');
                row.append('<td><div class="text-right">' + resspe[0]['cp'] + '</div></td>');
                row.append('<td><div class="text-right">' + resspe[0]['level'] + '</div></td>');
                row.append('<td><div class="text-right">' + resspe[0]['attack'] + '</div></td>');
                row.append('<td><div class="text-right">' + resspe[0]['defense'] + '</div></td>');
                row.append('<td><div class="text-right">' + resspe[0]['stamina'] + '</div></td>');
                row.append('<td><div class="text-right">' + Math.floor(resspe[0]['tdobase']) / 10000 + '</div></td>');
                row.append('<td><div class="text-right">' + Math.floor(((tdomax - resspe[0]['tdobase']) / tdomax) * 10000) / 100 + '</div></td>');
                tbody.append(row);
                table.append(tbody);
                resultlist.append(titlespe);
                resultlist.append(table);
            }
        }

        var table = $('<table class="table table-bordered table-striped"></table>');
        var thead = $('<thead><tr><th><div class="text-center">順位</div></th><th><div class="text-center">CP</div></th><th><div class="text-center">PL</div></th><th><div class="text-center">攻撃</div></th><th><div class="text-center">防御</div></th><th><div class="text-center">HP</div></th><th><div class="text-center">評価値</div></th><th><div class="text-center">差（％）</div></th></tr></thead>');
        table.prepend(thead);
        var rank = 0;
        var prevtdo = 0;
        var equivalent = 1;
        var tbody = $("<tbody></tbody>");
        var row = $.map(result, function(value) {
            var row = $("<tr></tr>");
            if (input.specify_iv && input.sta == value['stamina'] && input.atk == value['attack'] && input.def == value['defense']) {
                row = $('<tr style="background-color: lightcoral;"></tr>');
            }
            if (prevtdo == value['tdobase']) {
                equivalent++;
            } else {
                rank += equivalent;
                equivalent = 1;
            }
            prevtdo = value['tdobase'];
            row.append('<td><div class="text-right">' + rank + '</div></td>');
            row.append('<td><div class="text-right">' + value['cp'] + '</div></td>');
            row.append('<td><div class="text-right">' + value['level'] + '</div></td>');
            row.append('<td><div class="text-right">' + value['attack'] + '</div></td>');
            row.append('<td><div class="text-right">' + value['defense'] + '</div></td>');
            row.append('<td><div class="text-right">' + value['stamina'] + '</div></td>');
            row.append('<td><div class="text-right">' + Math.floor(value['tdobase']) / 10000 + '</div></td>');
            row.append('<td><div class="text-right">' + Math.floor(((tdomax - value['tdobase']) / tdomax) * 10000) / 100 + '</div></td>');
            return row;
        });
        tbody.append(row);
        table.append(tbody);
        resultlist.append(title);
        resultlist.append(table);

        var uristring = location.origin + location.pathname + '?name=' + input.name + '&league=' + input.league;

        if (input.specify_iv) {
            uristring = location.origin + location.pathname + '?name=' + input.name + '&league=' + input.league + '&sta=' + input.sta + '&atk=' + input.atk + '&def=' + input.def + '&iv=' + $('#specify-iv').prop('checked');
        }

        var thisurl = $('<p class="text-right small">ブックマークは：<a href="' + encodeURI(uristring) + '">' + uristring + '</a><br>（ブックマークしておけば「' + input.name + '」などと入力せずに表示できます）</p>');
        resultlist.append(thisurl);
    }

    /*var getOriginalStats = function(name) {
    	var original = null;
    	$.each(pokedex, function(idx, data) {
    		if (name == data['name'])
    			original = data['original'];
    	});
    	return original;
    }*/


    var buildList = function(result, input) {
        var base = getBaseStats(input.name);
        var cpmin = 0;
        var cpmax = 0;
        if (input.league == 0) {
            cpmax = 1500;
        } else if (input.league == 1) {
            cpmax = 2500;
        } else {
            cpmax = 1500;
        }
        cpmin = cpmax - 20;
        //var ori = getOriginalStats(input.name);
        //var basesta = ori['hp'] * 1.75 + 50;
        //var baseatk = (2 * (Math.max(ori['attack'], ori['specialattack']) * 7 + Math.min(ori['attack'], ori['specialattack'])) / 8.0) * (1 + (ori['speed'] - 75) / 500.0);
        //var basedef = (2 * (Math.max(ori['defense'], ori['specialdefense']) * 5 + Math.min(ori['defense'], ori['specialdefense']) * 3) / 8.0) * (1 + (ori['speed'] - 75) / 500.0);
        for (var sta = 0; sta <= 15; sta++) {
            for (var atk = 0; atk <= 15; atk++) {
                for (var def = 0; def <= 15; def++) {
                    for (var c = CPM.length-1; c > 0; c--) {
                        var cp = Math.max(10, Math.floor((base['attack'] + atk) * Math.sqrt(base['defense'] + def) * Math.sqrt(base['stamina'] + sta) * CPM[c] * CPM[c] / 10.0));
                        if (cp < cpmin) {
                            break;
                        }
                        if (cp > cpmax) {
                            continue;
                        }
                        var tdobase = (base['attack'] + atk) * CPM[c] * (base['defense'] + def) * CPM[c] * (base['stamina'] + sta) * CPM[c];
                        //var tdobase = (baseatk + atk) * CPM[c] * (basedef + def) * CPM[c] * (basesta + sta) * CPM[c];
                        result.push({name: input.name, level: c / 2.0 + 1.0, stamina: sta, attack: atk, defense: def, cp: cp, tdobase: tdobase});
                        break;
                    }
                }
            }
        }
        result.sort(function cpCompare(a, b) {
            return b['tdobase'] - a['tdobase'];
        });
        result.splice(200);
    }

    var calcSpecifiedIV = function(result, input) {
        if (!input.specify_iv) {
            return;
        }
        var base = getBaseStats(input.name);
        var cpmin = 0;
        var cpmax = 0;
        if (input.league == 0) {
            cpmax = 1500;
        } else if (input.league == 1) {
            cpmax = 2500;
        } else {
            cpmax = 1500;
        }
        cpmin = cpmax - 20;
        var atk = input.atk;
        var def = input.def;
        var sta = input.sta;
        for (var c = CPM.length-1; c > 0; c--) {
            var cp = Math.max(10, Math.floor((base['attack'] + atk) * Math.sqrt(base['defense'] + def) * Math.sqrt(base['stamina'] + sta) * CPM[c] * CPM[c] / 10.0));
            if (cp > cpmax) {
                continue;
            }
            var tdobase = (base['attack'] + atk) * CPM[c] * (base['defense'] + def) * CPM[c] * (base['stamina'] + sta) * CPM[c];
            result.push({name: input.name, level: c / 2.0 + 1.0, stamina: sta, attack: atk, defense: def, cp: cp, tdobase: tdobase});
            break;
        }
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

    $('#specify-iv').change(function() {
        if($(this).is(':checked')) {
            $('#select-atk').removeAttr('disabled').focus();
            $('#select-def').removeAttr('disabled').focus();
            $('#select-sta').removeAttr('disabled').focus();
        } else {
            $('#select-atk').attr('disabled', 'disabled');
            $('#select-def').attr('disabled', 'disabled');
            $('#select-sta').attr('disabled', 'disabled');
        }
    })

    $(window).load(function(){
        init();

        if(getQueries()) {
            applyQueries();
            $('#calcIt').click();
        }
    });
})

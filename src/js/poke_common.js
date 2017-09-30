var getBaseStats = function(name) {
	var base = null;
	$.each(pokedex, function(idx, data) {
		if (name == data['name'])
			base = data['base'];
	});
	return base;
}

//戻り値は複数の進化先がある場合（イーブイ）のためにArray型です。
var getEvolutionName = function(name) {
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
}

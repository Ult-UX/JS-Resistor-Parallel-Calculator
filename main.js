/*!
  * Resistor Parallel Calculator v1.0.1
  * Copyright 2018 UltAudio.net (http://ultaudio.net/)
  * Licensed under MIT (https://github.com/Ult-UX/JS-Resistor-Parallel-Calculator/blob/master/LICENSE)
  */
; (function($, window, document, undefined) {
  // 创建插件，调用方式为 $('#calculator').ResistorParallelCalculator();
  $.fn.ResistorParallelCalculator = function(num = 2) {
    // 获取实例 ID
    var container = '#' + this.attr("id");
    // input 模板
    var resistor_tmp = '<div class="form-group"><label>Resistor NUM</label><input type="number" class="form-control" name="resistor"></div>';
    // 初始化页面
    initialize(container, num, resistor_tmp);
    // 定义添加表单的按钮
    var appendTrigger = $(container).find('#appendTrigger');
    // 当点击添加按钮时可以添加一个电阻参量
    appendTrigger.click(function() {
      // 计数器更新
      num++;
      // 添加模板
      $(resistor_tmp.replace('NUM', num)).appendTo($(container).find('#resistors'));
      return getResult(container);
    });
    return getResult(container);
  };

  // 获取计算结果
  function getResult(container) {
    $(container).find('input[name="resistor"]').each(function() {
      $(this).change(function() {
        var inputs = $(container).find('input[name="resistor"]');
        var resistors_arr = getResistor_arr(inputs);
        var result = 1 / resistors_arr.reduce(getSum);
        // 输出结果，保留小数点后 4 位
        $('#result').text(result.toFixed(4));
      });
    });
  }

  // 数组求和 Callback 函数
  function getSum(total, num) {
    return total + num;
  };

  // 获取所有有效的电阻数值
  function getResistor_arr(inputs) {
    var resistors_arr = new Array();
    inputs.each(function(index) {
      var val = $(this).val();
      if (val) {
        resistors_arr[index] = 1 / val;
      }
    });
    return resistors_arr;
  };

  // 初始化插件，创建计算器表单
  function initialize(container, num, resistor_tmp) {
    // 基本表单模板
    var htmlTmp = '\
		<div class="row">\
			<div class="col-md-4 col-md-offset-1">\
				<h2>计算结果：</h2>\
				<h2 id="result"></h2>\
			</div>\
			<div class="col-md-6">\
				<div id="resistors">\
				</div>\
				<div class="form-group">\
					<button type="button" id="appendTrigger" class="btn btn-primary">\
						Add a Resistor\
					</button>\
					<span class="text-primary">\
						请务必保证所输入的数值单位统一。\
					</span>\
				</div>\
			</div>\
		</div>\
		<p class="text-center">Resistor Parallel Calculator v1.0.1 Written and supported by UltAudio.net</p>';
    // 生成表单
    $(container).html(htmlTmp);
    // 根据要生成的条目数量添加 input
    for (var i = 0; i < num; i++) {
      $(resistor_tmp.replace('NUM', i + 1)).appendTo($(container).find('#resistors'));
    }
    return;
  };
  // 闭包
})(jQuery, window, document);

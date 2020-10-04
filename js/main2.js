estates = [];
dicts = [];
last_index = 0;
all_answers = [];
shura = [];
last_meth = 'חלוקה תואמת שנים אוחזין, ר"נ לפי רה"ג';
bin_meth = true;
name_num = {};
name_counter = 1;


$(document).ready(function(){
	$("#mainTable").hover(function() {
		$(this).parents('table').find('col:eq('+$(this).index()+')').toggleClass('hover');
	});
	$("#new_column").click(cnc('חלוקה תואמת שנים אוחזין, ר"נ לפי רה"ג'));
})

function cnr () {
	var txt = $($("#first_row").prop('outerHTML'));
	txt.on("keypress",function(){
		var row_name = "type anther name";
		dicts[0][row_name] = 0;
		txt.off("keypress");
		txt.find(":text").on("keyup",function(){
			if(this.value == ""){
				return
			}
			var val = this.value;
			if(val in dicts[0]){
				this.value = row_name;
				return;
			}
			txt.attr('id',val);
			dicts[0][val] = dicts[0][row_name];
			delete dicts[0][row_name];
			row_name = val;
		})
		txt.find(':input[type="number"]').on("keyup",function(){
			if(this.value == ""){
				dicts[0][row_name] = 0;
				return
			}
			dicts[0][row_name] = parseInt(this.value);
			update_column(0,false,last_meth);         //here
			bin_meth = true;
		})
		cnr();
	})
	txt.append('<td></td>');
	txt.show();
	$("#mainTable").append(txt);
}

function update_column(col,first,meth){
	if(estates[col] == undefined || dicts[col] == undefined){
		console.log("please enter estate");
		return
	}
	var dic = dicts[col];
	if (meth == 'חלוקה תואמת שנים אוחזין, ר"נ לפי רה"ג'){
		var answers = algo1(dicts[0],estates[col]);
		almost_everything(dic,circle(answers));
	}
	if (meth == 'לפי מעות (יחסית), רבי לפי ר"ח') {
		var answers = rav_hananel(dicts[0],estates[col]);
	}
	if (meth == 'שוה מותנת, רבי לפי הרי"ף'){
		var answers = rif(dicts[0],estates[col]);
	}
	if (meth == 'שיטת השעבודים, ר"נ לפי הרי"ף') {
		var answers = raabed(dicts[0],estates[col]);
	}
	answers = circle(answers);
	for(var i in answers){
		row = document.getElementById(i);
		if(first){
			var x = row.insertCell(1);
		}else {
			var x = row.cells[col+1];
		}
		x.innerHTML = "<p>" + answers[i] + "</p><br></br><p>(" + Math.round(1000000*answers[i]/dic[i])/10000 + "%)</p>";
		x.onmouseover = function(){
			for(var j in dic){
				var trt = $("#"+j);
				//console.log(trt,dic,j);
				trt.find(':input[type="number"]')[0].value = dic[j];
			}
		}
	}
	shura=all_answers[all_answers.length - 1].slice();
	shura[0] = meth;
	shura[1] = estates[col];
	for (var i in answers){
		shura[place(i)] = [dic[i],answers[i]];
	}
	all_answers[all_answers.length-1] = shura
	console.log(shura);
}

function cnc(meth){
	if(!bin_meth){
		if(meth == last_meth){
			return
		}
	};
	bin_meth = false;
	last_meth = meth;
	var txt = $($("#first_col").prop('outerHTML'));
	txt.attr('colspan',1);
	estates.unshift(estates[0]);
	if(shura != []){
		all_answers.push(shura);
	}
	last_index++;
	var counter = last_index;
	dicts.unshift(jQuery.extend(true, {}, dicts[0]));
	txt.on("keyup",function(e){
		estates[last_index-counter] = parseInt(e.target.value);
		if(e.which == 13) {
			update_column(last_index - counter,false,meth);
			sortTable();
		}
	})
	/*
	if (other_algo.indexOf(meth) != -1) {
		return
	}
	var answers = algo1(dicts[0],estates[1]);
	console.log(answers,dicts[0]);
	for (var i in answers){
		if(i != "estate"){
			row = document.getElementById(i)
			var x = row.insertCell(1);
			x.innerHTML = "<p>" + answers[i] + "</p>";
		}
	}
	all_answers.push(answers);
	*/
	txt.show();
	$("#women_name").after(txt);
	var row = document.getElementById("compute");
	//console.log(row);
	var x = row.insertCell(1);
	x.innerHTML = meth;
	update_column(0,true,meth);
}


function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("mainTable");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("TR");
    for (i = 1; i < (rows.length - 2); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      if ($(x).find(':input[type="number"]')[0].value > $(y).find(':input[type="number"]')[0].value) {
        shouldSwitch= true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}



function place(name){
	if(name in name_num){
		return name_num[name];
	}
	name_counter++;
	name_num[name] = name_counter;
	shura.push(0);
	return name_counter;
}


function down1(){
	console.log(all_answers);
	download(all_answers,name_num);
}


function circle(ans){
	for(i in ans){
		ans[i]=Math.round(ans[i] * 100) / 100;
	}
	return ans;
}


$("#first_col").hide();
$("#first_row").hide();
cnr()
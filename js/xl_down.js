function download(arrs){
	var headers=["שיטת חישוב","עזבון"]; 
	for(var i in name_num){
		headers[place(i)]=i;
	}
	var excel = $JExcel.new("Calibri light 10 #333333");            
	excel.set( {sheet:0,value:'estate division'} );
	/*
	var evenRow=excel.addStyle( { border: "none,none,none,thin #333333"});                                                    
	var oddRow=excel.addStyle ( { fill: "#ECECEC" ,border: "none,none,none,thin #333333"}); 
	for (var i=1;i<50;i++) excel.set({row:i,style: i%2==0 ? evenRow: oddRow  });
	*/
	var formatHeader=excel.addStyle ( {
		border: "none,none,none,thin #333333",font: "Calibri 12 #0000AA B",align:"C C"
	});
	d
	for (var i=0;i<headers.length;i++){                       // Loop headers
		excel.set(0,i,0,headers[i],formatHeader);             // Set CELL header text & header format
    	excel.set(0,i,undefined,28);
	}

	for (var i = 0;i<arrs.length;i++){
		for (var j = 0; j < arrs[i].length; j++) {
			if(Array.isArray(arrs[i][j])){
				excel.set(0,j,i+1,"בקשה - " + arrs[i][j][0] + ", סכום סופי - " + arrs[i][j][1]);    //"בקשה - " + arrs[i][j][0] + ", סכום סופי - " + arrs[i][j][1]
			} else {
				excel.set(0,j,i+1,arrs[i][j]);
			}
		}
	}
	excel.set(0,1,undefined,5);
	console.log(headers);
	excel.generate("טבלת חישובים.xlsx");
}
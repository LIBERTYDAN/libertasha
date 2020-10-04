function sumit (arr) {
	var s=0
	for (var i in arr) {
		s+=arr[i];
	}
	return s;
}

function algo1 (arr,estate) {
	var sum = sumit(arr);
	var a=[];
	if(estate>=sum){
		return arr;
	}
	if (sum/2 >= estate) {
		a=algo2(arr,estate);
	} else {
		a=algo2(arr,sum-estate);
		for (var i in a) {
			a[i]=Math.abs(a[i]-arr[i]);
		}
	}
	return a;
}

function algo2 (arr,estate) {
	var len = Object.keys(arr).length,
		narr = {},
		a=[];
	Object.assign(narr,arr);
	while (len>0) {
		previous = Infinity;
		for(var i in narr){
			if(previous>narr[i]){
				previous = narr[i];
				small = i;
			}
		}
		if ((previous/2)<(estate/len)) {
			a[small]=Math.min(estate,previous/2);
		} 
		else {
			a[small] = estate/len;
		}
		estate-=a[small];
		delete narr[small];
		len--;
	}
	return a;
}


function rif (arr,estate) {
	var sum = sumit(arr);
	var a=[];
	if(estate>=sum){
		return arr;
	}
	else {
		a=algo4(arr,estate);
	}
	return a;
}

function algo4 (arr,estate) {
	var len = Object.keys(arr).length,
		narr = {},
		a=[];
	Object.assign(narr,arr);
	while (len>0) {
		previous = Infinity;
		for(var i in narr){
			if(previous>narr[i]){
				previous = narr[i];
				small = i;
			}
		}
		if ((previous)<(estate/len)) {
			a[small]=Math.min(estate,previous);
		} 
		else {
			a[small] = estate/len;
		}
		estate-=a[small];
		delete narr[small];
		len--;
	}
	return a;
}

function rav_hananel (arr,estate) {
	a=[];
	sum=sumit(arr);
	if(estate>=sum){
		return arr;
	}
	else {
	    for (var i in arr){
		    var f=sum/arr[i];
		    var b=estate/f;
		    a[i]=b;
	    }
	}
	return a;
}

function shiabodim(obj,estate) {
	var len = Object.keys(obj).length;
	var numb=0;
    var pre=0;
    a=[];
    for (var i in obj) {
        var k=(obj[i]-pre)/len;
        a[i]=Math.min(k+numb,estate/len);
        len=len-1;
        numb=numb+k;
        pre=obj[i];
        estate=estate-a[i];
    }
    return a;
}
function raabed(lobj,estate) {
	var obj=sortO(lobj);
    var len = Object.keys(obj).length;
    var max = (Object.keys(obj).map(function(key){return obj[key];})).reduce(function(a, b) {
    return Math.max(a, b);
});
    if (max>estate) {
        a=shiabodim(obj,estate);
    }
    else {
        a=shiabodim(obj,max);
        for (var i in a) {
            var n=(estate-max)/len;
            if (a[i]+n>=obj[i]) {
                estate=estate-obj[i]+a[i];
                a[i]=obj[i];
                len=len-1
            }
            else {
                a[i]=a[i]+n
            }
        }
    }
    return a;
}

function sortO(list) {
    var sortable = [];
    for (var key in list) {
        sortable.push([key, list[key]]);
    }

    sortable.sort(function(a, b) {
        return (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0));
    });

    var orderedList = {};
    for (var i = 0; i < sortable.length; i++) {
        orderedList[sortable[i][0]] = sortable[i][1];
    }

    return orderedList;
}

d={
	"a":100,
	"b":200,
	"c":300
}

e = 300;

console.log(raabed(d,e),rif(d,e),rav_hananel(d,e));
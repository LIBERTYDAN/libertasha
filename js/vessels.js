var j =0;
function make_into_half(y) {
    var a="20px";
    var b="40px";
    var c="2px";
    var g=y+1;
    var h=y+2;
    var j=y+3;
    var k=y+4;
    var z="div"+g;
    var q="div"+h;
    var m="div"+j;
    var n="div"+k;
    document.getElementById(z).style.width= a;
    document.getElementById(z).style.display='block';
    document.getElementById(q).style.width= b;
    document.getElementById(q).style.display='block';
    document.getElementById(m).style.width= b;
    document.getElementById(m).style.marginLeft = c;
    document.getElementById(m).style.display='block';
    document.getElementById(n).style.width= a;
    document.getElementById(n).style.display='block';
    return true;
}
function chid(x,y) {
    var n="div"+y
    x.id=n;
    return true;
}
function add_name(t) {
    var x=document.getElementById("bigDiv");
    var name_div=document.createElement('div');
    x.appendChild(name_div);
    name_div.style.height='74px';
    name_div.style.float='left';
    name_div.style.backgroundColor='#DEFF97';
    name_div.style.textAlign='center';
    name_div.id="name_div"+(t+1);
    name_div.style.width= "122px";
    name_div.style.display='block';
}
function add_div(t) {
    var x=document.getElementById("bigDiv");
    var adiv = document.createElement('div');
    var bdiv = document.createElement('div');
    var cdiv = document.createElement('div');
    var ddiv = document.createElement('div');
    x.appendChild(adiv);
    x.appendChild(bdiv);
    x.appendChild(cdiv);
    x.appendChild(ddiv);
    adiv.style.float='left';
    bdiv.style.float='left';
    cdiv.style.float='left';
    ddiv.style.float='left';
    adiv.style.position='relative';
    bdiv.style.position='relative';
    cdiv.style.position='relative';
    ddiv.style.position='relative';
    adiv.style.zIndex=2;
    bdiv.style.zIndex=2;
    cdiv.style.zIndex=2;
    ddiv.style.zIndex=2;
    adiv.style.paddingBottom='200px';
    bdiv.style.paddingBottom='200px';
    cdiv.style.paddingBottom='200px';
    ddiv.style.paddingBottom='200px';
    adiv.style.backgroundColor='#DEFF97';
    bdiv.style.backgroundColor='#DEFF97';
    cdiv.style.backgroundColor='#DEFF97';
    ddiv.style.backgroundColor='#DEFF97';
    var a=t+1;
    var b=t+2;
    var c=t+3;
    var d=t+4;
    chid(adiv,a);
    chid(bdiv,b);
    chid(cdiv,c);
    chid(ddiv,d);
    make_into_half(t);
}

function remove(EId) {
    return(EObj=document.getElementById(EId))?EObj.parentNode.removeChild(EObj):false;
}
function add_woman(x) {
    var o=document.getElementById("bigDiv");
    o.style.width=(x*122)+"px";
    var n=document.getElementById("v");
    n.style.width=(x*122)+"px";
    var n=document.getElementById("water");
    n.style.width=(x*122)+"px";
    remove("br0");
    remove("br1");
    remove("br2");
    for (var q = 1; q <= j*4; q++) {
        var f="div"+q;
        var v="name_div"+(q/4);
        remove(f);
        remove(v);
    };
    j = 0;
    for (var i = 0; i < x; i++) {
        add_name(i)
    };
    for (var i = 0; i < 3; i++) {
    var br=document.createElement('br');
    o.appendChild(br);
    br.id="br"+i;
    };
    for (var i = 0; i < x; i++) {
        j++;
        var t=i*4;
        add_div(t);
    };
}
function change_padding(n,y) {
    var g=(n*4)+2;
    var e=(n*4)+3;
    var a="div"+g;
    var c="div"+e;
    var x=document.getElementById(a);
    var z=document.getElementById(c);
    var b=(100-y)*2;
    var o=b+"px";
    x.style.paddingBottom=o;
    x.style.marginTop=y+"px";
    z.style.paddingBottom=o;
    z.style.marginTop=y+"px";
}
function change_kli(obj,objAlgo) {
    var arr=Object.values(obj).sort(function(a, b){return a-b});
    var arrAlgo=Object.values(objAlgo).sort(function(a, b){return a-b});
    var arrAlgo_keys=Object.keys(objAlgo).sort(function(a,b){return obj[a]-obj[b]});
    var bmax=Math.max.apply(null,arr);
    var amax=Math.max.apply(null,arrAlgo);
    var x=100/bmax;
    var e=200/bmax;
    var b=e*amax;
    var c=200-b;
    var w=document.getElementById('water');
    w.style.marginTop=(c+74)+"px";
    w.style.paddingTop=b+"px";
    for (var i = 0; i < arr.length; i++) {
        change_padding(i,x*arr[i]);
    };
    for (var i = arr.length - 1; i >= 0; i--) {
        var p=document.getElementById("name_div"+(i+1)).innerHTML= 'שם  - "' + arrAlgo_keys[i]+'", טענה: '+arr[i]+", סכום סופי: "+arrAlgo[i];
    };
}

function almost_everything(obj,objAlgo) {
    var arr=Object.values(obj);
    add_woman(arr.length);
    change_kli(obj,objAlgo);
}
// document.getElementById("weblist").style.display="none";
document.getElementById("searchlist").style.display="none";
document.getElementById("vplay").style.display="none";
// 搜视频
document.getElementById("se").addEventListener("click", function(){
	var url=document.getElementById("url").value;
	if(!url){
		console.log("请输入关键词");
		return;
	}
	document.getElementById("ifm").src="";
	document.getElementById("ifm").style.display="none";
	document.getElementById('vp').src="";
	var urls = ["v.qq","iqiyi.com","mgtv.com","bilibili.com","v.youku","tv.sohu","le.com"];
	var v=false;
	for(var i = 0; i < urls.length; i++){
		//过滤mp4
		if(url.indexOf("mp4") > -1){
			if(url.indexOf("http") > -1){
				document.getElementById("maincate").innerHTML='<a onclick="play(this,\''+url+'\')" href="javascript:(0);" >第1集</a>';
				ovmp4(url);v=true;break;
			}//过滤m3u8
		}else if(url.indexOf("m3u8") > -1){
			if(url.indexOf("http") > -1){
				document.getElementById("maincate").innerHTML='<a onclick="play(this,\''+url+'\')" href="javascript:(0);" >第1集</a>';
				ovhls(url);v=true;break;
			}
		}else if(url.indexOf(urls[i]) > -1){
			//过滤需要官解的
			if(url.indexOf("http") > -1){
				document.getElementById("ifm").style.display="block";
				document.getElementById("ifm").src="https://jx.aidouer.net/?url="+url;
				v=true;break;
			}
        }
	}
	if(v==false){
		//搜索视频
		document.getElementById("loding").style.display="block";
		var httpRequest = new XMLHttpRequest();
		httpRequest.open('GET', 'https://ebay868.com/?wd='+url, true);
		httpRequest.send();
		httpRequest.onreadystatechange = function () {
			if (httpRequest.readyState == 4 && httpRequest.status == 200) {
				var json = httpRequest.responseText;//获取结果
				json =JSON.parse(json);
				var str="";
				var strs='<li onclick="ose([url])"><h4>[bt]</h4><p>[type]</p></li>';
				for(var i=0; i<json.length; i++){
					var temp=strs.replace('[bt]', json[i].name);
					temp=temp.split('[url]').join("'"+json[i].id+"',"+json[i].vid);
					temp=temp.replace('[type]', json[i].type);
					str+=temp;
				}
				document.getElementById("vlist").innerHTML=str;
				document.getElementById("weblist").style.display="none";
				document.getElementById("searchlist").style.display="block";
				document.getElementById("vplay").style.display="none";
				document.getElementById("loding").style.display="none";
			}
		};
	}
});
function ou(url=''){
	//搜网页
	if(url){
		window.open(url,"_blank");
	}else{
		var url=document.getElementById("url").value;
		window.open("https://www.baidu.com/s?ie=UTF-8&wd="+url,"_blank");
	}
}

function ovmp4(url){
	//播放mp4
	console.log(url);
	document.getElementById('player').innerHTML='<video id="vp" class="video-js" controls autoplay loop webkit-playsinline=“true” playsinline=“true” data-setup="{}"><source src="'+url+'" type="video/mp4"/></video>';
	document.getElementById("weblist").style.display="none";
	document.getElementById("searchlist").style.display="none";
	document.getElementById("vplay").style.display="block";
}

function ovhls(url){
	//播放hls
	console.log(url);
	document.getElementById('player').innerHTML='<video id="vp" class="video-js" controls autoplay loop webkit-playsinline=“true” playsinline=“true” data-setup="{}"><source src="'+url+'" type="application/x-mpegURL"/></video>';
	document.getElementById("weblist").style.display="none";
	document.getElementById("searchlist").style.display="none";
	document.getElementById("vplay").style.display="block";
}

function ose(id,vid){
	//播放
	
	var httpRequest = new XMLHttpRequest();
	        httpRequest.open('GET', 'https://ebay868.com/?id='+id+"&vid="+vid, true);
	        httpRequest.send();
	        httpRequest.onreadystatechange = function () {
	            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
	                var json = httpRequest.responseText;
	                json =JSON.parse(json);
					document.getElementById("title").innerHTML=json.name;
	                
					json=json.play;
					if(json.indexOf("$$$") !== -1){
						json=json.split("$$$");
						for(var i=0 ; i<json.length ; i++){
							if(json[i].indexOf(".m3u8") > -1){
								json=json[i];
								break;
							}
						}
					}
					if(json.indexOf("#") !== -1){
						json=json.split("#");
					}
					
	                var str="";
					if(Array.isArray(json)){
						for(var i=0; i<json.length; i++){
							var temp=json[i].split("$");
							if(i==0){
								if(temp['1'].indexOf(".m3u8") > -1){
									ovhls(temp['1']);
								}else if(temp['1'].indexOf(".mp4") > -1){
									ovmp4(temp['1']);
								}else{
									console.log(temp['1']);
								};
							}
						    str+='<a onclick="play(this,\''+temp['1']+'\')" href="javascript:(0);" >'+temp['0']+'</a>';
						}
						document.getElementById("maincate").innerHTML=str;
					}else{
						var temp=json.split("$");
						if(temp['1'].indexOf(".m3u8") > -1){
							ovhls(temp['1']);
						}else if(temp['1'].indexOf(".mp4") > -1){
							ovmp4(temp['1']);
						}else{
							console.log(temp['1']);
						};
						str+='<a onclick="play(this,\''+temp['1']+'\')" href="javascript:(0);" >'+temp['0']+'</a>';
						document.getElementById("maincate").innerHTML=str;
					}
	                
	            }
	};
}
function play(obj,url){
    var lis = document.getElementById("maincate").getElementsByTagName("a");
    for(var i=0; i<lis.length; i++){
        lis[i].classList.remove('active');
    }
    obj.classList.add('active');
	if(url.indexOf(".m3u8") > -1){
		ovhls(url);
	}else if(url.indexOf(".mp4") > -1){
		ovmp4(url);
	}else{
		console.log(url);
	}
    
}
function IsPC(){  
     var userAgentInfo = navigator.userAgent;
     var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPod");  
     var flag = true;  
     for (var v = 0; v < Agents.length; v++) {  
         if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
     }  
     return flag;  
}
if(IsPC()){
	window.location.href="http://127.0.0.1";
}
var vtime=document.getElementById("vp");

var isplay = false;

        var keyEvent = (function () {

            document.onkeydown = function (e) {

                 if (e.keyCode === 37) { // left

                  vtime.currentTime=vtime.currentTime-5;

                } else if (e.keyCode === 39) { // right

                  vtime.currentTime=vtime.currentTime+5;

                } else if (e.keyCode === 32) {

                    if(isplay) {

                         isplay = false;

                         vtime.pause();

                    }else {

                         isplay = true;

                         vtime.play();

                    }

                

                }

            }

        })();

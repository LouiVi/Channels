var ROKU_IP = "192.168.70.236";
//var TV = "http://" + ROKU_IP + ":8060/launch/tvinput.dtv?ch=";
var TV_CHANNELS = "http://" + ROKU_IP + ":8060/query/tv-channels";
var ACTIVE_APP = "http://" + ROKU_IP + ":8060/query/active-app";
var TV_ACTIVE_APP = "http://" + ROKU_IP + ":8060/query/tv-active-channel";
var TV = "http://" + ROKU_IP + ":8060/launch/tvinput.dtv?ch=";
var ROKU_TV = "http://" + ROKU_IP + ":8060/";
var ROKU_SEARCH = "http://" + ROKU_IP + ":8060/search/browse/?keyword=";

//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "Linear", "VCenter,FillXY" )

	//Create a text label and add it to layout.
	txt = app.CreateText( "Hello" )
	txt.SetTextSize( 32 )
	lay.AddChild( txt )
	
	//Add layout to app.	
	app.AddLayout( lay );
	//c=1;
	//app.HttpRequest( "GET", "http://" + ROKU_IP + ":8060/query/apps", null, null, handleReply );
	c=5;
app.HttpRequest( "GET", TV_ACTIVE_APP, null, null, handleReply);
/*c=3;
app.HttpRequest( "GET", ROKU_TV, null, null, handleReply);
*/
	//SendCommand(TV+'2.3');
	//app.HttpRequest( "POST", TV, 'tvinput.dtv', 'ch=2.3', handleReply );

}

var TV_ACTIVE_APP = "http://" + ROKU_IP + ":8060/query/tv-active-channel";;
app.HttpRequest( "GET", TV_ACTIVE_APP, null, null, handleActiveTVChannel);
function handleActiveTVChannel( error, reply )
{
    if( error ) alert( reply );
    else
    {
        active_tv_channel = reply.slice( reply.indexOf("<number>") + 8, reply.indexOf("</number>") );
    }
}
function handleReply( error, reply )
{
    if( error ) alert( reply );
    else
    {
    app.WriteFile( c+".txt", reply);
    alert("Reply:"+reply);
        //var funfact = reply.slice( reply.indexOf("<i>") + 3, reply.indexOf("</i>") );
        //alert( funfact );
    }
}

function SendCommand(url) {

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    
    xhr.onload = function() {
    //alert(xhr.responseText);
        if (xhr.status == 200)
        app.ShowPopup("Command sent successfully!")
        else
       /* if(url.includes("PowerOn")) {
        btnCurr.SetText("Power Off");
        }else if(url.includes("PowerOff")){
        btnCurr.SetText("Power On");
        }*/
        
            alert("Fail to send comm: "+url);
            
            //app.WriteFile( "log.txt", Date().toString()+", " + xhr.status + "," + url+"\r", "Append" )
    };
    xhr.send();
}
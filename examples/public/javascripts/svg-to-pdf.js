
// include require to add dependencies
// include in template
// create a sample svg (print material)


function encode_as_img_and_link(){
 // Add some critical information
 $("svg").attr({ version: '1.1' , xmlns:"http://www.w3.org/2000/svg"});

 var svg = $("#chart-canvas").html();
 var b64 = Base64.encode(svg); // or use btoa if supported

 // Works in recent Webkit(Chrome)
 $("body").append($("<img src='data:image/svg+xml;base64,\n"+b64+"' alt='file.svg'/>"));

 // Works in Firefox 3.6 and Webit and possibly any browser which supports the data-uri
 $("body").append($("<a href-lang='image/svg+xml' href='data:image/svg+xml;base64,\n"+b64+"' title='file.svg'>Download</a>"));
}



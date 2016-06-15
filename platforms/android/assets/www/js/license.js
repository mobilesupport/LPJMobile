/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
    
        document.addEventListener('deviceready', this.onDeviceReady, false);
        
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      
        app.receivedEvent('deviceready');
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
       
        scan();
       // getvalue();
    }
};

function scan(){
    cordova.plugins.barcodeScanner.scan(
      function (result) {
//          alert("We got a barcode\n" +
//                "Result: " + result.text + "\n" +
//                "Format: " + result.format + "\n" +
//                "Cancelled: " + result.cancelled);
         getvalue(result.text);
          
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
         
          "showFlipCameraButton" : true, // iOS and Android 
          "prompt" : "Place a barcode inside the scan area", // supported on Android only 
          "formats" : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED 
         
      }
   );
    
} 


function getvalue(QRresult){
    $(".btnqr").css({"background-color": "#bdcef6"});
    var sha1key = "123456";
    var key1 = "123";
    var key2 = "456";
    //var result =//"LY|00003|LPJ/LY/16-00004|DA DAN XIA||01/05/2016|01/05/2017|Adam|SEAGULLS FORWARDING AGENCY SDN BHD|NO 38A, JALAN SENTOSA 5,|BAYU TINGGI, 41200, KLANG,|SELANGOR|c5c5b93b94aaac6dbbd81b1962d11485a8c9d82f";
    
       //"SS|SEAGULLS FORWARDING AGENCY SDN BHD|NO 38A, JALAN SENTOSA 5,|BAYU TINGGI, 41200, KLANG,|SELANGOR|EJEN FRET (FREIGHT FORWARDER)|P.G.P|LPJ/PG01/16-00002|20/052016|20/11/2016|1212|2323|00003|47d846e9d973927d7910bf8d61d36c01ee481ef3";
        
    //"PJ|SEAGULLS FORWARDING AGENCY SDN BHD|JP 0091|26/05/2016|26/11/2016|LPJ/IP/M/16/2(91)|123123|123|123|123|HAD PELABUHAN PASIR GUDANG|6986fbd549a298dddcaa6c35d6dbedc75d7c3317";
    
    
        
    var result=QRresult;
        
    var split = result.split("|"); 
    var value = split.slice(0, split.length - 1).join("|") + "|";     
    var valuewithkey = key1 +"|" + value +key2 + "|" + sha1key;
    
    // hashed value
    var hashedvalue = SHA1(valuewithkey);
    
    if(hashedvalue == split[split.length-1]){
        
        loadinfo(split);
    }
    else{
        alert("This QR code is not supported\n Please try again");
        window.location="home.html";
            
    }
}

function loadinfo(split){
    if(split[0]=="PJ"){
        PJLicense(split);
    }
    else if(split[0]=="SS"){
        SSLicense(split);
    }
    else if(split[0] =="LY"){
        LYLicense(split);
    }
    
}

function PJLicense(split){
    
   $('#span1').text("LESSEN :");
   $('#span11').text(split[2]);
    
   $('#span2').text("NOMBOR PENDAFTARAN :");
   $('#span22').text(split[5]);
    
   $('#span3').text("TARIKH DIKELUARKAN :");
   $('#span33').text(split[3]);
    
   $('#span4').text("TARIKH TAMAT :");
   $('#span44').text(split[4]);
    
   $('#span5').text("NAME PEMEGANG LESEN :");
   $('#span55').text(split[1]);
    
   $('#span6').text("ALAMAT BEROPERASI :");
   $('#span66').text(split[6]+ ", " + split[7] + ", " + split[8] +", "+ split[9]);
    
   $('#span7').text("LOKASI :");
   $('#span77').text(split[10]);
    
   $('#tr8').css({"display":"none"});
   $('#tr9').css({"display":"none"});
    $('#tr88').css({"display":"none"});
   $('#tr99').css({"display":"none"});
    
   showinfo();
}

function SSLicense(split){
    
   $('#span1').text("COMPANY NAME :");
   $('#span11').text(split[1]);
    
   $('#span2').text("COMPANY ADDRESS :");
   $('#span22').text(split[2] + " " + split[3] + " " + split[4]);
    
   $('#span3').text("LESEN CATEGORY/ JENIS LESSEN :");
   $('#span33').text(split[5]);
    
   $('#span4').text("LOCATION/ LOKASI :");
   $('#span44').text(split[6]);
    
   $('#span5').text("REFERENCE NO/ NO.RUJUKAN :");
   $('#span55').text(split[7]);
    
   $('#span6').text("DATE OF ISSUE/ TARIKH DIKELUARKAN :");
   $('#span66').text(split[8]);
    
   $('#span7').text("DATE OF EXPIRY/ TARIKH TAMAT :");
   $('#span77').text(split[9]);
    
   $('#span8').text("PDA NO. :");
   $('#span88').text(split[10]);
    
   $('#span9').text("PDA AUTHO NO. :");
   $('#span99').text(split[11]);
    
   showinfo();
}

function LYLicense(split){
    
   $('#span1').text("NO LESEN :");
   $('#span11').text(split[1]);
    
   $('#span2').text("NO CASE :");
   $('#span22').text(split[2]);
    
   $('#span3').text("NAMA KAPAL :");
   $('#span33').text(split[3]);
    
   $('#span4').text("MSSI NO :");
   $('#span44').text(split[4]);
    
   $('#span5').text("TARIKH DIKELUARKAN :");
   $('#span55').text(split[5]);
    
   $('#span6').text("TARIKH TAMAT :");
   $('#span66').text(split[6]);
    
   $('#span7').text("NAMA PEMILIK :");
   $('#span77').text(split[7]);
    
   $('#span8').text("NAMA AGENSI :");
   $('#span88').text(split[8]);
    
   $('#span9').text("ALAMAT :");
   $('#span99').text(split[9]+ " " + split[10]+ " " + split[11]);
    
   showinfo();
}

function showinfo(){
    $(".info").css({"display": "block"});
 
}

function home_onclick(){
    window.location = "home.html";
}

// JavaScript Document

var delay = 10000; //set delay between message change (in miliseconds)
var maxsteps=30; // number of steps to take to change from start color to endcolor
var stepdelay=40; // time in miliseconds of a single step
//**Note: maxsteps*stepdelay will be total time in miliseconds of fading effect
var startcolor= new Array(255,255,255); // start color (red, green, blue)
var endcolor=new Array(50,63,71); // end color (red, green, blue)

var fcontent=new Array();
begintag=''; //set opening tag, such as font declarations
fcontent[0]="<p>&quot;Thank You. You are just Awesome.. I enjoy the info You put on your site and I just wanted to thank You for the video workshops Awesome...&quot;</p> <p>Barb J.</p>";
fcontent[1]="<p>&quot;Dear Mitch, You are the absolute best! In my 60's I just started drawing, and was struggling until I found you. I am on a fixed income and can't afford to take lessons here so you are a life saver. Using your lesson on drawing faces I drew the first face that actually looked like a human face. You make placement of facial features foolproof. I can't wait to try your other lessons.  Thanks again!&quot;</p> <p>Thea</p>";
fcontent[2]="<p>&quot;Many thanks Mitch for the excellent web site loaded with great info and tutorials.  Although I've been doing watercolors for some time and a little sketching I'm now into animation using Toon Boom Studio 4.5 and find your info excellent for what I want to do.  Many thanks and keep up the good work.&quot;</p> <p>Ian</p>";
fcontent[3]="<p>&quot;I just wanted to say I love this website its so awesome.  I have been looking for a website like this for so long and I'm really glad to find one and I'm stuck to the paper and my pencil drawing now!&quot;</p> <p>Kelsey</p>";
fcontent[4]="<p>&quot;Hi, I think your site is absolutely fabulous.  Animation is something that really draws my attention and I'm considering it as a career at the moment. But I'm not too sure if there's potential for me here in South Africa. My point of contacting you was actually to thank you and compliment you on this website. It's FANTASTIC.&quot;</p> <p>Nazeera, South Africa</p>";
fcontent[5]="<p>&quot;Hi Mitch. Thank you for the free drawing videos etc.  My sister and I joined an art class but the teacher was so negative my poor sister left in tears.  Thanks to finding your site she is all excited and shared that enthusiasm with another member of the art class and we are all fired up again.  We are just a bunch of oldies but we do want to draw.  Your encouragement and enthusiasm is what we need here.  Thanks again.</p><p>Susan E., Scotland</p>";
fcontent[6]="<p>&quot;Just to say thank you for the lessons. I already learn a lot. I'm busy with oil painting classes and we are busy study faces!! Thanks again.&quot; </p><p>Retha, South Africa</p>";
fcontent[7]="<p>&quot;Dear Mitch,<br>Your video course lesson ONE is FANTASTIC!!!<br>Many thanks.&quot; </p><p>Daniel</p>";
fcontent[8]="<p>&quot;Hi, Thank you so much. You have given us a lot of pleasure, confidence and determination to give sketching a go. Thank you again.&quot; </p><p>Eva, Scotland</p>";
fcontent[9]="<p>&quot;Thank you very much for writing such wondeful tutorials. They are really helpful. I just tried the first lesson about drawing the human head. I was amazed by the result and how fast I could draw the head using your formula. Then I played with the shading, just to make the exercise more challenging. :-)<br><br>I can't wait to watch your next video lessons. :-D Thank you.<br><br>Sincerely,&quot;</p> <p>Riman, Canada</p>";
fcontent[10]="<p>&quot;Thanks Mitch for taking care of me as a brand new amateur in the drawing art. I appreciate your help.&quot; </p><p>Francoise</p>";
fcontent[11]="<p>&quot;Hey, thank you so much for your advice it works awesome. i can now draw really cool things. Especially caricatures.&quot; </p><p>Hannah</p>";
fcontent[12]="<p>&quot;Hi, I've only just started using your site and I have to say I'm very excited about it. I have recently become disabled and I've been looking to take up art as a form of activity. I used to dabble in watercolors years ago and now I cant wait to get started as your site is going to be a HUGE help to me and to the quality of my life.<br><br>Thank you so much.&quot; </p><p>John</p>";
fcontent[13]="<p>&quot;Hi Mitch: I do enjoy your newsletter. Every so often I get the urge to draw, and your easy instructions are great to follow. I am in my 80's and I feel never too old to learn a new craft. Thank you. Love your videos.&quot;</p> <p>Margaret (never too old to draw!)</p>";
fcontent[14]="<p>&quot;Just wanted to say how good I think your Figure Drawing Head Video Course is.  I think the 3D sphere with the guides on it that you created in Lesson 1 is a really good idea.  I struggle trying to imagine the head rotated in different positions and being able to see your 3d guide was a big help. Many thanks for a great site.&quot;</p> <p>Marian</p>";
fcontent[15]="<p>&quot;I read your 'About Me' section. You are a very generous, caring young man. Thank you, for all that you do!!!&quot;</p> <p>From a Mom in Las Vegas, NV</p>";
fcontent[16]="<p>&quot;My grand daughter sent a picture message of a girl she drew and then called and wanted to know how to make it better.  I signed on to my computer in Florida and sent her, in Arkansas, to your web site.<br><br>We spent the afternoon messaging back and forth as she went through your tutorial on drawing faces.  I cannot thank you enough for giving us the chance to bond over a common interest.  Your lesson was just right for a very bright 12 yr. old and 65 yr. old me.  She improved greatly and can't wait for me to visit!&quot;</p> <p>Maggie</p>";
fcontent[17]="<p>&quot;Hi Mitch: I did my first drawing on Saturday and was amazed that it actually looked like a real person!  I've purchased several drawing books and even taken drawing classes but nothing put it together for me until I came upon your site.  The last class I took was supposedly a beginning drawing class but I got tired of drawing sausage size arms and legs so I dropped out.<br><br>But after trying your first lesson I'm really excited about drawing for the first time. Thanks!&quot;</p> <p>Sandifitz</p>";
fcontent[18]="<p>&quot;Mitch, Just a note to say THANKS for your over-the-top WONDERFUL website!  I've learned a whole lot from it and will continue, Lord willing, to improve my drawing skills.  Your email format is great - on behalf of all those who won't take the time to write you a note, THANKS from all of us artists or wannabe artists!&quot;</p> <p>Vicki G.</p>";
fcontent[19]="<p>&quot;Hi, I had a look at your website and I must say I am very impressed. I spent only 45 mins looking at it and I can already draw a rabbit, a duck and a horse. The layout is easy to understand and very very helpfull.<br><br>So thankyou very much for such a great site. Yours thankfully,&quot; </p><p>Karuo</p>";
fcontent[20]="<p>&quot;Hi Lecturer Bowler, Thank you very much for this coaching. It has really driven me far in my drawing life. Thanks very much. I can't stop thanking you for the coaching. You are a really good lecturer. Thanks.&quot; </p><p>Goody</p>";
fcontent[21]="<p>&quot;Hello.. I accidently ran into your site here.. and I've learned so much.. I love your webpage and am sending it to friends I know. Thanxxxx!&quot; </p><p>Debi, United States</p>";
fcontent[22]="<p>&quot;I love DrawingCoach.com!&quot;</p> <p>Ashley</p>";
fcontent[23]="<p>&quot;Hi Mitch, I am a university student doing industrial fine art at Makerere university (Uganda) eastern Africa. God bless you and the things plus services you provide. Waiting to hear from you again.&quot; </p><p>Kataate R., Uganda</p>";
fcontent[24]="<p>&quot;Hello, I would just like to inform you how helpful this site has been for me. Although, some of the topics are in no way for beginners as suggested, but contain precious tips and guidelines for part-time 15 yr-old artists like my self.<br><br>I went through the portrait part and although I thought I did good enough, I friggin' surprised my self after only 2 hours!! So, a big THANKYOU from me!&quot; </p><p>Ali</p>";
fcontent[25]="<p>&quot;I really like your step by step drawing I have drawn almost all of your drawing I'm only 10 years old but I'm an artist and I showed people the stuff I have drew and they love it.&quot;</p> <p>Morgan</p>";
fcontent[26]="<p>&quot;Hey, I think your drawings are amazing.  When I grow up I want to open my own art studio.  I'm on the computer right now and watching you and drawing with you.&quot;</p> <p>Alex</p>";
fcontent[27]="<p>&quot;This is a very fantastic site that I like very much to learn more about drawing.&quot;</p> <p>Gogo</p>";
fcontent[28]="<p>&quot;Thank you so much for sharing your knowledge in drawing - i learned a lot from your site. I really liked the caricature section and I wish I could learn more...<br><br>Thank u so much!&quot;</p> <p>Orly</p>";
fcontent[29]="<p>&quot;Your drawings are helpful and easy, simple and SMART!&quot; </p><p>Jordan</p>";
fcontent[30]="<p>&quot;Hello, today my art teacher show my class this website and showed us the human head video and we had to try to draw it. I think mine was quite good.&quot; </p><p>Rachel - p.s i think your such a good artist.</p>";
fcontent[31]="<p>&quot;I think you're a awesome Artist and i really like your website it helps me a lot! Thanks.&quot; </p><p>Ty</p>";
fcontent[32]="<p>&quot;Thank you very much again Mitch! Your works are quite effective and I am quite pleased finally after years of frustration and angst.  If there is anything I can do for you, let me know... Your lessons have been a lifesaver for someone such as me. Blessings,&quot; </p><p>Steve</p>";
fcontent[33]="<p>&quot;Hey Mitch - Just stumbled upon your site, well done! I am 32 years old and just took up a very old hobby of mine again, comic books! I've always loved them and have always liked to sketch but never had any support.  It's my hopes that through you I may be able to completely sketch out a superhero, in many different positions.<br><br>Cheers and the first lesson was great, have already knocked out multiple heads ;)&quot; </p><p>Russ, United States</p>";
fcontent[34]="<p>&quot;Thank you very much for everything Mitch! I never wrote it to you, but trust, that you have helped me really much.&quot; </p><p>Antonin</p>";
fcontent[35]="<p>&quot;I just wanted to say thank you for this site. It is awesome. I am a woodworker that incorporates inlay/marquetry work into my pieces, your explanation of contour drawing and examples have enabled me to incorporate great reproductions of nature into my work. Thank you very much.&quot; </p><p>Michael B., United States</p>";
fcontent[36]="<p>&quot;Mitchell, just came across your site today. I've read and followed all of Betty Edwards' books. Then went to Lee Hammond's grid method of pencil portrait. I believe with the tutelage from your site, I will finally leave the grid behind. Have done the first 2 portrait tutorials. Thanks for your time and effort in putting out this site.&quot;</p> <p>Allen</p>";
fcontent[37]="<p>&quot;Hi Mitch, I have been watching your video re: facial proportions.  I am very much enjoying your instructions on drawing and I'm finding I improve with each practice thanks to your guidance.  Keep up the good work.&quot; </p><p>Alice</p>";
closetag='';

var fwidth='150px'; //set scroller width
var fheight='440px'; //set scroller height

var fadelinks=0;  //should links inside scroller content also fade like text? 0 for no, 1 for yes.

///No need to edit below this line/////////////////


var ie4=document.all&&!document.getElementById;
var DOM2=document.getElementById;
var faderdelay=0;
var index=Math.floor(Math.random()*fcontent.length);


/*Rafael Raposo edited function*/
//function to change content
function changecontent(){
  if (index>=fcontent.length)
    index=0
  if (DOM2){
    document.getElementById("fscroller").style.color="rgb("+startcolor[0]+", "+startcolor[1]+", "+startcolor[2]+")"
    document.getElementById("fscroller").innerHTML=begintag+fcontent[index]+closetag
    if (fadelinks)
      linkcolorchange(1);
    colorfade(1, 15);
  }
  else if (ie4)
    document.all.fscroller.innerHTML=begintag+fcontent[index]+closetag;
  index++
}

// colorfade() partially by Marcio Galli for Netscape Communications.  ////////////
// Modified by Dynamicdrive.com

function linkcolorchange(step){
  var obj=document.getElementById("fscroller").getElementsByTagName("A");
  if (obj.length>0){
    for (i=0;i<obj.length;i++)
      obj[i].style.color=getstepcolor(step);
  }
}

/*Rafael Raposo edited function*/
var fadecounter;
function colorfade(step) {
  if(step<=maxsteps) {	
    document.getElementById("fscroller").style.color=getstepcolor(step);
    if (fadelinks)
      linkcolorchange(step);
    step++;
    fadecounter=setTimeout("colorfade("+step+")",stepdelay);
  }else{
    clearTimeout(fadecounter);
    document.getElementById("fscroller").style.color="rgb("+endcolor[0]+", "+endcolor[1]+", "+endcolor[2]+")";
    setTimeout("changecontent()", delay);
	
  }   
}

/*Rafael Raposo's new function*/
function getstepcolor(step) {
  var diff
  var newcolor=new Array(3);
  for(var i=0;i<3;i++) {
    diff = (startcolor[i]-endcolor[i]);
    if(diff > 0) {
      newcolor[i] = startcolor[i]-(Math.round((diff/maxsteps))*step);
    } else {
      newcolor[i] = startcolor[i]+(Math.round((Math.abs(diff)/maxsteps))*step);
    }
  }
  return ("rgb(" + newcolor[0] + ", " + newcolor[1] + ", " + newcolor[2] + ")");
}

if (ie4||DOM2)
  document.write('<div id="fscroller" style="width:'+fwidth+';height:'+fheight+'"></div>');

if (window.addEventListener)
window.addEventListener("load", changecontent, false)
else if (window.attachEvent)
window.attachEvent("onload", changecontent)
else if (document.getElementById)
window.onload=changecontent

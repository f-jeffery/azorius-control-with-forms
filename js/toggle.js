document.getElementById("toggle-mode").addEventListener("click", function(){
    toggle_dark_mode("css/alt.css");
  })
  
  function toggle_dark_mode(href, onOff)
  {
    var currentSheet = 0;
    for(var i = 0; i < document.styleSheets.length; i++)
    {
      if(document.styleSheets[i].href)
        {
          console.log(document.styleSheets[i].href)
          console.log(href);
          if(document.styleSheets[i].href.indexOf(href) > -1)
          {
            console.log(document.styleSheets[i].ownerNode);
            currentSheet = document.styleSheets[i].ownerNode;
          }
        }
    }
    if(onOff == undefined) 
      {
        onOff = !currentSheet;
      }
    if(onOff)
    {
      if(currentSheet) return onOff;
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = href;
      document.getElementsByTagName('head')[0].appendChild(link);
      document.getElementById("toggle-mode").innerHTML = "Toggle Dark Mode";
    } else { //TURN OFF:
      if (currentSheet) currentSheet.parentNode.removeChild(currentSheet)
      document.getElementById("toggle-mode").innerHTML = "Toggle Light Mode";
    }
    return onOff
  }
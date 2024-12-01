/*
Changes
1. shortened query selector
2. separated the light mode toggle out into a different js doc
*/

let contentSections=["nature", "friends", "mtg", "help", "logvisit"];
let navElements=document.querySelectorAll('div > div')

navElements[0].addEventListener("click", function(){
    window.scrollTo({top: 0, behavior: 'smooth'});
})

for (let i = 1; i < navElements.length; ++i) {
      
        navElements[i].addEventListener("click", function(ev){  
          //remove selected class from all menu items
          for (let i = 0; i < navElements.length; i++) {
            navElements[i].classList.remove("selected");
          }
          //add selected class to menu item that was clicked
          let el = ev.currentTarget;
           el.classList.add('selected');

          //now hide all content sections
          for(section of contentSections){
             let el = document.getElementById(`${section}Section`);
             el.classList.remove("show");
             el.classList.add("hide");
           }
          //now show the one content section
          let name=`${el.id}Section`
          let showEl=document.getElementById(name);
          if(showEl != null)
          {
            showEl.classList.add('show');
            showEl.classList.remove("hide");
            showEl.scrollIntoView({behavior: "smooth", block: "start", inline:"nearest"});
          }
        });
     
  }
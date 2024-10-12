var popup;
var bg;
var idspan;
var text;

const news = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet asperiores aut nihil!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. A, alias.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam hic, ipsa, ullam, cupiditate eveniet at voluptate corrupti commodi nobis ratione voluptatem! Vel animi totam cupiditate doloribus ad ab exercitationem officia eveniet impedit? Deleniti quasi nisi consectetur perspiciatis quibusdam nostrum, enim perferendis nam, magni molestias recusandae id libero vitae, repudiandae praesentium."
];
var popup_open = false;

function openPopup(id){
    popup = document.getElementById("NewsPopup");
    bg = document.getElementById("BG");
    
    idspan = document.getElementsByClassName("NewsID");
    let idtext = id.toString();
    idspan[0].textContent = id.toString();
    idspan[1].textContent = id.toString();
    text = document.getElementById("NewsText");
    text.textContent = news[id-1];

    let newheight = popup.offsetHeight / 2;
    popup.style.top = "calc(50% - " + newheight.toString() + "px)";

    popup.style.visibility = "visible";
    bg.style.visibility = "visible";
    popup_open = true;
}
function closePopup(){
    if(popup_open){
        popup.style.visibility = "hidden";
        bg.style.visibility = "hidden";
    }
}
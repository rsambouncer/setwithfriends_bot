function cardElement(n){
  return document.getElementsByClassName("MuiPaper-elevation1")[1].children[n];
}

function check(n){
  return cardElement(n).style.visibility==="visible";
}

function clickEl(n){
  cardElement(n).children[0].click();
}

function isSelected(n){
  return cardElement(n).children[0].classList.length===3;
}

function fade(n){
  cardElement(n).style["background-color"] = "black";
}

function unfade(n){
  cardElement(n).style["background-color"] = "white";
}


let poss = [[0,0,0],[1,1,1],[2,2,2],[1,2,0],[1,0,2],[2,1,0],[2,0,1],[0,1,2],[0,2,1]];
let currentSolution = {n1:-1,n2:-1,n3:-1};

function hasOverlap(a,b,c){
  return a===currentSolution.n1||a===currentSolution.n2||a===currentSolution.n3||
         b===currentSolution.n1||b===currentSolution.n2||b===currentSolution.n3||
         c===currentSolution.n1||c===currentSolution.n2||c===currentSolution.n3;
}


function lookForSets(avoidOverlap){
  outerloop: for(let a=0;a<9;a++){
  for(let b=0;b<9;b++){
  for(let c=0;c<9;c++){
  for(let d=0;d<9;d++){
    let n1 = 27*poss[a][0] + 9*poss[b][0] + 3*poss[c][0] + poss[d][0] + 1;
    let n2 = 27*poss[a][1] + 9*poss[b][1] + 3*poss[c][1] + poss[d][1] + 1;
    let n3 = 27*poss[a][2] + 9*poss[b][2] + 3*poss[c][2] + poss[d][2] + 1;
    
    if((n1!=n2||n2!=n3)&&check(n1)&&check(n2)&&check(n3)&&(!(avoidOverlap&&hasOverlap(n1,n2,n3)))){
      currentSolution = {n1:n1,n2:n2,n3:n3};
      break outerloop;
    }
    
  }}}}
  
  if(!avoidOverlap){
    for(let a=1;a<82;a++) unfade(a);
    fade(currentSolution.n1);
    fade(currentSolution.n2);
    fade(currentSolution.n3);
  }
}

function autoClick(){
  if(currentSolution.n1<1||currentSolution.n2<1||currentSolution.n3<1) return;
  for(let a=1;a<82;a++) if(isSelected(a)) clickEl(a); //deselect all cards
  clickEl(currentSolution.n1);
  clickEl(currentSolution.n2);
  clickEl(currentSolution.n3);
}


document.addEventListener("keypress", function(e){ 
  if(e.key===" ") lookForSets(false); //space
  if(e.key==="m"){ lookForSets(true); autoClick();} //m key
});




function cardElement(n){
  return document.getElementsByClassName("MuiPaper-elevation1")[1].children[n];
}

function check(n){
  return cardElement(n).style.visibility==="visible";
}

function clickEl(n){
  cardElement(n).children[0].click();
}

let poss = [[0,0,0],[1,1,1],[2,2,2],[1,2,0],[1,0,2],[2,1,0],[2,0,1],[0,1,2],[0,2,1]];
let currentSolution = {n1:-1,n2:-1,n3:-1};
let completes = new Array(82); //the cards that have been used in sets already

function reset(){
  for(let a=0;a<completes.length;a++) completes[a] = false;
}

//loop through all possibilities to find a solution on the board
function lookForSets(){ 
  currentSolution = {n1:-1,n2:-1,n3:-1};
  outerloop: 
  for(let a=0;a<9;a++){
  for(let b=0;b<9;b++){
  for(let c=0;c<9;c++){
  for(let d=0;d<9;d++){
    let n1 = 27*poss[a][0] + 9*poss[b][0] + 3*poss[c][0] + poss[d][0] + 1;
    let n2 = 27*poss[a][1] + 9*poss[b][1] + 3*poss[c][1] + poss[d][1] + 1;
    let n3 = 27*poss[a][2] + 9*poss[b][2] + 3*poss[c][2] + poss[d][2] + 1;
    
    if((n1!=n2||n2!=n3)&&!completes[n1]&&!completes[n2]&&!completes[n3]&&check(n1)&&check(n2)&&check(n3)){
      currentSolution = {n1:n1,n2:n2,n3:n3};
      break outerloop;
    }
    
  }}}}
}

function autoClick(){
  if(currentSolution.n1<1||currentSolution.n2<1||currentSolution.n3<1) return;
  clickEl(currentSolution.n1);
  clickEl(currentSolution.n2);
  clickEl(currentSolution.n3);
  completes[currentSolution.n1] = true;
  completes[currentSolution.n2] = true;
  completes[currentSolution.n3] = true;
}


function doWholeGame(n){
  if(n<=0) return;
  lookForSets(); 
  autoClick();
  window.setTimeout(()=> doWholeGame(n-1), 5);
}

document.addEventListener("keypress", function(e){ 
  if(e.key===" "){ reset(); doWholeGame(50); }
});




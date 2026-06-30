/*
<button>Click</button> 요소를 선택해서 
button 상수에 저장 
*/ 

const button = document.querySelector("button");

/*
참고. 선택한 요소에 특정 이벤트 등록 후 처리하는 이벤트 처리 문법 
     선택한요소.on등록할이벤트 종류명 = function(){
    
        등록한 이벤트 발생시 처리할 코드; 
    };

2. 1에서 선택한 <button>Click</button>요소에 click 이벤트 등록  후 이벤트 처리
   click 이벤트 등록 후 이벤트 처리 
*/ 

button.onclick = function(){

    //<body></body> 요소를 가져와 배경색 녹색 ㄱㄱ
    document.body.style.backgroundColor = "green";

};
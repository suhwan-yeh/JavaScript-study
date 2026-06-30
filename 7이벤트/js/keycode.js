/*
body 요소 선택 후 저장
*/

const body = document.body;

/*
div 요소 선택후 저장
*/ 

const result = document.querySelector("#result");

/*
선택한 바디요소에 키보드의 키를 누르고 있는 동작 keydown 등록해
사용자가 키를 누르고 있는 동작을 실행할때마다 이벤트핸들러 함수가 호출되어 실행되게 작성하자
*/ 

body.addEventListener("keydown", (event)=>{

    /*3.1. <body></body> 영역을 보면서 키보드의 어떤 키를 누르고 있는 동작을 하는지 출력*/ 
    result.innerText = `code : ${e.code}, key : ${e.key}`;
});


/*
addEventListener 메소드 사용하여 이벤트 등록

작성 문법 
        요소선택.addEventListener("이벤트종류1 이벤트 종류2", 이벤트핸들러함수, 옵션);
    참고 : {once : true} -> 선택한요소에 이벤트 종류 등록하면 
          {capture : true}
          {capture : false}
*/
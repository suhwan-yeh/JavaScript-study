/*
    1. button 요소 선택해서 button 상수 저장
*/ 
const button = document.querySelector("button");

/*

    2. 선택한 button 요소에 click 이벤트 등록,
        click 이벤트가 발생하면 자동으로 호출될 이벤트 핸들러 함수 연결

*/ 
button.onclick = changeBackground;

/*
    3. click 이벤트가 발생하면 처리할 이벤트 핸들러 함수 외부 따로 정의
*/
function changeBackground(){

    document.body.style.backgroundColor = "green";

}
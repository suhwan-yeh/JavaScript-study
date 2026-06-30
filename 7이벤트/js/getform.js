/*
<select name="major" id="major">
							<option>---- 학과 선택 ----</option>
							<option value="archi">건축공학과</option>
							<option value="mechanic">기계공학과</option>
							<option value="indust">산업공학과</option>
							<option value="elec">전기전자공학과</option>
							<option value="computer">컴퓨터공학과</option>
							<option value="chemical">화학공학과</option>
						</select>


1.사용자가 학과 선택 할 수 있는 위 select 한쌍을 선택해서 가져와 상수에 저장 

*/
const selectMenu = document.querySelector("#major");
/*

2. 위에서 선택한 <select> 내부에 작성된 <option>들 중에서 하나의 option 선택한 동작
    change 이벤트를 select에 등록
*/ 

selectMenu.onchange = function(){
/*
2.1. 선택한 option 텍스트노드를 가져와 변수에 저장 

        풀이1. selectMenu.options 속성을 호출하면
               모든 option 요소ㅡㄹ을 포함하고 있는 유사 배열 반환 
        풀이2. selectMenu.selectedIndex 속성을 호출하면
              현재 선택된 option 요소의 index 위치번호 반환
*/ 
let selectedText = selectMenu.options[selectMenu.selectIndex].innerText;

};

//3. 선택한 option의 텍스트 노드를 알림창에 보여주자 
alert(`${selectedText}를 선택했습니다.`);
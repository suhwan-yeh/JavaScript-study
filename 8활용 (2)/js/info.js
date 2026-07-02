/*
    1) 화면 요소 가져오기 
      
     상품명을 적는 입력칸
*/
    const nameInput =  document.getElementById("nameInput");

/*   가격을 적는 입력칸 */
    const priceInput = document.getElementById("priceInput");

/*  등록 버튼 */
    const addBtn =  document.getElementById("addBtn");

/*  상품을 검색하는 입력칸  */
    const searchInput = document.getElementById("searchInput");

/*  정렬 방식을 고르는 드롭다운 */
    const sortSelect = document.getElementById("sortSelect");
        
/* 상품 목록이 들어갈 표의 본문 (tbody) */
    const table = document.getElementById("productTable");

 /* 총합 금액을 보여주는 글자 영역  */
    const total = document.getElementById("total");

/*
    2) 상품을 저장할 비어 있는 배열 생성
*/
let products = [];

/*
   3) 상품 등록 : 버튼 클릭시 실행되는 로직
   - 입력 검증 : 값이 비었거나 가격이 숫자가 아닌 경우 경고 
   - 상품 객체를 만들고 배열(products)에 추가
   - 입력창을 비우고 전체 HTML을 다시 브라우저가 읽어들이게 하자. 
*/
addBtn.addEventListener("click", () => {

    //1> 사용자가 입력칸에 적은 값을 꺼내옵니다.
    //    .value        = 입력칸에 적힌 내용
	//    .trim()       = 글자 앞뒤의 불필요한 공백(스페이스)을 잘라냄 ("  사과 " → "사과")
	//    Number(...)   = 글자로 된 숫자("1000")를 진짜 숫자(1000)로 바꿔줌 (계산하려면 필요)
    const name = nameInput.value.trim();  //입력한 상품명
    const price = Number(priceInput.value);//입력한 가격을 숫자로 변환해서 저장 
    
    //2> 잘못 입력했는지 검사 합니다.(하나라도 이상하면 등록을 멈춤)
    //  !name -> 이름이 비어 있으면 true
    //  !price -> 가격이 0, 빈칸, 숫자가 아님(NaN) 이면 true
    //  || 는 '또는' 이라는 뜻 → 둘 중 하나라도 문제면 경고창을 띄우고 return으로 함수를 끝냄
	//  (실무에서는 음수 가격 막기 등 더 꼼꼼히 검사합니다.)
    if(!name  || !price){
        alert("상품명과 가격을 올바르게 입력하세요"); //화면에 경고 메세지 팝업
        return; //() => {} 함수 즉시 종료
    }

    //3> 이 상품만의 고유번호(id)를 만듭니다.
    //   Date.now()    =  지금 시각을 아주 큰 숫자(밀리초)로 알려줌 -> 매번 값이 달 거의 겹쳐지지 않음
    //   Math.random() =  0.0 ~ 1 사이의 무작위 실수를 반환 -> 만에 하나 겹치는 것까지 방지 
    //   두 값을 더해  "겹치지 않는 번호" 를 만듭니다.
    const id = Date.now() + Math.random(); 

    //4> 위에서 모든 값들을 상품 객체 하나를 만들어 products 빈 배열에 추가 
    //방법  push(추가할 상품정보 객체)  <- 배열 맨 뒤에 새 항목을 추가 
    products.push( {id : id,  name : name, price : price} );
    //[  {id : id,  name : name, price : price},   {id : id,  name : name, price : price}  ]
    
    //5> 다음 상품을 편하게 입력하도록 입력칸을 비웁니다. (빈 문자열 ""로 넣는다.)
    nameInput.value = "";      priceInput.value = "";

    //6> 화면을 다시 그립니다.
    //   products 배열의 데이터가 바뀌었으니, 그 내용에 맞춰 표와 총합을 새로 그려주는 render() 호출
    render();
});

/*
 7) render() 함수
   - 역할 : 현재 products 배열 상태에 맞춰 화면(테이블)과 총합을 다시 그리는 함수
   - 동작순서 요약:
    1) 테이블 초기화
    2) 검색어로 products 배열에서 꺼내서 보여줄 목록을 고름(filter)
    3) 정렬을 적용(sort)
    4) 화면에 행을 하나씩 추가 
    5) 각 행의 삭제 버튼에 이벤트 연결(id기반 삭제)
    5) 총합을 계산해 화면에 갱신 
*/
function render(){

    //1> 테이블 표안<tbody></tbody>의 기존 내용을 전부 지웁니다.
    table.innerHTML = "";

    //2> 검색칸에 입력된 검색어를 읽어옵니다.
    //    trim() = 앞뒤 공백 제거,  toLowerCase() = 모두 소문자로 통일
	//    → 대소문자를 구분하지 않고 검색되게 하기 위함 ("APPLE"이든 "apple"이든 동일 취급)
    const keyword = searchInput.value.trim().toLowerCase();

    //3> 전체 상품 중 '검색어("사과")가 이름에 포함된 상품'만 골라 보여줄 목록을 만듭니다.
    //[  {id : 1,  name : "빼빼로", price : 1000},   {id : 2,  name : "사과", price : 500}  ]  <-products 배열
    //
   	//    includes("사과") = 문자열 안에 "사과"가 들어 있으면 true
	//    검색칸이 비어 있으면 keyword가 "" 이고, 모든 이름이 ""를 포함하므로 전체가 보입니다.
    let displayList = products.filter(item =>  item.name.toLowerCase().includes(keyword) );

	// ----------------------------------------------------------
	// 4> 선택된 목록(displayList)에 정렬 적용하는 부분
	// ----------------------------------------------------------
	// sortSelect.value는 <select> 태그에서 사용자가 선택한 옵션 값입니다.
	// 예: <option value="asc">가격 낮은 순</option>
	//	   <option value="desc">가격 높은 순</option>
	//
	// 즉, 사용자가 "가격 낮은 순"을 선택했는지,
	// 아니면 "가격 높은 순"을 선택했는지를 확인하여
	// 그에 맞게 배열(displayList)을 정렬하는 기능입니다.
	// ----------------------------------------------------------

    //만약 사용자가 "가격 낮은순"(asc) 을 선택한 경우
    if(sortSelect.value === "asc"){

	    // displayList.sort(...)는 배열을 정렬하는 자바스크립트 함수입니다.
	    // sort 안에 들어가는 (a, b) => a.price - b.price 는 **정렬 기준 함수**입니다.
	    //
	    // 정렬 기준 함수는 다음처럼 작동합니다:
	    // 1) 배열의 요소 2개(a, b)를 비교함
	    // 2) a.price - b.price 의 결과가
	    //      - 음수면  a 가 b보다 먼저 위치해야 한다
	    //      - 양수면  b 가 a보다 먼저 위치해야 한다
	    //      - 0이면 두 값의 순서를 바꿀 필요 없다
	    //
	    // 따라서:
	    //   작은 가격 - 큰 가격 = 음수  → 작은 값이 앞으로 감 (오름차순)
	    //   큰 가격 - 작은 가격 = 양수  → 큰 값이 뒤로 감 (오름차순)
	    //
	    // 예: price: 1000, 3000, 2000 이 있다고 했을 때:
	    //   (1000-3000) = -2000 → 1000이 더 앞
	    //   (3000-2000) = 1000  → 2000이 더 앞
	    //
	    // 결국 전체가 "가격 낮은 순"으로 정렬됩니다.
        displayList.sort( (a, b) =>  a.price - b.price );


    }else if(sortSelect.value === "desc"){//사용자가 "가격 높은순(desc)을 선택한 경우"

	    // 이번에는 비교 방식이 정반대입니다.
	    // (a, b) => b.price - a.price
	    //
	    // 같은 논리지만 순서가 반대로 적용됩니다:
	    //   큰 값 - 작은 값 = 양수  → 큰 값이 앞으로 온다
	    //   작은 값 - 큰 값 = 음수  → 작은 값이 뒤로 간다
	    //
	    // 즉, displayList가 "가격 높은 순"으로 정렬됩니다.
	    //
	    // 예: price: 1000, 3000, 2000 이 있다고 하면:
	    //   (3000-1000) = 2000 → 3000이 더 앞
	    //   (2000-1000) = 1000 → 2000이 더 앞
	    //
	    // 최종 결과 → 3000, 2000, 1000 (내림차순)
        displayList.sort( (a, b) => b.price - a.price );

    }

    //5) 화면 표에 상품 한 줄씩 추가하면서, 동시에 가격을 더해서 총합을 구합니다.
    let sum = 0; // 가격을 차곡차곡 더해 나갈 '누적통' (0에서 시작) 

	// forEach = 목록(displayList)의 상품을 처음부터 끝까지 하나씩 꺼내 처리
	// item = 지금 처리 중인 상품 하나 (예: { id:아이디, name:상품명, price:가격 })
    displayList.forEach((item)=>{

          //a) 표의 한행 <tr></tr> 생성
           const tr = document.createElement("tr");

          //b) 상품명 칸 <td>상품명</td> 생성
           const tdName = document.createElement("td");
           tdName.textContent = item.name;

          //c) 가격 칸 <td>120,000원</td> 생성
           const tdPrice = document.createElement("td");
           tdPrice.textContent = item.price.toLowerCase() + "원"; 
        	                      //    toLocaleString(): 숫자에 천 단위 쉼표를 넣어 읽기 쉽게 바꿔줌 (120000 → "120,000")

          //d) 삭제 칸 <td></td> 생성,  <button>삭제</button> 생성 
          const  tdDelete = document.createElement("td");
          const  btn = document.createElement("button");
          btn.textContent = "삭제";

    });

}

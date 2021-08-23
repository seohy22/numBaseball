const createNum = document.querySelector('#start');
const inputForm = document.querySelector('#inputForm');
const inputNums = document.querySelector('#inputNums');
const ranNumArr = [];
const userNumArr = [];
let number;
let life = 10;
let strike = 0;
let ball = 0;

// 초기번호 생성
// 번호생성 클릭 시 임의 번호 4자리 생성합니다.
createNum.addEventListener('click', function(){
    for(let i=0; i<4; i++){
        let ranNum = Math.floor(Math.random() * 10);
        ranNumArr[i] = ranNum;
        // i=0일때는 패스(첫 값이므로 중복 없음)
        if(i==0){
            continue;
        // 다음 뽑은 숫자가 중복 값이라면 다시 뽑습니다
        }else if(ranNumArr.includes(ranNum)){
            while(1){
                ranNum = Math.floor(Math.random() * 10);
                if(!ranNumArr.includes(ranNum)){
                    ranNumArr[i] = ranNum;
                    break;
                }
            }
        }
    }
    //arr값 확인용
    console.log(ranNumArr);
});

//예외검증
//썼던 값 검증안함
let checkNum = number => {
    if(number.length !== 4){
        return alert("4자리 숫자 입력하세요");
    }
    if(new Set(number).size !== 4){
        return alert("중복되지 않는 값을 입력해주세요");
    }
    return true;
}

//입력버튼 클릭이벤트
inputForm.addEventListener('submit',(event) => {
    event.preventDefault();
    number = inputNums.value;
    if(!checkNum(number)) {
        return;
    }
    //유저가 입력한 값을 숫자로 변환해 arr에 넣습니다.
    for(i=0;i<4;i++){
        userNumArr[i] = Number(number[i]);
    }

    //랜덤값과 입력값이 같은지 비교합니다. 맞으면 정답 리턴 틀리면 비교 후 strike 및 ball값 누적
    //표출 후 strike,ball 초기화, life 감소
    if(JSON.stringify(ranNumArr) === JSON.stringify(userNumArr)){
        alert("정답입니다!");
    }else{
        for(i=0;i<4;i++){
            if(ranNumArr[i] == userNumArr[i]){
                strike++;
            }else if(ranNumArr.includes(userNumArr[i])){
                ball++;
            }
        }
        console.log(userNumArr.join('')+ "\t" + strike +"스트라이크 " + ball + "볼");
        ball=0;
        strike=0;
        life--;
    }

    if(life==0){
        alert("실패입니다");
        life=10;
    }
        // for(i=0;i<4;i++){
        //     if(ranNumArr[i] == Number(number[i])){
        //         console.log("동일합니다")
        //     }
        // }
})


// for (let i =0; i<4;i++){
//     if(a[i] == b[i]) {
//         console.log("스트라이크");
//     }else if(a.includes(b[i])){
//         console.log("볼");
//     }
// }
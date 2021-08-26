const createNum = document.querySelector('#start');
const inputForm = document.querySelector('#inputForm');
const inputNums = document.querySelector('#inputNums');
const ul = document.querySelector('#resultUl');
const span = document.querySelector('#life');
const reStartBtn = document.querySelector('#restart');
const gameStart = document.querySelector('#content');

const ranNumArr = [];
const userNumArr = [];
// let cond = false;
let number;
let life = 10;
let strike = 0;
let ball = 0;
// 초기번호 생성
// 번호생성 클릭 시 임의 번호 4자리 생성합니다.
createNum.addEventListener('click', function(){
    // cond=true;
    createNum.disabled = true;
    gameStart.style.display ='block';
    createNum.style.display = 'none';
    inputNums.value = null;
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

    // if(cond != true){
    //     return alert("시작버튼을 눌러주세요!");
    // }

    //입력한 값을 숫자로 변경이 안되거나 띄어쓰기, .가 포함되있을 경우 예외처리
    if(!Number(number) || number.includes(' ') || number.includes('.')){
        return alert("숫자만 입력해주세요");
    }
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
    //결과 출력 후 strike,ball 초기화, life 감소
    if(JSON.stringify(ranNumArr) === JSON.stringify(userNumArr)){
        alert("정답입니다!");
        span.textContent = '성공!';
        // life = 10;
        endSetting();
    }else{
        for(i=0;i<4;i++){
            if(ranNumArr[i] == userNumArr[i]){
                strike++;
            }else if(ranNumArr.includes(userNumArr[i])){
                ball++;
            }
        }
        life--;
        let viewNum = userNumArr.join('');
        viewResult(viewNum,strike,ball,life);
        console.log(userNumArr.join('')+ "\t" + strike +"S" + ball + "B"); // 데이터 검증용
        ball=0;
        strike=0;
    }
    if(life==0){
        endSetting();
        span.innerHTML = "실패";
        inputNums.placeholder ="정답: "+ranNumArr.join('');
    }
})

//입력 결과 값을 뿌려줍니다 (li)
const viewResult = (viewNum,strike,ball,life) =>{
    const li = document.createElement("li");
    if(strike == 0 && ball == 0){
        li.appendChild(document.createTextNode(viewNum+"\t"+"OUT"));
    }else{
        li.appendChild(document.createTextNode(viewNum+"\t"+strike+"S"+" "+ball+"B"));
    }
    ul.appendChild(li);
    span.innerHTML = life+"회";
    inputNums.value = null;
}

const endSetting = () => {
    inputNums.disabled = true;
    // inputBtn.disabled = true;
    reStartBtn.style.display ='block';
}
reStartBtn.addEventListener('click',() => {
    location.reload(true);
});
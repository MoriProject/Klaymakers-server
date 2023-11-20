import abi from './ContractABI.json';
const Caver = require('caver-js');

// Klaytn 네트워크에 연결
const caver = new Caver('https://api.baobab.klaytn.net:8651');

// 스마트 계약 주소
const contractAddress = '0x15134915C56d974550059a1682f94535bA55D6D1';

// 스마트 계약 ABI (스마트 계약 함수 및 이벤트 인터페이스 정의)
const contractAbi = abi; // 스마트 계약의 ABI를 여기에 입력

// 스마트 계약 인스턴스 생성
const contract = new caver.klay.Contract(contractAbi, contractAddress);
export default contract;
// 스마트 계약 함수 호출 예시
// contract.methods.someFunction().call()
//     .then(result => {
//         console.log('스마트 계약 함수 결과:', result);
//     })
//     .catch(error => {
//         console.error('오류 발생:', error);
//     });

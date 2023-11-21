import Web3 from 'web3';
import abi from './ContractABI.json';
// const Caver = require('caver-js');

// Klaytn 네트워크에 연결
const web3 = new Web3(window.ethereum);
// const caver = new Caver('https://public-en-baobab.klaytn.net/')
// const caver = new Caver(window.ethereum);

// 스마트 계약 주소
const contractAddress = '0x30C78015e1098d316c39F3303341bA8d08bF93CA';

// 스마트 계약 ABI (스마트 계약 함수 및 이벤트 인터페이스 정의)
const contractAbi = abi;

// 스마트 계약 인스턴스 생성
const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);
console.log('Contract object:', contractInstance);

export default contractInstance;
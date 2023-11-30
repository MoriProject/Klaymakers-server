import Web3 from 'web3';
import abi from './ContractABI.json';

// klaytn baobab endpoint
const klaytnNodeEndpoint = 'https://api.baobab.klaytn.net:8651';

// klaytn 네트워크에 연결
const web3 = new Web3(window.ethereum);
// const web3 = new Web3(klaytnNodeEndpoint);

// 스마트 계약 주소
const contractAddress = '0xdbEE6A39ac4084EE45DD8a2e4771D74523670e12';

// 스마트 계약 ABI (스마트 계약 함수 및 이벤트 인터페이스 정의)
const contractAbi = abi;

// 스마트 계약 인스턴스 생성
const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);
// console.log('Contract object:', contractInstance);

export default contractInstance;
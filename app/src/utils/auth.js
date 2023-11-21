import web3 from 'web3';

export async function loginAccount() {
    if (window.ethereum) {
        try {
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            return accounts[0];
        } catch (error) {
            console.error("Error logging in:", error);
            return null;
        }
    } else {
        console.error("Web3 provider not found.");
        return null;
    }
}
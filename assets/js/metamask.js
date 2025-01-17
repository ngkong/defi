var account

var connectMetamask = async function(){
	
	
	if (typeof window.ethereum == 'undefined' || !ethereum.isMetaMask) {
		
		if (/Mobi|Android/i.test(navigator.userAgent)) {
			Swal.fire(
			  '',
			  'Buka website ini dari aplikasi MetaMask di HP.<br /><br />Belum memiliki MetaMask? Silakan unduh di: <a href="https://metamask.io/download.html" target="_blank">https://metamask.io/download.html</a>.',
			  'info'
			)
			return;
		}
		
		Swal.fire(
		  'Error',
		  'Untuk menggunakan website ini Anda perlu memiliki MetaMask pada browser Anda.<br /><br />Silakan unduh MetaMask di: <a href="https://metamask.io/download.html" target="_blank">https://metamask.io/download.html</a>.',
		  'error'
		)
		return;
	}
	
	var accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	account = accounts[0];
	
	
	const eth_chainId = await ethereum.request({ method: 'eth_chainId' });
	
	if(eth_chainId && eth_chainId!='0x01'){
		console.log('eth_chainId', chainId);
		Swal.fire(
		  'Error',
		  'Service ini hanya mendukung MainNet.',
		  'error'
		);
		return;
	}
	
	web3 = new Web3(ethereum);
	
	$('#btn_connect_metamask').html('Tersambung<span>: '+account+'</span>');
	
	getPrices();
	syncCompAccount(account);
}

ethereum.on('accountsChanged', (accounts) => {
	account = accounts[0];
	
	web3 = new Web3(ethereum);
	
	$('#btn_connect_metamask').html('Tersambung<span>: '+account+'</span>');
	
	getPrices();
	syncCompAccount(account);
});

ethereum.on('chainChanged', (chainId) => {
	console.log('chainChanged', chainId);
	if(chainId && chainId!='0x1'){
		Swal.fire(
		  'Error',
		  'Service ini hanya mendukung MainNet.',
		  'error'
		);
		return;
	}
});
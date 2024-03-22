import "./App.css";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { ethers } from "ethers";

const errorTest = (wallets)=>{
  return new Promise(async (resolve, reject) => {
    try {
      const embeddedWallet = wallets.find((wallet) => (wallet.walletClientType === 'privy'));
      await embeddedWallet.switchChain(137);
      
      const provider = await embeddedWallet.getEthersProvider();
      const signer = provider.getSigner(); // ethers signer object

      const gasPrice = await signer.getGasPrice();
      console.log('getGasPrice ' + gasPrice);

      const _maxFeePerGas = gasPrice.mul(2); 
      const _maxPriorityFeePerGas = _maxFeePerGas; 

      signer.sendTransaction({
        maxFeePerGas: _maxFeePerGas,
        maxPriorityFeePerGas: _maxPriorityFeePerGas,
        to: embeddedWallet.address,
        value: ethers.utils.parseUnits("1", "gwei")
      }).then(res => {
        console.log(res);
        resolve(res);
      }).catch(e => {
          console.log("[exception]" + e);
          reject(e);
      });
    } 
    catch(e){
      console.log("[exception]" + e);
      if (e.message.indexOf('(reading \'switchChain\')') > 0) {
        console.log("privy need login")
        reject('need login');
      } else {
        reject(e);
      }
    }
  })
}

const worksTest = (wallets) => {
  return new Promise(async (resolve, reject) => {
    try {
      const embeddedWallet = wallets.find((wallet) => (wallet.walletClientType === 'privy'));
      await embeddedWallet.switchChain(137);
      
      const provider = await embeddedWallet.getEthersProvider();
      const signer = provider.getSigner(); // ethers signer object

      const gasPrice = await signer.getGasPrice();
      console.log('getGasPrice ' + gasPrice);

      //const _maxFeePerGas = gasPrice.mul(2); 
      //const _maxPriorityFeePerGas = _maxFeePerGas; 

      signer.sendTransaction({
        //maxFeePerGas: _maxFeePerGas,
        //maxPriorityFeePerGas: _maxPriorityFeePerGas,
        to: embeddedWallet.address,
        value: ethers.utils.parseUnits("1", "gwei")
      }).then(res => {
        console.log(res);
        resolve(res);
      }).catch(e => {
          console.log("[exception]" + e);
          reject(e);
      });
    } 
    catch(e){
      console.log("[exception]" + e);
      if (e.message.indexOf('(reading \'switchChain\')') > 0) {
        console.log("privy need login")
        reject('need login');
      } else {
        reject(e);
      }
    }
  })
}

function App() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  const {wallets} = useWallets();
  // Wait until the Privy client is ready before taking any actions
  if (!ready) {
    return null;
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* If the user is not authenticated, show a login button */}
        {/* If the user is authenticated, show the user object and a logout button */}
        {ready && authenticated ? (
          <div>
            <textarea
              readOnly
              value={JSON.stringify(user, null, 2)}
              style={{ width: "600px", height: "250px", borderRadius: "6px" }}
            />
            <br />
            <button onClick={logout} style={{ marginTop: "20px", padding: "12px", backgroundColor: "#069478", color: "#FFF", border: "none", borderRadius: "6px" }}>
              Log Out
            </button>
            <br/>


            <button onClick={async()=>{
              await errorTest(wallets);
            }} style={{ marginTop: "20px", padding: "12px", backgroundColor: "#069478", color: "#FFF", border: "none", borderRadius: "6px" }}>
              error Test
            </button>
            <br/>


            <button onClick={async()=>{
              await worksTest(wallets);
            }} style={{ marginTop: "20px", padding: "12px", backgroundColor: "#069478", color: "#FFF", border: "none", borderRadius: "6px" }}>
              works Test
            </button>
            <br/>

          </div>
        ) : (
          <button onClick={login} style={{padding: "12px", backgroundColor: "#069478", color: "#FFF", border: "none", borderRadius: "6px" }}>Log In</button>
        )}
      </header>
    </div>
  );
}

export default App;

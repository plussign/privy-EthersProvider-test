import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PrivyProvider } from '@privy-io/react-auth';
import { addRpcUrlOverrideToChain } from '@privy-io/react-auth';

import { polygon } from 'viem/chains';

const PolygonRPC = 'https://polygon-mainnet.g.alchemy.com/v2/X_2ZBjbSXqwuFzBj7fVWmLhaBnGA0Hff';
const polygonChain = addRpcUrlOverrideToChain(polygon, PolygonRPC);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PrivyProvider
      appId={process.env.REACT_APP_PRIVY_APP_ID}
      config={
          {
              appearance:
                  {
                      "accentColor": "#6A6FF5",
                      "theme": "dark",
                      "showWalletLoginFirst": true,
                      "logo": 'https://www.turnup.so/logo512.png'
                  },
              //loginMethods: ["google", "apple", "email"],
              captchaEnabled : false,
              defaultChain: polygonChain,
              supportedChains:[polygonChain],
              embeddedWallets: {
                  createOnLogin: "all-users",
                  noPromptOnSignature: true, // defaults to false
                  requireUserPasswordOnCreate: false
              }
          }
      }
      onSuccess={(user) => console.log(`User ${user.id} logged in!`)}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

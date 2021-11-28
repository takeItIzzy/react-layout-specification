import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RLSProvider from '@/providers/RLSProvider';
import Wrapper from '@/components/Wrapper';

function App() {
  return (
    <Wrapper typeKey="toolbar">
      <div>111</div>
      <div>222</div>
      <div>333</div>
    </Wrapper>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <RLSProvider
      themes={{
        settings: {
          space: {
            value: 5,
            unit: 'px',
          },
        },
        elements: [
          {
            typeKey: 'toolbar',
            direction: 'row',
            splitAt: 'search',
            spacing: 1,
          },
        ],
      }}
    >
      <App />
    </RLSProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

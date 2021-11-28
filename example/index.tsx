import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RLSProvider from '@/providers/RLSProvider';
import RLSWrapper from '../src/components/RLSWrapper';

function App() {
  return (
    <RLSWrapper typeKey="toolbar">
      <div>111</div>
      <div>222</div>
      <div>333</div>
    </RLSWrapper>
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
            splitAt: 'search',
          },
        ],
      }}
    >
      <App />
    </RLSProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

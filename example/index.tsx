import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RLSProvider from '@/providers/RLSProvider';
import Wrapper from '@/components/Wrapper';
import Content from '@/components/Content';

function App() {
  return (
    <Wrapper typeKey="toolbar" className="h-[500px]">
      <Content typeKey="content1">111</Content>
      <Content typeKey="content2">222</Content>
      <Content typeKey="search">
        <input type="text" className="border border-black" />
      </Content>
      <Content typeKey="content3">333</Content>
      <Content typeKey="content4">444</Content>
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
            splitAt: 'search',
            spacing: 1,
            order: ['content2', 'content1', 'content3', 'search', 'content4'],
          },
        ],
      }}
    >
      <App />
    </RLSProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

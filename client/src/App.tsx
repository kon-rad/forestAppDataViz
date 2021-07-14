import React, { useState } from 'react';
import './App.css';
import Upload from './components/Upload';
import Table from './components/Table';
import D3Demo from './components/D3Demo';

type A = string[];

const renderDataTable = (data: any): any => {
  return <Table data={data} />;
};

function App({ userId }: { userId: string }) {
  const [data, setData] = useState<Array<A>>([]);
  return (
    <div className="App">
      <header className="App__header">
        <span className="App__title">Study Time Visualized</span>
      </header>
      {data.length === 0 && (
        <div className="App__cont">
          <div className="main__panel">
            <p>Upload your Forest app Data</p>
            <Upload userId={userId} setData={setData} />
            <D3Demo />
          </div>
        </div>
      )}
      {renderDataTable(data)}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import Upload from './components/Upload';
import Table from './components/Table';

type A = string[];

const renderDataTable = (data: any): any => {
  return <Table data={data}/>;
}

function App() {
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
            <Upload setData={setData} />
          </div>
        </div>
      )}
      {renderDataTable(data)}
    </div>
  );
}

export default App;

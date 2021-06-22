
import MaterialTable from "material-table";

type A = string[];

type Props = {
  data: Array<A>;
};

interface rowType {
  [name: string]: string;
}

const Table = ({ data }: Props) => {
  if (!data || data.length === 0) {
    return null;
  }
  const header = data.shift();
  console.log('header: ', header);
  if (!header) return null;
  const columns = header.map(item => ({ title: item, field: item }));
  const rowData:any = [];
  data.forEach(row => {
    const curRow: rowType = {};
    row.forEach((item, i) => {
      const key: string = header[i]
      curRow[key] = item;
    });
    rowData.push(curRow);
  });
  console.log(rowData, columns);
  return (
      <div>
        <h4>Table View:</h4>
        <div>
          <MaterialTable columns={columns} data={rowData} />
        </div>
      </div>
    )
}
export default Table;
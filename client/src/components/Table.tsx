
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
  const header = data[0].slice();
  if (!header) return null;
  const columns = header.map(item => ({ title: item, field: camelize(item) }));
  const rowData:any = [];
  data.forEach((row, i) => {
    if (i === 0) {
      return;
    }
    const curRow: rowType = {};
    row.forEach((item, i) => {
      const key: string = camelize(header[i]);
      let value = item
      if (key === 'startTime' || key === 'endTime') {
        const dObj: Date = new Date(item);
        value = `${dObj.getDate()}/${dObj.getMonth() + 1}/${dObj.getFullYear()} ${dObj.getHours()}:${dObj.getMinutes() < 10 ? '0' + dObj.getMinutes() : dObj.getMinutes()}`
      }
      curRow[key] = value;
    });
    rowData.push(curRow);
  });
  function camelize(str: string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }
  console.log("rowData: ", rowData);
  console.log("columns: ", columns);
  return (
      <div>
        <h4>Table View:</h4>
        <div>
          <MaterialTable
            columns={columns}
            data={rowData}
            options={{
              rowStyle: {
              }
            }}
          />
        </div>
      </div>
    )
}
export default Table;
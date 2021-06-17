
type A = string[];

type Props = {
  data: Array<A>;
};

const Table = ({ data }: Props) => {
  const header = data.pop();
  return (<div>
    <h4>Table View:</h4>
    <div></div>
    </div>)
}
export default Table;
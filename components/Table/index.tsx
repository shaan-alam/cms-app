import { Row } from "@prisma/client";
import RowComponent from "../Row";

type TableProps = {
  rows: Row[];
};

const Table = ({ rows }: TableProps) => {
  return (
    <>
      <table className="border border-gray-400 w-full">
        <thead>
          <tr className="border border-gray-300">
            <td className="p-4 font-semibold">First Name</td>
            <td className="p-4 font-semibold">Last Name</td>
            <td className="p-4 font-semibold">Age</td>
            <td className="p-4 font-semibold">Address</td>
            <td className="p-4 font-semibold">Actions</td>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && <tr className="p-4 block">No data available!</tr>}
          {rows?.map((row) => (
            <RowComponent row={row} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;

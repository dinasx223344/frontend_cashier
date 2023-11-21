export const metadata = {
  title: "stock",
};
import axios from "axios";
import Link from "next/link";
import Addstock from "./add";
import Deletestock from "./delete";
import Editstock from "./edit";

type stock = {
  id: number;
  menu_id: string;
  jumlah: string;
};
const getstock = async () => {
  const res = await axios.get("http://127.0.0.1:8000/api/stock");

  return res.data.data;
};
const stockList = async () => {
  const stock: stock[] = await getstock();
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <Addstock />
      </div>
      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-200">
            <th>No.</th>
            <th>Menu ID</th>
            <th>Jumlah ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((stock, index) => (
            <tr key={stock.id}>
              <td>{index + 1}</td>
              <td>{stock.menu_id}</td>
              <td>{stock.jumlah}</td>
              <td className="flex">
                <div className="mr-1">
                  <Editstock {...stock} />
                </div>
                <Deletestock {...stock} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default stockList;

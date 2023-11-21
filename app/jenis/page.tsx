export const metadata = {
  title: "jenis",
};
import axios from "axios"
import Link from "next/link"
import Addjenis from "./add"
import Deletejenis from "./delete"
import Editjenis from "./edit"

type jenis = {
  id: number;
  name: string;
  kategori_id: string;
  nama_jenis: string;
};
const getjenis = async () => {
  const res = await axios.get("http://127.0.0.1:8000/api/jenis");

  return res.data.data;
};
const jenisList = async () => {
  const jenis: jenis[] = await getjenis();
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <Addjenis />
      </div>
      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-200">
            <th>No.</th>
            <th>Nama Jenis</th>
            <th>Kategori ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jenis.map((jenis, index) => (
            <tr key={jenis.id}>
              <td>{index + 1}</td>
              <td>{jenis.nama_jenis}</td>
              <td>{jenis.kategori_id}</td>
              <td className="flex">
                <div className="mr-1">
                  <Editjenis {...jenis} />
                </div>
                <Deletejenis {...jenis} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default jenisList;

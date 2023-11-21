"use client";
import { SyntheticEvent, use } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type stock = {
  id: number;
  menu_id: string;
  jumlah: string;
};

const API_URL = "http://127.0.0.1:8000/api";
const Deletestock = (stock: stock) => {
  const [modal, setModal] = useState(false);
   const [menu_id, setmenu_id] = useState("");
   const [jumlah, setjumlah] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleDelete = async (stockId: Number) => {
    setIsMutating(true);
    let params = { id: stockId };
    let endpoint = `${API_URL}/stock/${stockId}`;
    const data = { menu_id: menu_id, jumlah: jumlah };
    await axios.delete(endpoint);

    setIsMutating(false);
    router.refresh();
    setModal(false);
  };
  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={handleChange}>
        Delete
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {" "}
            Yakin Mau Hapus {stock.menu_id}?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(stock.id)}
                className="btn btn-primary"
              >
                Delete
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Deletestock;

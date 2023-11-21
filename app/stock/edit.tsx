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
const Editstock = (stock: stock) => {
  const [modal, setModal] = useState(false);
  const [menu_id, setmenu_id] = useState("");
   const [jumlah, setjumlah] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsMutating(true);
    let endpoint = `${API_URL}/stock/${stock.id}`;
    const data = { menu_id: menu_id, jumlah: jumlah };
    await axios.patch(endpoint, data);

    setmenu_id("");
    setjumlah("");
    setIsMutating(false);
    router.refresh();
    setModal(false);
  };
  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Edit
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg"> Edit {stock.menu_id}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Menu ID</label>
              <input
                type="text"
                value={menu_id}
                onChange={(e) => setmenu_id(e.target.value)}
                className="input w-full input-bordered"
                placeholder=" Menu ID"
              />
              <label className="label font-bold">Jumlah </label>
              <input
                type="text"
                value={jumlah}
                onChange={(e) => setjumlah(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Kategori ID"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Editstock;

"use client";
import { SyntheticEvent, use } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = "http://127.0.0.1:8000/api";
const Addstock = () => {
  const [modal, setModal] = useState(false);
  const [menu_id, setmenu_id] = useState("");
  const [jumlah, setjumlah] = useState("");
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    let endpoint = `${API_URL}/stock`;
    const data = { menu_id: menu_id, jumlah: jumlah };
    await axios.post(endpoint, data);
    setmenu_id("");
    setjumlah("");
    router.refresh();
    setModal(false);
  };
  return (
    <div>
      <button className="btn btn-primary" onClick={handleChange}>
        Add New
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg"> Add New stock</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Menu ID</label>
              <input
                type="text"
                value={menu_id}
                onChange={(e) => setmenu_id(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Menu ID"
              />
              <label className="label font-bold">Jumlah </label>
              <input
                type="text"
                value={jumlah}
                onChange={(e) => setjumlah(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Jumlah"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button type="button" className="btn loading">
                Saving...
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Addstock;

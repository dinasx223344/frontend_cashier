"use client";
import { SyntheticEvent, use } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = "http://127.0.0.1:8000/api";
const Addmenu = () => {
  const [modal, setModal] = useState(false);
  const [nama_menu, setNamamenu] = useState("");
  const [harga, setharga] = useState("");
  const [image, setimage] = useState("");
  const [deskripsi, setdeskripsi] = useState("");
  const [jenis_id, setJenis_id] = useState("");
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    let endpoint = `${API_URL}/menu`;
    const data = { nama_menu: nama_menu, harga: harga, image: image, deskripsi: deskripsi, jenis_id: jenis_id};
    await axios.post(endpoint, data);
    setNamamenu("");
    setimage("");
    setdeskripsi('');
    setJenis_id("");
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
          <h3 className="font-bold text-lg"> Add New menu</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Nama menu</label>
              <input
                type="text"
                value={nama_menu}
                onChange={(e) => setNamamenu(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nama menu"
              />
              <label className="label font-bold">Harga</label>
              <input
                type="text"
                value={harga}
                onChange={(e) => setharga(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Harga"
              />
              <label className="label font-bold">Image</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setimage(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Image"
              />
              <label className="label font-bold">Deskripsi</label>
              <input
                type="text"
                value={deskripsi}
                onChange={(e) => setdeskripsi(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Deskripsi"
              />
              <label className="label font-bold">Jenis ID</label>
              <input
                type="text"
                value={jenis_id}
                onChange={(e) => setJenis_id(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Jenis ID menu"
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
export default Addmenu;

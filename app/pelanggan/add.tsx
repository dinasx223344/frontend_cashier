"use client";
import { SyntheticEvent, use } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = "http://127.0.0.1:8000/api";
const Addpelanggan = () => {
  const [modal, setModal] = useState(false);
  const [nama, setnama] = useState("");
  const [email, setemail] = useState("");
  const [nomor_telepon, setnomor_telepon] = useState("");
  const [alamat, setalamat] = useState("");
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    let endpoint = `${API_URL}/pelanggan`;
    const data = { nama: nama, email: email, nomor_telepon: nomor_telepon, alamat: alamat };
    await axios.post(endpoint, data);
    setnama("");
    setemail("");
    setnomor_telepon("");
    setalamat("");
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
          <h3 className="font-bold text-lg"> Add New pelanggan</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Nama</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setnama(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nama"
              />
              <label className="label font-bold">Email </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Email"
              />
              <label className="label font-bold">Nomor Telepon</label>
              <input
                type="text"
                value={nomor_telepon}
                onChange={(e) => setnomor_telepon(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nomor Telepon"
              />
              <label className="label font-bold">Alamat </label>
              <input
                type="text"
                value={alamat}
                onChange={(e) => setalamat(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Alamat"
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
export default Addpelanggan;

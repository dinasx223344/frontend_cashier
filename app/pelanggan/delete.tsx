"use client";
import { SyntheticEvent, use } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type pelanggan = {
  id: number;
  nama: string;
  email: string;
  nomor_telepon: string;
  alamat: string;
};

const API_URL = "http://127.0.0.1:8000/api";
const Deletepelanggan = (pelanggan: pelanggan) => {
const [modal, setModal] = useState(false);
const [nama, setnama] = useState("");
const [email, setemail] = useState("");
const [nomor_telepon, setnomor_telepon] = useState("");
const [alamat, setalamat] = useState("");
const [isMutating, setIsMutating] = useState(false);
const router = useRouter();
const handleChange = () => setModal(!modal);
const handleDelete = async (pelangganId: Number) => {
    setIsMutating(true);
    let params = { id: pelangganId };
    let endpoint = `${API_URL}/pelanggan/${pelangganId}`;
    const data = {nama: nama, email: email, nomor_telepon: nomor_telepon, alamat: alamat};
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
            Yakin Mau Hapus {pelanggan.nama}?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(pelanggan.id)}
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
export default Deletepelanggan;

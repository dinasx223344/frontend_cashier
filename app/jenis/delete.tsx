"use client";
import { SyntheticEvent, use } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type jenis = {
  id: number;
  kategori_id: string;
  nama_jenis: string;
};

const API_URL = "http://127.0.0.1:8000/api";
const Deletejenis = (jenis: jenis) => {
  const [modal, setModal] = useState(false);
  const [nama_jenis, setNamajenis] = useState("");
  const [kategori_id, setKategori_id] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleDelete = async (jenisId: Number) => {
    setIsMutating(true);
    let params = { id: jenisId };
    let endpoint = `${API_URL}/jenis/${jenisId}`;
    const data = { nama_jenis: nama_jenis,kategori_id: kategori_id };
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
            Yakin Mau Hapus {jenis.nama_jenis}?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(jenis.id)}
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
export default Deletejenis;

"use client";
import { SyntheticEvent, use } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type pemesanan = {
  id: number;
  meja_id: string;
  tanggal_pemesanan: string;
  jam_mulai: string;
  jam_selesai: string;
  nama_pemesan: string;
  jumlah_pelanggan: string;
};

const API_URL = "http://127.0.0.1:8000/api";
const Deletepemesanan = (pemesanan: pemesanan) => {
  const [modal, setModal] = useState(false);
  const [meja_id, setMeja_id] = useState("");
  const [tanggal_pemesanan, setTanggalpemesanan] = useState("");
  const [jam_mulai, setJamMulai] = useState("");
  const [jam_selesai, setJamSelesai] = useState("");
  const [nama_pemesan, setNamaPemesan] = useState("");
  const [jumlah_pelanggan, setJumlahPelanggan] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleDelete = async (pemesananId: Number) => {
    setIsMutating(true);
    let params = { id: pemesananId };
    let endpoint = `${API_URL}/pemesanan/${pemesananId}`;
    const data = {
      meja_id: meja_id,
      tanggal_pemesanan: tanggal_pemesanan,
      jam_mulai: jam_mulai,
      jam_selesai: jam_selesai,
      nama_pemesan: nama_pemesan,
      jumlah_pelanggan: jumlah_pelanggan,
    };
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
            Yakin Mau Hapus Nama Pemesan{pemesanan.nama_pemesan}?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(pemesanan.id)}
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
export default Deletepemesanan;

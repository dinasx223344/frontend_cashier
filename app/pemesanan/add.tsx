"use client";
import { SyntheticEvent, use } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = "http://127.0.0.1:8000/api";
const Addpemesanan = () => {
  const [modal, setModal] = useState(false);
  const [meja_id, setMeja_id] = useState("");
  const [tanggal_pemesanan, setTanggalpemesanan] = useState("");
  const [jam_mulai, setJamMulai] = useState("");
  const [jam_selesai, setJamSelesai] = useState("");
  const [nama_pemesan, setNamaPemesan] = useState("");
  const [jumlah_pelanggan, setJumlahPelanggan] = useState("");
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    let endpoint = `${API_URL}/pemesanan`;
    const data = {
      meja_id: meja_id,
      tanggal_pemesanan: tanggal_pemesanan,
      jam_mulai: jam_mulai,
      jam_selesai: jam_selesai,
      nama_pemesan: nama_pemesan,
      jumlah_pelanggan: jumlah_pelanggan,
    };
    await axios.post(endpoint, data);
    setMeja_id("");
    setTanggalpemesanan("");
    setJamMulai("");
    setJamSelesai("");
    setNamaPemesan("");
    setJumlahPelanggan("");
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
          <h3 className="font-bold text-lg"> Add New pemesanan</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Meja ID</label>
              <input
                type="text"
                value={meja_id}
                onChange={(e) => setMeja_id(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Meja ID"
              />
              <label className="label font-bold">Tanggal pemesanan</label>
              <input
                type="date"
                value={tanggal_pemesanan}
                onChange={(e) => setTanggalpemesanan(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Tanggal pemesanan"
              />
              <label className="label font-bold">Jam Mulai</label>
              <input
                type="time"
                value={jam_mulai}
                onChange={(e) => setJamMulai(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Jam Mulai"
              />
              <label className="label font-bold">Jam Selesai</label>
              <input
                type="time"
                value={jam_selesai}
                onChange={(e) => setJamSelesai(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Jam Selesai"
              />
              <label className="label font-bold">Nama Pemesan</label>
              <input
                type="text"
                value={nama_pemesan}
                onChange={(e) => setNamaPemesan(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nama Pemesan"
              />
              <label className="label font-bold">Jumlah Pelanggan</label>
              <input
                type="text"
                value={jumlah_pelanggan}
                onChange={(e) => setJumlahPelanggan(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Jumlah Pelanggan"
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
export default Addpemesanan;

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
const Editpemesanan = (pemesanan: pemesanan) => {
  const [modal, setModal] = useState(false);
  const [meja_id, setMeja_id] = useState(pemesanan.meja_id);
  const [tanggal_pemesanan, setTanggalpemesanan] = useState(
    pemesanan.tanggal_pemesanan
  );
  const [jam_mulai, setJamMulai] = useState(pemesanan.jam_mulai);
  const [jam_selesai, setJamSelesai] = useState(pemesanan.jam_selesai);
  const [nama_pemesan, setNamaPemesan] = useState(pemesanan.nama_pemesan);
  const [jumlah_pelanggan, setJumlahPelanggan] = useState(
    pemesanan.jumlah_pelanggan
  );
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsMutating(true);
    let endpoint = `${API_URL}/pemesanan/${pemesanan.id}`;
    const data = {
      meja_id: meja_id,
      tanggal_pemesanan: tanggal_pemesanan,
      jam_mulai: jam_mulai,
      jam_selesai: jam_selesai,
      nama_pemesan: nama_pemesan,
      jumlah_pelanggan: jumlah_pelanggan,
    };
    await axios.patch(endpoint, data);

    setMeja_id("");
    setTanggalpemesanan("");
    setJamMulai("");
    setJamSelesai("");
    setNamaPemesan("");
    setJumlahPelanggan("");
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
          <h3 className="font-bold text-lg">
            {" "}
            Edit Nama Pemesan {pemesanan.nama_pemesan}
          </h3>
          <form onSubmit={handleUpdate}>
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
                type="text"
                value={tanggal_pemesanan}
                onChange={(e) => setTanggalpemesanan(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Tanggal pemesanan"
              />
              <label className="label font-bold">Jam Mulai</label>
              <input
                type="text"
                value={jam_mulai}
                onChange={(e) => setJamMulai(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Jam Mulai"
              />
              <label className="label font-bold">Jam Selesai</label>
              <input
                type="text"
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
export default Editpemesanan;

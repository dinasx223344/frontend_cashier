"use client";
import { SyntheticEvent, use } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type meja = {
  id: number;
  nomor_meja: string;
  kapasitas: string;
  status: string;
};

const API_URL = "http://127.0.0.1:8000/api";
const Editmeja = (meja: meja) => {
  const [modal, setModal] = useState(false);
  const [nomor_meja, setnomor_meja] = useState("");
  const [kapasitas, setkapasitas] = useState("");
  const [status, setstatus] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsMutating(true);
    let endpoint = `${API_URL}/meja/${meja.id}`;
    const data = {nomor_meja: nomor_meja, kapasitas: kapasitas, status: status};
    await axios.patch(endpoint, data);

    setnomor_meja("");
    setkapasitas("");
    setstatus("");
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
          <h3 className="font-bold text-lg"> Edit {meja.nomor_meja}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Nomor Meja</label>
              <input
                type="text"
                value={nomor_meja}
                onChange={(e) => setnomor_meja(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nomor Meja"
              />
              <label className="label font-bold">Kapasitas</label>
              <input
                type="text"
                value={kapasitas}
                onChange={(e) => setkapasitas(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Kapasitas"
              />
              <label className="label font-bold">Status</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setstatus(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Status"
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
export default Editmeja;

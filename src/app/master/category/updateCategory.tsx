'use client';

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation"; // reload page after submit
import axios from "axios";

type Category = {
    id: number;
    name: string;
  };

export default function UpdateCategory(category: Category) {
  const [name, setName] = useState(category.name);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const postData = {
    name: name,
  };

  function handleChange() {
    setModal(!modal);
  }

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);
    try {
      const response = await axios.patch(process.env.NEXT_PUBLIC_API_URL + '/api/category/'+ category.id, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Di sini, Anda dapat menangani respons dari permintaan POST yang berhasil
      console.log('Response:', response.data);
    } catch (error) {
      // Di sini, Anda dapat menangani kesalahan yang terjadi saat permintaan POST
      console.error('Error:', error);
    }

    setIsMutating(false);
    router.refresh();
    setModal(false);
  }

  return (
    <>
      <button className="btn btn-info btn-sm" onClick={handleChange}>Edit</button>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {category.name}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Category Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Category Name"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>Close</button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">Update</button>
              ) : (
                <button type="button" className="btn loading">Updating ...</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
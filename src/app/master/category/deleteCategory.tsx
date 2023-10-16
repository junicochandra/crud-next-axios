'use client';

import { useState } from "react";
import { useRouter } from "next/navigation"; // reload page after submit
import axios from "axios";

type Category = {
  id: number;
  name: string;
};

export default function DeleteCategory(category: Category) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  async function handleDelete(categoryId: number) {
    setIsMutating(true);
    try {
      alert(process.env.NEXT_PUBLIC_API_URL + '/api/category/' + categoryId);
      const response = await axios.delete(process.env.NEXT_PUBLIC_API_URL + '/api/category/' + categoryId, {
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
      <button className="btn btn-error btn-sm" onClick={handleChange}>Delete</button>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure to delete <b>{category.name}</b> ?</h3>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>Close</button>
            {!isMutating ? (
              <button type="button" onClick={() => handleDelete(category.id)} className="btn btn-primary">Delete</button>
            ) : (
              <button type="button" className="btn loading">Deleting...</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
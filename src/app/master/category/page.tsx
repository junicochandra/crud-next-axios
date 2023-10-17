import axios from 'axios';
import AddCategory from './addCategory';
import DeleteCategory from './deleteCategory';
import UpdateCategory from './updateCategory';

type category = {
  id: number;
  name: string;
};

async function getCategories(){
  try {
    const response =  await axios.get(process.env.NEXT_PUBLIC_API_URL+'/api/category', {
      timeout: 5000,
    });    
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export default async function CategoryList() {
  const categories: category[] = await getCategories();
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <AddCategory />
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td className="flex">
                <UpdateCategory {...category} />
                <DeleteCategory {...category} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

import axios from 'axios'

type category = {
  id: number;
  name: string;
};

async function getCategories(){
  try {
    const response =  await axios.get(process.env.API_URL+'/api/category', {
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
    <div>
      Tag LIst {process.env.API_URL}
      {categories.map((category, index) => (
        <p key={category.id}>{category.name}</p>
      ))}
    </div>
  )
}

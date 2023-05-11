import { useState, useEffect } from 'react';


function App() {

  const imageGalleryStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  };

 // const [plants, setPlants] = useState([]);

  /*
  useEffect(() => {
    async function getPlants(){

      const response = await fetch('/db.json')
            .then(response => response.json())
            .then(plants => setPlants(plants))
            .catch(error => console.error(error))


      const data = await response.json();

      setPlants(data.results);
    }

      getPlants();
      
  }, []);
  
  console.log(plants)
  */


  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then(res => res.json())
      .then(result => setData(result))
  }, [])

  const propertyManage = (id) => {
    const customItem = data.plants.filter(i => i.id === id)[0]
    customItem.active = !customItem.active

    const edited = data.plants.map(item => {

      if (customItem.id == item.id) {
        return customItem
      } else {
        return item
      }
    })

    setData({ plants: edited })

  }
  
  return (
    <>
      
      <h1 className="text-2xl text-cyan-700 mt-4 text-center">
       Képciklus.
      </h1>
      <br></br>
      

      <div style={imageGalleryStyle}>

          {data.plants && data.plants.map((plant) => {
            return <div className="pictCard" key={plant.id}>
              <img style={{filter: plant.active ? "" : "grayscale(100%)" }} src={plant.pic}  alt={plant.title} />
              <p>{plant.title}</p>
               Aktív: <input type="checkbox" defaultChecked={plant.active} onChange={() => propertyManage(plant.id)} />
            </div>

          })}

      </div>
    </>
  )
}

export default App

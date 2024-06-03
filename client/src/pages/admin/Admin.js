import React from "react";
import useApi from "../../hooks/useApi";
import style from "./Admin.module.css"

const Admin = () => {
    const { data: products, loaded } = useApi(`http://localhost:3001/products/`);

    if (!loaded) {
      return <div>Laddar...</div>;
    }

    if (!products) {
      return <div>Inga produkter hittades.</div>;
    }


return (
    <div>
        {products.map((item) => (
            <div className={style.container} key={item.id}>
              <div>{item.id}</div>
              <div>
                {item.Images.map((image) => (
                  <div key={image.id}>
                    <img src={`/images/${image.imageUrl}`} alt="Produktbild" />
                    <button>Ta bort bild</button>
                  </div>
                ))}
                <input type="file" />
              </div>
              <div>
                <input type="text" defaultValue={item.name}/>
              </div>
              <div>
                <input type="number" defaultValue={item.price}/>
              </div>
              <div>
                <button onClick="" >spara</button>
                <button onClick="">ta bort</button>
              </div>
            </div>
        ))}
    </div>
)};

export default Admin;
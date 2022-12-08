import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

// let baseUrl = "";
// if (window.location.href.split(":")[0] === "http") {
//   baseUrl = "http://localhost:4000";
// } else {
//   baseUrl = "https://";
// }

function App() {
  const [postName, setpostName] = useState("");
  const [postPrice, setpostPrice] = useState();
  const [postDescription, setpostDescription] = useState("");
  const [getData, setgetData] = useState();
  // const [ProductData, setProductData] = useState();
  const [istrue, setistrue] = useState(false);
  const [ProductId, setProductId] = useState("");
  const [Editing, setEditing] = useState({
    editingId: null,
    editingName: "",
    editingPrice: "",
    editingDescription: "",
  });
  // useEffect(() => {
    
  // }, [getData]);
  const AllProduct = ()=>{
    axios
      .get("http://localhost:4000/products")
      .then((response) => {
        // console.log(response.data);
          setgetData(response.data.products);
          setistrue(!istrue)
      })
      .catch((err) => {
        console.log("err", err);
      });
}
  const SavePost = () => {
    axios
      .post(`http://localhost:4000/product`, {
        name: postName,
        price: postPrice,
        description: postDescription,
      })
      .then((response) => {
        console.log("ok");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const DeletePost = (postId) => {
    // console.log(postId);
    axios
      .delete(`http://localhost:4000/product/${postId}`)
      .then((response) => {
        // console.log(response.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const Product = (e) => {
    // console.log(ProductId);
    e.preventDefault();
    axios
      .get(`http://localhost:4000/product/${ProductId}`)
      .then((response) => {
        // console.log(response.data.data);
        // setgetData(response.data.data);
        setgetData([response.data.data])
        setistrue(!istrue)
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const UpdatePost = (e) => {
    // console.log(Editing.editingId);
    axios
      .put(`http://localhost:4000/product/${Editing.editingId}`, {
        name: Editing.editingName,
        price: Editing.editingPrice,
        description: Editing.editingDescription,
      })
      .then((response) => {
        // console.log(response);
      });
    setEditing({
      editingId: null,
      editingName: "",
      editingPrice: "",
      editingDescription: "",
    });
    e.preventDefault();
  };
  return (
    <>
      <div>

        <form onSubmit={SavePost} className="form">
          <input
            className="input"
            type="text"
            placeholder="Product name"
            onChange={(e) => {
              setpostName(e.target.value);
              // console.log(e.target.value);
            }}
          />
          <input
            className="input"
            type="number"
            placeholder="price"
            onChange={(e) => {
              setpostPrice(e.target.value);
              // console.log(e.target.value);
            }}
          />
          <input
            className="input"
            type="text"
            placeholder="description"
            onChange={(e) => {
              setpostDescription(e.target.value);
              // console.log(e.target.value);
            }}
          />
          <input type="submit" className="button"value='SetPost' / >
            
          

        </form>

        <div className="form newdiv">
          <form onSubmit={Product}>

          <input
            required
            type="number"
            className="input"
            onChange={(e) => {
              setProductId(e.target.value);
            }}
            placeholder="Please Enter Id"
            />
          <input type="submit" className="button" value='Get 1'/>
            </form>
          <button onClick={AllProduct} className="button">Get All</button>

        </div>
        <div className="body">
          <div className="flex">
            {
            getData?.map((eachPost, i) => {
              return (
                <div className="post" key={i}>
                  <div className="postText">
                  <p className="overflow">{(eachPost.id === Editing.editingId)? null: `Id :` +eachPost?.id}</p>

                    <h3 className="postDescr"> 
                      {eachPost.id === Editing.editingId ? (
                        <form className="NextForm" onSubmit={UpdatePost}>
                          <input
                            type="text"
                            className="input"
                            defaultValue={Editing.editingName}
                            onChange={(e) => {
                              setEditing({
                                ...Editing,
                                editingName: e.target.value,
                              });
                            }}
                            placeholder="Please Enter Updated Value"
                          />
                          <input
                            type="number"
                            className="input"
                            defaultValue={Editing.editingPrice}
                            onChange={(e) => {
                              setEditing({
                                ...Editing,
                                editingPrice: e.target.value,
                              });
                            }}
                            placeholder="Price"
                          />
                          <input
                            type="text"
                            className="input"
                            defaultValue={Editing.editingDescription}
                            onChange={(e) => {
                              setEditing({
                                ...Editing,
                                editingDescription: e.target.value,
                              });
                            }}
                            placeholder="description"
                          />
                          <input type="submit" className="button next" value='Update'/>
                        </form>
                      ) : (
                        `Name :` + eachPost?.name
                      )}
                    </h3>
                
                    <span >{(eachPost.id === Editing.editingId)? null: `Price :` + eachPost?.price}</span>
                    <p className="overflow">{(eachPost.id === Editing.editingId)? null: `Description :` + eachPost?.description}</p>
                <div style={{margin:'10px auto'}}>
                    <button className="button"
                      onClick={() => {
                        DeletePost(eachPost?.id);
                      }}
                    >
                      Delete
                    </button>
                    {Editing.editingId === eachPost?.id ? null : (
                      <button
                        className="button"
                        onClick={() => {
                          setEditing({
                            editingId: eachPost?.id,
                            editingName: eachPost?.name,
                            editingPrice: eachPost?.price,
                            editingDescription: eachPost?.description,
                          });
                          // console.log(eachPost.id);
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </div> 

                  </div>
                </div>
              );
            })  
            
            }
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
//

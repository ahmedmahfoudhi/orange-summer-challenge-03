import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchData } from '../../shared/fetch-data'

function Products() {

    const dispatch = useDispatch();
    const [products, setProducts] = useState([])
    const [product,setProduct] = useState({
        title:'',
        category: '',
        description: '',
        price: 0,
        stockQuantity: 0,
    })

    useEffect(() => {
        const res = fetchData('http://localhost:4000/api/product');
        if(res.length){
            setProducts(res);
        }
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        
    }

    const handleClickUpdate = (e) => {
        const id = e.target.key;
        const auxProduct = products.find(product => product.id === id);
        if(!auxProduct) return;
        setProduct(auxProduct);
    }

    const handleChange = (e) => {
        setProduct((prevState) => ({
          ...prevState,
          [e.target.name] : e.target.value,
        }))
    }

  return (
    <div className='login-form-container managers-container'>
        
<div className="card manager-setWidth">
  <img className="card-img-top" src="..." alt="Card image cap" />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">card description</p>
    <p className='card-text'>card price</p>
    <p className='card-text'>card stock quantity</p>
    <p>
    <button type="button" key={product.id} onClick={handleClickUpdate} className="btn btn-success set-margin-2" data-toggle="modal" data-target="#exampleModal">
  Update
</button>
        <button className="btn btn-danger">Delete</button>
    </p>
  </div>
</div>
<div className="card manager-setWidth">
  <img className="card-img-top" src="..." alt="Card image cap" />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">card description</p>
    <p className='card-text'>card price</p>
    <p className='card-text'>card stock quantity</p>
    <p>
    <button type="button" key={product.id} onClick={handleClickUpdate} className="btn btn-success set-margin-2" data-toggle="modal" data-target="#exampleModal">
  Update
</button>
        <button className="btn btn-danger">Delete</button>
    </p>
  </div>
</div>
<div className="card manager-setWidth">
  <img className="card-img-top" src="..." alt="Card image cap" />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">card description</p>
    <p className='card-text'>card price</p>
    <p className='card-text'>card stock quantity</p>
    <p>
    <button type="button" key={product.id} onClick={handleClickUpdate} className="btn btn-success set-margin-2" data-toggle="modal" data-target="#exampleModal">
  Update
</button>
        <button className="btn btn-danger">Delete</button>
    </p>
  </div>
</div>
<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update product</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label for="title">Title</label>
    <input type="text" className="form-control"value={product.title} name="title" onChange={handleChange} id="title" placeholder="Enter title" />
  </div>
  <div className="form-group">
    <label for="category">Category</label>
    <input type="text" className="form-control" value={product.category} name="category" onChange={handleChange} id="category" placeholder="Enter category" />
  </div>

  <div className="form-group">
    <label for="price">Price</label>
    <input type="number" className="form-control" value={product.price} name="price" onChange={handleChange} id="price"  />
  </div>

  <div className="form-group">
    <label for="stockQuantity">Stock Quantity</label>
    <input type="number" className="form-control" name="stockQuantity" value={product.stockQuantity} onChange={handleChange} id="stockQuantity"  />
  </div>


  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Products




import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/products/ProductCard";
import {
  getProducts,
  deleteProduct,
  getProductById,
  getProduct,
  updateProduct,
} from "../../redux/actions/productActions/productAction";
import DataTable, { createTheme } from "react-data-table-component";
import { FaPen, FaTrash } from "react-icons/fa";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
// import { ToastContainer } from "react-toastr";
import Loading from "react-fullscreen-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductList = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);

  const [productName, setProductName] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productCategory, setProductCategory] = useState();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productList = useSelector((state) => state.productReducer.products);
  const handleClickOpen = (id) => {
    setProductId(id);
    setOpen(true);
  };
  const fetchProductById = async (product) => {
    setEditModal(true);
    let data = product;
    setProductId(data.id);
    setProductName(data.title);
    setProductPrice(data.price);
    setProductCategory(data.category);
  };
  const handleClose = (state) => {
    setOpen(false);
    setEditModal(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let data = {
      id: productId,
      title: productName,
      price: productPrice,
      description: "lorem ipsum set",
      image: "https://i.pravatar.cc",
      category: productCategory,
    };
    dispatch(updateProduct(data));
    setEditModal(false);
  };
  const handleDelete = () => {
    setLoading(true);
    dispatch(deleteProduct(productId))
      .then((res) => {
        setLoading(false);
        toast(`Record with id ${res.id} deleted successfully`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        alert(error);
      });
    setOpen(false);
  };

  const handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", state.selectedRows);
  };

  const columns = [
    {
      name: "Sr No",
      selector: "id",
      sortable: true,
      width: "20vh",
    },
    {
      name: "Title",
      selector: "title",
      sortable: true,
      wrap: true,
      //left: true,
      center: true,
    },
    //   {
    //     name: 'Description',
    //     selector: 'description',
    //     sortable: true,
    //   },
    {
      name: "Category",
      selector: "category",
      sortable: true,
      wrap: true,
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
      wrap: true,
    },
    {
      name: "Image",
      selector: "image",
      cell: (row) => (
        <div data-tag="allowRowEvents">
          <img src={row.image} style={{ height: 30, widht: 30 }} />
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button onClick={() => fetchProductById(row)}>
            <FaPen color="blue" />
          </button>
          <button
            onClick={() => {
              return handleClickOpen(row.id);
            }}
          >
            <FaTrash color="red" />
          </button>
        </div>
      ),
    },
  ];
  if (productList) {
    return (
      <div>
        <ToastContainer />
        <div>
          <DataTable
            title="Product List"
            selectableRows
            columns={columns}
            data={productList}
            responsive={true}
            pagination={true}
            onSelectedRowsChange={handleChange}
          />
        </div>
        <div>
          <Dialog
            open={editModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              Edit Product
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <div className="ui main">
                  <h2>Product Form</h2>
                  <form className="ui form" onSubmit={handleUpdate}>
                    <div className="field">
                      <label>Product Name</label>
                      <input
                        type="text"
                        name="product_name"
                        placeholder="Enter product name"
                        onChange={(e) => setProductName(e.target.value)}
                        value={productName}
                      />
                    </div>
                    <div className="field">
                      <label>Product Price</label>
                      <input
                        type="text"
                        name="product_price"
                        placeholder="Enter product price"
                        onChange={(e) => setProductPrice(e.target.value)}
                        value={productPrice}
                      />
                    </div>
                    <div className="field">
                      <label>Product Category</label>
                      <input
                        type="text"
                        name="product_desc"
                        placeholder="Enter product category"
                        onChange={(e) => setProductCategory(e.target.value)}
                        value={productCategory}
                      />
                    </div>
                    <div className="field">
                      <label>Product Photo</label>
                      <input type="file" name="product_photo" />
                    </div>
                    <DialogActions>
                      <Button onClick={handleUpdate} color="danger">
                        Submit
                      </Button>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                    </DialogActions>
                  </form>
                </div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          {loading ? (
            <Loading
              loading
              background="rgb(67 160 226 / 42%)"
              loaderColor="#3498db"
            />
          ) : (
            ""
          )}
        </div>
        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            // onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Are you sure to delete this product?"}
            </DialogTitle>
            <DialogContent>
              {/* <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDelete} color="danger">
                Delete
              </Button>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default ProductList;

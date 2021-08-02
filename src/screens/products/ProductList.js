import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from "react-redux"
import ProductCard from '../../components/products/ProductCard';
import { getProducts,deleteProduct } from '../../redux/actions/productActions/productAction';
import DataTable,{createTheme } from 'react-data-table-component';
import {FaPen,FaTrash} from "react-icons/fa"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
// import { ToastContainer } from "react-toastr";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ProductList = () => {
    // let container;
    const [products,setProducts] = useState([]);
    const [productId,setProductId] = useState(0);
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setProductId(id);
    setOpen(true);
  };

  const handleClose = (state) => {
    //   alert(state.target.value)
    // if(state.target.value!=undefined)
    // {
    //     alert("Product deleted successfully")
    // }
    setOpen(false);
  };
  const handleConfirm = () => {
      dispatch(deleteProduct(productId))
    //   productList = state.products.products;
    //   alert("Product deleted successfully")
  setOpen(false);
};
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProducts());
    },[])
    const productList = useSelector((state) => state.products.products);
    const columns = [{
        name: 'Sr No',
        selector: 'id',
        sortable: true,
        width:"20vh"
      },
      {
        name: 'Title',
        selector: 'title',
        sortable: true,
        // wrap:true,
        left:true
      },
    //   {
    //     name: 'Description',
    //     selector: 'description',
    //     sortable: true,
    //   },
      {
        name: 'Category',
        selector: 'category',
        sortable: true,wrap:true
      },
      {
        name: 'Price',
        selector: 'price',
        sortable: true,
        wrap:true
      },
      {
        name: 'Image',
        selector: 'image',
        cell: row => <div data-tag="allowRowEvents"><img src={row.image} style={{height:30,widht:30}}/></div>,
      },
      {
          name:'Action',
          cell: row => <div><button><FaPen color="blue"/></button><button onClick={() => {
              return handleClickOpen(row.id)
          }}><FaTrash color="red"/></button></div>
      }
    ];
    const handleChange = (state) => {
        // You can use setState or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', state.selectedRows);
      };
    if(productList){
        // const productListView = productList.map((product) => {
        //     return (
        //         <ProductCard product={product}/>
        //     );
        // });
    // {   <div className="ui celled list">
    //         {productListView}
    //     </div> 
        return (
            <div>
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
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Are you sure to delete this product?"}</DialogTitle>
                    <DialogContent>
                    {/* <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText> */}
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={handleConfirm} color="danger">
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
                </div>
            </div>
        );
    }else{
        return(<div></div>);
    }
    
    
}
export default ProductList;
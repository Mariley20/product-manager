import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { IProduct } from '@/types/productTypes';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import productsFB from '@/services/productsFB';
import '@/styles/product-view.scss'
import Button from '@mui/material/Button';
import { useProductsStore } from '@/store/productsStore';
import MenuItem from '@mui/material/MenuItem';
import ProductCategoryCreateModal from '@/components/ProductCategoryCreateModal';
import IconButton from '@mui/material/IconButton';
import { FindReplace } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IProductCreateModalProps {
  showModal: boolean,
  handleClose: () => void
}
function ProductCreateModal({ showModal, handleClose }: IProductCreateModalProps) {
  const [processingForm, setProcessingForm] = useState(false)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const productCategories = useProductsStore((state) => state.productCategories);
  const products = useProductsStore((state) => state.products);

  const form = useForm<Partial<IProduct>>({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      discounted_price: null,
      code: ' ',
      photo_url: '',
      position: 0,
      category_id: '',
    }
  })
  const { register, handleSubmit, formState, setValue } = form
  const { errors } = formState
  const onSubmit = async (data: Partial<IProduct>) => {
    try {
      setProcessingForm(true)
      const dataToSave = {
        ...data,
        price: parseFloat(data.price + '' || '0'),
        category: productCategories.find(item => item.id === data.category_id)
      }
      await productsFB.addProductItem(dataToSave)
      handleClose()
    } catch (error) {
      console.log('error', error)
    } finally {
      setProcessingForm(false)

    }
  };

  const generateProductCode = () => {
    const productCodes = products.map(item => item.code)
    const productCode = `0${products.length + 1}`
    if (productCodes.includes(productCode)) {
      setValue('code', `D${productCode}`)
    } else {
      setValue('code', productCode)
    }
  }
  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create product
          </Typography>
          {showCategoryForm ?
            <ProductCategoryCreateModal handleProductCategoryModalClose={() => setShowCategoryForm(false)} /> :
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
              className='products-view__create-form'
            >
              <div style={{ width: '100%' }}>
                <TextField
                  select
                  id='product_ctegory'
                  margin="normal" label="Category"
                  fullWidth
                  defaultValue={productCategories[0]?.id}
                  {...register('category_id', { required: "Category is required" })}
                  error={!!errors.category_id}
                  helperText={errors.category_id?.message || 'Please select a category'}
                >
                  {productCategories.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                  <MenuItem
                    onClick={() => setShowCategoryForm(true)}
                    color='primary'
                  >
                    Add new category
                  </MenuItem>
                </TextField>

              </div>

              <TextField
                margin="normal"
                required
                id='product_name'
                fullWidth
                label="Name"
                {...register('name', { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message || ''}
                sx={{ flex: 1 }}
                onChange={() => generateProductCode()}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <TextField
                  margin="normal"
                  required
                  id='product_code'
                  disabled
                  defaultValue={`0${products.length + 1}`}
                  autoFocus
                  fullWidth
                  sx={{ flex: 1 }}
                  label='code'
                  {...register('code', { required: "Code is required" })}
                  error={!!errors.code}
                  helperText={errors.code?.message || ''}
                />
                <IconButton color="primary" aria-label="Generate code"
                  onClick={() => generateProductCode()}
                >
                  <FindReplace />
                </IconButton>
              </div>

              <TextField
                margin="normal"
                required
                id='product_description'
                fullWidth
                label="Description"
                multiline
                {...register('description', { required: "Description is required" })}
                error={!!errors.description}
                helperText={errors.description?.message || ''}
              />
              <TextField
                margin="normal"
                required
                id='product_price'
                fullWidth
                label="Price"
                sx={{ flex: 1 }}
                type='number'
                {...register('price', { required: 'Price is required' })}
                error={!!errors.price}
                helperText={errors.price?.message || ''}
              />
              <TextField
                margin="normal"
                id='product_discount'
                sx={{ flex: 1 }}
                fullWidth
                label="Price with discount"
                {...register('discounted_price', { required: false })}
              />
              <Container sx={{ display: 'flex', gap: '16px', padding: '0px' }}>
                <Button
                  fullWidth
                  disabled={processingForm}
                  variant="text"
                  color='error'
                  sx={{ mt: 2 }}
                  onClick={() => handleClose()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  disabled={processingForm}
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Save
                </Button>
              </Container>
            </form>
          }
        </Container>

      </Modal>
    </div>
  );
}
export default ProductCreateModal


import TextField from '@mui/material/TextField';
import { IProduct, IProductCategory } from '@/types/productTypes';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import '@/styles/product-view.scss'
import Button from '@mui/material/Button';
import productCategoriesFB from '@/services/productCategoriesFB';
import Container from '@mui/material/Container';

interface IProductCategoryCreateModalProps {
  handleProductCategoryModalClose: () => void
}
function ProductCategoryCreateModal({ handleProductCategoryModalClose }: IProductCategoryCreateModalProps) {
  const [processingForm, setProcessingForm] = useState(false)

  const form = useForm<Partial<IProductCategory>>({
    defaultValues: {
      name: '',
      position: 0,
    }
  })
  const { register, handleSubmit, formState } = form
  const { errors } = formState
  const onSubmit = async (data: Partial<IProduct>) => {
    try {
      setProcessingForm(true)
      await productCategoriesFB.addProducCategorytItem(data)
      handleProductCategoryModalClose()
    } catch (error) {
      console.log('error', error)
    } finally {
      setProcessingForm(false)
    }
  };
  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className='products-view__create-form'
    >
      <TextField
        margin="normal"
        required
        fullWidth
        label="Category name"
        {...register('name', { required: "Category name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message || ''}
      />
      <Container sx={{ display: 'flex', gap: '16px', padding: '0px' }}>
        <Button
          fullWidth
          disabled={processingForm}
          variant="text"
          color='error'
          sx={{ mt: 2 }}
          onClick={() => handleProductCategoryModalClose()}
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
  );
}
export default ProductCategoryCreateModal


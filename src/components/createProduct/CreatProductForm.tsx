import React, {FormEvent, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import NumberFormat from "react-number-format";
import Select from "react-select";
import {SelectCategoryType} from "../../types/CreateProductTypes";
import {styleSelect} from './CreateProductConstants';
import {useDispatch} from "react-redux";
import {addNewProduct} from "../../state/actions/productActions";
import {FetchResult, QueryResult, useMutation, useQuery} from "@apollo/client";
import {ADD_PRODUCT} from "../../graphQl/products/productsMutation";
import {GET_ALL_CATEGORIES} from "../../graphQl/categories/categoriesQuery";
import {ICategory, IDropDownCategory} from "../../types/IProduct";
import {GENERATE_PUT_URL} from "../../graphQl/image/imageMutation";
import {css} from "@emotion/react";
import axios, {AxiosError, AxiosResponse} from "axios";
import {ClipLoader} from "react-spinners";
import {toast} from "../sweetalert/sweetalert";
import ImageCrop from "../imageCrop/ImageCrop";
import moment from "moment";

type CreateProductFormProps = {
  productName: string
  price: number | null
  discount: number | null
  setProductName: (productName: string) => void
  setPrice: (price: number | null) => void
  setDiscount: (discount: number | null) => void
  productImage: null | string
  setProductImage: (productImage: null | string) => void
}

const CreateProductForm: React.FC<CreateProductFormProps> = (props) => {
  const {setProductImage, productImage} = props;
  const [addProduct] = useMutation(ADD_PRODUCT);
  const categories: QueryResult = useQuery(GET_ALL_CATEGORIES);
  const {productName, price, discount, setProductName, setDiscount, setPrice} = props;
  const [category, setCategory] = useState<SelectCategoryType | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [productNameError, setProductNameError] = useState<string>('');
  const [priceError, setPriceError] = useState<string>('');
  const [discountError, setDiscountError] = useState<string>('');
  const [fileError, setFileError] = useState<String>('');
  const [categoryError, setCategoryError] = useState<string>('');
  const [quantityError, setQuantityError] = useState<string>('');
  const [cropImageError, setCropImageError] = useState<string>('');
  const [key, setKey] = useState<string>(Math.random().toString(36));
  const [generatePutUrl] = useMutation<{ generatePutUrl: string }>(GENERATE_PUT_URL);
  const [loading, setLoading] = useState<boolean>(false);
  const [srcImg, setSrcImg] = useState<string | null>(null);
  const dispatch = useDispatch();
  const override = css`
    margin-left: 20px;
  `;

  const fileChange = (files: FileList|null) => {
    setFileError('');
    if (!files||!files[0]) {
      setFileError('Required');
      return;
    } else if (files[0].type.split('/')[0] !== 'image') {
      setFileError('File is not an image');
      return;
    } else if (files[0].size / (1024 * 1024) > 1) {
      setFileError('Image size must be lower than or equal to 1MB');
      return;
    }
    setSrcImg(URL.createObjectURL(files[0]));
  }

  const dropDownCategories = () => {
    if (!categories.data) {
      return;
    }
    return categories.data.getAllCategories.map((category: ICategory) => {
      return {value: category.id, label: category.title};
    })
  }

  const handleOnChangeCategory = (selected: SelectCategoryType | null) => {
    setCategoryError('');
    setCategory(selected);
    if (!selected) {
      setCategoryError('Required');
      return;
    }
  }

  const handleOnChangeProductName = (productName: string) => {
    setProductNameError('')
    setProductName(productName);
    if (!productName || productName === '') {
      setProductNameError('Required');
    }
  }

  const handleOnChangePrice = (price: number | null) => {
    setPriceError('')
    setPrice(price);
    if (price && price <= 0) {
      setPriceError('Price must be greater than 0');
    }
  }

  const handleOnChangeQuantity = (quantity: number | null) => {
    setQuantityError('')
    setQuantity(quantity);
    if (quantity && quantity <= 0) {
      setQuantityError('Quantity must be greater than or equal to 0');
    }
  }

  const handleOnChangeDiscount = (discount: number | null) => {
    setDiscountError('')
    setDiscount(discount);
    if (discount && discount <= 0) {
      setDiscountError('Discount must be greater than or equal to 0');
    } else if (!price && discount) {
      setDiscountError('Enter the price first');
    } else if ((discount && price && discount > price)) {
      setDiscountError('Discount must be lower than price');
    }
  }

  const validateForm = () => {
    let productNameError: string = '';
    let priceError: string = '';
    let discountError: string = '';
    let fileError: string = '';
    let categoryError: string = '';
    let quantityError: string = '';
    let cropImageError: string = '';
    if (!category) {
      categoryError = 'Required';
    }
    if (!productName || productName === '') {
      productNameError = 'Required';
    }
    if (!price) {
      priceError = 'Price must be greater than 0';
    }
    if (discount && discount < 0) {
      discountError = 'Discount must be greater than or equal to 0';
    } else if (discount && price && discount > price) {
      discountError = 'Discount must be lower than price';
    } else if (!price && discount) {
      discountError = 'Enter the price first';
    }
    if (!srcImg) {
      fileError = 'Required';
    }
    if (srcImg && !productImage) {
      fileError = '';
      cropImageError = 'Please set image';
    }

    if (quantity && quantity < 0) {
      quantityError = 'Quantity must be greater than or equal to 0';
    }
    setQuantityError(quantityError);
    setProductNameError(productNameError);
    setPriceError(priceError);
    setDiscountError(discountError);
    setFileError(fileError);
    setCategoryError(categoryError);
    setCropImageError(cropImageError);
    return !(productNameError
      || priceError
      || discountError
      || fileError
      || categoryError
      || quantityError
      || cropImageError);
  }

  const clearForm = () => {
    setKey('');
    setProductName('');
    setCategory(null);
    setDiscount(null);
    setQuantity(null);
    setPrice(null);
    props.setProductImage(null);
    setSrcImg(null);
    setKey(Math.random().toString(36));
  }

  const fetchGeneratePutUrl = async (name: string, type: string) => {
    return await generatePutUrl({
      variables: {
        image: {
          imageName: name,
          imageFileType: type,
        }
      }
    });
  }
  const renderProductImageName = () => {
    const date: string = moment().format('YYMMDD');
    const randomString: string = String(Math.floor(Math.random() * 9999));
    return date + 'PRO' + randomString + '.jpeg';
  }

  const uploadToS3 = async (putURL: string, file: string, productImageName: string) => {
    const options = {
      params: {
        Key: productImageName,
        ContentType: 'jpeg'
      },
      headers: {
        'Content-Type': 'jpeg'
      }
    };
    return axios.put(putURL, dataURItoBlob(file), options);
  }

  const addProductToDatabase = async (productName: string,
                                      category: IDropDownCategory,
                                      quantity: number | null,
                                      discount: number | null,
                                      fileName: string) => {
    return await addProduct({
      variables: {
        newProduct: {
          title: productName,
          category: {
            id: category.value,
            title: category.label
          },
          quantity: quantity ? quantity : 0,
          regular_price: price,
          discount_price: discount ? discount : 0,
          image: fileName
        }
      }
    })
  }

  function dataURItoBlob(dataURI: string) {
    let byteString: string;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type: mimeString});
  }

  const handleOnSubmit = async (event: FormEvent) => {
    setLoading(true);
    event.preventDefault();
    if (!validateForm() || !price || !category || !productImage) {
      setLoading(false);
      return;
    }
    const productImageName: string = renderProductImageName();
    const url: FetchResult = await fetchGeneratePutUrl(productImageName, 'jpeg');
    if (!url || !url.data) {
      toast('Failed to upload Image', '', "error");
      setLoading(false);
      return;
    }
    uploadToS3(url.data.generatePutUrl, productImage, productImageName).then((value: AxiosResponse) => {
      addProductToDatabase(productName, category, quantity, discount, productImageName).then(({data}) => {
        dispatch(addNewProduct(data.addProduct));
        toast('New Product: ' + productName + ' created successfully!', '', 'success');
        clearForm();
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        toast('Failed to create Product', '', 'error');
      });
    }).catch((error: AxiosError) => {
      setLoading(false);
      toast('Failed to create Product', '', 'error');
    });
  }

  return (
    <React.Fragment>
      <Form onSubmit={handleOnSubmit}>
        <Row>
          <Form.Group as={Col} xs={12} md={6} className="mb-3" controlId="formBasicProductName">
            <Form.Label>Product name</Form.Label>
            <Form.Control type="text"
                          value={productName}
                          disabled={loading}
                          onChange={(event) => {
                            handleOnChangeProductName(event.target.value)
                          }}
            />
            <Row><span className='error-message'>{productNameError && productNameError}</span></Row>
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} className="mb-3" controlId="formBasicProductCategory">
            <Form.Label>Category</Form.Label>
            <Select placeholder='Select Category'
                    isClearable={true}
                    isSearchable={false}
                    value={category}
                    isDisabled={loading}
                    options={dropDownCategories()}
                    styles={styleSelect}
                    onChange={(selected: SelectCategoryType | null) => {
                      handleOnChangeCategory(selected)
                    }}
            />
            <Row><span className='error-message'>{categoryError && categoryError}</span></Row>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} xs={12} md={6} controlId="price">
            <Form.Label>Price</Form.Label>
            <NumberFormat thousandSeparator={true}
                          className='form-control'
                          prefix={'Rs. '}
                          disabled={loading}
                          value={price ? price : ''}
                          placeholder=""
                          onValueChange={(values) => {
                            handleOnChangePrice(values.floatValue ? values.floatValue : null)
                          }}
            />
            <Row><span className='error-message'>{priceError && priceError}</span></Row>
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} controlId="price">
            <Form.Label>Quantity</Form.Label>
            <NumberFormat thousandSeparator={true}
                          className='form-control'
                          value={quantity ? quantity : ''}
                          placeholder=""
                          disabled={loading}
                          onValueChange={(values) => {
                            handleOnChangeQuantity(values.floatValue ? values.floatValue : null)
                          }}
            />
            <Row><span className='error-message'>{quantityError && quantityError}</span></Row>
          </Form.Group>
        </Row>
        <Form.Group controlId="price">
          <Form.Label>Discount</Form.Label>
          <NumberFormat thousandSeparator={true}
                        className='form-control'
                        prefix={'Rs. '}
                        disabled={loading}
                        value={discount ? discount : ''}
                        placeholder=""
                        onValueChange={(values) => {
                          handleOnChangeDiscount(values.floatValue ? values.floatValue : null)
                        }}
          />
          <Row><span className='error-message'>{discountError && discountError}</span></Row>
        </Form.Group>
        <ImageCrop srcImg={srcImg}
                   setProductImage={setProductImage}
                   cropImageError={cropImageError}
                   setCropImageError={setCropImageError}
        />
        <Form.Group controlId="formFileSm" className="mb-3">
          <Form.Label>Product image</Form.Label>
          {
            loading && <React.Fragment>
                  <ClipLoader color={'#4caf50'} loading={loading} css={override} size={12}/>
                  <label className='uploading-label'>Uploading...</label>
              </React.Fragment>
          }
          <Form.Text className="image-validation-label">
            Maximum resolution : 200px X 200px , Maximum size : 1mb
          </Form.Text>
          <Form.Control
            disabled={loading}
            type="file"
            size="sm"
            onChange={(event) => fileChange((event.target as HTMLInputElement).files)}
            key={key || ''}/>
          <Row><span className='error-message'>{fileError && fileError}</span></Row>
        </Form.Group>
        <Button variant="primary" disabled={loading} type="submit" className='create-product-btn'>
          Create product
        </Button>
      </Form>
    </React.Fragment>
  );
}

export default CreateProductForm;
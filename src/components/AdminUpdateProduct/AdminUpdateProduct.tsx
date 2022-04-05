import {FetchResult, QueryResult, useMutation, useQuery} from "@apollo/client";
import React, {FormEvent, useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import Select from "react-select";
import {GET_ALL_CATEGORIES} from "../../graphQl/categories/categoriesQuery";
import {ICategory, IDropDownCategory, IProduct} from "../../types/IProduct";
import {styleSelect} from "../adminProductList/AdminProductListContants";
import {SelectCategoryType} from "../../types/AdminProductListType";
import NumberFormat from "react-number-format";
import {ClipLoader} from "react-spinners";
import {css} from "@emotion/react";
import {toast} from "../sweetalert/sweetalert";
import axios, {AxiosError, AxiosResponse} from "axios";
import {updateProduct} from "../../state/actions/productActions";
import {GENERATE_PUT_URL} from "../../graphQl/image/imageMutation";
import {UPDATE_PRODUCT} from "../../graphQl/products/productsMutation";
import {useDispatch} from "react-redux";
import ImageCrop from "../imageCrop/ImageCrop";
import moment from "moment";

type AdminUpdateProductProps = {
  closeUpdateSection: () => void
  updateToProduct: IProduct | null
  productName: string
  price: number | null
  discount: number | null
  setProductName: (productName: string) => void
  setPrice: (price: number | null) => void
  setDiscount: (discount: number | null) => void
  setProductNewImage: (productImage: string | null) => void
  productNewImage: string | null
}

const AdminUpdateProduct: React.FC<AdminUpdateProductProps> = (props) => {
  const {
    updateToProduct,
    productName,
    setProductName,
    price,
    setPrice,
    discount,
    setDiscount,
    setProductNewImage,
    closeUpdateSection,
    productNewImage
  } = props;
  const [loading, setLoading] = useState(false);
  const [productNameError, setProductNameError] = useState('');
  const categories: QueryResult = useQuery(GET_ALL_CATEGORIES);
  const [category, setCategory] = useState<SelectCategoryType | null>(null);
  const [categoryError, setCategoryError] = useState('');
  const [priceError, setPriceError] = useState<string>('');
  const [quantity, setQuantity] = useState<number | null>(null);
  const [quantityError, setQuantityError] = useState<string>('');
  const [discountError, setDiscountError] = useState<string>('');
  const [fileError, setFileError] = useState<String>('');
  const [key, setKey] = useState<string>(Math.random().toString(36));
  const [submit, setSubmit] = useState<boolean>(false);
  const [generatePutUrl] = useMutation<{ generatePutUrl: string }>(GENERATE_PUT_URL);
  const [updateProductMutation] = useMutation(UPDATE_PRODUCT);
  const [srcImg, setSrcImg] = useState<string | null>(null);
  const [cropImageError, setCropImageError] = useState<string>('');
  const dispatch = useDispatch();
  const override = css`
    margin-left: 20px;
  `;

  const dropDownCategories = () => {
    if (!categories.data) {
      return;
    }

    return categories.data.getAllCategories.map((category: ICategory) => {
      return {value: category.id, label: category.title};
    });
  };

  const handleOnChangeProductName = (productName: string) => {
    setProductName(productName);
  };

  const handleOnChangeCategory = (selected: SelectCategoryType | null) => {
    setCategoryError('');
    setCategory(selected);
    if (!selected) {
      setCategoryError('required');
    }
  };

  const handleOnChangePrice = (price: number | null) => {
    setPriceError('');
    setPrice(price);
    if (price && price <= 0) {
      setPriceError('Price must be greater than 0');
    }
  };

  const handleOnChangeQuantity = (quantity: number | null) => {
    setQuantityError('');
    setQuantity(quantity);
    if (quantity && quantity <= 0) {
      setQuantityError('Quantity must be greater than or equal to 0');
    }
  };

  const handleOnChangeDiscount = (discount: number | null) => {
    setDiscountError('');
    setDiscount(discount);
    if (discount && discount <= 0) {
      setDiscountError('Discount must be greater than or equal to 0');
    } else if (!price && discount) {
      setDiscountError('Enter the price first');
    } else if ((discount && price && discount > price)) {
      setDiscountError('Discount must be lower than price');
    }
  };

  const fileChange = (files: FileList|null) => {
    setFileError('');
    if (!files||!files[0]) {
      setFileError('Required');
      return;
    } else if (files[0].type.split('/')[0] !== 'image') {
      setFileError('file is not an image');
      return;
    } else if (files[0].size / (1024 * 1024) > 1) {
      setFileError('Image size must be lower than or equal to 1MB');
      return;
    }
    setSrcImg(URL.createObjectURL(files[0]));
  }

  const clearForm = React.useCallback(() => {
    setKey('');
    setProductName('');
    setCategory(null);
    setDiscount(null);
    setQuantity(null);
    setPrice(null);
    props.setProductNewImage(null);
    setKey(Math.random().toString(36));
  }, [props, setDiscount, setPrice, setProductName]);

  const validateForm = React.useCallback(() => {
    let productNameError: string = '';
    let priceError: string = '';
    let discountError: string = '';
    let categoryError: string = '';
    let quantityError: string = '';

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
    if (quantity && quantity < 0) {
      quantityError = 'Quantity must be greater than or equal to 0';
    }
    setQuantityError(quantityError);
    setProductNameError(productNameError);
    setPriceError(priceError);
    setDiscountError(discountError);
    setFileError(fileError);
    setCategoryError(categoryError);
    return !(productNameError || priceError || discountError || fileError || categoryError || quantityError);
  }, [category, discount, fileError, price, productName, quantity]);

  const fetchGeneratePutUrl = async (name: string) => {
    return await generatePutUrl({
      variables: {
        image: {
          imageName: name,
          imageFileType: 'jpeg',
        }
      }
    });
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

  const updateProductInDatabase = async (id: string,
                                         productName: string,
                                         category: IDropDownCategory,
                                         quantity: number | null,
                                         discount: number | null,
                                         fileName: string) => {
    return await updateProductMutation({
      variables: {
        id: id,
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
  const renderProductImageName = () => {
    const date: string = moment().format('YYMMDD');
    const randomString: string = String(Math.floor(Math.random() * 9999));
    return date + 'PRO' + randomString + '.jpeg';
  }
  const handleOnSubmit = async (event: FormEvent) => {
    setSubmit(true);
    setLoading(true);
    event.preventDefault();
    if (!validateForm() || !price || !category || !updateToProduct) {
      setLoading(false);
      return;
    }
    if (!productNewImage) {
      updateProductInDatabase(updateToProduct.id, productName, category, quantity, discount, '')
        .then(({data}) => {
          dispatch(updateProduct(data.updateProduct));
          toast('Product: ' + productName + ' updated successfully!', '', 'success');
          clearForm();
          setLoading(false);
          closeUpdateSection();
        }).catch((error) => {
        setLoading(false);
        toast('Failed to update product', '', 'error');
      });

    } else {
      const productImageName: string = renderProductImageName();
      const url: FetchResult = await fetchGeneratePutUrl(productImageName);
      if (!url || !url.data) {
        toast('Failed to upload image', '', "error");
        setLoading(false);
        return;
      }
      uploadToS3(url.data.generatePutUrl, productNewImage, productImageName).then((value: AxiosResponse) => {
        updateProductInDatabase(updateToProduct.id, productName, category, quantity, discount, productImageName)
          .then(({data}) => {
            dispatch(updateProduct(data.updateProduct));
            toast('Product: ' + productName + ' updated successfully!', '', 'success');
            clearForm();
            setLoading(false);
            closeUpdateSection();
          }).catch((error) => {
          setLoading(false);
          toast('Failed to update product', '', 'error');
        });
      }).catch((error: AxiosError) => {
        setLoading(false);
        toast('Failed to update product', '', 'error');
      });
    }
  }

  useEffect(() => {
    validateForm();
  }, [productName, category, price, discount, quantity, validateForm]);

  useEffect(() => {
    if (!props.updateToProduct) {
      return;
    }
    setProductName(props.updateToProduct.title);
    setCategory({value: props.updateToProduct.category.id, label: props.updateToProduct.category.title});
    setDiscount(props.updateToProduct.discount_price);
    setPrice(props.updateToProduct.regular_price);
    setQuantity(props.updateToProduct.quantity);
  }, [props.updateToProduct, setDiscount, setPrice, setProductName]);

  return (
    <Col className='update-product-form' xs={12} sm={12}>
      <div className='py-4'>
        <Form onSubmit={handleOnSubmit}>
          <Row>
            <Form.Group as={Col} xs={12} md={6} className="mb-3" controlId="formBasicProductName">
              <Form.Label>Product name</Form.Label>
              <Form.Control type="text"
                            value={productName}
                            onChange={(event) => {
                              handleOnChangeProductName(event.target.value)
                            }}
              />
              <Row><span className='error-message'>{productNameError && productNameError}</span></Row>
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-3" controlId="formBasicProductCategory">
              <Form.Label>Category</Form.Label>
              <Select
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
                            handleOnChangeDiscount(values.floatValue ? values.floatValue : null);
                          }}
            />
            <Row><span className='error-message'>{discountError && discountError}</span></Row>
          </Form.Group>
          <ImageCrop srcImg={srcImg}
                     setProductImage={setProductNewImage}
                     cropImageError={cropImageError}
                     setCropImageError={setCropImageError}
          />
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label>Change Product image</Form.Label>
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
              onChange={(event) => fileChange((event.target as HTMLInputElement).files)}
              type="file"
              size="sm"
              key={key || ''}
            />
            <Row><span className='error-message'>{fileError && submit}</span></Row>
          </Form.Group>
          <Button variant="primary" disabled={loading} type="submit" className='update-product-btn'>
            Update product
          </Button>
        </Form>
      </div>
    </Col>
  )
};

export default AdminUpdateProduct;
import {Form, Button, Col, Row} from "react-bootstrap";
import React, {useState} from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, {Crop} from "react-image-crop";
import {toast} from "../sweetalert/sweetalert";

type ImageCropProps = {
  srcImg: string | null
  setProductImage: (productImage: string | null) => void
  cropImageError: string
  setCropImageError: (cropImageError: string) => void
}
const ImageCrop: React.FC<ImageCropProps> = (props) => {

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>({height: 0, unit: 'px', width: 0, x: 0, y: 0, aspect: 1});

  const getCroppedImg = async () => {
    try {
      if (!image) {
        return;
      }
      const canvas: HTMLCanvasElement = document.createElement("canvas");
      const scaleX: number = image.naturalWidth / image.width;
      const scaleY: number = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
      const base64Image: string = canvas.toDataURL("image/jpeg", 1);
      if (crop?.width <= 0 || crop?.height <= 0) {
        props.setCropImageError('Please make selection before set image');
        return;
      }
      props.setProductImage(base64Image);
    } catch (e) {
      toast('Failed to crop Image', '', 'error');
    }
  };

  return (
    <Form.Group className="mb-3 text-center" controlId="formBasicCropImage">
      {props.srcImg && (
        <Row className='image-crop mx-1'>
          <Col xs={12} className='mt-1'>
            <ReactCrop
              style={{maxWidth: "50%"}}
              src={props.srcImg}
              onImageLoaded={setImage}
              crop={crop}
              onChange={setCrop}
            />
          </Col>
          <Col xs={12} className='mb-1'>
            <Button className="btn-secondary" size='sm' onClick={getCroppedImg}>
              Set Image
            </Button>
          </Col>
          {
            props.cropImageError &&
              <Col className='px-0'>
                  <span className='error-message'>{props.cropImageError}</span>
              </Col>
          }

        </Row>
      )}
    </Form.Group>
  );
}

export default ImageCrop;
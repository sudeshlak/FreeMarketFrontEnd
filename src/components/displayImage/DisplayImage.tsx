import React, {useEffect, useState} from 'react';
import {FetchResult, useMutation} from "@apollo/client";
import {GENERATE_GET_URL} from "../../graphQl/image/imageMutation";
import {Image} from "react-bootstrap";

type DisplayImageProps = {
  image: string
  className: string
}

const DisplayImage: React.FC<DisplayImageProps> = (props) => {
  const [image, setImage] = useState<string | null>(null);
  const [generateGetUrl] = useMutation<{ generateGetUrl: string }>(GENERATE_GET_URL);
  const fetchGenerateGetUrl =React.useCallback( async (imageName: string) => {
    return await generateGetUrl({
      variables: {
        image: {
          imageName: imageName,
          imageFileType: 'image/' + imageName.split('.')[1]
        }
      }
    });
  },[generateGetUrl]);

  const renderImage =React.useCallback( (imageName: string) => {
    fetchGenerateGetUrl(imageName).then((data: FetchResult) => {
      if (!data || !data.data) {
        return;
      }
      setImage(data.data.generateGetUrl)
    }).catch(error => {
      setImage(null);
    });
  },[fetchGenerateGetUrl]);

  useEffect(() => {
    renderImage(props.image);
    return (()=>{
      setImage(null);
    });
  }, [props.image, renderImage]);

  return (
    <React.Fragment>
      {image && <Image src={image} alt="image not found" className={props.className}/>}
    </React.Fragment>
  )
};

export default DisplayImage;
import React from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function ImageCroper({ file, onCrop, onCancel }) {
  const cropperRef = React.useRef(null);

  const [url, setUrl] = React.useState(null);

  React.useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  }, [file]);

  const convertToFile = async () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    const data = await cropper.getCroppedCanvas().toDataURL(file.type, 0.9);
    fetch(data)
      .then((res) => res.blob())
      .then((blob) => {
        const croppedFile = new File([blob], file.name, { type: file.type });
        onCrop(croppedFile);
      });
  };

  return (
    <div className="flexColCenter w-full border rounded-md mx-4 shadow overflow-hidden">
      <Cropper
        aspectRatio={4 / 3}
        className="max-h-screen w-auto"
        guides={true}
        ref={cropperRef}
        responsive={true}
        src={url}
        style={{ height: 400, width: "100%" }}
        viewMode={2}
      />
      <div className="flex items-center p-4 space-x-4">
        <button className="buttonPrimary" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="buttonPrimary" type="button" onClick={convertToFile}>
          Crop
        </button>
      </div>
    </div>
  );
}

export default ImageCroper;

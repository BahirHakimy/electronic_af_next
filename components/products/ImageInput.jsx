import React from "react";
import { ErrorMessage, useFormikContext } from "formik";
import { FcAddImage } from "react-icons/fc";
import { MdDelete } from "react-icons/md";

import ImageCroper from "./ImageCroper";

function ImageInput({ preventSubmit }) {
  const inputRef = React.createRef(null);
  const { setFieldError, setFieldValue, values } = useFormikContext();

  const [images, setImages] = React.useState([]);
  const [display, setDisplay] = React.useState(null);
  const [imageToCrop, setImageToCrop] = React.useState(false);

  const handleFileSelect = (changeEvent) => {
    preventSubmit(false);
    const allowedTypes = ["image/png", "image/jpeg"];
    const { files } = changeEvent?.target;

    if (files && allowedTypes.indexOf(files[0]?.type) !== -1) {
      let isDuplicate = false;
      if (images.length > 0) {
        images.forEach((img) => {
          if (img.name === files[0].name) {
            isDuplicate = true;
          }
        });
      }

      if (!isDuplicate) {
        setImageToCrop(files[0]);
        preventSubmit(true);
      } else {
        alert("Selected file already exist.");
      }
    } else {
      setFieldError("images", "Selected file type not supported");
    }
  };

  const handleCropped = (croppedFile) => {
    var reader = new FileReader();
    reader.onload = (e) => {
      setDisplay({ name: croppedFile.name, url: e.target.result });
      setImageToCrop(null);
      setImages([...images, { name: croppedFile.name, url: e.target.result }]);
    };
    reader.readAsDataURL(croppedFile);
    setFieldValue("images", [...values?.images, croppedFile]);
    preventSubmit(false);
  };

  const handleDelete = () => {
    setFieldValue(
      "images",
      values.images.filter((f) => f.name !== display.name)
    );
    const newImages = images.filter((im) => im.name !== display.name);
    setImages(newImages);
    setDisplay(newImages[newImages.length - 1]);
  };

  return imageToCrop ? (
    <ImageCroper
      file={imageToCrop}
      onCrop={handleCropped}
      onCancel={() => setImageToCrop(null)}
    />
  ) : (
    <div className="flex flex-col justify-start p-4 w-full text-slate-600 select-none">
      <p className="font-semibold mb-2 text-sm">Images</p>
      <div className="flex flex-col md:flex-row justify-evenly items-center p-2 md:p-8 w-full rounded-md border border-slate-300">
        <div className="flexColCenter">
          <p className="md:py-2 md:my-2 text-xl font-semibold">
            You can add up to three images
          </p>
          <p className="py-2">Click on each image to view it</p>
          <div
            className="flexRowCenter md:space-x-6 space-x-2 py-2 w-full"
            id="imagesList"
          >
            {images.map((img) => {
              return (
                <div
                  key={img.name}
                  className="flexRowCenter md:text-3xl text-base hover:bg-slate-200 active:shadow-inner w-12 h-12 md:w-16 md:h-16 shadow rounded-md border overflow-hidden animate-fade"
                  title="add image"
                  onClick={() => setDisplay(img)}
                >
                  <img src={img.url} alt="productImage" />
                </div>
              );
            })}
            {values?.images?.length < 3 && (
              <div
                className="flexRowCenter md:text-3xl text-base hover:bg-slate-200 active:shadow-inner w-12 h-12 md:w-16 md:h-16 shadow rounded-md border"
                onClick={() => inputRef.current?.click()}
                title="add image"
              >
                <FcAddImage />
              </div>
            )}
            <input
              accept="image/jpeg,image/png"
              className="hidden"
              id="imageSelect"
              name="imageSelect"
              ref={inputRef}
              type="file"
              onChange={handleFileSelect}
              onSelect={() => console.log("lkjk")}
            />
          </div>
        </div>
        <div
          className="flexColCenter shadow-md md:w-1/2 w-full rounded-md border overflow-hidden max-w-sm p-2 bg-gray-200 relative"
          id="imageDisplay"
        >
          {display ? (
            <>
              <div
                className="absolute text-base md:text-2xl top-2 right-2 shadow active:shadow-inner shadow-rose-300 md:p-2 p-1 rounded text-red-600"
                title="delete"
                onClick={handleDelete}
              >
                <MdDelete />
              </div>
              <img
                className="w-full h-auto"
                src={display.url}
                alt="productPic"
              />
            </>
          ) : (
            <div
              className="flexColCenter text-center px-6 py-20"
              id="placeholder"
            >
              <p className="text-3xl ">Ratio: 4x3</p>
              <p>The image aspect ratio should be 4x3</p>
            </div>
          )}
        </div>
      </div>
      <ErrorMessage
        name="images"
        render={(err) => <p className="text-left text-rose-600">{err}</p>}
      />
    </div>
  );
}

export default ImageInput;

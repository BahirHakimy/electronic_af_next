import Image from "next/image";
import React from "react";
import { FaEdit, FaTimes } from "react-icons/fa";

function ProductDetail(props) {
  const product = {
    id: 37,
    title: "Dell Xps 600 Gaming",
    category: "Laptop",
    cpu: "Intel core i7 10th genration 3.5GHz upto 5GHz",
    gpu: "Nvidea Geforce Rtx 3080 8GB",
    memory: "16GB",
    storage: "256GB",
    storageType: "SSD",
    os: "Windows 10 Pro",
    price: "1500.00",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio debitis accusantium quaerat nesciunt et atque pariatur odio beatae doloribus incidunt veniam maxime voluptatum, fuga nobis voluptas officiis! At, fugit odio.",
    images: [
      {
        image: "/pc.png",
        thumbnail: "/pc.png",
      },
      {
        image: "/pc.png",
        thumbnail: "/pc.png",
      },
      {
        image: "/pc.png",
        thumbnail: "/pc.png",
      },
    ],
  };
  return (
    <div className="w-full h-full bg-slate-50 mr-5 rounded-xl  max-h-screen overflow-x-hidden overflow-y-auto relative">
      <h1 className="text-slate-600 font-semibold">Product #{params?.id}</h1>
      <hr />
      <br />
      <div className="flex items-center rounded-xl h-5/6 border shadow">
        <div className="flex flex-col justify-center p-4 rounded">
          <div className="flexRowCenter w-80 h-auto shadow-md rounded-xl border p-2 overflow-hidden">
            <Image
              src={product.images[0].image}
              alt="productImage"
              width={1650}
              height={1250}
            />
          </div>
          <div className="flexRowCenter space-x-4 my-8 px-2">
            {product.images.map((im) => (
              <div
                key={im.image.slice(-10)}
                className="flexRowCenter h-16 w-16 rounded border shadow"
              >
                <Image
                  src={im.image}
                  alt="productImages"
                  width={165}
                  height={125}
                />
              </div>
            ))}
          </div>
          <h3 className="text-center text-xl font-bold text-slate-600">
            ${product.price}
          </h3>
        </div>
        <div className="flex flex-col justify-center items-start h-full">
          <div className="flex items-center justify-end space-x-4 w-full px-10 ">
            <button className="flex items-center space-x-1 rounded-md text-cyan-600 bg-transparent border px-2 shadow active:shadow-inner">
              <FaEdit />
              Edit
            </button>
            <button className="flex items-center space-x-1 rounded-md text-cyan-600 bg-transparent border px-2 shadow active:shadow-inner">
              <FaTimes /> Close
            </button>
          </div>
          <p className="px-6 text-xl font-semibold text-slate-600">
            {product.title} {product.category}
          </p>
          <p className="px-6 py-1 font-light text-slate-500">
            Category: {product.category}
          </p>
          <p className="px-6 py-1 font-light text-slate-500">
            CPU: {product.cpu}
          </p>
          <p className="px-6 py-1 font-light text-slate-500">
            GPU: {product.gpu}
          </p>
          <p className="px-6 py-1 font-light text-slate-500">
            RAM: {product.memory} DRR5
          </p>
          <p className="px-6 py-1 font-light text-slate-500">
            Storage: {product.storage}
          </p>
          <p className="px-6 py-1 font-light text-slate-500">
            Storage Type: {product.storageType}
          </p>
          <p className="px-6 py-1 font-light text-slate-500">
            OS: {product.os}
          </p>
          <p className="px-6 py-1 font-light text-slate-500">
            Rate: {product.os}
          </p>
          <p className="px-6 text-slate-600 font-semibold italic ">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

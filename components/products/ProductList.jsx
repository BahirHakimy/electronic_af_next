import React from "react";
import {
  FaDesktop,
  FaLaptop,
  FaPlus,
  FaSort,
  FaSortDown,
  FaSortUp,
} from "react-icons/fa";
import _ from "lodash";
import { useRouter } from "next/router";

function ProductList({ products = [] }) {
  const [sortedCol, setSortedCol] = React.useState(null);

  const router = useRouter();

  const sort = (title) => {
    if (!sortedCol) {
      setSortedCol({ title, asc: true });
    } else {
      setSortedCol({ title, asc: !sortedCol.asc });
    }
  };

  const getSortIcon = (title) => {
    if (sortedCol?.title === title) {
      return sortedCol?.asc ? (
        <FaSortDown
          onClick={() => sort(title)}
          className="text-cyan-600 cursor-pointer"
          title="Sorted Ascending"
        />
      ) : (
        <FaSortUp
          onClick={() => sort(title)}
          className="text-cyan-600 cursor-pointer"
          title="Sorted Descending"
        />
      );
    }
    return (
      <FaSort
        onClick={() => sort(title)}
        className="hover:text-cyan-600 cursor-pointer"
        title="Sort"
      />
    );
  };

  let data = sortedCol
    ? _.orderBy(products, sortedCol?.title, sortedCol?.asc ? "asc" : "desc")
    : products;

  return (
    <div className="w-full h-full bg-slate-50 rounded-xl">
      <div className="flex justify-between items-center">
        <h1 className="text-slate-600 font-semibold">All Products</h1>
        <button
          className="buttonPrimary bg-cyan-500"
          onClick={() => router.push("create")}
        >
          <FaPlus />
          New
        </button>
      </div>
      <hr />
      <br />
      <div className="flex justify-evenly">
        <p className="md:w-2/12 w-2/4 flex justify-between items-center border-2 py-0.5 px-4 text-slate-600 font-semibold">
          Name
        </p>
        <h3 className="md:w-3/12 hidden md:block border-2 py-0.5 px-4 text-slate-600 font-semibold">
          Cpu
        </h3>
        <p className="md:w-3/12 hidden md:block border-2 py-0.5 px-4 text-slate-600 font-semibold">
          Gpu
        </p>
        <p className="md:w-2/12 w-2/4 flex justify-between items-center border-2 py-0.5 px-4 text-slate-600 font-semibold">
          Price
          {getSortIcon("price")}
        </p>
        <p className="md:w-2/12 md:flex justify-between items-center hidden border-2 py-0.5 px-4 text-slate-600 font-semibold">
          Category
          {getSortIcon("category")}
        </p>
      </div>
      {data.map((p, i) => (
        <div
          key={`${p.id}${i}`}
          className="flexRowCenter  rounded-lg  py-4 px-8 my-2 text-slate-800 shadow active:shadow-inner cursor-pointer hover:bg-blue-100"
        >
          <p className="md:w-2/12 w-1/2 px-4">{p.title}</p>
          <p className="truncate hidden md:block w-3/12 px-4" title={p.cpu}>
            {p.cpu}
          </p>
          <p className="truncate hidden md:block w-3/12 px-4" title={p.gpu}>
            {p.gpu}
          </p>
          <p className="md:w-2/12 w-1/2 px-4">${p.price}</p>
          <p className="w-2/12 hidden md:flex items-center justify-center px-4">
            {p.category === "Laptop" ? (
              <FaLaptop size={25} />
            ) : (
              <FaDesktop size={25} />
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;

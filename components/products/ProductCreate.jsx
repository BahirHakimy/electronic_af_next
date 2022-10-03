import React from "react";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import InputField from "./InputField";
import ImageInput from "./ImageInput";
// import endpoints from "../../../ApiCallHandlers";
// import useApi from "../../../useApi";
// import LoadingPage from "../../LoadingPage";
// import ErrorPage from "../../ErrorPage";

const types = [
  { value: "fDT", label: "Desktop" },
  { value: "LTf", label: "Laptop" },
];
const vendors = [
  { value: "dell", label: "DELL" },
  { value: "hp", label: "HP" },
  { value: "apple", label: "APPLE" },
  { value: "asus", label: "ASUS" },
  { value: "lenovo", label: "LENOVO" },
  { value: "msi", label: "MSI" },
];
const memoryCapacities = [
  { value: "4", label: "4GB" },
  { value: "8", label: "8GB" },
  { value: "16", label: "16GB" },
  { value: "32", label: "32GB" },
  { value: "64", label: "64GB" },
  { value: "128", label: "128GB" },
];
const storageCapacities = [
  { value: "512", label: "512GB" },
  { value: "1", label: "1TB" },
  { value: "2", label: "2TB" },
  { value: "3", label: "3TB" },
  { value: "4", label: "4TB" },
];
const storageTypes = [
  { value: "f1", label: "HDD" },
  { value: "2f", label: "SSD" },
];

const fields = [
  { label: "PRODUCT NAME", half: true, inputArgs: { name: "title" } },
  {
    label: "TYPE",
    type: "select",
    options: types,
    half: true,
    inputArgs: { name: "type" },
  },
  { label: "CPU", inputArgs: { name: "cpu" } },
  { label: "GPU", inputArgs: { name: "gpu" } },
  {
    label: "VENDOR",
    half: true,
    inputArgs: { name: "vendor" },
    type: "select",
    options: vendors,
  },
  { label: "OPERATING SYSTEM", half: true, inputArgs: { name: "os" } },
  {
    label: "MAIN MEMORY",
    type: "select",
    options: memoryCapacities,
    half: true,
    inputArgs: { name: "memory" },
  },
  {
    label: "STORAGE",
    type: "select",
    options: storageCapacities,
    half: true,
    inputArgs: { name: "storage" },
  },
  {
    label: "STORAGE TYPE",
    type: "select",
    options: storageTypes,
    half: true,
    inputArgs: { name: "storageType" },
  },
  {
    label: "PRICE",
    type: "text",
    half: true,
    inputArgs: { name: "price" },
  },
  {
    label: "DESCRIPTION",
    type: "textarea",
    inputArgs: { name: "description" },
  },
];

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  type: Yup.string()
    .required()
    .oneOf(types.map((c) => c.value)),
  vendor: Yup.string()
    .required()
    .oneOf(vendors.map((v) => v.value)),
  cpu: Yup.string().required().max(55),
  gpu: Yup.string().required().max(55),
  os: Yup.string().required().max(55),
  memory: Yup.string()
    .required()
    .oneOf(memoryCapacities.map((mc) => mc.value)),
  storage: Yup.string()
    .required()
    .oneOf(storageCapacities.map((sc) => sc.value)),
  storageType: Yup.string()
    .required()
    .oneOf(storageTypes.map((st) => st.value)),
  price: Yup.string()
    .required()
    .matches(
      /^\d{1,4}(\.\d{0,2})?$/,
      "Price must be valid and less then $9999.99."
    ),
  description: Yup.string(),
  images: Yup.array().min(1, "You should add at least one image"),
});

function ProductCreate(props) {
  const router = useRouter();
  // const { isIdle, isPending, isRejected, isResolved, error, data, request } =
  //   useApi();
  const [cropping, setCropping] = React.useState(false);

  const handleSubmit = (data, { setErrors }) => {
    //   request(endpoints.products.createProduct(data), setErrors);
  };

  // return isRejected ? (
  //   <ErrorPage type={error.errorType} message={error.message} />
  // ) : isPending ? (
  //   <LoadingPage />
  // ) : (
  return (
    <div className="w-full h-full bg-slate-50 rounded-xl">
      <h1 className="text-slate-600 font-semibold">Add Product</h1>
      <hr />
      <br />
      <div className="flex flex-wrap w-full h-full">
        <Formik
          initialValues={{
            title: "",
            type: types[0].value,
            vendor: vendors[0].value,
            cpu: "",
            gpu: "",
            os: "",
            memory: memoryCapacities[0].value,
            storage: storageCapacities[0].value,
            storageType: storageTypes[0].value,
            price: "",
            description: "",
            images: [],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-wrap w-full">
              {fields.map((f) => (
                <InputField {...f} key={f.label} />
              ))}
              <ImageInput preventSubmit={setCropping} />
              <div className="flex justify-end my-8 w-full">
                <button
                  className="buttonPrimary mx-2"
                  disabled={isSubmitting}
                  onClick={() => router.push("/admin/products")}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="buttonPrimary mx-2 disabled:bg-cyan-300"
                  disabled={isSubmitting || cropping}
                  type="submit"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ProductCreate;

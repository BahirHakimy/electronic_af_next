import React from "react";
import clsx from "clsx";
import { ErrorMessage, Field } from "formik";

function InputField({
  label,
  type = "text",
  half = false,
  options = [],
  inputArgs = {},
}) {
  const classes = clsx(
    "flex flex-col justify-start p-4 w-full",
    half && "md:w-1/2"
  );
  const inputStyle =
    "px-6 rounded-md border border-slate-300 outline-cyan-600 focus:outline bg-transparent lg:py-1";
  return (
    <div className={classes}>
      <p className="text-slate-600 font-semibold mb-2 text-sm">{label}</p>
      {type === "select" ? (
        <Field
          as="select"
          name={inputArgs.name}
          className={inputStyle}
          {...inputArgs}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Field>
      ) : type === "textarea" ? (
        <Field
          as="textarea"
          name={inputArgs.name}
          {...inputArgs}
          rows={4}
          className={inputStyle}
        />
      ) : (
        <Field
          type={type}
          name={inputArgs.name}
          className={inputStyle}
          {...inputArgs}
        />
      )}
      <ErrorMessage
        name={inputArgs?.name}
        render={(err) => <p className="text-rose-600 text-left">{err}</p>}
      />
    </div>
  );
}

export default InputField;

import React from "react";
import Nav from "./Nav";

type ContainerProps = { children: any };

function Container(props: ContainerProps) {
  return (
    <div className="flex p-0 m-0 bg-cyan-600 h-screen overflow-hidden">
      <Nav />
      <div className="w-full h-full scrollbar-thumb:rounded bg-slate-50 rounded-xl mt-5 mr-5 px-10 py-5 max-h-screen overflow-scroll">
        {props.children}
      </div>
    </div>
  );
}

export default Container;

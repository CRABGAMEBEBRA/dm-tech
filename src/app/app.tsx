import Header from "../header";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Content from "../content";
import store from "../context";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Content />
      </Provider>
    </BrowserRouter>
  );
}

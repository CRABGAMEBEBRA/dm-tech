import Header from "../header/header";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Content from "../content/content";
import { Provider } from "react-redux";
import { store } from "../store";

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

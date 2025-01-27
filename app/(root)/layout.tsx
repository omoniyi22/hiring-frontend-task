"use client"
import "./../globals.css";
import React from 'react';
import { AppBar } from "@/app/components/navbar/AppBar";
import { Provider} from "react-redux";
import {  store } from "../state/store";


export const Wrapper = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store} >
      <AppBar />
        {children}
    </Provider>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}


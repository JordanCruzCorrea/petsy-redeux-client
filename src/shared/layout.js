import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import View from "../components/view/view";
import Sidebar from "../components/sidebar";

export default function Layout({ children }) {
  const [isExpanded, toggleIsExpanded] = useState(false);

  const toggleExpanded = () => {
    toggleIsExpanded(!isExpanded);
  };

  return (
    <View class="flex flex-col w-screen min-h-screen">
      <Header />
      <main className="flex flex-grow">
        <Sidebar isExpanded={isExpanded} toggleExpanded={toggleExpanded} />
        <section
          onClick={() => toggleIsExpanded(false)}
          className="flex flex-col justify-center w-full pt-24 ml-auto md:w-5/6"
        >
          {children}
        </section>
      </main>
      <Footer />
    </View>
  );
}

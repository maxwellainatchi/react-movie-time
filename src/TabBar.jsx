import React, { useState } from "react";

export class Page {
  constructor(name, component) {
    this.name = name;
    this.component = component;
  }
}

export default function TabBar({ pages }) {
  const [currentPage, setPage] = useState(pages[0]);
  if (!currentPage) {
    return undefined;
  }

  return (
    <div>
      <nav style={{ marginBottom: "10px" }}>
        {pages.map(page => (
          <span
            style={{
              border: "1px solid black",
              width: "max-content",
              padding: "5px",
              marginRight: "5px",
              backgroundColor: page === currentPage ? "gray" : "white"
            }}
            onClick={() => setPage(page)}
          >
            {page.name}
          </span>
        ))}
      </nav>
      {currentPage.component}
    </div>
  );
}

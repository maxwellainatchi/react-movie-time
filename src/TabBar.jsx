import React, { useState } from "react";

export class Page extends React.Component {
  constructor({ title, children }) {
    super();
    this.title = title;
    this.children = children;
  }

  render() {
    return <div>{this.children}</div>;
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
            key={page.name}
            style={{
              border: "1px solid black",
              width: "max-content",
              padding: "5px",
              marginRight: "5px",
              backgroundColor: page === currentPage ? "gray" : "white"
            }}
            onClick={() => setPage(page)}
          >
            {page.title}
          </span>
        ))}
      </nav>
      {currentPage}
    </div>
  );
}

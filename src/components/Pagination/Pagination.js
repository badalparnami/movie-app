import React from "react";
import ReactPaginate from "react-paginate";

import "./Pagination.css";

const Page = ({ page, totalPages, getNewData }) => {
  return (
    <div className="pagination-main">
      <ReactPaginate
        forcePage={page}
        pageCount={totalPages}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        onPageChange={getNewData}
        containerClassName={"pagination"}
        breakClassName={"break-me"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Page;

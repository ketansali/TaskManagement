import { useTable, usePagination, useExpanded, useSortBy } from "react-table";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Loader from "../Loader/Index";
export default function DataTable({
  columns,
  data,
  fetchData,
  loading,
  pages,
  dispatch
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,

    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 1,
        pageSize: 5,
      },
      manualPagination: true,
      //manualSortBy: true,
      autoResetPage: false,
    },
    useSortBy,
    useExpanded,
    usePagination
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
  
    fetchData && fetchData({ search: "", page: pageIndex, limit: pageSize });
  }, [fetchData,pageIndex,pageSize,dispatch]);
  function handlePageClick({ selected: selectedPage }) {
    fetchData({ search: "", page: selectedPage + 1, limit: pageSize });
  }
  const handleSearch = (search) => {
    setSearch(search);
    fetchData({ search: search, page: pageIndex, limit: pageSize });
  };
  const handleGoTo = (limit)=>{
    fetchData({ search: "", page: pageIndex, limit: limit });
  }

  return (
    <>
      <div className="row d-flex align-items-center">
      <div className="col-sm-6 col-md-6">
        <div className="d-inline" >
          <label className="font-weight-bold">
            Show{" "}
            <select onClick={(e)=>handleGoTo(e.target.value)}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>{" "}
            entries
          </label>
        </div>
      </div>
      <div className="col-sm-6 col-md-6  ">
        <div className="form-group form-focus float-right">
          <input
            type="text"
            className="form-control floating"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <label className="focus-label">Search here</label>
        </div>
      </div>
      </div>
      <div>
        {
          loading ?(
           <div className="d-flex justify-content-center align-items-center">
          <Loader/>
           </div>
          ):(
            <table
          {...getTableProps({
            className: "table table-striped custom-table mb-0 ",
          })}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps([
                      { className: column.className },
                      column.getSortByToggleProps(),
                    ])}
                  >
                    {column?.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <i className="fa fa-sort-desc"></i>
                        ) : (
                          <i className="fa fa-sort-up"></i>
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
          )
        }

        <div style={{ float: "right", marginTop: "20px" }}>
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pages}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
           // initialPage={0}
            forcePage={search ? 0 : null}
          />
        </div>
      </div>
    </>
  );
}

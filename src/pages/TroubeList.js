import React, { useEffect, useState, useMemo } from "react";
import TableHeader from "../components/DataTable/TableHeader";
import PaginationComponent from "../components/DataTable/PaginationComponent";
import Search from "../components/DataTable/Search";
import useFullPageLoader from "../hooks/useFullPageLoader";

const TroubleList = () => {
  const [comments, setComments] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const ITEMS_PER_PAGE = 50;

  const headers = [
    { name: "No#", field: "id", sortable: false },
    { name: "Name", field: "name", sortable: true },
    { name: "Email", field: "email", sortable: true },
    { name: "Comment", field: "body", sortable: false },
  ];

  useEffect(() => {
    const getData = () => {
      showLoader();

      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((response) => response.json())
        .then((json) => {
          hideLoader();
          setComments(json);
        });
    };

    getData();
  }, []);

  const commentsData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.name.toLowerCase().includes(search.toLowerCase()) ||
          comment.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedComments.length);

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedComments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [comments, currentPage, search, sorting]);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <Search
            onSearch={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <table className="table table-condensed">
        <TableHeader
          headers={headers}
          onSorting={(field, order) => setSorting({ field, order })}
        />
        <tbody>
          {commentsData.map((comment) => (
            <tr key={comment.id}>
              <th scope="row">{comment.id}</th>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
              <td>{comment.body}</td>
              <td>
                <button type="button" className="btn btn-default">
                  Show
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row">
        <div className="col-md-6">
          <PaginationComponent
            total={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      {loader}
    </>
  );
};

export default TroubleList;

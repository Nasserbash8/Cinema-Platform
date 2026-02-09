import React, { useCallback, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMovies,
  types,
  filtering,
} from "../../redux/action/MoivesAction";
import { AllMovies, MoviesTypes, Filter } from "../../redux/types/MoviesTypes";

const PaginationMovies = ({ pagenumber, type, datainput, moviesType }) => {
  console.log('PaginationMovies');
  const { t } = useTranslation();
  const applang = useSelector((state) => state.languages.lang);
  const moviesAc = useSelector((state) => state.movies.types);
  const Dispatch = useDispatch();

  const handlePageClick = useCallback(
    (data) => {
      if (moviesAc === AllMovies) {
        Dispatch(getAllMovies(applang, data.selected + 1));
      } else if (moviesAc === MoviesTypes) {
        Dispatch(types(applang, type, data.selected + 1));
      } else if (moviesAc === Filter) {
        Dispatch(
          filtering(
            applang,
            datainput.year,
            datainput.id,
            data.selected + 1,
            moviesType
          )
        );
      }
    },
    [
      applang,
      datainput.id,
      datainput.year,
      Dispatch,
      moviesAc,
      moviesType,
      type,
    ]
  );

  const pageCount = useMemo(() => pagenumber, [pagenumber]);

  return (
    <ReactPaginate
      breakLabel="..."
      onPageChange={handlePageClick}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      nextLabel={t("next")}
      previousLabel={t("previous")}
      containerClassName="pagination p-3 justify-content-center"
      pageClassName="page"
      pageLinkClassName="page-link"
      previousClassName="page"
      nextClassName="page"
      breakClassName="page"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextLinkClassName="page-link"
      activeLinkClassName="active"
    />
  );
};

export default React.memo(PaginationMovies);

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

function Pagination({ curPage, totalPage, setPage }: { curPage: number; totalPage: number; setPage }) {

  const pages = [];
  totalPage = totalPage == 0 ? 1 : totalPage;
  for(let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  const onChange = (e) => {
    setPage(e.target.value);
  }

  return (
    <div className="flex items-center justify-center">
      <select value={curPage} name="page" id="" onChange={(e) => onChange(e)} className="py-3 px-3 mx-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100">
        {pages.map((item, index) => {
          return <option key={index} value={item}>Trang {item}</option>
        })}
      </select>
    </div>
  );
}

export default Pagination;

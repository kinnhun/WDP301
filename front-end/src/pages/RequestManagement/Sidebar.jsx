import { useDispatch } from "react-redux";
import { sortByStatus } from "../../stores/slices/requestSlice";

function Sidebar() {
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => dispatch(sortByStatus("all"))}>
          All <span>13</span>
        </li>
        <li onClick={() => dispatch(sortByStatus("open"))}>
          Open <span>3</span>
        </li>
        <li onClick={() => dispatch(sortByStatus("pending"))}>
          Pending <span>2</span>
        </li>
        <li onClick={() => dispatch(sortByStatus("closed"))}>
          Closed <span>8</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

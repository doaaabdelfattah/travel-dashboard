import { FaCaretUp } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa6";
const Caret = ({ direction }) => {
  return (
    <>
      <FaCaretUp color={direction === "asc" ? "black" : "gray"} />
      <FaCaretDown color={direction === "des" ? "black" : "gray"} />
    </>
  );
};

export default Caret;

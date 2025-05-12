import { useNavigate } from "react-router-dom";
import auth from "../auth";

function IssueButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    if (auth.currentUser) {
      navigate("/issue");
    } else {
      alert("Будь ласка, увійдіть, щоб оформити замовлення.");
      navigate("/login");
    }
  };

  return (
    <div className="issue">
      <button type="button" className="issue-btn" onClick={handleClick}>
        Оформити замовлення
      </button>
    </div>
  );
}

export default IssueButton;

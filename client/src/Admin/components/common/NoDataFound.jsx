
import { Link } from "react-router-dom";

function Nodatafound({admin}) {
  return (
    <>
      <div className="pnf_bx">
        <div className="pnf_con_bx">
          <img
            className="mt-5 res"
            src="/images/others/nodatafound.webp"
            alt="No Data Found"
          />
          <p className="mini_text">No Data Found</p>
          <Link to={admin ? "/admin" : "/"}>
            <button className="admin_btns clr_pri">Go Back To Home</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Nodatafound;

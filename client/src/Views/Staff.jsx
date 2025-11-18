import "../Views/Components/css/staff.css";

const Staff = () => {
  return (
    <div className="staff_main_section container">
      <div className="staff_container_grid">
        <div className="staff_grid_item">
          <div className="staff_grid_item_img">
            <img src="images/staff/Mr.Nirmalkumar.webp" />
          </div>
          <div className="staff_grid_item_content">
            <h2>Mr.M.Nirmal Kumar</h2>
            <p>Treasurer</p>
          </div>
        </div>
        <div className="staff_grid_item">
          <div className="staff_grid_item_img">
            <img src="images/staff/Ms. Rinku Joint.webp" />
          </div>
          <div className="staff_grid_item_content">
            <h2>Mrs.Rinku</h2>
            <p>Joint Treasurer</p>
          </div>
        </div>
        <div className="staff_grid_item">
          <div className="staff_grid_item_img">
            <img src="images/staff/Arun Karthikeyan.webp" />
          </div>
          <div className="staff_grid_item_content">
            <h2>Mr.V.ArunKarthikeyan</h2>
            <p>Secretary</p>
          </div>
        </div>
        <div className="staff_grid_item">
          <div className="staff_grid_item_img">
            <img src="images/staff/Mrs. Devi.K.V.webp" />
          </div>
          <div className="staff_grid_item_content">
            <h2>Mrs.K.V.Devi</h2>
            <p>Joint Secretary</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="menu">
      <button className="btn btn-primary" onClick={() => navigate("/admin/invoices/create")}>
        Create Invoice
      </button>
    </div>
  );
};

export default Menu;

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";
import "./CreateInvoice.scss";
import toast from "react-hot-toast";

const CreateInvoice = () => {
  const [types, setTypes] = useState([]);
  const { register, handleSubmit, watch, setValue, reset } = useForm();
  const [electricity, setElectricity] = useState(0);
  const [water, setWater] = useState(0);

  const navigate = useNavigate();
  const invoiceType = watch("invoiceType");

  const calculateAmount = () => {
    return Math.max(electricity * 3000 + water * 10000, 0);
  };

  const createInvoice = async (data) => {
    try {
      const response = await axios.post("/invoice", data);
      console.log(response);
      if (response.status === 200) {
        reset();
        toast.success("Invoice created successfully");
        // navigate("/admin/invoices");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.errors === "Not found user in this room") {
        toast.error("Not found user in this room");
      }
      if (error.response.data.errors === "User not found") {
        toast.error("User not found");
      }
    }
  };

  const onSubmit = (data) => {
    console.log(data.amount);
    const currentDate = new Date().setHours(0, 0, 0, 0);
    const selected = new Date(data.expiredDate).setHours(0, 0, 0, 0);
    if (selected < currentDate) {
      toast.error("Thời gian hết hạn phải lớn hơn hoặc bằng thời gian hiện tại");
      return;
    }
    if (!invoiceType) {
      toast.error("Loại hóa đơn là bắt buộc");
      return;
    }
    const amount = invoiceType == 1 ? calculateAmount() : Math.max(data.amount, 1);
    const newData = {
      ...data,
      electricity,
      water,
      amount,
    };
    createInvoice(newData);
  };

  const getInvoiceTypes = async () => {
    try {
      const response = await axios.get("/invoice/types");
      if (response.status === 200) {
        setTypes(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInvoiceTypes();
  }, []);

  useEffect(() => {
    if (invoiceType !== 3) {
      setValue("amount", calculateAmount());
    }
  }, [electricity, water, setValue]);

  useEffect(() => {
    if (invoiceType !== undefined) {
      reset({
        invoiceType: invoiceType,
        room: "",
        email: "",
        description: "",
        ew_date: "",
        expiredDate: "",
        amount: invoiceType == 1 ? calculateAmount() : "",
      });
      setElectricity(0);
      setWater(0);
    }
  }, [invoiceType]);

  return (
    <div className="create-invoice-form">
      <button className="btn btn-primary" onClick={() => navigate("/admin/invoices")}>
        Back
      </button>
      <h2>Create Invoice</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Invoice Type</label>
          <select {...register("invoiceType")} className="form-control">
            <option value="" hidden>
              Choose invoice type
            </option>
            {types.length > 0 &&
              types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
          </select>
        </div>

        {invoiceType && (
          <>
            {" "}
            <div className="form-group">
              <label>{invoiceType == 2 ? "Room" : invoiceType == 1 ? "Room" : "Email"}</label>
              <input
                type="text"
                {...register(invoiceType == 2 || invoiceType == 1 ? "room" : "email")}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea {...register("description")} className="form-control" rows="3" />
            </div>
            {invoiceType == 1 && invoiceType != 2 && (
              <>
                <div className="form-group">
                  <label>Electricity Units</label>
                  <input
                    type="number"
                    value={electricity}
                    onChange={(e) => setElectricity(Math.max(0, Number(e.target.value)))}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Water Units</label>
                  <input
                    type="number"
                    value={water}
                    onChange={(e) => setWater(Math.max(0, Number(e.target.value)))}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>EW Get Date</label>
                  <input type="date" {...register("ew_date")} className="form-control" required />
                </div>
              </>
            )}
            <div className="form-group">
              <label>Expired Date</label>
              <input type="date" {...register("expiredDate")} className="form-control" required />
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                {...register("amount")}
                value={invoiceType == 1 ? calculateAmount() : undefined}
                onChange={(e) =>
                  invoiceType != 1 ? setValue("amount", Math.max(0, Number(e.target.value))) : null
                }
                readOnly={invoiceType == 1}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create Invoice
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default CreateInvoice;

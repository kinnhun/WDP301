import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../stores/slices/userSlice";
import "./CreateUser.scss";

const CreateUser = ({ show, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const status = useSelector((state) => state.user.status);
  const dispatch = useDispatch();
  console.log(status);

  const onSubmit = (data) => {
    dispatch(createUser(data));
    if (!status === "failed") {
      reset();
      onClose();
    }
  };

  useEffect(() => {
    reset();
  }, []);

  if (!show) return null;

  return (
    <div className="create-user-overlay">
      <div className="create-user-content">
        <h2>Create User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="create-user-field">
            <label>Username</label>
            <input type="text" {...register("username", { required: "Username is required" })} />
            {errors.username && <p className="create-user-error">{errors.username.message}</p>}
          </div>
          <div className="create-user-field">
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="create-user-error">{errors.password.message}</p>}
          </div>
          <div className="create-user-field">
            <label>Gender</label>
            <select {...register("gender", { required: "Gender is required" })}>
              <option value="" hidden selected>
                Select Gender
              </option>
              <option value="1">Male</option>
              <option value="0">Female</option>
            </select>
            {errors.gender && <p className="create-user-error">{errors.gender.message}</p>}
          </div>
          <div className="create-user-field">
            <label>Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="create-user-error">{errors.email.message}</p>}
          </div>
          <div className="create-user-field">
            <label>Status</label>
            <select {...register("status", { required: "Status is required" })}>
              <option value="" selected hidden>
                Select Status
              </option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
            {errors.status && <p className="create-user-error">{errors.status.message}</p>}
          </div>
          <div className="create-user-field">
            <label>Role</label>
            <select {...register("role", { required: "Role is required" })}>
              <option value="" selected hidden>
                Select Role
              </option>
              <option value="2">Manager</option>
              <option value="3">Staff</option>
              <option value="4">Student</option>
            </select>
            {errors.role && <p className="create-user-error">{errors.role.message}</p>}
          </div>
          <div className="create-user-actions">
            <button type="submit" className="create-user-btn-primary">
              Create
            </button>
            <button type="button" className="create-user-btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;

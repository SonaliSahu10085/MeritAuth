export const Toast = ({ message, type = "success" }) => (
<div className="toast toast-bottom z-15">
    <div className={`alert alert-${type} ${type === "success" && "bg-green-500"} px-2 py-4 `}>
      <span>{message}</span>
    </div>
  </div>
);


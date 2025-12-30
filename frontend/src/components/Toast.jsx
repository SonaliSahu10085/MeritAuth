export const Toast = ({ message, type = "success" }) => (
  <div className="toast toast-end toast-bottom">
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
    </div>
  </div>
);
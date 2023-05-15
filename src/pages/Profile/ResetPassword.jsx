import { useContext } from "react";
import { Button } from "react-bootstrap";
import ApiContext from "../../context/ApiContext";
import { useFormik } from "formik";
import { UpdatePasswordSchema } from "../../utils/formValidations";
import cn from "classnames";

function ResetPassword() {
  const { user, _updatePassword } = useContext(ApiContext);

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    onSubmit: (values) => {
      values.email = user?.email;

      _updatePassword(values);
    },

    validationSchema: UpdatePasswordSchema,
  });

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-0">Reset Password</h5>
        <small className="form-text text-muted mb-3">When resetting it, you will be logged out automatically.</small>
        <div className="settings-profile">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="col-md-6">
                <label className="text-muted" htmlFor="currentPass">
                  Current password
                </label>
                <input
                  id="currentPass"
                  name="currentPassword"
                  type="password"
                  className={cn(["form-control", errors.currentPassword && touched.currentPassword && "is-invalid"])}
                  placeholder="Enter your password"
                  value={values.currentPassword}
                  onChange={handleChange("currentPassword")}
                />
                {errors.currentPassword && touched.currentPassword && (
                  <div className="invalid-feedback">{errors.currentPassword}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="text-muted" htmlFor="newPass">
                  New password
                </label>
                <input
                  id="newPass"
                  type="password"
                  name="newPassword"
                  className={cn(["form-control", errors.newPassword && touched.newPassword && "is-invalid"])}
                  placeholder="Enter new password"
                  value={values.newPassword}
                  onChange={handleChange("newPassword")}
                />
                {errors.newPassword && touched.newPassword && (
                  <div className="invalid-feedback">{errors.newPassword}</div>
                )}
              </div>

              <div className="col-md-12">
                <Button type="submit" size="sm">
                  Change Password
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

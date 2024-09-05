import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./LoginForm.module.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Validation schema using Yup to define validation rules
const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address") // Validate email format
        .required("Email is required"), // Email is required
    password: Yup.string().required("Password is required"), // Password is required
});

function LoginForm() {
    // Hook to navigate programmatically
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (values, { setFieldError }) => {
        try {
            // Make parallel requests to login and retrieve user data
            const [loginResponse, userResponse] = await axios.all([
                axios.post("http://localhost:5000/api/login", values), // Login request
                axios.get("http://localhost:5000/api/retrieveData", {
                    params: { email: values.email }, // Fetch user data
                }),
            ]);

            // Check if both requests were successful
            if (loginResponse.status === 200 && userResponse.status === 200) {
                // Save user data to localStorage
                localStorage.setItem(
                    "userData",
                    JSON.stringify(userResponse.data)
                );
                // Redirect to users page
                navigate("/users");
            }
        } catch (error) {
            // Handle errors from the login or data retrieval requests
            if (error.response) {
                const message = error.response.data.message;
                if (message === "Incorrect password") {
                    setFieldError("password", "Incorrect password"); // Set password error
                } else if (message === "Email does not exist") {
                    setFieldError("email", "Email does not exist"); // Set email error
                }
            } else {
                console.error("Error:", error);
                setFieldError("general", "Network error. Please try again."); // Network error message
            }
        }
    };

    return (
        <Formik
            initialValues={{ email: "", password: "" }} // Initial form values
            onSubmit={handleSubmit} // Handle form submission
            validationSchema={validationSchema} // Validation schema
            validateOnBlur={false} // Disable validation on blur
        >
            {({ errors }) => (
                <Form className={styles.form}>
                    <h1>Welcome!</h1>
                    {/* Email field */}
                    <Field
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        className={styles.field}
                    />
                    {errors.email && (
                        <p className={styles.errors}>{errors.email}</p> // Display email error
                    )}
                    {/* Password field */}
                    <Field
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        className={styles.field}
                    />
                    {errors.password && (
                        <p className={styles.errors}>{errors.password}</p> // Display password error
                    )}
                    {errors.general && (
                        <p className={styles.errors}>{errors.general}</p> // Display general error
                    )}
                    {/* Submit button */}
                    <input
                        type="submit"
                        value="Login"
                        className={styles["submit-button"]}
                    />
                    {/* Link to registration page */}
                    <p className="mt-4">
                        Don't have an account yet?
                        <Link
                            to="/signup"
                            className="underline ml-1 text-blue-400"
                        >
                            Register
                        </Link>
                    </p>
                </Form>
            )}
        </Formik>
    );
}

export default LoginForm;

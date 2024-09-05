import { Field, Form, Formik } from "formik";
import styles from "./LoginForm.module.css"; // Importing styles for the form
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function SignUpForm() {
    // Hook to navigate programmatically
    const navigate = useNavigate();

    // Function to check if an email is already in use
    const checkEmailExists = async (email) => {
        try {
            // Send GET request to check if the email exists
            const response = await axios.get(
                "http://localhost:5000/api/checkemail",
                { params: { email } }
            );
            return response.data.exists; // Return boolean indicating if email exists
        } catch (error) {
            console.error("Error checking email:", error);
            return false; // Return false in case of error
        }
    };

    // Handle form submission
    const handleSubmit = async (values, { setFieldError }) => {
        // Check if the email already exists
        const emailExists = await checkEmailExists(values.email);
        if (emailExists) {
            // Set form error if email is already used
            setFieldError("email", "Email is already used");
            return;
        }

        try {
            // Send POST request to create a new user
            const response = await axios.post(
                "http://localhost:5000/api/userpost",
                values
            );
            if (response.status === 200) {
                // Navigate to the home page on successful sign-up
                navigate("/");
            } else {
                console.log("Unexpected status code:", response.status);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    // Custom validation function
    const handleValidate = (values) => {
        const errors = {};
        // Regular expressions for validation
        const nameRegEx = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegEx = /^\d{11}$/;
        const passwordRegEx =
            /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;

        // Validation checks for each field
        if (!values.name) {
            errors.name = "Name is required";
        } else if (!nameRegEx.test(values.name)) {
            errors.name = "Invalid Name (max 20 letter)";
        }
        if (!values.phone) {
            errors.phone = "Phone is required";
        } else if (!phoneRegEx.test(values.phone)) {
            errors.phone = "Phone must be 11 digits";
        }
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!emailRegEx.test(values.email)) {
            errors.email = "Email is invalid";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (!passwordRegEx.test(values.password)) {
            errors.password =
                "Password must be at least 8 letters containing letters, numbers & special characters";
        }
        if (!values.passwordConfirm) {
            errors.passwordConfirm = "Password Confirm is required";
        } else if (values.passwordConfirm !== values.password) {
            errors.passwordConfirm = "Passwords don't match";
        }
        return errors; // Return validation errors
    };

    return (
        <Formik
            initialValues={{
                name: "",
                phone: "",
                email: "",
                password: "",
                passwordConfirm: "",
            }}
            onSubmit={handleSubmit} // Handle form submission
            validate={handleValidate} // Custom validation function
            validateOnBlur={true} // Validate on blur
        >
            {({ errors, touched }) => (
                <Form className={styles.form}>
                    <h1>Sign Up!</h1>
                    {/* Name field */}
                    <Field
                        type="text"
                        name="name"
                        placeholder="Full name"
                        className={styles.field}
                    />
                    {errors.name && touched.name && (
                        <p className={styles.errors}>{errors.name}</p> // Display name error
                    )}
                    {/* Phone field */}
                    <Field
                        type="text"
                        name="phone"
                        placeholder="Phone number"
                        className={styles.field}
                    />
                    {errors.phone && touched.phone && (
                        <p className={styles.errors}>{errors.phone}</p> // Display phone error
                    )}
                    {/* Email field */}
                    <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={styles.field}
                    />
                    {errors.email && touched.email && (
                        <p className={styles.errors}>{errors.email}</p> // Display email error
                    )}
                    {/* Password field */}
                    <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        className={styles.field}
                    />
                    {errors.password && touched.password && (
                        <p className={styles.errors}>{errors.password}</p> // Display password error
                    )}
                    {/* Confirm Password field */}
                    <Field
                        type="password"
                        name="passwordConfirm"
                        placeholder="Confirm Password"
                        className={styles.field}
                    />
                    {errors.passwordConfirm && touched.passwordConfirm && (
                        <p className={styles.errors}>
                            {errors.passwordConfirm}
                        </p>
                    )}
                    {/* Submit button */}
                    <input
                        type="submit"
                        value="Sign Up"
                        className={styles["submit-button"]}
                    />
                    {/* Link to login page */}
                    <p className="mt-4">
                        Already have an account?
                        <Link to="/" className="underline ml-1 text-blue-400">
                            Login
                        </Link>
                    </p>
                </Form>
            )}
        </Formik>
    );
}

export default SignUpForm;

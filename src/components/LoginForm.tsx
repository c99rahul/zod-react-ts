import { useState, ChangeEvent, FormEvent } from "react";
import { z } from "zod";

const genderOptions = ["male", "female", "other"] as const;
type Gender = (typeof genderOptions)[number];

const userFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  gender: z.enum(genderOptions, {
    errorMap: () => ({ message: "Please select a gender" }),
  }),
});

type FormData = z.infer<typeof userFormSchema>;
type FormErrors = Partial<Record<keyof FormData, string[]>>;

function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    gender: "" as Gender,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (data: FormData, field?: keyof FormData): FormErrors => {
    try {
      userFormSchema.parse(data);
      return field ? { [field]: [] } : {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.flatten().fieldErrors;
        return field ? { [field]: newErrors[field] || [] } : newErrors;
      }
      return {};
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, proceed with submission
      console.log("Form submitted:", formData);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    // Validate form on each change
    const newErrors = validateForm(updatedFormData);
    setErrors(newErrors);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-row">
        <input
          type="text"
          name="username"
          className="form-field"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        {errors.username && errors.username.length > 0 && (
          <div className="form-msg">{errors.username[0]}</div>
        )}
      </div>
      <div className="form-row">
        <input
          type="password"
          name="password"
          className="form-field"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && errors.password.length > 0 && (
          <div className="form-msg">{errors.password[0]}</div>
        )}
      </div>
      <div className="form-row">
        <select
          name="gender"
          className="form-field"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          {genderOptions.map((gender) => (
            <option key={gender} value={gender}>
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </option>
          ))}
        </select>
        {errors.gender && errors.gender.length > 0 && (
          <div className="form-msg">{errors.gender[0]}</div>
        )}
      </div>
      <div className="form-row">
        <button type="submit" className="form-action">
          Submit
        </button>
      </div>
    </form>
  );
}

export default LoginForm;

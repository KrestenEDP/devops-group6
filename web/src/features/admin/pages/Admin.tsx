import { useState } from "react";
import styles from "../styles/Admin.module.scss";

export function Admin() {

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		role: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Form submitted:", formData);

		// API for usercreation
	};

	return (
		<div className={styles.profilePage}>
			<div className={styles.profileCard}>
				<h2>Create New User</h2>
				<form onSubmit={handleSubmit} className={styles.form}>
					
					<label>Name</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>

					<label>Email</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>

					<label>Password</label>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>

					<label>Role</label>
					<select
						name="role"
						value={formData.role}
						onChange={handleChange}
						required
					>
						<option value="">Select role</option>
						<option value="admin">Admin</option>
						<option value="editor">Artist</option>
						<option value="user">User</option>
					</select>

					<button type="submit" className={styles.primaryBtn}>
						Create User
					</button>
				</form>
			</div>
		</div>
	);
}

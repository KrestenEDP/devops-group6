import { useState } from "react";
import styles from "../styles/NewArt.module.scss";

export function NewArt() {
	const [title, setTitle] = useState("");
	const [medium, setMedium] = useState("");
	const [condition, setCondition] = useState("");
	const [price, setPrice] = useState("");

	return (
		<div className={styles.newArtPageCentered}>
			<div className={styles.artFormBox}>
				<div className={styles.uploadBox}>
					<a href="#" className={styles.uploadLink}>
						Insert new<br />art
					</a>
				</div>

				<form className={styles.formFields}>
					<label className={styles.label}>Title:</label>
					<input
						className={styles.input}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Title of artwork"
					/>

					<label className={styles.label}>Medium:</label>
					<input
						className={styles.input}
						value={medium}
						onChange={(e) => setMedium(e.target.value)}
						placeholder="e.g. Oil on canvas"
					/>

					<label className={styles.label}>Condition:</label>
					<input
						className={styles.input}
						value={condition}
						onChange={(e) => setCondition(e.target.value)}
						placeholder="e.g. Excellent, Good, Fair, Poor"
					/>

					<label className={styles.label}>Secret Price:</label>
					<input
						className={styles.input}
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						placeholder="100.000Kr"
					/>

					<button className={styles.submitBtn} type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
}

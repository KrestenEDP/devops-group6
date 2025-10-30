import { useState, useRef, useEffect } from "react";
import styles from "../styles/NewArt.module.scss";

export function NewArt() {
	const [title, setTitle] = useState("");
	const [medium, setMedium] = useState("");
	const [condition, setCondition] = useState("");
	const [price, setPrice] = useState<number | "">("");

	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const previewRef = useRef<string | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	function handleUploadClick(e: React.MouseEvent) {
		e.preventDefault();
		fileInputRef.current?.click();
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		console.log({ title, medium, condition, price });
		alert("Submitted (placeholder)\n" + JSON.stringify({ title, medium, condition, price }, null, 2));
	}

	// cleanup object URL on unmount
	useEffect(() => {
		return () => {
			if (previewRef.current) {
				try { URL.revokeObjectURL(previewRef.current); } catch {}
			}
		};
	}, []);

	return (
		<div className={styles.newArtPageCentered}>
			<div className={styles.artFormBox}>
				<div className={styles.uploadBox}>
					{previewUrl ? (
						// show preview image, clicking it re-opens file picker
						// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
						<img
							src={previewUrl}
							alt={title || "preview"}
							className={styles.previewImage}
							onClick={handleUploadClick}
						/>
					) : (
						<button type="button" className={styles.uploadLink} onClick={handleUploadClick}>
							Insert new<br />art
						</button>
					)}
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						style={{ display: "none" }}
						onChange={(e) => {
							const f = e.target.files?.[0];
							if (f) {
								// revoke previous
								if (previewRef.current) {
									try {
										URL.revokeObjectURL(previewRef.current);
									} catch {}
								}
								const url = URL.createObjectURL(f);
								previewRef.current = url;
								setPreviewUrl(url);
								console.log("Selected file:", f.name);
							} else {
								if (previewRef.current) {
									try { URL.revokeObjectURL(previewRef.current); } catch {}
									previewRef.current = null;
								}
								setPreviewUrl(null);
							}
						}}
					/>
				</div>

				<form className={styles.formFields} onSubmit={handleSubmit}>
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
                        type="text"
						value={medium}
						onChange={(e) => {
                            const t = e.target.value;
                            if (t.length <= 30 && !/\d/.test(t)) {
                                setMedium(e.target.value)}
                            }
                        }
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
						type="number"
						min="0"
						value={price}
						onChange={(e) => {
							const v = e.target.value;
							if (v === "") {
								setPrice("");
								return;
							}
							const n = Number(v);
							if (!Number.isNaN(n)) setPrice(n);
						}}
						placeholder="100000"
					/>

					<button className={styles.submitBtn} type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
}

import React, { useState } from "react";
import styles from "../styles/NewArt.module.scss";
import {useAuctionsActions} from "@context/AuctionsContext.tsx";

export function NewArt() {
	const [title, setTitle] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [medium, setMedium] = useState("");
	const [price, setPrice] = useState<number>(0);
	const [dimensions, setDimensions] = useState("");


	const { createAuction } = useAuctionsActions();

	/*const fileInputRef = useRef<HTMLInputElement | null>(null);
	const previewRef = useRef<string | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);*/

	/*function handleUploadClick(e: React.MouseEvent) {
		e.preventDefault();
		fileInputRef.current?.click();
	}*/

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		console.log({ title, medium, dimensions, price });
		alert("Submitted (placeholder)\n" + JSON.stringify({ title, medium, dimensions, price }, null, 2));
		try {
			await createAuction({
				title,
				imageUrl,
				medium,
				dimensions,
				limit: price,
			});
		} catch (err: any) {
			alert(err.message || "Failed to create auction.");
		}
	}

	// cleanup object URL on unmount
	/*useEffect(() => {
		return () => {
			if (previewRef.current) {
				try { URL.revokeObjectURL(previewRef.current); } catch { /!* empty *!/ }
			}
		};
	}, []);*/

	return (
		<div className={styles.newArtPageCentered}>
			<div className={styles.artFormBox}>
				{/*
				<div className={styles.uploadBox}>
					{previewUrl ? (
						// show preview image, clicking it re-opens file picker
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
									} catch { }
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
				*/}

				<form className={styles.formFields} onSubmit={handleSubmit}>
					<label className={styles.label}>Title:</label>
					<input
						className={styles.input}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Title of artwork"
					/>

					<label className={styles.label}>Image Url:</label>
					<input
						className={styles.input}
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
						placeholder="Url for image of artwork" // TODO: implement image upload in backend
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

					<label className={styles.label}>Dimensions:</label>
					<input
						className={styles.input}
                        type="text"
						value={dimensions}
						onChange={(e) => {
                            const t = e.target.value;
                            if (t.length <= 20) {
                                setDimensions(e.target.value)}
                            }
                        }
						placeholder="50cm x 70cm"
					/>

					<label className={styles.label}>Secret Price:</label>
					<input
						className={styles.input}
						type="number"
						min={0}
						value={price}
						onChange={(e) => setPrice(Number(e.target.value))}
						placeholder="100000"
					/>

					<button className={styles.submitBtn} type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
}

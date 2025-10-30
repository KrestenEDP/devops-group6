import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@context/UserContext.tsx";
import styles from "../styles/Profile.module.scss";
import { ROUTES } from "@routes/routes";
import { mockPurchases } from "@data/mockPurchases";
import { mockAuctions, formatCurrency } from "@data/mockAuctions";

export function Profile() {
	const navigate = useNavigate();
	const { user, isLoggedIn, login, logout } = useUser();

	const [name, setName] = useState(user?.name ?? "");
	const [email, setEmail] = useState(user?.email ?? "");
	const [message, setMessage] = useState<string | null>(null);
	const [isArtist, setIsArtist] = useState(user?.isArtist ?? false);

	if (!isLoggedIn) {
		return (
			<div className={styles.profilePage}>
				<div className={styles.profileCard}>
					<p>You are not signed in.</p>
					<button
						className={styles.primaryBtn}
						onClick={() => navigate("/login")}
					>
						Sign In
					</button>
				</div>
			</div>
		);
	}

	function handleSave() {
		if (!name || !email) {
			setMessage("Name and email are required.");
			return;
		}

		// Update the user in context (and localStorage via context)
		login({ id: user!.id, name, email, isArtist });
		setMessage("Profile updated.");

		setIsArtist(name === "test test");
		setTimeout(() => setMessage(null), 2000);
	}

	function initials(name?: string) {
		if (!name) return "?";
		return name
			.split(" ")
			.map((s) => s[0])
			.slice(0, 2)
			.join("")
			.toUpperCase();
	}

	// ✅ Find purchases for this user
	const userPurchases = mockPurchases.filter((p) => p.userId === user?.id);
	
	return (
		<div className={styles.profilePage}>
			<div className={styles.profileCard}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<div className={styles.profileHeader} style={{ marginBottom: 0 }}>
						<div className={styles.avatar}>{initials(user?.name)}</div>
						<div>
							<h2>{user?.name}</h2>
							<div>{user?.email}</div>
						</div>
					</div>
					<button
						className={styles.dangerBtn}
						style={{ alignSelf: "flex-start", marginLeft: 16 }}
						onClick={() => {
							logout();
							navigate(ROUTES.LOGIN);
						}}
					>
						Log out
					</button>
				</div>

				<div className={styles.profileForm}>
					<div className={styles.formRow}>
						<input
							className={styles.input}
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Full Name"
						/>
						<input
							className={styles.input}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
						/>
					</div>

					<div className={styles.buttonRow}>
						<button
							className={styles.secondaryBtn}
							onClick={() => {
								setName(user?.name ?? "");
								setEmail(user?.email ?? "");
							}}
						>
							Reset
						</button>
						<button className={styles.primaryBtn} onClick={handleSave}>
							Save
						</button>
					</div>

					{message && <p role="status">{message}</p>}
				</div>
			</div>

			{isArtist && (
				<div className={styles.buttonContainer}>
					<button
						className={styles.greenBtn}
						onClick={() => {
							navigate(ROUTES.NEW_ART);
						}}
					>
						New Auction
					</button>
				</div>
			)}

			{/* ✅ PURCHASE HISTORY SECTION */}
			<div className={styles.purchaseSection}>
				<h3>Your Purchases</h3>
				{userPurchases.length > 0 ? (
					<ul className={styles.purchaseList}>
						{userPurchases.map((purchase) => {
							const art = mockAuctions.find((a) => a.id === purchase.paintingId);
							if (!art) return null;

							return (
								<li key={purchase.id} className={styles.purchaseItem}>
									<img
										src={art.imageUrl}
										alt={art.title}
										className={styles.purchaseImage}
									/>
									<div className={styles.purchaseDetails}>
										<h4>{art.title}</h4>
										<p>by {art.artist}</p>
										<p>
											Purchased on{" "}
											{new Date(purchase.purchasedAt).toLocaleString("da-DK", {
												dateStyle: "medium",
												timeStyle: "short",
											})}
										</p>
										<p>Purchased for {formatCurrency(purchase.price)}</p>
									</div>
								</li>
							);
						})}
					</ul>
				) : (
					<p>You haven’t purchased any artwork yet.</p>
				)}
			</div>
		</div>
	);
}

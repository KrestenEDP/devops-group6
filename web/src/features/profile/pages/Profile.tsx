import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@context/UserContext.tsx";
import { useArtists } from "@context/ArtistsContext.tsx";
import styles from "../styles/Profile.module.scss";
import { ROUTES } from "@routes/routes";

export function Profile() {
	const navigate = useNavigate();
	const { user, isLoggedIn, login, logout } = useUser();
	const { state: { items: artists}, load } = useArtists();

	const userArtistProfile = artists.find(artist => artist.artistMail === user?.email);

	useEffect(() => {
		load();
	}, [load]);

	const [name, setName] = useState(user?.name ?? "");
	const [email, setEmail] = useState(user?.email ?? "");
	const [message, setMessage] = useState<string | null>(null);

	if (!isLoggedIn) {
		return (
			<div className={styles.profilePage}>
				<div className={styles.profileCard}>
					<p>You are not signed in.</p>
					<button className={styles.primaryBtn} onClick={() => navigate("/login")}>Sign In</button>
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
		login({ id: user!.id, name, email});
		setMessage("Profile updated.");
		setTimeout(() => setMessage(null), 2000);
	}

	function initials(name?: string) {
		if (!name) return "?";
		return name.split(" ").map((s) => s[0]).slice(0,2).join("").toUpperCase();
	}

	return (
		<div className={styles.profilePage}>
			<div className={styles.profileCard}>
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
						onClick={() => { logout(); navigate(ROUTES.LOGIN); }}
					>
						Log out
					</button>
				</div>

				<div className={styles.profileForm}>
					<div className={styles.formRow}>
						<input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
						<input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
						
					</div>

					<div className={styles.buttonRow}>
						<button className={styles.secondaryBtn} onClick={() => { setName(user?.name ?? ""); setEmail(user?.email ?? ""); }}>Reset</button>
						<button className={styles.primaryBtn} onClick={handleSave}>Save</button>
					</div>

					{message && <p role="status">{message}</p>}
				</div>
			</div>
			{userArtistProfile && (
			<div className={styles.buttonContainer}>
				<button className={styles.greenBtn} onClick={() => { navigate(ROUTES.NEW_ART); }}>New Auction Item</button>
			</div>
			)}
		</div>
	);
}


import { useState } from "react";
import { searchUsers, createArtist } from "@context/util/userService";
import { useUser } from "@context/UserContext";

export function Admin() {

    const { user } = useUser();

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [formData, setFormData] = useState({
        userId: "",
        name: "",
        email: "",
        bio: "",
        imageUrl: ""
    });

    const [message, setMessage] = useState("");

    // Search existing users
    const handleSearch = async () => {
        if (!searchTerm || !user?.token) return;

        try {
            const results = await searchUsers(searchTerm, user.token);
            setSearchResults(results);
        } catch (err: any) {
            console.error(err);
        }
    };

    // Load selected user into form
    const loadUserToForm = (u: any) => {
        setFormData({
            userId: u.id,
            name: u.userName,
            email: u.email,
            bio: "",
            imageUrl: ""
        });

        setSearchResults([]);
        setSearchTerm("");
    };

    // Submit to CreateArtist endpoint
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user?.token) return;

        try {
            const response = await createArtist(formData, user.token);
            setMessage(response.message);
        } catch (err: any) {
            setMessage(err.message);
        }
    };

    return (
        <div className={styles.profilePage}>
            <div className={styles.profileCard}>

                <h2>Search User</h2>
                <input
                    type="text"
                    placeholder="Search by email or name…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>

                {searchResults.length > 0 && (
                    <div>
                        {searchResults.map((u: any) => (
                            <div
                                key={u.id}
                                onClick={() => loadUserToForm(u)}
                                className={styles.searchItem}
                            >
                                {u.userName} ({u.email})
                            </div>
                        ))}
                    </div>
                )}

                <h2>Create Artist</h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <label>User Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />

                    <label>Bio</label>
                    <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    />

                    <label>Image URL</label>
                    <input
                        type="text"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    />

                    <button type="submit"> Uplift user to artist</button>
                </form>

                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export enum Role {
    Admin = "Admin",
    Artist = "Artist",
    User = "User",
}

export function parseRole(roleString: string): Role {
    if (Object.values(Role).includes(roleString as Role)) {
        return roleString as Role;
    }
    throw new Error(`Invalid role: ${roleString}`);
}
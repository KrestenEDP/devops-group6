export const Roles = {
    Admin: "Admin",
    Artist: "Artist",
    User: "User",
} as const;

export type Role = typeof Roles[keyof typeof Roles];

export function parseRole(roleString: string): Role {
    if ((Object.values(Roles) as string[]).includes(roleString)) {
        return roleString as Role;
    }
    throw new Error(`Invalid role: ${roleString}`);
}
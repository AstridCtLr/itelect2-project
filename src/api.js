export async function fetchSampleUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const users = await response.json();

        return users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email
        }));
    } catch (error) {
        console.error(error);
        return [];
    } finally {
        console.log("fetchSampleUsers() completed.");
    }
}

export function fetchSampleUsersPromise() {
    return fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            return response.json();
        })
        .then(users =>
            users.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email
            }))
        )
        .catch(error => {
            console.error(error);
            return [];
        });
}
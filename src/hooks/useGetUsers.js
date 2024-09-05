import { useEffect } from "react";
function useGetUsers(setUsers) {
    const getUsers = async () => {
        const response = await fetch("https://dummyjson.com/users");
        const jsonData = await response.json();
        setUsers(jsonData.users);
    };
    useEffect(() => {
        getUsers();
    });
}
export default useGetUsers;

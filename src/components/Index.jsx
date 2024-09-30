import { useEffect, useState } from "react";
import BackEnd from "../config/Index";
import './styles.css';

function Index() {
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        BackEnd.get('/')
            .then(response => {
                const result = response.data.results;
                setUsers(result);
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchUsers();
        const interval = setInterval(() => {
            fetchUsers();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <h1 className="title">Lista de Usuários</h1>
            <div className="user-container">
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <div key={index} className="user-card">
                            <div className="user-image">
                                <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
                            </div>
                            <div className="user-info">
                                <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
                                <p><strong>Gênero:</strong> {user.gender}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Endereço:</strong> {user.location.street.number} {user.location.street.name}, {user.location.city}, {user.location.state}, {user.location.country}, {user.location.postcode}</p>
                            </div>
                            <div className="user-extra">
                                <p><strong>Data de Nascimento:</strong> {new Date(user.dob.date).toLocaleDateString()} (Idade: {user.dob.age})</p>
                                <p><strong>Telefone:</strong> {user.phone}</p>
                                <p><strong>Celular:</strong> {user.cell}</p>
                                <p><strong>Nacionalidade:</strong> {user.nat}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhum usuário encontrado.</p>
                )}
            </div>
        </>
    );
}

export default Index;

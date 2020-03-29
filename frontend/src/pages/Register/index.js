import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import logoImg from "../../assets/logo.svg";

import api from '../../services/api';
import location from '../../services/cities';

export default function Register() {

    const [ufCod, setUfCod] = useState("0");
    const [cities, setCities] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }

        try {
            const response = await api.post("ongs", data);
            alert(`Seu ID de acesso ${response.data.id}`);
            history.push("/");
        } catch(err) {
            alert("Erro no cadastro, tente novamente.");
        }
    }

    async function getCities() {
        const data = await location.get(`/localidades/estados/${ufCod}/municipios`);
        setCities(data.data);
        console.log(data);
    }

    useEffect(() => {
        getCities();
    }, [ufCod]);

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    
                    <h1>Cadastro</h1>
                    <p>
                        Faça seu cadastro, entre na plataforma e ajude 
                        pessoas a encontrarem os casos da sua ONG.
                    </p>

                    <Link to="/" className="back-link">
                        <FiArrowLeft height="16" color="#e02041" />
                        Tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input 
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        {/*<input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />*/}
                        <select
                            onChange={e => {
                                setCity(e.target[e.target.selectedIndex].textContent);
                            }}
                        >
                            { cities.length > 0 && 
                                cities.map((ct) => (
                                    <option index={ct.id} value={ct.nome}>
                                        {ct.nome}
                                    </option>
                                ))
                            }
                        </select>

                        <select 
                            style={{ width: 80 }}
                            onChange={e => {
                                setUfCod(e.target.value);
                                setUf(e.target[e.target.selectedIndex].textContent);
                            }}
                        >
                            <option value="0" selected>UF</option>
                            <option value="12">AC</option>
                            <option value="27">AL</option>
                            <option value="16">AP</option>
                            <option value="13">AM</option>
                            <option value="29">BA</option>
                            <option value="23">CE</option>
                            <option value="53">DF</option>
                            <option value="32">ES</option>
                            <option value="52">GO</option>
                            <option value="21">MA</option>
                            <option value="51">MT</option>
                            <option value="50">MS</option>
                            <option value="31">MG</option>
                            <option value="15">PA</option>
                            <option value="25">PB</option>
                            <option value="41">PR</option>
                            <option value="26">PE</option>
                            <option value="22">PI</option>
                            <option value="33">RJ</option>
                            <option value="24">RN</option>
                            <option value="43">RS</option>
                            <option value="11">RO</option>
                            <option value="14">RR</option>
                            <option value="42">SC</option>
                            <option value="35">SP</option>
                            <option value="28">SE</option>
                            <option value="17">TO</option>
                        </select>
                    </div>
                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}
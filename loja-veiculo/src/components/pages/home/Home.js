import Cards from '../../home-components/cards/cards'
import styles from './Home.module.css'


function Home() {
    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <Cards
                    title="Controle Total"
                    message="Gerencie todo o estoque em um único painel."
                />
                <Cards
                    title="Localização"
                    message="Saiba exatamente em qual vaga ou pátio o carro está."
                />
                <Cards
                    title="Visual Rápido"
                    message="Veja os carros em cards com fotos e status."
                />
                <Cards
                    title="Busca Avançada"
                    message="Encontre carros por modelo, cor ou localização."
                />
                <Cards
                    title="Status Visuais"
                    message="Disponível, Reservado, Vendido."
                />
            </div>
        </section>
    )
}

export default Home